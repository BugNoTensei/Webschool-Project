import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          🔐 แผงควบคุมผู้ดูแลระบบ
        </h1>

        <div className="space-y-4">
          <Link
            to="/admin/news"
            className="block w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
          >
            📰 จัดการข่าว
          </Link>
          <Link
            to="/admin/gallery"
            className="block w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
          >
            🖼️ จัดการรูปกิจกรรม
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            ออกจากระบบ
          </button>
        </div>
      </div>
    </div>
  );
}
