// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Award,
  GraduationCap,
  Trophy,
  BookOpen,
  Calendar,
  Megaphone,
  Info,
  ArrowRight,
} from "lucide-react";
import { listNews, formatThaiDate } from "../data/newsStore";
import { AnimatePresence, motion } from "framer-motion";
import imgFallBack from "../assets/imgFallBack.png";
const FALLBACK_IMG = imgFallBack;

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("announcement");
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // โหลดข่าวแบบ async
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const news = await listNews();
        if (mounted) setAllNews(Array.isArray(news) ? news : []);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // sync กับ localStorage แบบ async (เวลา admin เพิ่ม/ลบข่าว)
  useEffect(() => {
    const sync = async () => {
      const news = await listNews();
      setAllNews(Array.isArray(news) ? news : []);
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const getAssetUrl = (file) =>
    typeof file === "string" && /^https?:\/\//.test(file)
      ? file
      : new URL(`../assets/logo/${file}`, import.meta.url).href;

  const slides = [
    {
      image: "schol.jpg",
      title: "ยินดีต้อนรับสู่โรงเรียนเตรียมอุดมศึกษาน้อมเกล้า สมุทรปราการ",
      subtitle: "พัฒนาศักยภาพ สร้างอนาคต",
    },
    {
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=600&fit=crop",
      title: "การศึกษาที่ทันสมัย",
      subtitle: "เทคโนโลยีล้ำสมัย ครูผู้สอนคุณภาพ",
    },
    {
      image:
        "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=600&fit=crop",
      title: "กิจกรรมเสริมทักษะ",
      subtitle: "พัฒนาทั้งทางด้านวิชาการและบุคลิกภาพ",
    },
  ];

  useEffect(() => {
    const t = setInterval(
      () => setCurrentSlide((p) => (p + 1) % slides.length),
      5000
    );
    return () => clearInterval(t);
  }, [slides.length]);

  const tabs = [
    { key: "announcement", label: "ข่าวประชาสัมพันธ์", icon: Info },
    { key: "activity", label: "กิจกรรมโรงเรียน", icon: Megaphone },
    { key: "academic", label: "วิชาการ", icon: BookOpen },
  ];

  // safe-guard: ถ้าโหลดไม่เสร็จให้เป็น []
  const filtered = (allNews || [])
    .filter((n) => n.category === activeTab)
    .slice(0, 3);
  const featured = (allNews || []).find((n) => n.featured);

  const stats = [
    {
      icon: Users,
      number: "2,700+",
      label: "นักเรียน",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Award,
      number: "50+",
      label: "รางวัลระดับชาติ",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: GraduationCap,
      number: "98%",
      label: "เข้าศึกษาต่อ",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Trophy,
      number: "15",
      label: "ปีแห่งความเป็นเลิศ",
      color: "from-orange-500 to-red-500",
    },
  ];

  const listVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-screen overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/70 to-pink-600/70" />
            <img
              src={getAssetUrl(s.image)}
              alt={s.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  {s.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-90">
                  {s.subtitle}
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center bg-gradient-to-r from-blue-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-2xl"
                >
                  เรียนรู้เพิ่มเติม
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentSlide ? "bg-white scale-125" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ข่าวด่วน */}
      {featured && (
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">ประกาศจากทางโรงเรียน</h3>
            <AnimatePresence mode="wait">
              <motion.div
                key={featured.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  to={`/news/${featured.id}`}
                  className="block rounded-2xl overflow-hidden bg-gradient-to-r from-blue-50 to-pink-50 border border-blue-100 hover:shadow-xl transition"
                >
                  <div className="md:flex">
                    <img
                      src={featured.image || FALLBACK_IMG}
                      alt={featured.title}
                      className="w-full md:w-1/2 h-64 object-cover"
                    />
                    <div className="p-6 md:w-1/2">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">
                        ข่าวด่วน
                      </span>
                      <h4 className="mt-3 text-2xl font-bold text-gray-900">
                        {featured.title}
                      </h4>
                      <p className="mt-2 text-gray-700">{featured.summary}</p>
                      <div className="mt-3 text-sm text-gray-500">
                        {formatThaiDate(featured.date)}
                      </div>
                      <div className="mt-5 inline-flex items-center text-blue-600 font-semibold">
                        อ่านรายละเอียด <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* ข่าวสารและกิจกรรม */}
      <section className="pt-16 pb-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
            ข่าวสารและกิจกรรม
          </h2>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                  activeTab === key
                    ? "bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow"
                    : "bg-blue-50 text-blue-800 hover:bg-pink-50 hover:text-pink-700"
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {(loading ? [] : filtered).map((n) => (
              <motion.div key={n.id} variants={itemVariants}>
                <Link
                  to={`/news/${n.id}`}
                  className="group rounded-2xl overflow-hidden border border-gray-200 bg-white shadow hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={n.image || FALLBACK_IMG}
                      alt={n.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 text-gray-800 flex items-center shadow">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 text-pink-600" />
                      {formatThaiDate(n.date)}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-pink-600 transition">
                      {n.title}
                    </h3>
                    <div className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600">
                      อ่านต่อ
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-10 flex justify-center">
            <Link
              to="/news"
              className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:opacity-90 transition"
            >
              ดูทั้งหมด
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="py-20 bg-gradient-to-br from-blue-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="text-center group hover:scale-105 transition-all duration-300"
                >
                  <div
                    className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${s.color} flex items-center justify-center shadow-lg group-hover:shadow-2xl`}
                  >
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    {s.number}
                  </h3>
                  <p className="text-gray-600 font-medium">{s.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
