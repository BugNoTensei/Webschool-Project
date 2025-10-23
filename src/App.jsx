import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";

// ---------- Layouts ----------
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ---------- Public Pages ----------
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import News from "./pages/News";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Board from "./pages/faculty/Board";
import LayoutSchool from "./pages/layoutschool";
import Buildinginformation from "./pages/Buildings";
import StudentHandbook from "./pages/StudentGuide";
import NewsList from "./pages/news/NewsList";
import NewsDetail from "./pages/news/NewsDetail";
import Timetable from "./pages/timetable1";
import Admissions2568 from "./pages/admissions";

// ---------- Admin Pages ----------
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import NewsAdmin from "./pages/admin/NewsAdmin";
import GalleryAdmin from "./pages/admin/GalleryAdmin";
import AdminRoute from "./components/AdminRoute";

// ---------- Root Layout ----------
const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

// ---------- Router Config ----------
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      // ---------- Public Routes ----------
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/programs", element: <Programs /> },
      { path: "/news", element: <News /> },
      { path: "/gallery", element: <Gallery /> },
      { path: "/contact", element: <Contact /> },
      { path: "/layoutschool", element: <LayoutSchool /> },
      { path: "/Buildinginformation", element: <Buildinginformation /> },
      { path: "/StudentHandbook", element: <StudentHandbook /> },
      { path: "/timetable1", element: <Timetable /> },
      { path: "/Admissions", element: <Admissions2568 /> },
      {
        path: "/news",
        children: [
          { index: true, element: <NewsList /> },
          { path: ":id", element: <NewsDetail /> },
        ],
      },
      {
        path: "/faculty",
        children: [
          { index: true, element: <Navigate to="/faculty/board" replace /> },
          { path: "board", element: <Board /> },
        ],
      },

      // ---------- Admin Routes ----------
      { path: "/admin/login", element: <Login /> },
      {
        path: "/admin/dashboard",
        element: (
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/news",
        element: (
          <AdminRoute>
            <NewsAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/gallery",
        element: (
          <AdminRoute>
            <GalleryAdmin />
          </AdminRoute>
        ),
      },
    ],
  },

  // ---------- Fallback ----------
  { path: "*", element: <Navigate to="/" replace /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
