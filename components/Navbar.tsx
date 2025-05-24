"use client";
import React, { useState, useEffect } from "react";
import { Play, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { handleLogout } from "../utils/auth";

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
   
  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { label: "Blueprint", href: "/blueprint" },
    { label: "System Builder", href: "/system-builder" },
    { label: "Pricing", href: "/pricing" },
    { label: "SYMI Lab", href: "/symi-lab" },
  ];
  
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
      
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      checkMobile();
      
      window.addEventListener('resize', checkMobile);
      
      const handleScroll = () => {
        if (window.scrollY > 20) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('resize', checkMobile);
        window.removeEventListener('scroll', handleScroll);
      }
    }
  }, [pathname]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'backdrop-blur-md bg-white/5 border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="relative max-w-screen-xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            href="/"
            className="flex items-center space-x-3 relative group z-10">
            <div className="relative">
              {/* Gradient orb behind logo */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative from-indigo-600 to-purple-600 transition-all duration-300 group-hover:shadow-indigo-500/40 group-hover:scale-110">
                <Play className="w-7 h-7 text-[#6566ed]" fill="currentColor" />
              </div>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300">
              SYMI
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-10 flex items-center justify-center h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 hover:bg-white/20"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="relative">
              {isOpen ? (
                <X className="h-6 w-6 text-gray-800 dark:text-white transition-transform duration-300 rotate-0" />
              ) : (
                <Menu className="h-6 w-6 text-gray-800 dark:text-white transition-transform duration-300 rotate-0" />
              )}
            </div>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center">
          <div className="flex items-center space-x-1 px-2 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
            {navLinks.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className={`relative px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  pathname === item.href 
                    ? "text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30" 
                    : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/20"
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {pathname === item.href && (
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full opacity-10"></div>
                )}
              </Link>
            ))}

            {isAdmin && (
              <Link
                href="/admin"
                className={`relative px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  pathname === "/admin" 
                    ? "text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30" 
                    : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/20"
                }`}
              >
                <span className="relative z-10">Admin</span>
              </Link>
            )}

            {/* Separator */}
            <div className="w-px h-6 bg-white/20 mx-2"></div>

            {isLoggedIn ? (
              <button
                onClick={() => handleLogout(router, setIsLoggedIn, setIsAdmin)}
                className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
            <div 
              className="absolute top-20 left-4 right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile menu gradient header */}
              <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-6 py-4 border-b border-white/10">
                <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  Navigation
                </h3>
              </div>
              
              <div className="p-4 space-y-2">
                {navLinks.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block w-full py-3 px-4 rounded-xl text-left font-medium transition-all duration-300 ${
                      pathname === item.href
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/30 dark:hover:to-purple-900/30 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className={`block w-full py-3 px-4 rounded-xl text-left font-medium transition-all duration-300 ${
                      pathname === "/admin"
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/30 dark:hover:to-purple-900/30 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`}
                  >
                    Admin
                  </Link>
                )}
                
                {/* Mobile Auth Button */}
                <div className="pt-4 mt-4 border-t border-white/10">
                  {isLoggedIn ? (
                    <button
                      onClick={() => {
                        handleLogout(router, setIsLoggedIn, setIsAdmin);
                        setIsOpen(false);
                      }}
                      className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-indigo-500/40"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      href="/auth/login"
                      onClick={() => setIsOpen(false)}
                      className="block w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-center font-medium shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-indigo-500/40"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;