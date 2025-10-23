import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getNewsById, formatThaiDate } from "../../data/newsStore";
import imgFallBack from "../../assets/imgFallBack.png";
const fallbackImg = imgFallBack;

function dataURLtoBlob(dataUrl) {
  try {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], { type: mime });
  } catch {
    return null;
  }
}

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  // โหลดข่าวแบบ async + อัปเดตเมื่อ storage เปลี่ยน
  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const item = await getNewsById(id); 
        if (mounted) setNews(item);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    const onStorage = () => load();
    window.addEventListener("storage", onStorage);
    return () => {
      mounted = false;
      window.removeEventListener("storage", onStorage);
    };
  }, [id]);

  const createdAtText = useMemo(() => {
    if (!news?.date) return "";
    return formatThaiDate(news.date);
  }, [news]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        กำลังโหลด...
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <div className="text-center">
          <h1 className="text-3xl font-bold">ไม่พบข่าวที่คุณต้องการ</h1>
          <Link
            to="/news"
            className="mt-4 inline-block px-6 py-2 rounded bg-blue-600 text-white"
          >
            กลับไปหน้าข่าวทั้งหมด
          </Link>
        </div>
      </div>
    );
  }


  const openAttachment = (att) => {
    if (!att?.url) return;
    try {
      if (att.url.startsWith("data:")) {
        const blob = dataURLtoBlob(att.url);
        if (!blob) return;
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, "_blank", "noopener,noreferrer");
        setTimeout(() => URL.revokeObjectURL(blobUrl), 60 * 1000);
      } else {
        window.open(att.url, "_blank", "noopener,noreferrer");
      }
    } catch {
     
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* ปุ่มย้อนกลับ */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            ← ย้อนกลับ
          </button>
        </div>

        {/* หัวข้อ */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {news.title}
        </h1>

        {/* วันที่ + หมวดหมู่ */}
        <div className="mt-3 text-gray-500 text-sm">
          {createdAtText} • {news.category}{" "}
          {news.featured && (
            <span className="ml-2 px-2 py-0.5 rounded bg-pink-100 text-pink-600 text-xs">
              ข่าวด่วน
            </span>
          )}
        </div>

        {/* รูปภาพหลัก */}
        <img
          src={news.image || fallbackImg}
          alt={news.title}
          className=" w-full rounded-lg object-cover "
          onError={(e) => {
            e.currentTarget.src = fallbackImg;
          }}
        />

        {/* สรุป */}
        {news.summary && (
          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
            {news.summary}
          </p>
        )}

        {/* เนื้อหา */}
        <div className="mt-6 prose max-w-none">
          <p className="text-lg leading-relaxed whitespace-pre-line">
            {news.content}
          </p>
        </div>

        {/* ไฟล์แนบ */}
        {Array.isArray(news.attachments) && news.attachments.length > 0 && (
          <div className="mt-8 p-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-bold mb-3">ไฟล์แนบ</h2>
            <ul className="space-y-2">
              {news.attachments.map((a, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-3 border rounded-md px-3 py-2"
                >
                  <div className="truncate">
                    <span className="mr-2">📎</span>
                    <span title={a.name} className="truncate inline-block">
                      {a.name || "ไฟล์แนบ"}
                    </span>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => openAttachment(a)}
                      className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
                    >
                      ดู / ดาวน์โหลด
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ปุ่มกลับไปหน้าข่าวทั้งหมด */}
        <div className="mt-10">
          <Link
            to="/news"
            className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            ← กลับไปหน้าข่าวทั้งหมด
          </Link>
        </div>
      </div>
    </div>
  );
}
