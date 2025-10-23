// src/pages/Timetable.jsx
import React, { useMemo, useState, useEffect } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { Download, ScanSearch } from "lucide-react";

/**
 * วิธีใช้งาน
 * - คัดลอกลิงก์ไฟล์จาก Google Drive (เช่น https://drive.google.com/file/d/<FILE_ID>/view?usp=sharing)
 *   หรือจะวางแค่ <FILE_ID> ตรง ๆ ก็ได้
 * - ตั้งสิทธิ์ไฟล์ใน Drive เป็น "Anyone with the link → Viewer"
 */
const timetableData = {
  "ม.1": {
    "ม.1/1": ["1DXcxzb991dDC3ZwIU8tTd8vSyU4UL9zU"],
    "ม.1/2-3": ["14oZYXDh_NBOh0XytsBF63wDq29Va95ZU"],
    "ม.1/4": ["1pnn-j8_FgWxbi9gJFMVaOhSMTCxAHYcJ"],
    "ม.1/5": ["18TKK6M0_JMnIs-CDLXefzltGVs518uUs"],
    "ม.1/6": ["1hI4YZ_d8tGRdHM3YHDPMuLE6kXdM1eEx"],
    "ม.1/7": ["1hr-mKvRSPC3dGfrbfdLlt5mETsKYK79k"],
    "ม.1/8": ["1HMxeQFwlzrKx3lD8s3J57I1l6DyCXA6b"],
    "ม.1/9": ["1a2oL0ToZLnn3aRfOUN9slHdQ9Pryof8y"],
    "ม.1/10": ["136rDnxwNuzebeOpUF-uk46fT8rwGM6Zh"],
    "ม.1/11": ["1x-jxsa5ELzJy9-2zgZ_rFJObScsDKQ4C"],
    "ม.1/12": ["1wcVxXIv3y5H7ivkynmcp9ccOuwcdpkuH"],
    "ม.1/13": ["1qXcEUBVZQM54NXTsaJy6E8BNwqtQSVY1"],
  },
  "ม.2": {
    "ม.2/1-2": ["1vFWoXy6sAqluKKWJVAVize5_Pdy8NOgn"],
    "ม.2/3-4": ["1772J0J2vC4dMFq0XiWmt9OAu1YIwq6vw"],
    "ม.2/5": ["1rdiITOzTCLUscKkqBxl8kxcuRKIkYLA2"],
    "ม.2/6": ["1AefEOeOkt2IYahHyRdwSqf0606JbkDvz"],
    "ม.2/7": ["1GnGl_bZnkoDMHZjBdYRwZMoMG6Jdb74W"],
    "ม.2/8": ["1X2vEbjp9FwCWmrH9kCWVaAXQ077--3dc"],
    "ม.2/9": ["19mDTA9D_UrCbeoIdBIZMP6hroxEaRHCO"],
    "ม.2/10": ["1xXAlApu6rd6fNjaJQNHdCFBgXToA6r5hg"],
    "ม.2/11": ["1y1S4_A71bn6uJPWOnAcFSWwpHyp0HM38"],
    "ม.2/12": ["1fWHf7G7gKCBGYAWelkS7CooAA1lSOug_"],
    "ม.2/13": ["1jvUC2LoL8DTfSpL8sa7q0Jpm6uYU-q9W"],
  },
  "ม.3": {
    "ม.3/1-2": [
      "https://drive.google.com/file/d/1Z5zqGGe960vt2bd0ZX4v7b8KtNXi-Qnz/view?usp=sharing",
    ],
    "ม.3/3-4": [
      "https://drive.google.com/file/d/116Nzuv37VsOXWtx6z-jzWSDU5282G9QK/view?usp=sharing",
    ],
    "ม.3/5-6": [
      "https://drive.google.com/file/d/1gCTJq76ibmu94gXyPZz2gdbUE5IAiBFj/view?usp=sharing",
    ],
    "ม.3/7-8": [
      "https://drive.google.com/file/d/1yTHN12XKQAxurXqkWGgrvOIpenWPFy6j/view?usp=sharing",
    ],
    "ม.3/9": [
      "https://drive.google.com/file/d/1N5dsyU_M_6KjXMESnMY7vd0GIPKMxn1h/view?usp=sharing",
    ],
    "ม.3/10": [
      "https://drive.google.com/file/d/137gMjoPFTffi_gSSQKd7gASIT_aOFiHk/view?usp=sharing",
    ],
    "ม.3/11-12": [
      "https://drive.google.com/file/d/1xDsDZp0bq9fGmLmNfQ4tp4VhMwPo7sTq/view?usp=sharing",
    ],
    "ม.3/13": [
      "https://drive.google.com/file/d/19jtFQ4SJJQuOxjMAxtcbqO5yQAPROTko/view?usp=sharing",
    ],
  },
  "ม.4": {
    "ม.4/1-2": [
      "https://drive.google.com/file/d/1EbQEIa2uwIaCXIk1jjLd_T9sUfb6Ufrj/view?usp=sharing",
    ],
    "ม.4/3-4": [
      "https://drive.google.com/file/d/1VqAkmDf8P2mCAFJpYpUVWYKM_yehryZ4/view?usp=sharing",
    ],
    "ม.4/5-6": [
      "https://drive.google.com/file/d/1TyYeDLnB_fF01PN241DVmQYgK4qjh2Wh/view?usp=sharing",
    ],
    "ม.4/7-8": [
      "https://drive.google.com/file/d/1jPlJd7EV9ynZQi9uxpDOZnP9AY9HgNye/view?usp=sharing",
    ],
    "ม.4/9-10": [
      "https://drive.google.com/file/d/1LWa0yauMonIz-fV_63ZAbEgvgSGUf1AX/view?usp=sharing",
    ],
    "ม.4/11": [
      "https://drive.google.com/file/d/1ZZ-yJsZhyK6OnyNhON3f9Dph2RS1BX-y/view?usp=sharing",
    ],
    "ม.4/12(CP),4/12(ICT)": [
      "https://drive.google.com/file/d/1-YdE3LUrxFcGM1J_hn6sYmFj2zThS9QJ/view?usp=sharing",
    ],
  },
  "ม.5": {
    "ม.5/1-2": [
      "https://drive.google.com/file/d/1FaCyIrvzK7HGrcD36waI5fCnkOkXPWre/view?usp=sharing",
    ],

    "ม.5/3-4": [
      "https://drive.google.com/file/d/16nb3en3EQn6wSKV2JgrFBDR9Tzw8fyFv/view?usp=sharing",
    ],

    "ม.5/5-6": [
      "https://drive.google.com/file/d/16JvT82UbhoIOGIcBibkTUu09kSD9C5iN/view?usp=sharing",
    ],

    "ม.5/7-8": [
      "https://drive.google.com/file/d/1FQOrFghpNObBTIANN1499jv26nngN-h0/view?usp=sharing",
    ],

    "ม.5/9": [
      "https://drive.google.com/file/d/1fzfkWIyjZybplLAJnOKb0HvvnXLOvMla/view?usp=sharing",
    ],

    "ม.5/10(นาฎศิลป์)": [
      "https://drive.google.com/file/d/1B6yp85hZszuw0rr-zu6FsQQMHOZ9ElEN/view?usp=sharing",
    ],

    "ม.5/10(ดนตรี)": [
      "https://drive.google.com/file/d/1utCBuo45ucm4Qrsxi3y9oFm_PHLuzIvK/view?usp=sharing",
    ],

    "ม.5/11": [
      "https://drive.google.com/file/d/1_VkzDRUDvu-aF24ANve0KoODaJnagMvB/view?usp=sharing",
    ],
    "ม.5/12(CP),5/12(ICT)": [
      "https://drive.google.com/file/d/1QxM9mSFemWH3DxrD4fzWj9vQi-4dxlez/view?usp=sharing",
    ],
  },
  "ม.6": {
    "ม.6/1-2": [
      "https://drive.google.com/file/d/1waeXovzKq11UKkACudjTWGrEYtK2vooU/view?usp=sharing",
    ],
    "ม.6/3-4": [
      "https://drive.google.com/file/d/1Gi2JgBn-PoNrm3q3XzxSsGKhYgSF5I8S/view?usp=sharing",
    ],
    "ม.6/5": [
      "https://drive.google.com/file/d/105MzL0V-OVGtTfyCQ9yzQiV_eQ1M1EdG/view?usp=sharing",
    ],
    "ม.6/6": [
      "https://drive.google.com/file/d/10kSMS4o8ZY35IXvNW_C06cdGlw7JSdxZ/view?usp=sharing",
    ],
    "ม.6/7": [
      "https://drive.google.com/file/d/1Cpj2hAkc1L8wOAMaYZlG1-hYxT3UiUH8/view?usp=sharing",
    ],
    "ม.6/8(ทัศนศิลป์)": [
      "https://drive.google.com/file/d/1fZshcWcuoST01Xb7tZsjwT210uHtdydO/view?usp=sharing",
    ],
    "ม.6/8(ดนตรี)": [
      "https://drive.google.com/file/d/1fO9gE6wDzkuVZgJeA9zANOB9LxkPcjAq/view?usp=sharing",
    ],
    "ม.6/9": [
      "https://drive.google.com/file/d/1RYAyRM0I3KAZ_IJpR9j_eJSBGjLxbKmf/view?usp=sharing",
    ],
    "ม.6/10(CP)": [
      "https://drive.google.com/file/d/1Q3aGISd5D91TI73V-K-CtXE35vVTTuyg/view?usp=sharing",
    ],
  },
};

