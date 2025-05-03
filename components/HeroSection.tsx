"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ImageIcon, Send } from "lucide-react";
import Diagram from "./Diagram";
import FinalCTA from "./FinalCTA";

export default function HeroSection() {
  const [inputText, setInputText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="hero-section">
      {/* Soft Blur Background Accent */}
      <div className="absolute top-0 right-20 w-1/2 h-full bg-gradient-to-br from-blue-500/20 to-purple-500/30 rounded-3xl blur-3xl" />

      <div className="breathe-overlay max-w-3xl w-full text-center relative z-10 mt-4 sm:mt-32 ">
        {/* Intro Text */}
       

        {/* Hero Title */}
        <h1 className="hero-headline text-black text-[4rem] font-bold leading-tight text-center mb-6 letter-spacing:-0.05em">
        What are you building today?
        </h1>

        {/* Extra Blur Bubble */}
        <div className="absolute w-44 h-44 bg-purple-500/40 blur-2xl rounded-full z-0" />

        {/* Input Section */}
        <div className="w-full relative sacred-input-container">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type one sentence. We’ll do the rest."
            className="w-full pr-24 px-6 py-4 rounded-xl border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3300fa] transition"
          />

          {/* Image Upload */}
          <motion.button
            className="absolute right-14 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="w-6 h-6 text-sacred-ash" />
            <input ref={fileInputRef} type="file" hidden accept="image/*" />
          </motion.button>

          {/* Send Button */}
          <motion.button
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-sacred-ash text-sacred-ground rounded-full"
            onClick={() => {
              // Submission logic
            }}
          >
            <Send className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Flow Diagram */}
        <Diagram />
        <p className="hero-subhead text-gray-500 mb-6 ">
        We architect systems that scale like your ambition.
        </p>
        {/* Final CTA */}
        <div className="mt-16">
          <FinalCTA />
        </div>
      </div>
    </div>
  );
}
