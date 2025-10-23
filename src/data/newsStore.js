// src/data/newsStore.js
import { db, storage } from "../lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import imgFallBack from "../assets/imgFallBack.png";
const FALLBACK_IMG = imgFallBack;

const USE_FIREBASE = import.meta.env.VITE_USE_FIREBASE === "true";
const LOCAL_KEY = "tuns_news_v1";

// ---------- Local helpers ----------
function readAllLocal() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}
function writeAllLocal(items) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
}
export function clearLocalNews() {
  localStorage.removeItem(LOCAL_KEY);
}

// ---------- Common ----------
function sanitizeNewsItem(raw, idFromDoc) {
  const copy = {
    attachments: [],
    image: FALLBACK_IMG,
    featured: false,
    ...raw,
  };
  // ❗ ยึด doc id เป็นหลัก เพื่อให้ /news/:id ตรงกับ getNewsById
  copy.id = String(idFromDoc ?? raw?.id ?? "");
  if (!copy.image || String(copy.image).trim() === "")
    copy.image = FALLBACK_IMG;
  copy.featured = !!copy.featured;
  if (copy.date instanceof Date)
    copy.date = copy.date.toISOString().slice(0, 10);
  return copy;
}

async function uploadFileTo(path, fileOrBlob) {
  const r = ref(storage, path);
  await uploadBytes(r, fileOrBlob);
  return getDownloadURL(r);
}

