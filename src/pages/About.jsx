import React from 'react';
import { ChevronRight, Eye, Heart, Star } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative text-center text-white z-10">
          <h1 className="text-5xl font-bold mb-4">เกี่ยวกับเรา</h1>
          <p className="text-xl opacity-90">ประวัติและปรัชญาการศึกษา</p>
        </div>
      </div>

      {/* Content */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Vision Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">วิสัยทัศน์</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                เป็นโรงเรียนชั้นนำที่ผลิตบัณฑิตคุณภาพ มีความรู้ความสามารถ
                คุณธรรม จริยธรรม
                และพร้อมเข้าสู่สถาบันอุดมศึกษาที่มีชื่อเสียงทั้งในและต่างประเทศ
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">พันธกิจ</h2>
              </div>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  จัดการเรียนการสอนที่มีคุณภาพและทันสมัย
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  พัฒนานักเรียนให้มีคุณธรรม จริยธรรม
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  ส่งเสริมการเรียนรู้ตลอดชีวิต
                </li>
              </ul>
            </div>
          </div>

          {/* History */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
              <h2 className="text-3xl font-bold mb-4">ประวัติโรงเรียน</h2>
              <p className="text-blue-100">การก่อตั้งและพัฒนาการของโรงเรียน</p>
            </div>
            <div className="p-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                      ช่วงเริ่มก่อตั้ง (พ.ศ. 2521 - 2524)
                    </h3>
                    <p className="text-gray-600">
                      โรงเรียนก่อตั้งขึ้นจากแนวคิดของนายทองสุข บุญแจ่ม
                      และได้รับบริจาคที่ดินจากครอบครัวบุญแจ่มและเนียมนิล
                      โดยเริ่มดำเนินการในปี พ.ศ. 2521 ในชื่อ
                      "โรงเรียนบางหัวเสือบุญแจ่มเนียมนิล"
                      และเปิดสอนครั้งแรกในโรงเรียนวัดบางหัวเสือ
                      ก่อนจะย้ายมาใช้พื้นที่ของโรงเรียนเองในปี พ.ศ. 2523
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                      ช่วงพัฒนาและขยายพื้นที่ (พ.ศ. 2522 - 2533)
                    </h3>
                    <p className="text-gray-600">
                      โรงเรียนจัดทอดผ้าป่าร่วมกับวัดบางหัวเสือเพื่อนำเงินพัฒนาพื้นที่
                      และได้รับการสนับสนุนงบประมาณก่อสร้างอาคารต่างๆ
                      รวมถึงการบริจาคที่ดินเพิ่มเติมจนมีพื้นที่รวม 21 ไร่ 2 งาน
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                      ช่วงยกระดับคุณภาพ (พ.ศ. 2550 - 2555)
                    </h3>
                    <p className="text-gray-600">
                      โรงเรียนได้ลงนามความร่วมมือทางการศึกษากับสถาบันในและต่างประเทศ
                      ได้รับรางวัลพระราชทาน และผ่านการประเมินคุณภาพระดับดีมาก
                      ต่อมาในวันที่ 15 กันยายน พ.ศ. 2555
                      ได้รับการอนุมัติให้เปลี่ยนชื่อเป็น
                      “โรงเรียนเตรียมอุดมศึกษาน้อมเกล้า สมุทรปราการ”
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                      ช่วงพัฒนาอย่างต่อเนื่อง
                    </h3>
                    <p className="text-gray-600">
                      โรงเรียนได้รับการยอมรับในด้านคุณภาพและชื่อเสียงอย่างกว้างขวาง
                      มีนักเรียนเพิ่มขึ้นอย่างต่อเนื่อง
                      และมีบทบาทเป็นศูนย์คัดเลือกนักเรียนเข้าศึกษาต่อในมหาวิทยาลัยทั้งในและต่างประเทศ
                      พร้อมทั้งได้รับทุนการศึกษาหลักสูตรนานาชาติจากมหาวิทยาลัยแสตมฟอร์ด
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              คุณค่าหลักของเรา
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "ความเป็นเลิศ",
                  desc: "มุ่งสู่ความเป็นเลิศในทุกด้าน",
                  icon: Star,
                },
                {
                  title: "คุณธรรม",
                  desc: "ปลูกฝังคุณธรรมจริยธรรม",
                  icon: Heart,
                },
                {
                  title: "นวัตกรรม",
                  desc: "ส่งเสริมการคิดสร้างสรรค์",
                  icon: Star,
                },
              ].map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-800 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;