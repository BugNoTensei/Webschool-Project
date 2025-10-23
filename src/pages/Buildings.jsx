// src/pages/Buildings.jsx
import React from "react";
import { motion } from "framer-motion";
import { Home, Info } from "lucide-react";

// ให้ Vite แปลงไฟล์จาก src/assets/buildings เป็น URL ตอน build
const getAssetUrl = (file) =>
  new URL(`../assets/buildings/${file}`, import.meta.url).href;

const buildings = [
  { id: 1, name: "เรือนฉัตรทองคำ", image: "golden.jpg" },
  { id: 2, name: "อาคาร 1", image: "building1.jpg" },
  { id: 3, name: "อาคาร 2", image: "building2.jpg" },
  { id: 4, name: "อาคาร 3", image: "building3.jpg" },
  { id: 5, name: "อาคาร 4", image: "building4.jpg" },
  { id: 6, name: "อาคาร 5", image: "building5.jpg" },
  { id: 7, name: "หอประชุม", image: "hall.jpg" },
  { id: 8, name: "เรือนพยาบาล", image: "clinic.jpg" },
  { id: 9, name: "โรงอาหาร อาคาร 3 ชั้น 1", image: "canteen.jpg" },
  { id: 10, name: "ห้องประชาสัมพันธ์", image: "info.jpg" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const Buildings = () => {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-blue-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow">
            <Home className="w-4 h-4 mr-2" />
            ข้อมูลอาคารสถานที่
          </div>
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-800">
            อาคารและสถานที่สำคัญ
          </h1>
          <p className="mt-2 text-gray-600">
            ภายในโรงเรียนเตรียมอุดมศึกษาน้อมเกล้า สมุทรปราการ
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {buildings.map((b, i) => (
            <motion.div
              key={b.id}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={i}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={getAssetUrl(b.image)} // << ใช้ helper ตรงนี้
                  alt={b.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-lg font-bold text-gray-800">{b.name}</h3>
                <button className="mt-3 inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white text-sm hover:opacity-90">
                  <Info className="w-4 h-4 mr-2" />
                  เพิ่มเติม
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Buildings;
