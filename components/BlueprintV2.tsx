"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FinalCTA from "./FinalCTA";
import { Play, ChevronDown, X } from "lucide-react";
import { getPaymentStatusFromCache } from "../utils/auth";
import { useRouter } from "next/navigation";

const exampleImages = [
  "/assets/examples/symivision.jpg",
  "/assets/examples/offerstack.jpg",
  "/assets/examples/aftersymi.jpg"  
];

export default function BlueprintV2() {
  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Check payment status on component mount
  useEffect(() => {
    // No automatic redirect here - just let users view the blueprint page
  }, []);

  const handleStartBlueprint = async () => {
    setIsLoading(true);
    try {
      // Clear payment status to force fresh check
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
      // Default to pricing page if there's an error
      router.push("/pricing");
    } finally {
      setIsLoading(false);
    }
  };

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

  // Auto-scroll images in popup every 3 seconds
  useEffect(() => {
    if (!showPopup) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === exampleImages.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [showPopup]);

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
          <button
            type="button"
            onClick={handleStartBlueprint}
            disabled={isLoading}
            className={`border-2 bg-[#5212ff] text-white px-8 py-4 rounded-2xl text-lg transition-all hover:animate-pulse ${
              isLoading ? "opacity-80" : ""
            }`}
          >
            {isLoading ? (
              <>
                <span className="opacity-0">Start with Blueprint</span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              </>
            ) : (
              "Start with Blueprint"
            )}
          </button>

          {/* <button
            className="border-2 bg-[#5212ff] text-white px-8 py-4 rounded-2xl text-lg transition-all hover:animate-pulse"
            onClick={() => setShowPopup(true)}
          >
            Blueprint Vision
          </button> */}
        </div>
      </div>

      {/* Popup with auto-scrolling image carousel */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-3xl w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-[#5212ff] transition-colors"
              onClick={() => setShowPopup(false)}
              aria-label="Close"
              style={{ padding: 0, background: "none", border: "none" }}
            >
              <span className="flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#ece6ff] w-12 h-12 shadow-md transition-all">
                <X size={32} className="text-[#5212ff]" />
              </span>
            </button>
            <div className="flex flex-col items-center">
              <img
                src={exampleImages[currentIndex]}
                alt={`Example ${currentIndex + 1}`}
                className="w-full h-[32rem] object-contain rounded-xl mb-4 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}