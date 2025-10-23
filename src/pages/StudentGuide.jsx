// src/pages/StudentGuide.jsx
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink, Download } from "lucide-react";
import { Link } from "react-router-dom";

const DRIVE_ID = "1Q7SiP4TNKE7TgmC2wzLLQycVlQhd7ZTL";
const driveView = `https://drive.google.com/file/d/${DRIVE_ID}/view?usp=sharing`;
const driveDownload = `https://drive.google.com/uc?export=download&id=${DRIVE_ID}`;

const getAssetUrl = (file) =>
  new URL(`../assets/${file}`, import.meta.url).href;
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const guideCover = getAssetUrl("student-guide-2568.jpg");
const StudentGuide = () => {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-center mb-8"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow">
            <BookOpen className="w-4 h-4 mr-2" />
            คู่มือนักเรียน
          </div>
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-800">
            คู่มือนักเรียน ผู้ปกครอง และครู ปีการศึกษา 2568
          </h1>
          <p className="mt-2 text-gray-600">
            โรงเรียนเตรียมอุดมศึกษาน้อมเกล้า สมุทรปราการ
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
            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-white text-pink-600 border border-pink-200 hover:bg-pink-50 transition"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            เปิดดูใน Google Drive
          </a>
          <a
            href={driveDownload}
            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:opacity-90 transition"
          >
            <Download className="w-4 h-4 mr-2" />
            ดาวน์โหลดไฟล์
          </a>
        </motion.div>

        {/* Cover Image */}
        {guideCover && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="bg-white rounded-2xl border border-pink-100 shadow-lg overflow-hidden mx-auto max-w-2xl"
          >
            <div className="p-4">
              <img
                src={guideCover}
                alt="คู่มือนักเรียน 2568"
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
          </motion.div>
        )}

        {/* Back button */}
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
    </div>
  );
};

export default StudentGuide;
