// src/pages/admin/GalleryAdmin.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  listGallery,
  addGallery,
  updateGallery,
  deleteGallery,
} from "../../data/galleryStore";

const USE_FIREBASE = import.meta.env.VITE_USE_FIREBASE === "true";

const empty = {
  title: "",
  category: "activity",
  date: new Date().toISOString().slice(0, 10),
  cover: "",
  driveUrl: "",
};

export default function GalleryAdmin() {
  const [form, setForm] = useState(empty);
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [coverFile, setCoverFile] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const rows = await listGallery();
        if (alive) setItems(Array.isArray(rows) ? rows : []);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setCoverFile(f);
    const preview = URL.createObjectURL(f);
    setForm((p) => ({ ...p, cover: preview }));
  }

  const fileToDataURL = (file) =>
    new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(String(r.result || ""));
      r.onerror = rej;
      r.readAsDataURL(file);
    });

  async function save() {
    if (saving) return;
    if (!form.title.trim()) return alert("กรุณากรอกชื่อกิจกรรม");
    if (!form.driveUrl.trim()) {
      const ok = confirm(
        "ยังไม่ได้ใส่ลิงก์ Google Drive, ต้องการบันทึกอยู่หรือไม่?"
      );
      if (!ok) return;
    }

    // ป้องกันเพิ่มซ้ำ
    const dup = items.some(
      (x) =>
        x.title.trim() === form.title.trim() &&
        String(x.date) === String(form.date) &&
        (!editingId || x.id !== editingId)
    );
    if (!editingId) {
      const ok = confirm(
        dup ? "พบบันทึกซ้ำวันนี้ ต้องการเพิ่มซ้ำหรือไม่?" : "ยืนยันเพิ่มรายการ?"
      );
      if (!ok) return;
    } else {
      if (!confirm("ยืนยันบันทึกการแก้ไข?")) return;
    }

    setSaving(true);
    try {
      let payload = { ...form };
      // โหมด local เก็บ cover เป็น base64 (แค่ preview ได้)
      let extra = {};
      if (!USE_FIREBASE && coverFile) {
        payload.cover = await fileToDataURL(coverFile);
      }
      if (editingId) {
        await updateGallery(editingId, payload, {
          coverFile: USE_FIREBASE ? coverFile : null,
        });
      } else {
        await addGallery(payload, {
          coverFile: USE_FIREBASE ? coverFile : null,
        });
      }
      // reload
      setLoading(true);
      const rows = await listGallery();
      setItems(Array.isArray(rows) ? rows : []);
      setLoading(false);

      setForm(empty);
      setEditingId(null);
      setCoverFile(null);
    } finally {
      setSaving(false);
    }
  }

  function edit(item) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      category: item.category,
      date: item.date,
      cover: item.cover,
      driveUrl: item.driveUrl || "",
    });
    setCoverFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function remove(id) {
    if (!confirm("ลบรายการนี้?")) return;
    await deleteGallery(id);
    setLoading(true);
    const rows = await listGallery();
    setItems(Array.isArray(rows) ? rows : []);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <Link
          to="/admin/dashboard"
          className="inline-block mt-8 mb-4 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 active:scale-[0.98] transition"
        >
          🔙 กลับไปหน้าแดชบอร์ด
        </Link>

        <h1 className="text-3xl font-bold mb-6">จัดการภาพกิจกรรม</h1>
        <div className="text-sm mb-4">
          โหมด:{" "}
          <span className="font-semibold">
            {USE_FIREBASE ? "Firebase (Oncloud)" : "Local (ทดสอบ)"}
          </span>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow p-5 mb-10 grid md:grid-cols-2 gap-5">
          <div className="space-y-3">
            <span>ใส่ชื่อกิจกรรม</span>
            <input
              className="w-full border rounded-lg px-3 py-2"
              placeholder="ชื่อกิจกรรม"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <span>เลือกวันที่</span>
            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            <span>เลือกประเภทของกิจกรรม</span>
            <select
              className="w-full border rounded-lg px-3 py-2"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="activity">กิจกรรม</option>
              <option value="academic">วิชาการ</option>
              <option value="ceremony">พิธีการ</option>
              <option value="place">สถานที่</option>
            </select>
            <span>ใส่ลิ้ง Google Drive สำหรับเข้าไปดูรูป</span>
            <input
              className="w-full border rounded-lg px-3 py-2"
              placeholder="ลิงก์ Google Drive (โฟลเดอร์/อัลบั้ม)"
              value={form.driveUrl}
              onChange={(e) => setForm({ ...form, driveUrl: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <span>ใส่รูปปกสำหรับหน้าเว็บ</span>
            <input
              type="file"
              accept="image/*"
              onChange={onFile}
              className="w-full border rounded-lg px-3 py-2"
            />
            {form.cover && (
              <img
                src={form.cover}
                alt="preview"
                className="w-48 h-28 object-cover rounded shadow"
              />
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={save}
                disabled={saving}
                className={`px-5 py-2.5 rounded-lg text-white font-medium transition ${
                  saving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {saving
                  ? "กำลังบันทึก..."
                  : editingId
                  ? "บันทึกการแก้ไข"
                  : "เพิ่มกิจกรรม"}
              </button>
              {editingId && (
                <button
                  onClick={() => {
                    setEditingId(null);
                    setForm(empty);
                    setCoverFile(null);
                  }}
                  className="px-5 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  ยกเลิก
                </button>
              )}
            </div>
          </div>
        </div>

        {/* List */}
        <div className="bg-white rounded-xl shadow divide-y">
          {loading ? (
            <div className="p-6 text-center text-gray-500">กำลังโหลด...</div>
          ) : items.length === 0 ? (
            <div className="p-6 text-center text-gray-500">ยังไม่มีรายการ</div>
          ) : (
            items.map((g) => (
              <div
                key={g.id}
                className="p-4 flex flex-col md:flex-row gap-4 hover:bg-gray-50 transition"
              >
                <img
                  src={g.cover || "/imgFallBack.png"}
                  alt={g.title}
                  className="w-28 h-16 object-cover rounded"
                  onError={(e) => (e.currentTarget.src = "/imgFallBack.png")}
                />
                <div className="flex-1">
                  <div className="font-semibold">{g.title}</div>
                  <div className="text-sm text-gray-500">
                    {g.date} • {g.category}
                  </div>
                  {g.driveUrl && (
                    <a
                      href={g.driveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline text-sm mt-1 inline-block"
                      title="เปิด Google Drive"
                    >
                      เปิด Google Drive
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 rounded bg-gray-200"
                    onClick={() => edit(g)}
                  >
                    แก้ไข
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-red-500 text-white"
                    onClick={() => remove(g.id)}
                  >
                    ลบ
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
