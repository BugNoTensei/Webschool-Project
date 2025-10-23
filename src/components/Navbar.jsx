import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  GraduationCap,
  School,
  Heart,
  BookOpen,
  Calendar,
  Camera,
  MapPin,
  Users,
  FileDown,
  Megaphone,
  ChevronDown,
  LayoutDashboard,
  BookText,
  Building,
  User,
  UserCog,
  GraduationCap as CapSmall,
} from "lucide-react";
const getAssetUrl = (file) =>
  new URL(`../assets/logo/${file}`, import.meta.url).href;
const logoSrc = getAssetUrl("logo.png");

const groups = [
  {
    title: "เกี่ยวกับโรงเรียน",
    items: [
      { path: "/about", label: "เกี่ยวกับเรา", icon: Heart },
      {
        path: "/faculty",
        label: "บุคลากร",
        icon: Users,
        children: [
          { path: "/faculty/board", label: "คณะผู้บริหาร", icon: User },
        ],
      },
      {
        path: "/Buildinginformation",
        label: "ข้อมูลอาคารสถานที่",
        icon: Building,
      },
      { path: "/layoutschool", label: "ผังโรงเรียน", icon: LayoutDashboard },
    ],
  },
  {
    title: "วิชาการ",
    items: [
      { path: "/programs", label: "หลักสูตร", icon: BookOpen },
      { path: "/timetable1", label: "ตารางเรียน", icon: FileDown },
      { path: "/StudentHandbook", label: "คู่มือนักเรียน", icon: BookText },
    ],
  },
  {
    title: "ข่าวสารและกิจกรรม",
    items: [
      { path: "/news", label: "ข่าวประชาสัมพันธ์", icon: Calendar },
      {
        path: "/news?category=activity",
        label: "กิจกรรมโรงเรียน",
        icon: Megaphone,
      },
      { path: "/gallery", label: "ภาพกิจกรรม", icon: Camera },
    ],
  },
  {
    title: "ติดต่อ",
    items: [{ path: "/contact", label: "ติดต่อเรา", icon: MapPin }],
  },
];

