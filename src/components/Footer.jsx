import React from 'react';
import { ChevronRight, MapPin, Phone, Mail, Facebook, Youtube, Instagram, GraduationCap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-800 via-blue-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">
                  โรงเรียนเตรียมอุดมศึกษาน้อมเกล้า สมุทรปราการ
                </h3>
                <p className="text-blue-200">
                  Triamudomsuksanomklao Samutprakan School
                </p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              โรงเรียนที่มุ่งเน้นการพัฒนาศักยภาพของนักเรียนให้เป็นคนดี คนเก่ง
              และมีความสุข พร้อมก้าวสู่อุดมศึกษาด้วยความมั่นใจ
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-pink-300">ลิงก์ด่วน</h3>
            <div className="space-y-2">
              {[
                "เกี่ยวกับเรา",
                "หลักสูตร",
                "ข่าวสาร",
                "กิจกรรม",
                "ติดต่อเรา",
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-gray-300 hover:text-pink-300 transition-colors duration-300 flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-pink-300">ติดต่อเรา</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-300 mt-1 flex-shrink-0" />
                <p className="text-gray-300">
                  18/1 หมู่ 15 ต.บางหัวเสือ อ.พระประแดง <br />
                  จ.สมุทรปราการ 10130
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-300" />
                <p className="text-gray-300">02-383-0550 ,02-383-0166</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-300" />
                <p className="text-gray-300">generaltuns2565@gmail.com</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 pt-4">
              <a
                href="https://www.facebook.com/TriamudomsuksanomklaoSp"
                className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors duration-300"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-pink-600 rounded-full hover:bg-pink-700 transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 โรงเรียนเตรียมอุดมศึกษาน้อมเกล้าสมุทรปราการ สงวนลิขสิทธิ์
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;