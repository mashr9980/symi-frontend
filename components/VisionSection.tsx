"use client";

import { CheckCircle } from "lucide-react";
import FinalCTA from "./FinalCTA";

export default function VisionSection() {
  return (
    <section className="relative overflow-hidden py-10">
      {/* Full Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-white -z-10"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-blue-500/20 to-purple-500/30 rounded-3xl blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="section-subhead mb-6 py-10">Our Vision</h1>
          <p className="text-lg sm:text-xl text-gray-800 max-w-2xl mx-auto pb-12">
            Choose the right level of intelligent automation to fit your vision.
          </p>
        </div>


        {/* Footer */}
        <FinalCTA />
      </div>
    </section>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle className="w-5 h-5 text-[#3A00F4]" />
      <span>{text}</span>
    </div>
  );
}
