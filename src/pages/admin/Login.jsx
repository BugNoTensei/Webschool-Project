import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  //  ถ้าเคยล็อกอินแล้ว (localStorage มี user.role === "admin") → เด้งไป dashboard ทันที
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("user"));
      if (saved?.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      }
    } catch {}
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ตรวจ username/password
    if (username === "AdminTuns" && password === "TUnSGooD") {
      const userData = {
        username: "AdminTuns",
        role: "admin",
        loggedInAt: new Date().toISOString(),
      };

      // บันทึกสถานะลง localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // ถ้ามีหน้าที่มาจากก่อน redirect → กลับไปหน้าที่มา, ถ้าไม่มีก็ไป dashboard
      const from = location.state?.from?.pathname || "/admin/dashboard";
      navigate(from, { replace: true });
    } else {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          เข้าสู่ระบบผู้ดูแล
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition"
          >
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    </div>
  );
}
