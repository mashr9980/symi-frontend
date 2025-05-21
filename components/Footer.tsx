"use client";

import { Play, Mail, Twitter, Instagram } from "lucide-react";
import Link from "next/link";
import { hasChatHistory } from "../utils/auth";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-tl from-[#8e70f9] via-[#cebcfc] to-[#eeddfd] text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center sm:text-left">

          {/* Brand Section */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
              <Play className="w-7 h-7 text-[#6566ed]" fill="currentColor" />
              <span className="text-xl font-bold tracking-tight">SYMI</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed max-w-xs">
              Intelligent Business Automation tailored to scale.<br />
            </p>
          </div>

          {/* First Links Column */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><Link 
               href={hasChatHistory() ? "/blueprint" : "/"}
              className="hover:underline">Home</Link></li>
              {/* <li><Link href="/symi-os" className="hover:underline">SYMI OS</Link></li> */}
              {/* <li><Link href="/about" className="hover:underline">About</Link></li> */}
            </ul>
          </div>

          {/* Second Links Column */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><Link href="/pricing" className="hover:underline">Pricing</Link></li>
              <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
              <li><Link href="/manifesto" className="hover:underline">Manifesto</Link></li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Connect</h4>
            <div className="flex items-center gap-2 text-sm text-gray-700 mb-4 justify-center sm:justify-start">
              <Mail className="w-5 h-5 text-gray-600" />
              <span>contact@symi.io</span>
            </div>
            <div className="flex gap-3 justify-center sm:justify-start">
              <Link
                href="https://x.com/symi_io"
                target="_blank"
                aria-label="Twitter"
                className="p-2 bg-white/30 hover:bg-white/50 rounded-full transition"
              >
                <Twitter className="w-4 h-4 text-blue-600" />
              </Link>
              <Link
                href="https://www.instagram.com/symi.io"
                target="_blank"
                aria-label="instagram"
                className="p-2 bg-white/30 hover:bg-white/50 rounded-full transition"
              >
                <Instagram className="w-4 h-4 text-blue-800" />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 sm:mt-12 border-t border-white/50 pt-6 text-center text-sm text-gray-700">
          © {new Date().getFullYear()} SYMI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}