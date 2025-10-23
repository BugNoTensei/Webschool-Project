import React from "react";
import { Mail, Phone, Award } from "lucide-react";
import { motion } from "framer-motion";
const getAssetUrl = (file) =>
  new URL(`../../assets/board/${file}`, import.meta.url).href;
const leaders = [
  {
    id: "director",
    name: "นายพงศ์รพี ปรีดานนท์",
    role: "ผู้อำนวยการสถานศึกษา",
    phone: "02-383-0550",
    email: "pongpapee.pree@gmail.com",
    photo: "director.jpg",
    featured: true,
  },
  {
    id: "vp1",
    name: "นางทัศติญา แก่นแก้ว",
    role: "รองผู้อำนวยการกลุ่มบริหารงบประมาณ",
    phone: "02-383-0550",
    email: "Tatitya2524@gmail.com",
    photo: "vp-budget.jpg",
  },
  {
    id: "vp2",
    name: "นางสาวอารยา ผังลักษณ์",
    role: "รองผู้อำนวยการกลุ่มบริหารวิชาการ",
    phone: "02-383-0550",
    email: "Sinobuka@gmail.com",
    photo: "vp-academic.jpg",
  },
  {
    id: "vp3",
    name: "นางสาวหทัยรัตน์ บุญมา",
    role: "รองผู้อำนวยการกลุ่มบริหารบุคคลและกิจการนักเรียน",
    phone: "02-383-0550",
    email: "kruaoae3333@gmail.com",
    photo: "vp-student.jpg",
  },
  {
    id: "vp4",
    name: "นายอรรถวิทย์ สิงหนสาย",
    role: "รองผู้อำนวยการกลุ่มบริหารทั่วไป",
    phone: "02-383-0550",
    email: "coolatw15@gmail.com",
    photo: "vp-general.jpg",
  },
];

// motion variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, when: "beforeChildren" },
  },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const pop = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};

const Card = ({ item: it }) => {
  const isImg = it.photo && it.photo.length > 0;
  return (
    <motion.div
      variants={item}
      className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden hover:shadow-xl transition-all"
    >
      <div className="bg-gradient-to-b from-blue-50 to-pink-50 p-6 flex justify-center">
        {isImg ? (
          <img
            src={getAssetUrl(it.photo)}
            alt={it.name}
            className="w-44 h-56 object-cover rounded-xl shadow-md"
          />
        ) : (
          <div className="w-44 h-56 rounded-xl bg-gradient-to-br from-blue-200 to-pink-200 flex items-center justify-center text-blue-700 font-semibold">
            ไม่มีรูป
          </div>
        )}
      </div>
      <div className="px-6 pb-6 text-center">
        <h3 className="text-lg font-bold text-gray-800">{it.name}</h3>
        <p className="mt-1 text-sm text-blue-700">{it.role}</p>

        <div className="mt-4 space-y-1 text-sm">
          <div className="flex items-center justify-center text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            {it.phone || "-"}
          </div>
          <a
            href={`mailto:${it.email}`}
            className="flex items-center justify-center text-purple-700 hover:text-purple-800"
          >
            <Mail className="w-4 h-4 mr-2" />
            {it.email || "-"}
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Board = () => {
  const director = leaders.find((l) => l.featured);
  const others = leaders.filter((l) => !l.featured);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-blue-50 to-pink-50"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div variants={item} className="text-center mb-10">
          <motion.div
            variants={pop}
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow"
          >
            <Award className="w-4 h-4 mr-2" />
            คณะผู้บริหาร
          </motion.div>
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-800">
            ผู้บริหารสถานศึกษา
          </h1>
          <p className="mt-2 text-gray-600">
            โรงเรียนเตรียมอุดมศึกษาน้อมเกล้า สมุทรปราการ
          </p>
        </motion.div>

        {/* Director */}
        {director && (
          <motion.div variants={pop} className="mb-10">
            <div className="mx-auto max-w-2xl">
              <Card item={director} />
            </div>
          </motion.div>
        )}

        {/* Others */}
        <motion.div
          variants={container}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {others.map((m) => (
            <Card key={m.id} item={m} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Board;
