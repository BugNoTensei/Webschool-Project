// src/pages/layoutschool.jsx
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, Download, ExternalLink, X } from "lucide-react";
import { Link } from "react-router-dom";

const DRIVE_ID = "1OgkZ2cG1PHmyH70DH2p4YPsiclcpYMKf";
const driveView = `https://drive.google.com/file/d/${DRIVE_ID}/view`;
const getAssetUrl = (file) =>
  new URL(`../assets/layoutsc/${file}`, import.meta.url).href;
const localMapImage = getAssetUrl("layout-school.png");

const fadeUp = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const LayoutSchool = () => {
  // state สำหรับ lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = () => setLightboxOpen(true);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  // ปิดด้วย ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
    };
    if (lightboxOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, closeLightbox]);

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-blue-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-center mb-8"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow">
            <Map className="w-4 h-4 mr-2" />
            ผังโรงเรียน
          </div>
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-800">
            โรงเรียนเตรียมอุดมศึกษาน้อมเกล้า สมุทรปราการ
          </h1>
          <p className="mt-2 text-gray-600">
            แผนผังอาคาร ถนน ทางเดิน สนามกีฬา และจุดสำคัญภายในโรงเรียน
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          <a
            href={driveView}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            เปิดดูใน Google Drive
          </a>
          <a
            href={driveView}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:opacity-90 transition"
          >
            <Download className="w-4 h-4 mr-2" />
            ดาวน์โหลดไฟล์
          </a>
        </motion.div>

        {/* Card รูป (คลิกเพื่อเปิด Lightbox) */}
        {localMapImage ? (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="bg-white rounded-2xl border border-blue-100 shadow-lg overflow-hidden mx-auto max-w-2xl"
          >
            <button
              type="button"
              onClick={openLightbox}
              className="block w-full text-left focus:outline-none"
              aria-label="คลิกเพื่อดูรูปใหญ่"
            >
              <div className="p-4 md:p-6">
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={localMapImage}
                    alt="ผังโรงเรียน (ไฟล์ภายในเว็บ)"
                    loading="lazy"
                    className="w-full h-auto object-contain transition-transform duration-500 hover:scale-[1.02] cursor-zoom-in"
                  />
                </div>
                <div className="mt-2 text-center text-sm text-gray-500">
                  คลิกที่รูปเพื่อดูขนาดใหญ่
                </div>
              </div>
            </button>
          </motion.div>
        ) : null}

        {/* ปุ่มกลับ */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-10 text-center"
        >
          <Link
            to="/"
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition"
          >
            กลับหน้าแรก
          </Link>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-[2px] flex items-center justify-center p-4"
          >
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative"
            >
              {/* ปุ่มปิด */}
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute -top-3 -right-3 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 text-gray-800 shadow hover:bg-white"
              >
                <X className="w-5 h-5" />
              </button>

              {/* รูปใหญ่ */}
              <img
                src={localMapImage}
                alt="ผังโรงเรียน (ขนาดใหญ่)"
                className="rounded-xl shadow-2xl object-contain max-w-[95vw] max-h-[85vh]"
              />

              {/* Caption */}
              <div className="mt-3 text-center text-sm text-white/90">
                กด ESC หรือคลิกพื้นหลังเพื่อปิด
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LayoutSchool;
