"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { getPaymentStatusFromCache } from "../../utils/auth";
import PromptSection from '@/components/PromptSection';

export default function PromptPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authorized to view this page
    const checkAuthorization = async () => {
      setIsLoading(true);
      
      try {
        // Force fresh check of payment status
        localStorage.removeItem("payment_status");
        
        // Get payment status
        const { status, expiredStatus } = await getPaymentStatusFromCache();
        
        // Only allow access if user has premium status and it's not expired
        if (status === "premium" && expiredStatus === false) {
          setIsAuthorized(true);
        } else {
          // Redirect to pricing page after a short delay
          setTimeout(() => {
            router.push("/pricing");
          }, 100);
        }
      } catch (error) {
        console.error("Error checking authorization:", error);
        // Redirect to pricing on error
        setTimeout(() => {
          router.push("/pricing");
        }, 100);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthorization();
  }, [router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#efe2fc] to-white">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-12 w-12 text-[#4C00FF] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-lg text-gray-700">Loading your Blueprint...</p>
        </div>
      </div>
    );
  }

  // Show unauthorized message (will typically redirect before this is shown)
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#efe2fc] to-white">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Premium Access Required</h1>
          <p className="mb-6">The Blueprint prompt is only available to premium users. You'll be redirected to our pricing page momentarily.</p>
          <button 
            onClick={() => router.push("/pricing")}
            className="bg-[#4C00FF] text-white px-6 py-2 rounded-lg hover:bg-[#4c2fd8] transition-colors"
          >
            View Pricing Plans
          </button>
        </div>
      </div>
    );
  }

  // Show the prompt section if authorized
  return <PromptSection />;
}