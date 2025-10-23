// src/pages/News.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; 
import { listNews, formatThaiDate } from "../data/newsStore";
import imgFallBack from "../assets/imgFallBack.png";
const FALLBACK_IMG = imgFallBack;

export default function News() {
  const location = useLocation(); 
  const params = new URLSearchParams(location.search);
  const categoryFilter = params.get("category");

  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        let items = await listNews();
        if (categoryFilter) {
          items = items.filter((n) => n.category === categoryFilter);
        }
        if (alive) setAllNews(Array.isArray(items) ? items : []);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [categoryFilter]); // reload ถ้าเปลี่ยน category

  if (loading) return <div className="text-center py-16">กำลังโหลด...</div>;
  if (!allNews.length)
    return <div className="text-center py-16">ยังไม่มีข่าว</div>;

  // ชื่อหัวข้อ
  const heading =
    categoryFilter === "activity"
      ? "กิจกรรมโรงเรียน"
      : categoryFilter === "academic"
      ? "ข่าววิชาการ"
      : categoryFilter === "announcement"
      ? "ข่าวประกาศ"
      : "ข่าวสารทั้งหมด";

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{heading}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {allNews.map((n) => (
            <Link
              key={n.id}
              to={`/news/${n.id}`}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={n.image || FALLBACK_IMG}
                alt={n.title}
                className="w-full h-40 object-cover"
                onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
              />
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-1">
                  {formatThaiDate(n.date)}
                </p>
                <h3 className="font-bold text-gray-800 line-clamp-2">
                  {n.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
