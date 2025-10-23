// src/pages/Gallery.jsx
import React, { useEffect, useMemo, useState } from "react";
import { listGallery } from "../data/galleryStore";
import { ExternalLink } from "lucide-react";

const CATS = [
  { id: "all", label: "ทั้งหมด" },
  { id: "activity", label: "กิจกรรม" },
  { id: "academic", label: "วิชาการ" },
  { id: "ceremony", label: "พิธีการ" },
  { id: "place", label: "สถานที่" },
];

const FALLBACK_IMG = "/imgFallBack.png";

export default function Gallery() {
  const [cat, setCat] = useState("all");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const filtered = useMemo(() => {
    if (cat === "all") return items;
    return items.filter((x) => x.category === cat);
  }, [items, cat]);

  if (loading) return <div className="text-center py-16">กำลังโหลด...</div>;

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Header */}
      <div className="relative h-56 md:h-72 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative text-center text-white z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">ภาพกิจกรรม</h1>
          <p className="opacity-90">รวมบรรยากาศกิจกรรมและผลงานของโรงเรียน</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CATS.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
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

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center text-gray-500">ยังไม่มีรายการ</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((g) => (
              <a
                key={g.id}
                href={g.driveUrl || "#"}
                target="_blank"
                rel="noreferrer"
                className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all"
              >
                <div className="relative">
                  <img
                    src={g.cover || FALLBACK_IMG}
                    alt={g.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors"></div>
                  <div className="absolute top-3 left-3 text-xs text-white px-2 py-1 rounded-full bg-black/40 backdrop-blur">
                    {CATS.find((x) => x.id === g.category)?.label || "กิจกรรม"}
                  </div>
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition">
                    <span className="inline-flex items-center bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs shadow">
                      เปิด Google Drive{" "}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-semibold text-gray-800 line-clamp-2 group-hover:text-purple-600 transition">
                    {g.title || "กิจกรรม"}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{g.date}</div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
