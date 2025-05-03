"use client";
import { useEffect } from "react";
import Link from "next/link";
import FinalCTA from "./FinalCTA";
import { Play, ChevronDown } from "lucide-react";

export default function BlueprintV2() {
  // Optional scroll effect on flow steps
  useEffect(() => {
    const handleScroll = () => {
      const steps = document.querySelectorAll(".flow-step");
      steps.forEach((el, index) => {
        const speed = 0.05 + index * 0.01;
        const offset = window.scrollY * speed;
        (el as HTMLElement).style.transform = `translateY(${offset}px)`;
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#efe2fc] to-white -z-10"></div>

      {/* Main Form Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Form Column */}
          <div className="text-center lg:text-left">
     
            <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 leading-snug mt-1">
              BLUEPRINT
            </h2>

            <p className="text-md text-gray-500 mt-2">
              Your architecture. Our precision.
            </p>

            <div className="text-lg sm:text-xl text-gray-800 max-w-2xl mx-auto pb-12 mt-6">
              The Blueprint is your personalized system architecture. Designed to scale with Precision maps your growth into automations, assets and flow. Your answer - we build.
            </div>
          </div>

          {/* Visual Column */}
          <div className="relative hidden sm:block">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/30 rounded-3xl blur-3xl" />
            <div className="relative">
              <img
                src="/assets/icons/cc20.png"
                alt="Automation Diagram"
                className="relative w-full h-auto max-w-md mx-auto z-10"
              />
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-20 text-center">
          <Link
            href="/prompt"
            className="bg-black text-white px-8 py-4 rounded-2xl text-lg transition-all hover:animate-pulse"
          >
            Start with Blueprint
          </Link>

          <button className="border-2 bg-[#5212ff] text-white  px-8 py-4 rounded-2xl text-lg transition-all hover:animate-pulse">
            View Example
          </button>
        </div>
        {/* <FinalCTA /> */}
      </div>
    </section>
  );
}
