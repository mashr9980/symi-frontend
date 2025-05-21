"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPaymentStatusFromCache } from "../utils/auth";

export default function FinalCTA() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check for mobile screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize(); // Initial check
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  const handleCreateBlueprintClick = async () => {
    setIsLoading(true);
    try {
      // Clear payment status cache to force fresh check
      localStorage.removeItem("payment_status");
      
      const { status, expiredStatus } = await getPaymentStatusFromCache();
      
      // If premium and not expired, go to prompt page
      if (status === "premium" && expiredStatus === false) {
        router.push("/prompt");
      } else {
        // Not premium or expired, go to pricing
        router.push("/pricing");
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
      router.push("/pricing");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 mt-10 sm:mt-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <button 
        onClick={handleCreateBlueprintClick}
        disabled={isLoading}
        className={`relative cta-button min-w-[160px] px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-[#4C00FF] hover:bg-[#4c2fd8] text-white rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-y-95 ${
          isLoading ? "opacity-80" : ""
        }`}
      >
        {isLoading ? (
          <>
            <span className="opacity-0">Create My Blueprint →</span>
            <span className="absolute inset-0 flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
          </>
        ) : (
          "Create My Blueprint →"
        )}
      </button>

      <p className={`${isMobile ? 'text-xs' : 'text-sm sm:text-md'} text-gray-500`}>
        We begin with a <strong>Blueprint</strong>. The rest is precision.
      </p>
    </motion.div>
  );
}