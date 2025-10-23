// src/pages/admin/NewsAdmin.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  listNews,
  addNews,
  deleteNews,
  updateNews,
} from "../../data/newsStore";

const USE_FIREBASE = import.meta.env.VITE_USE_FIREBASE === "true";

const empty = {
  title: "",
  summary: "",
  content: "",
  date: new Date().toISOString().slice(0, 10),
  category: "announcement",
  image: "",
  featured: false,
  attachments: [],
};

export default function NewsAdmin() {
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false); // กันกดซ้ำ

  // เก็บไฟล์จริง
  const [imageFile, setImageFile] = useState(null);
  const [attachmentFiles, setAttachmentFiles] = useState([]);

  // โหลดข่าว (listNews() เป็น async)
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const res = await listNews();
        if (mounted) setItems(Array.isArray(res) ? res : []);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const preview = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, image: preview }));
  }

  function handleAttachmentUpload(e) {
    const files = Array.from(e.target.files || []);
    setAttachmentFiles((prev) => [...prev, ...files]);
    // แสดงรายชื่อไฟล์แนบ 
    const display = files.map((f) => ({ name: f.name, url: "" }));
    setForm((prev) => ({
      ...prev,
      attachments: [...(prev.attachments || []), ...display],
    }));
  }

  // ---------- save (เพิ่ม/แก้ไข) ----------
  async function save() {
    if (isSaving) return; // กันกดถี่ ๆ
    if (!form.title.trim()) return alert("กรุณากรอกหัวข้อข่าว");

    // ตรวจข่าวซ้ำ (หัวข้อ + วันที่) ถ้าไม่ใช่โหมดแก้ไข
    const isDup =
      !editingId &&
      items.some(
        (n) =>
          n.title.trim() === form.title.trim() &&
          String(n.date) === String(form.date)
      );

    // ยืนยันก่อนทำรายการ
    if (editingId) {
      if (!confirm("ยืนยันบันทึกการแก้ไขข่าวนี้?")) return;
    } else {
      if (isDup) {
        const ok = confirm(
          "พบหัวข้อข่าวซ้ำในวันเดียวกัน\nคุณต้องการเพิ่มข่าวซ้ำจริงหรือไม่?"
        );
        if (!ok) return;
      } else {
        if (!confirm("ยืนยันเพิ่มข่าวใหม่?")) return;
      }
    }

    setIsSaving(true);
    try {
      const id = editingId || Date.now().toString();
      const payload = { ...form };

      if (editingId) {
        await updateNews(id, payload, {
          coverFile: imageFile,
          newAttachmentFiles: attachmentFiles,
        });
      } else {
        await addNews(
          { ...payload, id },
          {
            coverFile: imageFile,
            attachmentFiles,
          }
        );
      }

      // รีเฟรชรายการข่าว
      setLoading(true);
      const res = await listNews();
      setItems(Array.isArray(res) ? res : []);
      setLoading(false);

      // reset form
      setForm(empty);
      setEditingId(null);
      setImageFile(null);
      setAttachmentFiles([]);
    } finally {
      setIsSaving(false);
    }
  }

  function edit(item) {
    setEditingId(item.id);
    setForm(item);
    setImageFile(null);
    setAttachmentFiles([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function remove(id) {
    if (!confirm("ลบข่าวนี้?")) return;
    await deleteNews(id);
    setLoading(true);
    const res = await listNews();
    setItems(Array.isArray(res) ? res : []);
    setLoading(false);
  }

  // ---------- UI ----------
  return (
    <div className="min-h-screen pt-16 pb-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <Link
          to="/admin/dashboard"
          className="inline-block mt-8 mb-4 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 active:scale-[0.98] transition"
        >
          🔙 กลับไปหน้าแดชบอร์ด
        </Link>

        <h1 className="text-3xl font-bold mb-6">จัดการข่าวสาร</h1>

        {/* Form */}
        <div className="bg-white rounded-xl shadow p-5 mb-10 grid md:grid-cols-2 gap-5">
          <div className="space-y-3">
            <span>ใส่หัวข้อข่าว</span>
            <input
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="หัวข้อข่าว"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <span>
              ใส่รายละเอียดข่าวแบบสรุป(ข้อมูลจะโผล่ ในหน้าแรก (ข่าวด่วน))
            </span>
            <textarea
              className="w-full border rounded-lg px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="สรุป (ย่อหน้าแรก)"
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
            />
            <span>ใส่รายละเอียดข่าว</span>
            <textarea
              className="w-full border rounded-lg px-3 py-2 h-40 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="รายละเอียดข่าว"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <span>เลือกวันที่</span>
            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            <span>เลือกประเภทข่าวที่ต้องการประกาศ</span>
            <select
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="announcement">ประกาศ</option>
              <option value="academic">วิชาการ</option>
              <option value="activity">กิจกรรม</option>
            </select>

            {/* เลือกรูป */}
            <span>เลือกรูปข่าว</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50 transition"
            />
            {form.image && (
              <img
                src={form.image}
                alt="preview"
                className="w-40 h-24 object-cover rounded shadow-sm"
              />
            )}

            {/* แนบไฟล์ */}
            <span>แนบไฟล์</span>

            <input
              type="file"
              multiple
              onChange={handleAttachmentUpload}
              className="w-full border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50 transition"
            />
            {form.attachments?.length > 0 && (
              <ul className="text-sm text-gray-600">
                {form.attachments.map((a, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span>📎</span>
                    {a.url ? (
                      <a
                        href={a.url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-blue-600"
                      >
                        {a.name}
                      </a>
                    ) : (
                      <span>{a.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <label className="inline-flex items-center space-x-2 select-none">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
              />
              <span>ตั้งเป็นข่าวด่วน</span>
            </label>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={save}
                disabled={isSaving}
                aria-busy={isSaving}
                className={`px-5 py-2.5 rounded-lg text-white font-medium transition
                  focus:outline-none focus:ring-4
                  ${
                    isSaving
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg active:scale-[0.98] focus:ring-blue-300"
                  }`}
                title={editingId ? "บันทึกการแก้ไข" : "เพิ่มข่าว"}
              >
                {isSaving
                  ? "กำลังบันทึก..."
                  : editingId
                  ? "บันทึกการแก้ไข"
                  : "เพิ่มข่าว"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm(empty);
                    setImageFile(null);
                    setAttachmentFiles([]);
                  }}
                  className="px-5 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 active:scale-[0.98] transition"
                >
                  ยกเลิก
                </button>
              )}
            </div>
          </div>
        </div>

        {/* List + ปุ่ม */}
        <div className="bg-white rounded-xl shadow divide-y">
          {loading ? (
            <div className="p-6 text-center text-gray-500">กำลังโหลด...</div>
          ) : items.length === 0 ? (
            <div className="p-6 text-center text-gray-500">ยังไม่มีข่าว</div>
          ) : (
            items.map((n) => (
              <div
                key={n.id}
                className="p-4 flex flex-col md:flex-row gap-4 group transition
                           hover:bg-gradient-to-r hover:from-gray-50 hover:to-white"
              >
                <img
                  src={
                    n.image ||
                    "https://via.placeholder.com/150x80?text=No+Image"
                  }
                  alt={n.title}
                  className="w-28 h-16 object-cover rounded ring-1 ring-gray-200 group-hover:ring-blue-300 transition"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition">
                    {n.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {n.date} • {n.category} {n.featured ? "• ข่าวด่วน" : ""}
                  </div>
                  {n.attachments?.length > 0 && (
                    <ul className="text-xs mt-1 text-gray-600">
                      {n.attachments.map((a, i) => (
                        <li key={i}>
                          📎{" "}
                          {a.url ? (
                            <a
                              href={a.url}
                              target="_blank"
                              rel="noreferrer"
                              className="underline hover:text-blue-600"
                            >
                              {a.name}
                            </a>
                          ) : (
                            a.name
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 active:scale-[0.98] transition"
                    onClick={() => edit(n)}
                    title="แก้ไขข่าว"
                  >
                    แก้ไข
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 active:scale-[0.98] transition"
                    onClick={() => remove(n.id)}
                    title="ลบข่าว"
                  >
                    ลบ
                  </button>
                  <Link
                    to={`/news/${n.id}`}
                    className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] transition"
                    title="ดูหน้าเว็บ"
                  >
                    ดูหน้าเว็บ
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* โหมดที่ใช้งานอยู่  */}
        <div className="text-xs text-gray-500 mt-4">
          โหมด: {USE_FIREBASE ? "Firebase (Oncloud)" : "Local (ทดสอบ)"}
        </div>
      </div>
    </div>
  );
}
