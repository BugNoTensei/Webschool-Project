export const NEWS_CATEGORIES = [
  { id: "announce", label: "ข่าวประชาสัมพันธ์" },
  { id: "activity", label: "กิจกรรมโรงเรียน" },
  { id: "award", label: "รางวัลและความภาคภูมิใจ" },
];

export const newsData = [
  {
    id: 1,
    category: "announce",
    title: "รับสมัครนักเรียนใหม่ ปีการศึกษา 2568",
    summary:
      "เปิดรับสมัครนักเรียนใหม่ระดับมัธยมศึกษาตอนปลาย สำหรับปีการศึกษา 2568",
    date: "2025-01-15",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=900&h=600&fit=crop",
    to: "/news/admissions-2568",
    featured: true,
  },
  {
    id: 2,
    category: "activity",
    title: "งานวิทยาศาสตร์โครงการ ประจำปี 2568",
    summary:
      "นักเรียนร่วมแสดงผลงานวิทยาศาสตร์และนวัตกรรมในงานวิทยาศาสตร์โครงการ",
    date: "2025-01-10",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=900&h=600&fit=crop",
    to: "/news/science-fair-2568",
  },
  {
    id: 3,
    category: "award",
    title: "ประกาศผลการแข่งขันคณิตศาสตร์",
    summary:
      "ขอแสดงความยินดีกับนักเรียนที่ได้รับรางวัลจากการแข่งขันคณิตศาสตร์ระดับภาค",
    date: "2025-01-08",
    image:
      "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=900&h=600&fit=crop",
    to: "/news/math-award-2568",
  },
  {
    id: 4,
    category: "activity",
    title: "วันภาษาไทยแห่งชาติ",
    summary: "จัดกิจกรรมเฉลิมฉลองวันภาษาไทยแห่งชาติ พร้อมการแสดงและนิทรรศการ",
    date: "2025-01-05",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&h=600&fit=crop",
    to: "/news/thai-day-2568",
  },
  {
    id: 5,
    category: "announce",
    title: "หลักสูตรพิเศษด้านเทคโนโลยี",
    summary: "เปิดหลักสูตรพิเศษด้านเทคโนโลยีสารสนเทศและการเขียนโปรแกรม",
    date: "2025-01-03",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900&h=600&fit=crop",
    to: "/news/it-program-2568",
  },
  {
    id: 6,
    category: "announce",
    title: "กำหนดการสอบปลายภาค",
    summary: "ประกาศกำหนดการสอบปลายภาคเทอม 1 ปีการศึกษา 2567",
    date: "2025-01-01",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&h=600&fit=crop",
    to: "/news/final-exam-2567",
  },
];

export const formatThaiDate = (iso) =>
  new Date(iso).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
