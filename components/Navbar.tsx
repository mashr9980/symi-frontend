"use client";
import React, { useState, useEffect } from "react";
import { Play, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { hasChatHistory, handleLogout } from "../utils/auth"; // Import utility functions

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an admin
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if the user is logged in
  const [isMobile, setIsMobile] = useState(false);
   
  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { label: "Blueprint", href: "/blueprint" },
    { label: "System Builder", href: "/system-builder" },
    { label: "Pricing", href: "/pricing" },
    { label: "SYMI Lab", href: "/symi-lab" }, // <-- Add this line
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
      
      // Check if we're on mobile
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      // Set initial value
      checkMobile();
      
      // Add window resize listener
      window.addEventListener('resize', checkMobile);
      
      // Clean up
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md border-b border-gray-300">
      <div className="relative max-w-screen-xl mx-auto px-4 py-4">
        {/* Logo and Mobile Menu Container */}
        <div className="flex justify-between items-center">
          {/* Logo (left) */}
          <Link 
           href={hasChatHistory() ? "/blueprint" : "/"}
           className="flex items-center space-x-2 relative group">
            <Play
              className="w-6 h-6 text-indigo-500 group-hover:text-indigo-700 transition-all duration-300 transform group-hover:scale-110"
              fill="currentColor"
            />
            <span className="text-xl font-bold text-black dark:text-white group-hover:text-indigo-500 transition-all duration-300">
              SYMI
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-300 to-indigo-600 opacity-0 group-hover:opacity-30 rounded-full blur-xl transition-all duration-300"></div>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-900" />
            ) : (
              <Menu className="h-6 w-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className={`hidden md:flex items-center justify-center space-x-4 px-4 py-2 bg-transparent dark:bg-transparent transition-all duration-500 text-sm sm:text-lg mb-2`}>
          {navLinks.map((item, i) => (
            <div key={i} className="relative">
              <Link
                href={item.href!}
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

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg py-4 border-b border-gray-200 z-50 animate-fadeScaleIn">
            <div className="flex flex-col space-y-4 px-4">
              {navLinks.map((item, i) => (
                <Link
                  key={i}
                  href={item.href!}
                  onClick={() => setIsOpen(false)}
                  className={`py-2 px-3 rounded-lg ${
                    pathname === item.href
                      ? "bg-indigo-50 text-indigo-600 font-medium"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Admin link for mobile */}
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className={`py-2 px-3 rounded-lg ${
                    pathname === "/admin"
                      ? "bg-indigo-50 text-indigo-600 font-medium"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  Admin
                </Link>
              )}
              
              {/* Login/Logout for mobile */}
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout(router, setIsLoggedIn, setIsAdmin);
                    setIsOpen(false);
                  }}
                  className="py-2 px-3 rounded-lg text-left text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="py-2 px-3 rounded-lg text-gray-800 hover:bg-gray-100"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;