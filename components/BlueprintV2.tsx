"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FinalCTA from "./FinalCTA";
import { getPaymentStatusFromCache } from "../utils/auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const exampleImages = [
  "/assets/examples/symivision.jpg",
  "/assets/examples/offerstack.jpg",
  "/assets/examples/aftersymi.jpg"  
];

export default function BlueprintV2() {
  const [showPopup, setShowPopup] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // No automatic redirect here - just let users view the blueprint page
  }, []);

  const handleStartBlueprint = async () => {
    setIsLoading(true);
    try {
      localStorage.removeItem("payment_status");
      
      const { status, expiredStatus } = await getPaymentStatusFromCache();
      
      if (status === "premium" && expiredStatus === false) {
        router.push("/prompt");
      } else {
        router.push("/pricing");
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
      router.push("/pricing");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!showPopup) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === exampleImages.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [showPopup]);

  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-16">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#efe2fc] to-white -z-10"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl -z-5"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl -z-5"></div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 mt-12 mb-4 leading-tight">
            Your Blueprint<br className="md:hidden" /> Experience
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto">
            A personalized system architecture designed to scale with your vision and amplify your growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:order-1 order-2"
        >
          <div className="rounded-2xl bg-gradient-to-br from-white/20 to-indigo-50/30 backdrop-blur-md shadow-2xl p-8 border border-indigo-200/30 hover:shadow-indigo-200/40 hover:border-indigo-300/40 transition-all duration-500 group">
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-700">
                What You'll Receive:
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4 group/item hover:transform hover:scale-105 transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover/item:shadow-indigo-500/50 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-workflow">
                      <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                      <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                      <rect x="14" y="14" width="7" height="7" rx="1"></rect>
                      <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                      <path d="M10 7h4v10h-4z"></path>
                      <path d="M7 10v4h10v-4z"></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      Custom Architecture
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Your Personal Logic, Mapped
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 group/item hover:transform hover:scale-105 transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover/item:shadow-indigo-500/50 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cog">
                      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
                      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                      <path d="M12 2v2"></path>
                      <path d="M12 22v-2"></path>
                      <path d="m17 20.66-1-1.73"></path>
                      <path d="M11 10.27 7 3.34"></path>
                      <path d="m20.66 17-1.73-1"></path>
                      <path d="m3.34 7 1.73 1"></path>
                      <path d="M14 12h8"></path>
                      <path d="M2 12h2"></path>
                      <path d="m20.66 7-1.73 1"></path>
                      <path d="m3.34 17 1.73-1"></path>
                      <path d="m17 3.34-1 1.73"></path>
                      <path d="m7 20.66 1-1.73"></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      Built-in Automation
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Automation That Breathes with You
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 group/item hover:transform hover:scale-105 transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover/item:shadow-indigo-500/50 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-line-chart">
                      <path d="M3 3v18h18"></path>
                      <path d="m19 9-5 5-4-4-3 3"></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      Scalable Framework
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Grow with Structure, Not Stress
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Enhanced CTA Button */}
              <button
                onClick={handleStartBlueprint}
                disabled={isLoading}
                className="w-full mt-8 py-4 px-6 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 relative overflow-hidden group/button hover:scale-105"
              >
                {/* Animated background layers */}
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-xl blur opacity-0 group-hover/button:opacity-75 transition-opacity duration-300"></span>
                
                <span className="relative flex items-center justify-center">
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Start with Blueprint
                      <svg className="w-5 h-5 transition-transform group-hover/button:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  )}
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Visual */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:order-2 order-1 flex justify-center"
        >
          <div className="relative group">
            {/* Multiple layered background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-500/20 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-purple-400/10 to-indigo-400/10 rounded-full blur-2xl group-hover:scale-110 transition-all duration-700"></div>
            
            {/* Main image container */}
            <div className="relative z-10 bg-gradient-to-br from-white/10 to-indigo-50/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/30 transform group-hover:rotate-1 group-hover:scale-105 transition-all duration-700">
              {/* Inner glow effect */}
              <div className="absolute inset-4 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <img
                src="/assets/icons/cc20.png"
                alt="System Architecture Visualization"
                className="w-full max-w-md h-auto rounded-xl transform group-hover:scale-105 transition-all duration-700 relative z-10 shadow-lg"
              />
              
              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"></div>
              <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full opacity-40 group-hover:opacity-80 group-hover:scale-125 transition-all duration-700"></div>
              <div className="absolute top-1/4 -right-4 w-3 h-3 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full opacity-50 group-hover:opacity-90 group-hover:scale-150 transition-all duration-600"></div>
            </div>
            
            {/* Orbiting elements */}
            <div className="absolute top-1/3 -left-6 w-8 h-8 bg-gradient-to-br from-indigo-500/30 to-purple-600/30 rounded-full backdrop-blur border border-white/20 group-hover:animate-pulse transition-all duration-500"></div>
            <div className="absolute bottom-1/4 -right-8 w-6 h-6 bg-gradient-to-br from-purple-500/30 to-indigo-600/30 rounded-full backdrop-blur border border-white/20 group-hover:animate-bounce transition-all duration-700"></div>
          </div>
        </motion.div>
      </div>

        {/* Testimonial section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 text-center"
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-40 h-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent"></span>
            </div>
            <h3 className="relative inline-block px-4 bg-gradient-to-br from-[#efe2fc] to-white text-xl font-medium text-gray-700">
              Built from real systems
            </h3>
          </div>
          
          <blockquote className="mt-8 max-w-2xl mx-auto text-2xl text-gray-700 italic">
            "SYMI Blueprint was the catalyst for a new era of growth in our business."
          </blockquote>
          
          <div className="mt-4 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-200 shadow-sm">
              <img src="/assets/icons/cc11.png" alt="Customer" className="w-full h-full object-cover" />
            </div>
            <div className="ml-4 text-left">
              <p className="font-semibold text-gray-800">Alea Chen</p>
              <p className="text-sm text-gray-600">CEO, InnovateCloud</p>
            </div>
          </div>
        </motion.div>

        {/* Final CTA Section */}
        <div className="mt-24">
          <FinalCTA />
        </div>
      </div>

      {/* Popup with auto-scrolling image carousel */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full relative"
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-purple-600 transition-colors z-10"
              onClick={() => setShowPopup(false)}
              aria-label="Close"
            >
              <span className="flex items-center justify-center rounded-full bg-white hover:bg-purple-100 w-10 h-10 shadow-md transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x"><line x1="18" x2="6" y1="6" y2="18"></line><line x1="6" x2="18" y1="6" y2="18"></line></svg>
              </span>
            </button>
            <div className="flex flex-col items-center">
              <motion.img
                key={currentIndex}
                src={exampleImages[currentIndex]}
                alt={`Example ${currentIndex + 1}`}
                className="w-full h-[32rem] object-contain rounded-xl mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
              <div className="flex justify-center space-x-2 mt-2">
                {exampleImages.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-3 h-3 rounded-full ${idx === currentIndex ? 'bg-purple-600' : 'bg-gray-300'}`}
                    onClick={() => setCurrentIndex(idx)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}