const primaryItems = [
  { path: "/", label: "หน้าแรก", icon: School },
  { path: "/programs", label: "หลักสูตร", icon: BookOpen },
  { path: "/news", label: "ข่าวสาร", icon: Calendar },
  { path: "/contact", label: "ติดต่อเรา", icon: MapPin },
];

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMega, setOpenMega] = useState(false);
  const [openAccord, setOpenAccord] = useState(null);

  // เมนูย่อย
  const [hoverSub, setHoverSub] = useState(null);
  const [openSubMobile, setOpenSubMobile] = useState(null);
  const closeTimer = useRef(null);
  const megaRef = useRef(null);

  // helper: เปิด/ปิดด้วย delay ป้องกันเด้ง
  const openSub = (path) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHoverSub(path);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setHoverSub(null), 200);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    const onClickOutside = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) {
        setOpenMega(false);
        setHoverSub(null);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", onClickOutside);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const baseBar = isScrolled
    ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-purple-100"
    : "bg-gradient-to-r from-blue-500/90 to-purple-500/90 backdrop-blur-sm";

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${baseBar}`}
      role="navigation"
      aria-label="หลัก"
      style={{
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={logoSrc}
              alt="ตราโรงเรียน"
              className="w-13 h-13 rounded-full shadow-lg object-cover"
            />
            <div
              className={`flex flex-col max-w-[220px] sm:max-w-xs leading-tight break-words text-[12px] sm:text-sm md:text-base tracking-tight ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
              style={{ lineHeight: 1.2 }}
            >
              <span className="font-bold">
                โรงเรียนเตรียมอุดมศึกษาน้อมเกล้า สมุทรปราการ
              </span>
              <span
                className={`${isScrolled ? "text-pink-600" : "text-blue-100"}`}
              >
                Triamudomsuksanomklao Samutprakan School
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            {primaryItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? isScrolled
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105"
                        : "bg-white/20 text-white backdrop-blur-sm"
                      : isScrolled
                      ? "text-gray-700 hover:text-purple-700 hover:bg-purple-50"
                      : "text-blue-50 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" aria-hidden="true" />
                  {label}
                </Link>
              );
            })}

            <button
              onClick={() => setOpenMega((v) => !v)}
              onMouseEnter={() => setOpenMega(true)}
              className={`group inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isScrolled
                  ? "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                  : "text-blue-50 hover:text-white hover:bg-white/10"
              }`}
              aria-expanded={openMega}
              aria-haspopup="true"
            >
              <Menu className="h-4 w-4 mr-2" />
              เมนู
              <ChevronDown className="h-4 w-4 ml-1 transition-transform group-aria-expanded:rotate-180" />
            </button>

            <Link
              to="/admissions"
              className="ml-2 inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <GraduationCap className="h-4 w-4 mr-2" />
              รับสมัคร 2568
              <span className="ml-2 px-2 py-0.5 text-[10px] rounded-full bg-white/20">
                เปิดแล้ว
              </span>
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className={`md:hidden p-2 rounded-lg ${
              isScrolled ? "text-gray-700" : "text-white"
            }`}
            aria-expanded={isMobileMenuOpen}
            aria-label="เปิด/ปิดเมนู"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mega menu */}
      <div
        ref={megaRef}
        onMouseLeave={() => {
          setOpenMega(false);
          setHoverSub(null);
        }}
        className={`hidden md:block transition-[max-height,opacity] duration-300 ease-out ${
          openMega ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        {/* เพิ่ม padding ล่าง กันโดนตัด + ให้ submenu มีที่แสดง */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 relative">
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-white/95 backdrop-blur-lg rounded-2xl border border-purple-100 shadow-lg">
            {groups.map(({ title, items }) => (
              <div key={title} className="relative">
                <div className="text-xs font-semibold text-purple-700 uppercase tracking-wider mb-2">
                  {title}
                </div>
                <ul className="space-y-1">
                  {items.map(({ path, label, icon: Icon, children }) => {
                    const isActive = location.pathname === path;
                    const isHovering = hoverSub === path;
                    return (
                      <li key={path} className="relative">
                        {/* สะพาน hover ระหว่าง item กับ submenu */}
                        {children && (
                          <div
                            className="absolute left-0 right-0 top-full h-3"
                            onMouseEnter={() => openSub(path)}
                          />
                        )}

                        <div
                          onMouseEnter={() =>
                            children ? openSub(path) : setHoverSub(null)
                          }
                          onMouseLeave={() => children && scheduleClose()}
                          className={`flex items-center px-3 py-2 rounded-lg transition-all cursor-pointer ${
                            isActive
                              ? "bg-purple-50 text-purple-700 shadow-sm"
                              : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                          }`}
                          role={children ? "button" : undefined}
                          aria-haspopup={!!children}
                          aria-expanded={children ? isHovering : undefined}
                          onClick={() => {
                            if (!children) setOpenMega(false);
                          }}
                        >
                          {Icon && (
                            <Icon className="h-4 w-4 mr-2" aria-hidden="true" />
                          )}
                          {children ? (
                            <span className="flex-1 text-left">{label}</span>
                          ) : (
                            <Link to={path} className="flex-1 text-left">
                              {label}
                            </Link>
                          )}
                          {children && (
                            <ChevronDown
                              className={`h-4 w-4 ml-2 transition-transform ${
                                isHovering ? "rotate-180" : ""
                              }`}
                            />
                          )}
                        </div>

                        {children && (
                          <div
                            className={`absolute left-1/2 -translate-x-1/2 top-full mt-1
                                        w-64 bg-white rounded-xl border border-purple-100 shadow-xl p-2 z-40
                                        transition-all duration-200 ease-out
                                        ${
                                          isHovering
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 -translate-y-2 pointer-events-none"
                                        }`}
                            onMouseEnter={() => openSub(path)}
                            onMouseLeave={() => scheduleClose()}
                          >
                            <ul className="space-y-1">
                              {children.map(
                                ({
                                  path: cPath,
                                  label: cLabel,
                                  icon: CIcon,
                                }) => {
                                  const isChildActive =
                                    location.pathname === cPath;
                                  return (
                                    <li key={cPath}>
                                      <Link
                                        to={cPath}
                                        className={`flex items-center px-3 py-2 rounded-lg transition-all ${
                                          isChildActive
                                            ? "bg-purple-50 text-purple-700"
                                            : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                                        }`}
                                        onClick={() => setOpenMega(false)}
                                      >
                                        {CIcon && (
                                          <CIcon className="h-4 w-4 mr-2" />
                                        )}
                                        {cLabel}
                                      </Link>
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu  */}
      <div
        className={`md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden bg-white/95 backdrop-blur-lg border-t border-purple-100`}
        style={{ paddingTop: "calc(env(safe-area-inset-top) / 2)" }}
      >
        <div className="px-4 py-3 space-y-2">
          <Link
            to="/admissions"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full flex items-center px-4 py-3 rounded-lg text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow"
          >
            <GraduationCap className="h-5 w-5 mr-3" />
            รับสมัคร 2568 (เปิดแล้ว)
          </Link>

          {groups.map(({ title, items }, idx) => (
            <div
              key={title}
              className="border border-purple-100 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenAccord(openAccord === idx ? null : idx)}
                className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-700"
                aria-expanded={openAccord === idx}
              >
                <span className="text-sm font-semibold">{title}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    openAccord === idx ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`transition-all ${
                  openAccord === idx ? "max-h-[800px]" : "max-h-0"
                } overflow-hidden`}
              >
                <ul className="px-2 pb-2 space-y-1">
                  {items.map(({ path, label, icon: Icon, children }) => {
                    const isActive = location.pathname === path;
                    const isSubOpen = openSubMobile === path;
                    return (
                      <li key={path}>
                        {children ? (
                          <>
                            <button
                              onClick={() =>
                                setOpenSubMobile(isSubOpen ? null : path)
                              }
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                                isActive
                                  ? "bg-purple-50 text-purple-700"
                                  : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                              }`}
                              aria-expanded={isSubOpen}
                              aria-controls={`sub-${path}`}
                            >
                              <span className="flex items-center">
                                {Icon && <Icon className="h-4 w-4 mr-2" />}
                                {label}
                              </span>
                              <ChevronDown
                                className={`h-4 w-4 transition-transform ${
                                  isSubOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            <div
                              id={`sub-${path}`}
                              className={`pl-2 transition-all ${
                                isSubOpen ? "max-h-[600px]" : "max-h-0"
                              } overflow-hidden`}
                            >
                              <ul className="mt-1 space-y-1">
                                {children.map(
                                  ({
                                    path: cPath,
                                    label: cLabel,
                                    icon: CIcon,
                                  }) => {
                                    const isChildActive =
                                      location.pathname === cPath;
                                    return (
                                      <li key={cPath}>
                                        <Link
                                          to={cPath}
                                          onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            setOpenSubMobile(null);
                                          }}
                                          className={`flex items-center px-3 py-2 rounded-lg transition-all ${
                                            isChildActive
                                              ? "bg-purple-50 text-purple-700"
                                              : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                                          }`}
                                        >
                                          {CIcon && (
                                            <CIcon className="h-4 w-4 mr-2" />
                                          )}
                                          {cLabel}
                                        </Link>
                                      </li>
                                    );
                                  }
                                )}
                              </ul>
                            </div>
                          </>
                        ) : (
                          <Link
                            to={path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center px-3 py-2 rounded-lg transition-all ${
                              isActive
                                ? "bg-purple-50 text-purple-700"
                                : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                            }`}
                          >
                            {Icon && (
                              <Icon
                                className="h-4 w-4 mr-2"
                                aria-hidden="true"
                              />
                            )}
                            {label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
