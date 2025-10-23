// src/data/galleryStore.js
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

const USE_FIREBASE = import.meta.env.VITE_USE_FIREBASE === "true";
const LOCAL_KEY = "tuns_gallery_v1";

// ใช้รูป fallback จาก public เพื่อไม่ให้ Vite error
const FALLBACK_IMG = "/imgFallBack.png";

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
export function clearLocalGallery() {
  localStorage.removeItem(LOCAL_KEY);
}

// ---------- Common ----------
function sanitizeItem(raw, idFromDoc) {
  const copy = {
    title: "",
    category: "activity", // activity | academic | ceremony | place ...
    date: new Date().toISOString().slice(0, 10),
    cover: FALLBACK_IMG, // รูปหน้าปก
    driveUrl: "", // ลิงก์ Google Drive/Folders
    attachments: [], // เผื่อในอนาคต
    ...raw,
  };
  // ยึด doc id เป็นหลัก
  copy.id = String(idFromDoc ?? raw?.id ?? "");
  if (!copy.cover || String(copy.cover).trim() === "")
    copy.cover = FALLBACK_IMG;
  if (copy.date instanceof Date)
    copy.date = copy.date.toISOString().slice(0, 10);
  return copy;
}

async function uploadFileTo(path, fileOrBlob) {
  const r = ref(storage, path);
  await uploadBytes(r, fileOrBlob);
  return await getDownloadURL(r);
}

// ---------- API ----------
export async function listGallery() {
  if (!USE_FIREBASE) {
    return readAllLocal()
      .map((x) => sanitizeItem(x))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  const qy = query(collection(db, "gallery"), orderBy("date", "desc"));
  const snap = await getDocs(qy);
  return snap.docs.map((d) => sanitizeItem(d.data(), d.id));
}

export async function getGalleryById(id) {
  if (!USE_FIREBASE) {
    const found = readAllLocal().find((x) => String(x.id) === String(id));
    return found ? sanitizeItem(found) : null;
  }
  const dref = doc(db, "gallery", String(id));
  const snap = await getDoc(dref);
  if (!snap.exists()) return null;
  return sanitizeItem(snap.data(), snap.id);
}

export async function addGallery(data, { coverFile = null } = {}) {
  if (!USE_FIREBASE) {
    const items = readAllLocal();
    const obj = sanitizeItem({
      id: Date.now().toString(),
      ...data,
      // กัน quota: ถ้าเป็น data: ให้ทิ้ง
      cover:
        data?.cover && !String(data.cover).startsWith("data:")
          ? data.cover
          : FALLBACK_IMG,
    });
    writeAllLocal([obj, ...items]);
    return obj;
  }

  const dataNoId = { ...data };
  delete dataNoId.id;

  const initialCover =
    typeof dataNoId.cover === "string" && dataNoId.cover.trim() !== ""
      ? dataNoId.cover.trim()
      : "";

  const payload = sanitizeItem(
    {
      ...dataNoId,
      cover: initialCover,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    undefined
  );

  const col = collection(db, "gallery");
  const docRef = await addDoc(col, payload);
  const id = docRef.id;

  let coverUrl = initialCover;
  if (coverFile instanceof Blob) {
    const ext =
      coverFile.name?.split(".").pop() || coverFile.type.split("/")[1] || "bin";
    coverUrl = await uploadFileTo(
      `gallery/${id}/cover_${Date.now()}.${ext}`,
      coverFile
    );
  }

  await updateDoc(docRef, {
    cover: coverUrl || initialCover || FALLBACK_IMG,
    updatedAt: serverTimestamp(),
  });

  const final = await getDoc(docRef);
  return sanitizeItem(final.data(), id);
}

export async function updateGallery(id, data, { coverFile = null } = {}) {
  if (!USE_FIREBASE) {
    const items = readAllLocal();
    const idx = items.findIndex((x) => String(x.id) === String(id));
    if (idx === -1) return null;
    const merged = sanitizeItem({ ...items[idx], ...data });
    // ไม่เก็บ data: ในโหมด local
    if (merged.cover?.startsWith("data:")) merged.cover = FALLBACK_IMG;
    items[idx] = merged;
    writeAllLocal(items);
    return merged;
  }

  const dref = doc(db, "gallery", String(id));
  const snap = await getDoc(dref);
  if (!snap.exists()) return null;
  const current = sanitizeItem(snap.data(), id);

  let coverUrl =
    (typeof data?.cover === "string" && data.cover.trim() !== ""
      ? data.cover.trim()
      : current.cover) || FALLBACK_IMG;

  if (coverFile instanceof Blob) {
    const ext =
      coverFile.name?.split(".").pop() || coverFile.type.split("/")[1] || "bin";
    coverUrl = await uploadFileTo(
      `gallery/${id}/cover_${Date.now()}.${ext}`,
      coverFile
    );
  }

  const merged = {
    ...current,
    ...data,
    cover: coverUrl || FALLBACK_IMG,
    updatedAt: serverTimestamp(),
  };
  delete merged.id;

  await updateDoc(dref, merged);
  const after = await getDoc(dref);
  return sanitizeItem(after.data(), id);
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

  // 🔹 ไล่ลบโฟลเดอร์ย่อยทั้งหมด (recursive)
  for (const prefix of list.prefixes) {
    await deleteFolderRecursive(prefix.fullPath);
  }
}

// ---------- Delete Gallery (with recursive Storage cleanup) ----------
export async function deleteGallery(id) {
  if (!USE_FIREBASE) {
    // ✅ โหมด Local
    writeAllLocal(readAllLocal().filter((x) => String(x.id) !== String(id)));
    return;
  }

  const dref = doc(db, "gallery", String(id));

  try {
    console.log("🚮 กำลังลบไฟล์ทั้งหมดใน Storage ของแกลเลอรี่:", id);
    await deleteFolderRecursive(`gallery/${id}`);
    console.log("✅ ลบไฟล์ใน Storage สำเร็จ");
  } catch (err) {
    console.error("❌ เกิดข้อผิดพลาดระหว่างลบไฟล์ Storage:", err);
  }

  try {
    await deleteDoc(dref);
    console.log("✅ ลบข้อมูลแกลเลอรี่ใน Firestore สำเร็จ");
  } catch (err) {
    console.error("❌ ลบข้อมูลแกลเลอรี่ใน Firestore ไม่สำเร็จ:", err);
  }
}

