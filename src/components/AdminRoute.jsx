import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function AdminRoute({ children }) {
  const location = useLocation();
  const userJson = localStorage.getItem("user");
  let user = null;

  try {
    user = userJson ? JSON.parse(userJson) : null;
  } catch {
    user = null;
  }

  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";

  if (!isLoggedIn || !isAdmin) {
    console.warn("Redirecting to /admin/login because user not admin:", user);
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