function extractFileId(input) {
  if (!input) return null;
  if (!/^https?:\/\//i.test(input)) return input.trim();
  const m1 = input.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (m1?.[1]) return m1[1];
  const m2 = input.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (m2?.[1]) return m2[1];
  const m3 = input.match(/[?&](?:uc\?id|id)=([a-zA-Z0-9_-]+)/);
  if (m3?.[1]) return m3[1];
  return null;
}

// ใช้ preview viewer ของ Google Drive (เหมาะกับ PDF)
const toDrivePreviewUrl = (fileId) =>
  `https://drive.google.com/file/d/${fileId}/preview`;

// เปิดหน้า view ปกติ 
const toDrivedownloadUrl = (fileId) =>
  `https://drive.usercontent.google.com/u/0/uc?id=${fileId}&export=download`;

export default function Timetable() {
  const grades = useMemo(() => Object.keys(timetableData), []);
  const [selectedGrade, setSelectedGrade] = useState(grades[0] || "");
  const rooms = useMemo(
    () => (selectedGrade ? Object.keys(timetableData[selectedGrade]) : []),
    [selectedGrade]
  );
  const [selectedRoom, setSelectedRoom] = useState(() =>
    rooms.length ? rooms[0] : ""
  );

  // อัปเดตห้องเมื่อเปลี่ยนระดับชั้น
  useEffect(() => {
    if (rooms.length && !rooms.includes(selectedRoom)) {
      setSelectedRoom(rooms[0]);
    }
  }, [rooms, selectedRoom]);

  const files = useMemo(() => {
    if (!selectedGrade || !selectedRoom) return [];
    return timetableData[selectedGrade][selectedRoom] || [];
  }, [selectedGrade, selectedRoom]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
          ตารางเรียน (PDF)
        </h1>
        {/* ตัวเลือก ชั้น/ห้อง */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
          <div className="relative">
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 rounded-lg border bg-white font-semibold"
            >
              {grades.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <ChevronDown className="h-4 w-4 absolute right-3 top-3.5 text-gray-500 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 rounded-lg border bg-white font-semibold"
            >
              {rooms.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <ChevronDown className="h-4 w-4 absolute right-3 top-3.5 text-gray-500 pointer-events-none" />
          </div>
        </div>
        {/* แสดง PDF เป็น iframe preview ของ Drive */}
        {files.length === 0 ? (
          <div className="text-center text-gray-500">
            ยังไม่มีไฟล์สำหรับ {selectedRoom}
          </div>
        ) : (
          <div className="space-y-8">
            {files.map((src, i) => {
              const id = extractFileId(src);
              if (!id) {
                return (
                  <div
                    key={i}
                    className="bg-white rounded-xl overflow-hidden shadow p-6 text-center text-red-500"
                  >
                    ลิงก์ไฟล์ไม่ถูกต้อง
                  </div>
                );
              }

              return (
                <div
                  key={i}
                  className="bg-white rounded-xl overflow-hidden shadow"
                >
                  {/* iframe อัตราส่วน 16:9 (ปรับสูง/ต่ำตามที่ต้องการ) */}
                  <div
                    className="relative w-full"
                    style={{ paddingTop: "56.25%" }}
                  >
                    <iframe
                      src={toDrivePreviewUrl(id)}
                      title={`Timetable ${selectedRoom} #${i + 1}`}
                      className="absolute inset-0 w-full h-full"
                      allow="autoplay"
                    />
                  </div>

                  <div className="p-4 flex flex-wrap gap-3">
                    <a
                      href={toDrivedownloadUrl(id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold"
                    >
                      <Download /> โหลดไฟล์
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <a
                      href={toDrivePreviewUrl(id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 text-gray-800 text-sm font-semibold"
                    >
                      เปิดแบบ Preview <ScanSearch />
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <p className="mt-10 text-sm text-center">
          <span className="mt-10 text-sm text-red-500 text-left">* </span>
          <span className="font-semibold">
            คำแนะนำผู้ใช้ที่ใช้บนมือถือกรุณากดโหลดไฟล์เพื่อความง่ายในการดู
          </span>
        </p>
        <p className="text-center">
          <span className="mt-10 text-sm text-red-500 text-left">*</span>
          <span className="font-semibold">
            Users using mobile devices are advised to click download file for
            easy viewing.
          </span>{" "}
        </p>
      </div>
    </div>
  );
}
