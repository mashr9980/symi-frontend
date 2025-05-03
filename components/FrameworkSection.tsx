
"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Search, Menu, ChevronRight } from "lucide-react";
import { motion } from "framer-motion"; // Import framer-motion
import FinalCTA from "./FinalCTA";

export default function FrameworkSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 pt-24">
      <div className="text-center mb-20">
        <motion.p
          className="text-xl sm:text-4xl mx-auto w-full sm:w-2/3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Explore the full system architecture powering your automated business OS.
        </motion.p>
        <motion.h1
          className="text-5xl sm:text-8xl font-serif my-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Explore the
          <br />
          Framework
        </motion.h1>
        <motion.p
          className="text-xl sm:text-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          An evolving intelligence ecosystem
        </motion.p>
      </div>

      {/* Sticky Sidebar (Table of Contents) */}
      <motion.div
        className="hidden md:block fixed top-1/4 left-0 z-10 p-6 bg-[#c8b5fa] shadow-xl group hover:w-32 w-20 transition-all duration-300 ease-in-out rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <nav>
          <ul className="space-y-4 text-xl">
            <li className="group relative">
              <Menu className="w-8 h-8 cursor-pointer transition-colors" />
              <div className="absolute left-full top-1/2 transform -translate-x-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-white p-3 rounded-md">
                <p className="text-sm">Menu</p>
              </div>
            </li>
            <li className="group relative">
              <Home className="w-8 h-8 cursor-pointer transition-colors" />
              <div className="absolute left-full top-1/2 transform -translate-x-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-white p-3 rounded-md">
                <p className="text-sm">Home</p>
              </div>
            </li>
            <li className="group relative">
              <Search className="w-8 h-8 cursor-pointer transition-colors" />
              <div className="absolute left-full top-1/2 transform -translate-x-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-white p-3 rounded-md">
                <p className="text-sm">Search</p>
              </div>
            </li>
            <li className="group relative">
              <ChevronRight className="w-8 h-8 cursor-pointer transition-colors" />
              <div className="absolute left-full top-1/2 transform -translate-x-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-white p-3 rounded-md">
                <p className="text-sm">Chevron</p>
              </div>
            </li>
          </ul>
        </nav>
      </motion.div>

      {/* Sacred Architecture Framework Section */}
      <div className="min-h-screen sacred-grid bg-sacred-ground">
        <div className="max-w-6xl mx-auto px-4 py-20 space-y-16">
          <div className="text-center space-y-4">
            <motion.h2
              className="text-4xl font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Sacred Architecture Framework
            </motion.h2>
            <motion.p
              className="text-sacred-ash/80 text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              The divine methodology behind SYMI systems
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <motion.div
                className="sacred-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <h3 className="text-2xl font-light mb-4">Core Principles</h3>
                <ul className="space-y-4">
                  {['Golden Ratio Flows', 'Circadian Automation', 'Quantum Decision Trees'].map((principle, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-sacred-breath rounded-full" />
                      {principle}
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                className="sacred-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <h3 className="text-2xl font-light mb-4">Implementation Phases</h3>
                <div className="space-y-6">
                  {['Alignment', 'Architecture', 'Activation'].map((phase, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-sacred-breath/10 rounded-full flex items-center justify-center">
                        {index + 1}
                      </div>
                      <span className="text-lg">{phase} Phase</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              className="sacred-card h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="mt-6 text-sacred-ash/80">
                Interactive system resonance map
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Core Architecture Diagram */}
      <div id="overview" className="relative flex justify-center mb-32">
        <div className="w-full flex flex-col items-center py-8">
          {/* First Row: Three Columns */}
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* First Column: Text */}
            <div className="flex flex-col justify-center text-center">
              <motion.h3
                className="text-xl md:text-2xl font-bold mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Core Architecture
              </motion.h3>
              <p className="text-sm md:text-base max-w-xs mx-auto md:mx-0">
                Recursive processes for resilient intelligence structure
              </p>
            </div>

            {/* Center Column: Image */}
            <div className="flex justify-center items-center relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/40 rounded-full blur-3xl z-0"></div>
              <img
                src="/assets/icons/cc18.png"
                alt="SYMI OS Diagram"
                className="w-32 h-32 md:w-64 md:h-64 object-contain relative z-10"
              />
            </div>

            {/* Third Column: Text */}
            <div className="flex flex-col justify-center text-center">
              <motion.h3
                className="text-xl md:text-2xl font-bold mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Intelligence Layer
              </motion.h3>
              <p className="text-sm md:text-base max-w-xs mx-auto md:mx-0">
                Real-time learning and adaptation
              </p>
            </div>
          </div>

          {/* Second Row: Centered Text */}
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-3 text-center">
              <motion.h3
                className="text-xl md:text-2xl font-bold mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Intelligence Layer
              </motion.h3>
              <p className="text-sm md:text-base "></p>
              <p className="text-sm md:text-base ">
                Real-time learning and adaptation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="winiwinn" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
        {[ /* Features Grid Content as before */ ].map(({ id, title, description, iconSrc, apiFunction, price }) => (
          <div key={id} className="text-center group relative cursor-pointer">
            {/* Content goes here as before */}
          </div>
        ))}
      </div>

      {/* Use Cases and Technical Specs */}
      <div id="ibrand" className="grid grid-cols-1 lg:grid-cols-2 gap-16 text-center sm:text-left">
        <div>
          <motion.h2
            className="text-4xl font-bold mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Use Cases
          </motion.h2>
          <img
            src="/assets/icons/cc14.png"
            alt="SYMI OS Diagram"
            className="w-32 h-32 md:w-96 md:h-80 object-contain mx-auto lg:mx-0 relative z-10"
          />
        </div>

        <div>
          <motion.h2
            className="text-4xl font-bold mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Technical Specifications
          </motion.h2>
          <ul className="space-y-4 text-xl">
            <li>• API architecture</li>
            <li>• Automation capabilities</li>
            <li>• Intelligence algorithms</li>
            <li>• Security framework</li>
          </ul>

          <div className="my-10">
            <Link
              href="/access"
              className="inline-block bg-[#4600fa] text-white px-12 py-2 sm:first-letter:py-4 rounded-full text-md sm:text-xl font-medium transition-colors hover:animate-pulse"
            >
              Access the Framework
            </Link>
          </div>
        </div>
      </div>
      <FinalCTA />
    </section>
  );
}
