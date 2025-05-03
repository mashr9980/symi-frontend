
"use client";
import { useEffect } from "react";
import Link from "next/link";
import FinalCTA from "./FinalCTA";

export default function SimplicitySection() {
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
      <div className="absolute inset-0 bg-gradient-to-br from-[#eedffe] to-white -z-10"></div>

      {/* Main Form Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Form Column */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold leading-tight tracking-wide">
              Keep It Simple.
            </h1>

            <div className="text-base sm:text-lg md:text-2xl space-y-6 mt-8 sm:mt-10">
              <p>We build systems that reduce noise and amplify essence.</p>
              <p>Automation isn’t just for speed — it’s for clarity.</p>
              <p>Complexity is optional. Simplicity is sovereign.</p>
              <p>SYMI is your operating system for intelligent evolution.</p>
            </div>

            <hr className="text-gray-200 my-12 mx-auto lg:mx-0 w-2/3 sm:w-full" />

            <p className="text-lg sm:text-xl md:text-2xl font-semibold mt-6">
              Not a tool. A turning point.
            </p>
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
            href="/checkout"
            className="bg-[#3300fa] text-white px-8 py-4 rounded-full text-lg transition-all hover:animate-pulse"
          >
            Explore the Framework
          </Link>

          <button className="border-2 border-[#3300fa] px-8 py-4 rounded-full text-lg hover:bg-purple-50 transition-colors">
            Create My Blueprint
          </button>
        </div>
        <FinalCTA />
      </div>
    </section>
  );
}