// ---------- Public API ----------
export async function listNews() {
  if (!USE_FIREBASE) {
    return readAllLocal()
      .map((n) => sanitizeNewsItem(n))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  const q = query(collection(db, "news"), orderBy("date", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => sanitizeNewsItem(d.data(), d.id));
}

export async function getNewsById(id) {
  if (!USE_FIREBASE) {
    const found = readAllLocal().find((n) => String(n.id) === String(id));
    return found ? sanitizeNewsItem(found) : null;
  }
  const dref = doc(db, "news", String(id));
  const snap = await getDoc(dref);
  if (!snap.exists()) return null;
  return sanitizeNewsItem(snap.data(), snap.id);
}

export async function addNews(
  data,
  { coverFile = null, attachmentFiles = [] } = {}
) {
  if (!USE_FIREBASE) {
    // Local (กัน quota: ไม่เก็บ base64)
    const items = readAllLocal();
    const obj = sanitizeNewsItem({
      id: Date.now().toString(),
      title: "",
      summary: "",
      content: "",
      date: new Date().toISOString().slice(0, 10),
      category: "announcement",
      featured: false,
      image: FALLBACK_IMG,
      attachments: [],
      ...data,
    });
    if (obj.image?.startsWith("data:")) obj.image = FALLBACK_IMG;
    obj.attachments = (obj.attachments || []).filter(
      (a) => a?.url && !String(a.url).startsWith("data:")
    );
    writeAllLocal([...items, obj]);
    return obj;
  }

  // Firebase
  // อย่าเก็บฟิลด์ id ที่มาจากฝั่งฟอร์มลงเอกสาร (ใช้ doc id)
  const dataNoId = { ...data };
  delete dataNoId.id;

  const initialImage =
    typeof dataNoId.image === "string" && dataNoId.image.trim() !== ""
      ? dataNoId.image.trim()
      : "";

  const payload = sanitizeNewsItem(
    {
      title: "",
      summary: "",
      content: "",
      date: new Date().toISOString().slice(0, 10),
      dateString: new Date().toLocaleString("th-TH"),
      category: "announcement",
      featured: false,
      ...dataNoId,
      image: initialImage, // ❗ เคารพ URL ที่ส่งเข้ามา
      attachments: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    undefined
  );

  const col = collection(db, "news");
  const docRef = await addDoc(col, payload);
  const id = docRef.id;

  // ถ้ามีไฟล์ภาพใหม่ → อัปโหลดทับ
  let coverUrl = initialImage;
  if (coverFile instanceof Blob) {
    const ext =
      coverFile.name?.split(".").pop() || coverFile.type.split("/")[1] || "bin";
    coverUrl = await uploadFileTo(
      `news/${id}/cover_${Date.now()}.${ext}`,
      coverFile
    );
  }

  // อัปโหลดไฟล์แนบ
  const uploadedAttachments = [];
  for (const file of attachmentFiles || []) {
    if (!(file instanceof Blob)) continue;
    const ext = file.name?.split(".").pop() || file.type.split("/")[1] || "bin";
    const path = `news/${id}/attachments/${Date.now()}_${Math.random()
      .toString(36)
      .slice(2)}.${ext}`;
    const url = await uploadFileTo(path, file);
    uploadedAttachments.push({
      name: file.name || `file.${ext}`,
      url,
      type: file.type || "application/octet-stream",
      size: file.size || 0,
      path,
    });
  }

  // ถ้าไม่มี coverFile และมี image จาก data → ใช้อันนั้น ไม่ทับด้วย FALLBACK
  const finalImage = coverUrl || initialImage || FALLBACK_IMG;

  await updateDoc(docRef, {
    image: finalImage,
    attachments: uploadedAttachments,
    updatedAt: serverTimestamp(),
    lastModified: serverTimestamp(),
  });

  const finalDoc = await getDoc(docRef);
  return sanitizeNewsItem(finalDoc.data(), id);
}

export async function updateNews(
  id,
  data,
  { coverFile = null, newAttachmentFiles = [] } = {}
) {
  if (!USE_FIREBASE) {
    const items = readAllLocal();
    const idx = items.findIndex((n) => String(n.id) === String(id));
    if (idx === -1) return null;
    const merged = sanitizeNewsItem({ ...items[idx], ...data });

    if (merged.image?.startsWith("data:")) merged.image = FALLBACK_IMG;
    merged.attachments = (merged.attachments || []).filter(
      (a) => a?.url && !String(a.url).startsWith("data:")
    );

    items[idx] = merged;
    writeAllLocal(items);
    return merged;
  }

  // Firebase
  const dref = doc(db, "news", String(id));
  const snap = await getDoc(dref);
  if (!snap.exists()) return null;
  const current = sanitizeNewsItem(snap.data(), id);

  let imageUrl =
    (typeof data?.image === "string" && data.image.trim() !== ""
      ? data.image.trim()
      : current.image) || FALLBACK_IMG;

  if (coverFile instanceof Blob) {
    const ext =
      coverFile.name?.split(".").pop() || coverFile.type.split("/")[1] || "bin";
    imageUrl = await uploadFileTo(
      `news/${id}/cover_${Date.now()}.${ext}`,
      coverFile
    );
  }

  const attachments = Array.isArray(current.attachments)
    ? [...current.attachments]
    : [];
  for (const file of newAttachmentFiles || []) {
    if (!(file instanceof Blob)) continue;
    const ext = file.name?.split(".").pop() || file.type.split("/")[1] || "bin";
    const path = `news/${id}/attachments/${Date.now()}_${Math.random()
      .toString(36)
      .slice(2)}.${ext}`;
    const url = await uploadFileTo(path, file);
    attachments.push({
      name: file.name || `file.${ext}`,
      url,
      type: file.type || "application/octet-stream",
      size: file.size || 0,
      path,
    });
  }

  const merged = {
    ...current,
    ...data,
    image: imageUrl || FALLBACK_IMG,
    attachments,
    updatedAt: serverTimestamp(),
  };
  delete merged.id; // อย่าเก็บ id เป็นฟิลด์ใน doc

  await updateDoc(dref, merged);
  const after = await getDoc(dref);
  return sanitizeNewsItem(after.data(), id);
}

// ---------- Recursive Delete Helper ----------
async function deleteFolderRecursive(path) {
  const folderRef = ref(storage, path);
  const list = await listAll(folderRef);

  // 🔹 ลบไฟล์ทั้งหมดในโฟลเดอร์นี้
  await Promise.all(
    list.items.map(async (item) => {
      try {
        await deleteObject(item);
        console.log("🗑️ ลบไฟล์:", item.fullPath);
      } catch (err) {
        console.warn("⚠️ ลบไฟล์ไม่สำเร็จ:", item.fullPath, err);
      }
    })
  );

  for (const prefix of list.prefixes) {
    await deleteFolderRecursive(prefix.fullPath);
  }
}

// ---------- Delete News (with recursive Storage cleanup) ----------
export async function deleteNews(id) {
  if (!USE_FIREBASE) {
    // โหมด Local
    writeAllLocal(readAllLocal().filter((n) => String(n.id) !== String(id)));
    return;
  }

  const dref = doc(db, "news", String(id));

  try {
    console.log("🚮 กำลังลบไฟล์ทั้งหมดใน Storage ของข่าว:", id);
    await deleteFolderRecursive(`news/${id}`);
    console.log("✅ ลบไฟล์ใน Storage สำเร็จ");
  } catch (err) {
    console.error("❌ เกิดข้อผิดพลาดระหว่างลบไฟล์ Storage:", err);
  }

  try {
    await deleteDoc(dref);
    console.log("✅ ลบข่าวใน Firestore สำเร็จ");
  } catch (err) {
    console.error("❌ ลบข่าวใน Firestore ไม่สำเร็จ:", err);
  }
}


export const formatThaiDate = (s) =>
  new Date(s).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
