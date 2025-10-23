// src/pages/Programs.jsx
import React from "react";
import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const getAssetUrl = (file) =>
  new URL(`../assets/programs/${file}`, import.meta.url).href;

// ===== Data =====
const lowerSecondary = {
  title: "หลักสูตรที่เปิดสอน ระดับมัธยมศึกษาตอนต้น (ม.1–3) 2568–2570",
  hero: "ms-lower.jpg",
  plans: [
    { name: "Mini English Program (MEP)", classAt: "1", roomsCount: 1 },
    { name: "วิทยาศาสตร์–คณิตศาสตร์", classAt: "2–3", roomsCount: 2 },
    { name: "วิทยาศาสตร์พลังสิบ", classAt: "4", roomsCount: 1 },
    { name: "ทั่วไป", classAt: "5–13", roomsCount: 9 },
  ],
};

const upperSecondary = {
  title: "หลักสูตรที่เปิดสอน ระดับมัธยมศึกษาตอนปลาย (ม.4–6) 2568–2570",
  hero: "ms-upper.jpg",
  plans: [
    { name: "Intensive Gifted (IGP)", classAt: 1, roomsCount: 1 },
    {
      name: "Science Mathematics and English (SME)",
      classAt: 2,
      roomsCount: 1,
    },
    { name: "วิทยาศาสตร์พลังสิบ", classAt: 3, roomsCount: 1 },
    { name: "ชีวเคมีอุตสาหกรรม", classAt: 4, roomsCount: 1 },
    { name: "วิศวกรรมอุตสาหกรรม", classAt: 5, roomsCount: 1 },
    { name: "วิทยาศาสตร์การกีฬา", classAt: 6, roomsCount: 1 },
    { name: "ภาษาศาสตร - จีน", classAt: 7, roomsCount: 1 },
    { name: "ภาษาศาสตร - ญี่ปุ่น", classAt: 8, roomsCount: 1 },
    { name: "ภาษาไทย - สังคมศึกษา", classAt: 9, roomsCount: 1 },
    { name: "คอมพิวเตอร์และเทคโนโลยี (ICT)", classAt: 10, roomsCount: 1 },
    { name: "ธุรกิจอุตสาหกรรม", classAt: 11, roomsCount: 1 },
    { name: "ทวีศึกษาเทคโนโลยีสารสนเทศ (ICT)", classAt: 12, roomsCount: 1 },
    { name: "ทวิศึกษา / ทักษะอาชีพ (CP)", classAt: 12, roomsCount: 1 },
  ],
};

// ===== Animations =====
const fadeUp = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const listContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const listItem = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

// ===== Section =====
const Section = ({ data }) => (
  <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-blue-100 overflow-hidden"
    >
      {data.hero ? (
        <div className="relative flex justify-center px-4 py-6">
          <motion.img
            src={getAssetUrl(data.hero)}
            alt={data.title}
            className="w-[420px] h-auto object-contain rounded-lg shadow"
            variants={fadeUp}
          />
        </div>
      ) : null}

      <div className="px-6 md:px-10 py-6 md:py-8">
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow"
        >
          <GraduationCap className="w-4 h-4 mr-2" />
          แผนการเรียน
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="mt-4 text-2xl md:text-3xl font-extrabold text-gray-800"
        >
          {data.title}
        </motion.h2>

        {/* รายการแผน – pop-in ทีละอัน */}
        <motion.div
          variants={listContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {data.plans.map((p, idx) => (
            <motion.div
              key={idx}
              variants={listItem}
              className="rounded-xl border border-pink-100 bg-gradient-to-br from-blue-50 to-pink-50 px-4 py-4 md:px-5 md:py-5 hover:shadow-md transition"
            >
              <div className="flex items-start">
                <span className="mt-1 mr-3 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white text-xs font-bold">
                  {idx + 1}
                </span>
                <div className="flex-1 leading-6">
                  <p className="font-semibold text-gray-800">
                    แผนการเรียนที่ {p.name}
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    ห้องเรียนที่ {p.classAt}
                  </p>
                  <p className="text-sm text-pink-700 mt-1">
                    จำนวน {p.roomsCount} ห้อง
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  </section>
);

// ===== Page =====
const Programs = () => {
  return (
    <div className="min-h-screen pt-16 pb-20 bg-gradient-to-br from-blue-50 to-pink-50">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative h-64 md:h-80 bg-gradient-to-r from-blue-600 to-pink-600 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative text-center text-white z-10 px-4">
          <motion.h1
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
            className="text-3xl md:text-5xl font-extrabold"
          >
            หลักสูตรที่เปิดสอน
          </motion.h1>
          <motion.p
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 }}
            className="mt-2 md:text-lg opacity-90"
          >
            ตามโครงสร้างแผนการเรียน ปีการศึกษา 2568–2570
          </motion.p>
        </div>
      </motion.div>

      <div className="space-y-10 md:space-y-14 mt-10">
        <Section data={lowerSecondary} />
        <Section data={upperSecondary} />
      </div>
    </div>
  );
};

export default Programs;
