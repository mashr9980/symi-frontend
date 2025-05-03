"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <motion.div
      className="w-full flex flex-col items-center justify-center text-center space-y-6 mt-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Link href="/blueprint">
        <button className=" cta-button min-w-[160px] px-8 py-4 text-lg font-semibold bg-[#4C00FF] hover:bg-[#4c2fd8] text-white rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-y-95">
        Create My Blueprint →
        </button>
      </Link> 

      <p className="text-sm sm:text-md text-gray-500">
        We begin with a <strong>Blueprint</strong>. The rest is precision.
      </p>
    </motion.div>
  );
}
