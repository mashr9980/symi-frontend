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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white/40 backdrop-blur-sm border-b border-white/20'}`}>
      <div className="relative max-w-screen-xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Always keep logo pointing to home page */}
          <Link 
           href="/"
           className="flex items-center space-x-2 relative group">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full p-2 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-indigo-500/30">
              <Play
                className="w-4 h-4 text-white group-hover:scale-110 transition-all"
                fill="currentColor"
              />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300">
              SYMI
            </span>
          </Link>

          <button
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-full bg-white/90 backdrop-blur-lg shadow-sm border border-purple-100"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-5 w-5 text-indigo-600" />
            ) : (
              <Menu className="h-5 w-5 text-indigo-600" />
            )}
          </button>
        </div>

        <div className={`hidden md:flex items-center justify-center space-x-1 px-4 py-2 mt-2 rounded-full transition-all duration-500 bg-white/90 backdrop-blur-sm shadow-lg border border-purple-100`}>
          {navLinks.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                pathname === item.href 
                ? "text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md" 
                : "text-gray-700 hover:bg-white hover:shadow-sm"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {isAdmin && (
            <Link
              href="/admin"
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                pathname === "/admin" 
                ? "text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md" 
                : "text-gray-700 hover:bg-white hover:shadow-sm"
              }`}
            >
              Admin
            </Link>
          )}

          <div className="flex-1"></div>

          {isLoggedIn ? (
            <button
              onClick={() => handleLogout(router, setIsLoggedIn, setIsAdmin)}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-md hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-md hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-xl py-4 px-4 rounded-2xl mt-2 border border-purple-100 z-50 animate-fadeScaleIn">
            <div className="flex flex-col p-2 space-y-1">
              {navLinks.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`py-3 px-4 rounded-xl text-center font-medium transition-all ${
                    pathname === item.href
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20"
                      : "bg-white text-gray-700 border border-gray-100 hover:border-indigo-200 hover:shadow-sm"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className={`py-3 px-4 rounded-xl text-center font-medium transition-all ${
                    pathname === "/admin"
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Admin
                </Link>
              )}
              
              <div className="pt-2 mt-2 border-t border-gray-100">
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      handleLogout(router, setIsLoggedIn, setIsAdmin);
                      setIsOpen(false);
                    }}
                    className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-md shadow-indigo-500/20"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/auth/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-center font-medium shadow-md shadow-indigo-500/20"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;