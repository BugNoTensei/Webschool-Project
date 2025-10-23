// src/pages/news/NewsList.jsx
import React, { useMemo, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Clock, ChevronRight } from "lucide-react";
import { listNews } from "../../data/newsStore";
// ถ้าไฟล์อยู่ใน src/assets/imgFallBack.png
import imgFallBack from "../../assets/imgFallBack.png";
const FALLBACK_IMG = imgFallBack;

const CATS = [
  { id: "all", label: "ทั้งหมด" },
  { id: "academic", label: "วิชาการ" },
  { id: "activity", label: "กิจกรรม" },
  { id: "announcement", label: "ประกาศ" },
];

const thDate = (s) =>
  new Date(s).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function NewsList() {
  const location = useLocation();
  const navigate = useNavigate();

  // อ่าน query param category จาก URL
  const qs = new URLSearchParams(location.search);
  const categoryFromQS = qs.get("category");

  // ถ้า category ใน URL ไม่ตรงกับ CATS ให้ fallback เป็น "all"
  const normalizeCat = (c) => (CATS.some((x) => x.id === c) ? c : "all");

  const [cat, setCat] = useState(normalizeCat(categoryFromQS || "all"));
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // ซิงก์ค่าแท็บกับ querystring (ถ้า URL เปลี่ยนจากที่อื่น)
  useEffect(() => {
    setCat(normalizeCat(categoryFromQS || "all"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  // เปลี่ยนแท็บแล้วอัปเดต URL ให้ตรงกัน
  const changeTab = (nextCat) => {
    setCat(nextCat);
    const params = new URLSearchParams(location.search);
    if (nextCat === "all") {
      params.delete("category");
    } else {
      params.set("category", nextCat);
    }
    // ใช้ replace: true ถ้าไม่อยากเพิ่มประวัติ; เปลี่ยนเป็น false ถ้าต้องการเพิ่มใน history
    navigate(
      { pathname: "/news", search: params.toString() },
      { replace: true }
    );
  };

  // โหลดข่าว รองรับทั้ง Local/Firebase (listNews เป็น async)
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const items = await listNews();
        if (mounted) setNews(Array.isArray(items) ? items : []);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // ข่าวด่วน: โชว์เฉพาะที่ featured === true เท่านั้น
  const featured = useMemo(
    () => news.find((n) => !!n.featured) || null,
    [news]
  );

  // กรองตามแท็บ และตัดข่าวเด่นออกจากกริดเมื่ออยู่แท็บ "ทั้งหมด"
  const filtered = useMemo(() => {
    const base = cat === "all" ? news : news.filter((n) => n.category === cat);
    return base.filter((n) => !featured || n.id !== featured.id);
  }, [news, cat, featured]);

  if (loading) return <div className="text-center py-20">กำลังโหลด...</div>;
  if (!news.length)
    return <div className="text-center py-20">ยังไม่มีข่าว</div>;

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div className="relative h-56 md:h-72 bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative text-center text-white z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            ข่าวสารและกิจกรรม
          </h1>
          <p className="opacity-90">ติดตามความเคลื่อนไหวของโรงเรียน</p>
        </div>
      </div>

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {CATS.map((c) => (
              <button
                key={c.id}
                onClick={() => changeTab(c.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  cat === c.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/*  (เฉพาะแท็บ "ทั้งหมด" และมีข่าวเด่นจริง) */}
          {cat === "all" && featured && (
            <Link
              to={`/news/${featured.id}`}
              className="mb-14 block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featured.image || FALLBACK_IMG}
                    alt={featured.title}
                    className="w-full h-64 md:h-full object-cover"
                    onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center mb-3">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      ข่าวด่วน
                    </span>
                    <span className="ml-4 text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {thDate(featured.date)}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                    {featured.title}
                  </h2>

                  {/* ส่วนสรุปหรือย่อหน้าแรก */}
                  <p className="text-gray-600 text-sm md:text-base line-clamp-4">
                    {featured.summary}
                  </p>

                  <div className="mt-4 text-purple-600 font-medium flex items-center">
                    อ่านเพิ่มเติม <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Grid รายการข่าว */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* ระบบ ข่าวหลักที่เอามาแสดง + สรุป ข่าว ของที่เป็นข่าวธรรมดา */}
            {filtered.map((n) => {
              const summary =
                n.summary ||
                (n.content
                  ? n.content.replace(/<[^>]+>/g, "").slice(0, 120) + "..."
                  : "");
              return (
                <Link
                  key={n.id}
                  to={`/news/${n.id}`}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group"
                >
                  <div className="relative">
                    <img
                      src={n.image || FALLBACK_IMG}
                      alt={n.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                    />
                    <span
                      className={`absolute top-3 left-3 text-xs text-white px-2 py-1 rounded-full ${
                        n.category === "academic"
                          ? "bg-blue-500"
                          : n.category === "activity"
                          ? "bg-green-500"
                          : "bg-purple-500"
                      }`}
                    >
                      {CATS.find((c) => c.id === n.category)?.label ?? "อื่น ๆ"}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <Clock className="h-4 w-4 mr-1" />
                      {thDate(n.date)}
                    </div>
                    <h3 className="font-bold text-lg text-gray-800 group-hover:text-purple-600 transition line-clamp-2">
                      {n.title}
                    </h3>

                    {/* ส่วนสรุปหรือย่อหน้าแรก ของที่เป็นข่าวธรรมดา */}
                    {summary && (
                      <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                        {summary}
                      </p>
                    )}

                    <div className="mt-3 text-purple-600 font-medium flex items-center">
                      อ่านเพิ่มเติม <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
