// src/pages/Admissions2568.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, FileText, ArrowRight } from "lucide-react";

export default function Admissions2568() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* หัวข้อหลัก */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-6">
          การรับสมัครนักเรียนใหม่ ปีการศึกษา 2568
        </h1>
        <p className="text-center text-gray-600 text-lg mb-12">
          โรงเรียนเตรียมอุดมศึกษาน้อมเกล้า สมุทรปราการ
          เปิดรับสมัครนักเรียนเข้าเรียนต่อในปีการศึกษา 2568 ตามรายละเอียดดังนี้
        </p>

        {/* ตารางวันรับสมัคร */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-blue-600" />
            กำหนดการรับสมัคร
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>📌 รับสมัครออนไลน์: 1 – 15 มีนาคม 2568</li>
            <li>📌 สอบคัดเลือก: 25 มีนาคม 2568</li>
            <li>📌 ประกาศผล: 1 เมษายน 2568</li>
            <li>📌 มอบตัวนักเรียน: 5 เมษายน 2568</li>
          </ul>
        </div>

        {/* เอกสารที่ใช้สมัคร */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <FileText className="h-6 w-6 mr-2 text-pink-600" />
            เอกสารที่ใช้ในการสมัคร
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>สำเนาทะเบียนบ้าน นักเรียน</li>
            <li>สำเนาทะเบียนบ้าน ผู้ปกครอง</li>
            <li>สำเนาบัตรประชาชน นักเรียน</li>
            <li>สำเนาบัตรประชาชน ผู้ปกครอง</li>
            <li>ใบแสดงผลการเรียน (ปพ.1)</li>
          </ul>
        </div>

        {/* ปุ่มสมัคร */}
        <div className="text-center">
          <Link
            to="#"
            className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white font-semibold text-lg shadow-lg hover:opacity-90 transition"
          >
            สมัครเรียนออนไลน์
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        <p className="mt-10 text-center text-gray-500 text-sm">
          * หมายเหตุ: ข้อมูลนี้เป็นตัวอย่าง mockup ของหน้า Admissions 2568
        </p>
      </div>
    </div>
  );
}
