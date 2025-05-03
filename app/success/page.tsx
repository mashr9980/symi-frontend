"use client";

import FinalCTA from "@/components/FinalCTA";
import Link from "next/link";
import { useEffect } from "react";

export default function SuccessPage() {
  useEffect(() => {
    const createConfetti = (delay: number) => {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.className =
          "w-2 h-2 rounded-full fixed top-1/2 left-1/2 animate-confetti z-50";
        confetti.style.backgroundColor =
          ["#ff00ff", "#00ffff", "#ffff00", "#ff6600", "#00ff66"][Math.floor(Math.random() * 5)];
        confetti.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 1000);
      }, delay);
    };

    createConfetti(0);
    createConfetti(500);
    createConfetti(1000);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tl from-[#8e70f9] via-[#cebcfc] to-[#d4c4fd] px-4 py-12 relative">
      {/* Glow Circles */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#ede4fe] rounded-full blur-3xl hidden md:block"></div>
      <div className="absolute left-0 top-2/3 -translate-y-1/2 w-72 h-72 bg-[#ede4fe] rounded-full blur-3xl hidden md:block"></div>

      {/* Centered Card */}
      <div className="flex flex-col items-center justify-center w-full z-10">
        <div className="w-full max-w-lg p-10 rounded-2xl backdrop-blur-md border border-white/15 bg-white/5 shadow-xl text-center animate-fadeScaleIn">
          {/* Icon w/ Pulse */}
          <div className="relative mb-6 flex justify-center">
            <div className="w-16 h-16 rounded-full border border-white/20 bg-white/10 flex items-center justify-center relative">
              <div className="absolute w-full h-full rounded-full animate-pulse border-2 border-amber-300 opacity-40 blur-md"></div>
              <img
                src="/assets/icons/cc25.png"
                alt="Success Icon"
                className="w-10 h-10"
              />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-[2rem] font-semibold text-white mb-4">
            Thank you. Your system is now live.
          </h1>

          {/* Subheadline */}
          <p className="text-[1rem] text-white opacity-80 mb-8">
            What’s next? Dive deeper into your roadmap.
          </p>

          {/* Blueprint ID */}
          <p className="text-sm font-mono text-white mb-6">
            Blueprint ID: SYMI-583920
          </p>

          {/* CTA Button */}
          <div className="mt-8">
            <Link
              href="/"
              className="inline-block rounded-full px-6 py-3 bg-amber-500 text-white shadow hover:scale-105 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* FinalCTA Positioned at the Bottom */}
      <div className="absolute bottom-4 w-full">
        <FinalCTA />
      </div>
    </main>
  );
}
