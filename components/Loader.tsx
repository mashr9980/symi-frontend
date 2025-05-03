"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HomePage from "@/components/HomePage";

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);
  const [showHomepage, setShowHomepage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setShowHomepage(true);
    }, 2500); // Matches the original 2.5s loader duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="symi-loader"
        >
          <div className="symi-orb-loader" />
          <div className="loader-text">Initializing System...</div>
        </motion.div>
      )}

      {showHomepage && <HomePage />}
    </AnimatePresence>
  );
}
