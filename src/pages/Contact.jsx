import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('ขอบคุณสำหรับข้อความของคุณ เราจะติดต่อกลับโดยเร็วที่สุด');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
            ติดต่อเรา
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            สอบถามข้อมูลเพิ่มเติมหรือนัดหมายเยี่ยมชมโรงเรียน
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-gray-800">
              ข้อมูลการติดต่อ
            </h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors duration-300">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">ที่อยู่</h4>
                  <p className="text-gray-600">
                    18/1 หมู่ 15 ต.บางหัวเสือ อ.พระประแดง <br />
                    จ.สมุทรปราการ 10130
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-pink-50 rounded-2xl hover:bg-pink-100 transition-colors duration-300">
                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    เบอร์โทรศัพท์
                  </h4>
                  <p className="text-gray-600">
                    02-383-0550
                    <br />
                    02-383-0166
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-purple-50 rounded-2xl hover:bg-purple-100 transition-colors duration-300">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">อีเมล</h4>
                  <p className="text-gray-600">
                    generaltuns2565@gmail.com <br />
                  </p>
                </div>
              </div>
            </div>

            {/* Map Box */}
            <div className="mt-8 bg-gradient-to-br from-blue-100 to-pink-100 rounded-2xl p-6 text-center shadow-lg">
              <h4 className="font-semibold text-gray-800 mb-4 text-lg">
                แผนที่โรงเรียน
              </h4>

              <div className="rounded-xl overflow-hidden border border-gray-300 shadow">
                <iframe
                  title="โรงเรียนเตรียมอุดมศึกษาน้อมเกล้า สมุทรปราการ"
                  src="https://www.google.com/maps?q=%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B9%80%E0%B8%95%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%A1%E0%B8%AD%E0%B8%B8%E0%B8%94%E0%B8%A1%E0%B8%A8%E0%B8%B9%E0%B8%81%E0%B8%A9%E0%B8%B2%E0%B8%99%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B9%80%E0%B8%81%E0%B8%A5%E0%B9%89%E0%B8%B2%20%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%97%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3&hl=th&z=18&t=k&output=embed"
                  className="w-full h-[340px]"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <div className="mt-4 flex justify-center gap-3 flex-wrap">
                <a
                  href="https://www.google.com/maps?ll=13.633223,100.560255&z=16&t=h&hl=th&gl=TH&mapclient=embed&cid=10721017987933287624"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800 transition"
                >
                  ดูแผนที่ขนาดใหญ่
                </a>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B9%80%E0%B8%95%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%A1%E0%B8%AD%E0%B8%B8%E0%B8%94%E0%B8%A1%E0%B8%A8%E0%B8%B9%E0%B8%81%E0%B8%A9%E0%B8%B2%E0%B8%99%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B9%80%E0%B8%81%E0%B8%A5%E0%B9%89%E0%B8%B2+%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%97%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  เส้นทาง
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-gray-800">
              ส่งข้อความถึงเรา
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อ-นามสกุล *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="กรุณากรอกชื่อ-นามสกุล"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  อีเมล *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เบอร์โทรศัพท์
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="08X-XXX-XXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ข้อความ *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="กรุณาใส่ข้อความที่ต้องการสอบถาม..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                ส่งข้อความ
              </button>
            </form>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-gradient-to-r from-blue-500 to-pink-500 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">เวลาทำการ</h3>
            <p className="text-lg">จันทร์ - ศุกร์: 07:30 - 16:30 น.</p>
            <p className="text-lg">เสาร์ - อาทิตย์: ปิดทำการ</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <h4 className="font-semibold mb-2">กลุ่มบริหารวิชาการ</h4>
              <p>02-383-0550</p>
            </div>
            <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <h4 className="font-semibold mb-2">
                กลุ่มบริหารงบประมาณและงานบุคคล
              </h4>
              <p>02-383-0166</p>
            </div>
            <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <h4 className="font-semibold mb-2">กลุ่มบริหารกิจการนักเรียน</h4>
              <p>02-383-0162</p>
            </div>
            <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <h4 className="font-semibold mb-2">กลุ่มบริหารทั่วไป</h4>
              <p>02-383-0167</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;