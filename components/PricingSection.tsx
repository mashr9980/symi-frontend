"use client";

import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import FinalCTA from "./FinalCTA";
import Link from "next/link";
import config from "../config";
import { isTokenExpired, handleLogout, getPaymentStatusFromCache } from "../utils/auth";
import { useRouter } from "next/navigation";

export default function PricingSection() {
  const [plans, setPlans] = useState<any[]>([]);
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [activePlanId, setActivePlanId] = useState<number | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [processingPlan, setProcessingPlan] = useState<number | null>(null);

  // Check payment status on component mount
  useEffect(() => {
    const fetchPaymentStatus = async () => {
      setIsLoading(true);
      try {
        const role = localStorage.getItem("user_role");
        setUserRole(role);

        // Force refresh payment status
        localStorage.removeItem("payment_status");
        
        // Get payment status from API
        const { status, plan_id, expiredStatus } = await getPaymentStatusFromCache();
        
        // Check if user has premium status and redirect if needed
        if (status === "premium" && expiredStatus === false) {
          // Set state first
          setIsPremium(true);
          if (plan_id) {
            setActivePlanId(Number(plan_id));
          }
          
          // Redirect premium users to prompt page - they shouldn't be on pricing
          router.push("/prompt");
          return;
        } else {
          // Update states if user doesn't have premium or it's expired
          setIsPremium(status === "premium");
          if (plan_id) {
            setActivePlanId(Number(plan_id));
          } else {
            setActivePlanId(null);
          }
        }
      } catch (error) {
        console.error("Error fetching payment status:", error);
        setIsPremium(false);
        setActivePlanId(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentStatus();
  }, [router]);

  // Fetch pricing plans
  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        const response = await fetch(
          `${config.apiBaseUrl}/pricing/admin/plans`
        );

        if (response.ok) {
          const data = await response.json();
          setPlans(data);
        } else {
          console.error("Failed to fetch pricing plans.");
        }
      } catch (error) {
        console.error("Error fetching pricing plans:", error);
      }
    };

    fetchPricingPlans();
  }, []);

  const handleCheckout = async (planId: number) => {
    setProcessingPlan(planId);
    
    const accessToken = localStorage.getItem("access_token");
    const userEmail = localStorage.getItem("user_email");
    
    if (!accessToken) {
      router.push("/auth/login");
      return;
    }

    try {
      // Clear payment status cache to ensure we get fresh data after checkout
      localStorage.removeItem("payment_status");
      
      const response = await fetch(
        `${config.apiBaseUrl}/payment/create-checkout-session?token=${accessToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plan_id: planId,
            currency: "eur",
            email: userEmail,
            // Set success URL to redirect to prompt page after successful payment
            success_url: `${window.location.origin}/prompt`,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Redirect to Stripe checkout
        window.location.href = data.checkout_url;
      } else {
        console.error("Failed to create checkout session.");
        alert("Failed to create checkout. Please try again.");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setProcessingPlan(null);
    }
  };

  // Helper function to determine if a plan can be selected
  const canSelectPlan = (plan: any) => {
    // Admin users can't select plans
    if (userRole === "admin") {
      return false;
    }
    
    // If user already has a premium plan and it's this one, it's already selected
    if (isPremium && activePlanId === plan.id) {
      return false;
    }
    
    // Free users or expired premium users can select any plan
    return true;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-white">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-12 w-12 text-[#4C00FF] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-lg text-gray-700">Loading pricing information...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden py-10">
      {/* Full Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-white -z-10"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-blue-500/20 to-purple-500/30 rounded-3xl blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-gray-700 dark:text-gray-300">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-semibold mb-6 py-10">Pricing</h1>
          <p className="text-lg sm:text-xl text-gray-800 max-w-2xl mx-auto pb-12">
            Choose the right level of intelligent automation to fit your vision.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {plans.map((plan, index) => {
            const isActive = activePlanId === Number(plan.id) && isPremium;
            const isSelectable = canSelectPlan(plan);
            
            return (
              <div
                key={index}
                className={`flex flex-col relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 shadow-lg max-w-s mx-auto sm:max-w-lg hover:shadow-2xl transition-all duration-200 ${
                  isActive ? "border-4 border-[#4C00FF]" : ""
                }`}
                style={{ width: "375px", height: "550px" }}
              >
                {isActive && (
                  <div className="absolute -top-3 -right-3 bg-[#4C00FF] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Current Plan
                  </div>
                )}
                
                <div className="flex-1 flex flex-col">
                  <div className="mb-6 text-center">
                    <div className="w-16 h-16 mb-4 mx-auto">
                      <img
                        src="/assets/icons/cc7.png"
                        alt={plan.name}
                      />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>
                  <div className="text-4xl font-bold mb-8 text-center">
                    {plan.currency} {plan.price}
                  </div>
                  <div
                    className={`space-y-4 mb-8 ${
                      plan.features.length > 3 ? "overflow-y-auto scroll-on-hover" : ""
                    }`}
                    style={plan.features.length > 3 ? { maxHeight: "144px" } : {}}
                  >
                    {plan.features.map((feature: string, i: number) => (
                      <FeatureItem key={i} text={feature} />
                    ))}
                  </div>
                </div>
                
                {/* Action area: badge or button */}
                <div className="w-full flex justify-center items-center mt-auto">
                  {isActive ? (
                    <Link 
                      href="/prompt" 
                      className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all text-center flex items-center justify-center"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Go to Your Blueprint
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleCheckout(plan.id)}
                      className={`w-full relative flex justify-center items-center ${
                        isSelectable 
                          ? "bg-indigo-600 hover:bg-indigo-700" 
                          : "bg-gray-400"
                      } text-white px-6 py-3 rounded-xl font-medium transition-all ${
                        !isSelectable ? "cursor-not-allowed" : ""
                      }`}
                      disabled={!isSelectable || processingPlan === plan.id}
                    >
                      {processingPlan === plan.id ? (
                        <>
                          <span className="opacity-0">Start this Plan</span>
                          <span className="absolute inset-0 flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </span>
                        </>
                      ) : (
                        "Start this Plan"
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
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
      <CheckCircle className="w-5 h-5 text-[#3A00FF]" />
      <span>{text}</span>
    </div>
  );
}