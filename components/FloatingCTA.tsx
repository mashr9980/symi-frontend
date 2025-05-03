// File: /components/FloatingCTA.tsx

"use client";
import { ArrowRight } from "lucide-react";

export default function FloatingCTA() {
  return (
    <div
      className="fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out"
    >
      <a
  href="/blueprint"
  className="flex items-center px-6 py-3 bg-[#4204ef] text-white rounded-full shadow-xl  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 hover:animate-pulse"
>
  <span className="mr-2">Create My Blueprint</span>
  <ArrowRight className="w-5 h-5" />
</a>

    </div>
  );
}
