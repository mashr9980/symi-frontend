"use client";
import React, { useState,useEffect } from "react";
import { Play } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { isTokenExpired, handleLogout } from "../utils/auth"; // Import utility functions

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an admin
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if the user is logged in
   
  // const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { label: "Blueprint", href: "/blueprint" },
    { label: "System Builder", href: "/system-builder" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" }, 
    { label: "Manifesto", href: "/manifesto" },
  ];
  
  // Function to check login and admin status
  const checkAuthStatus = () => {
    const userRole = localStorage.getItem("user_role");
    const accessToken = localStorage.getItem("access_token");

    if (userRole === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }

    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      checkAuthStatus();
    }
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md border-b border-gray-300">
      <div className="relative max-w-screen-xl mx-auto px-4 py-4">
        {/* Logo (left) */}
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 relative group">
            <Play
              className="w-6 h-6 text-indigo-500 group-hover:text-indigo-700 transition-all duration-300 transform group-hover:scale-110"
              fill="currentColor"
            />
            <span className="text-xl font-bold text-black dark:text-white group-hover:text-indigo-500 transition-all duration-300">
              SYMI
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-300 to-indigo-600 opacity-0 group-hover:opacity-30 rounded-full blur-xl transition-all duration-300"></div>
          </Link>

          {/* Hamburger (mobile) */}
        </div>

        {/* Nav Links (centered on large screens) */}
        <div className="flex items-center justify-center space-x-4 px-4 py-2 bg-transparent dark:bg-transparent transition-all duration-500 text-sm sm:text-lg mb-2">
          {navLinks.map((item, i) => (
            <div key={i} className="relative">
              <Link
                href={item.href!}
                onClick={() => setIsOpen(false)}
                className={`nav-item group block px-2 md:px-0 text-gray-800 dark:text-gray-200 transition duration-300 relative
                ${pathname === item.href ? "text-[#0078ff] font-semibold" : ""}`}
              >
                <span className="relative z-10 whitespace-nowrap">{item.label}</span>
                <span className="pointer-events-none absolute bottom-0 left-1/2 w-0 h-[2px] bg-indigo-500 transition-all duration-200 group-hover:left-0 group-hover:w-full transform -translate-x-1/2 group-hover:translate-x-0"></span>
              </Link>
            </div>
          ))}

          {/* Admin Tab (conditionally rendered) */}
          {isAdmin && (
            <div className="relative">
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className={`nav-item group block px-2 md:px-0 text-gray-800 dark:text-gray-200 transition duration-300 relative
                ${pathname === "/admin" ? "text-[#0078ff] font-semibold" : ""}`}
              >
                <span className="relative z-10 whitespace-nowrap">Admin</span>
                <span className="pointer-events-none absolute bottom-0 left-1/2 w-0 h-[2px] bg-indigo-500 transition-all duration-200 group-hover:left-0 group-hover:w-full transform -translate-x-1/2 group-hover:translate-x-0"></span>
              </Link>
            </div>
          )}

{/* Login/Logout Button */}
<div className="relative">
            {isLoggedIn ? (
              <button
              onClick={() => handleLogout(router, setIsLoggedIn, setIsAdmin)}
                className="nav-item group block px-2 md:px-0 text-gray-800 dark:text-gray-200 transition duration-300 relative"
              >
                <span className="relative z-10 whitespace-nowrap">Logout</span>
                <span className="pointer-events-none absolute bottom-0 left-1/2 w-0 h-[2px] bg-indigo-500 transition-all duration-200 group-hover:left-0 group-hover:w-full transform -translate-x-1/2 group-hover:translate-x-0"></span>
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="nav-item group block px-2 md:px-0 text-gray-800 dark:text-gray-200 transition duration-300 relative"
              >
                <span className="relative z-10 whitespace-nowrap">Login</span>
                <span className="pointer-events-none absolute bottom-0 left-1/2 w-0 h-[2px] bg-indigo-500 transition-all duration-200 group-hover:left-0 group-hover:w-full transform -translate-x-1/2 group-hover:translate-x-0"></span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
