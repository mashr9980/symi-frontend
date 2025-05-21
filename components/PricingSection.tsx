"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Sparkles, Clock, Shield } from "lucide-react";
import FinalCTA from "./FinalCTA";
import Link from "next/link";
import config from "../config";
import { isTokenExpired, handleLogout, getPaymentStatusFromCache } from "../utils/auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function PricingSection() {
  const [plans, setPlans] = useState<any[]>([]);
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [activePlanId, setActivePlanId] = useState<number | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [processingPlan, setProcessingPlan] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsive layout
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize(); // Initial check
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white via-purple-50 to-indigo-100">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-lg"></div>
            <svg className="relative animate-spin h-12 w-12 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="mt-4 text-lg text-gray-700 font-medium">Loading pricing information...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen pt-24 overflow-hidden">
      {/* Background - using the same bg as other pages */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50 to-indigo-100 -z-10"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl -z-5"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl -z-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
            Choose the perfect plan for your business needs. All plans include our core automation and Blueprint features.
          </p>
        </motion.div>

        {/* Removed pricing toggle as requested */}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center mb-20">
          {plans.map((plan, index) => {
            const isActive = activePlanId === Number(plan.id) && isPremium;
            const isSelectable = canSelectPlan(plan);
            const isPopular = index === 0; // First plan is the popular one
            
            // Display the regular price
            const displayPrice = plan.price;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden transition-all duration-500 h-full"
              >
                {isPopular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-1 text-sm font-medium z-10">
                    Most Popular
                  </div>
                )}

                <div className={`flex flex-col h-full bg-white/80 backdrop-blur-md border transition-all duration-300 ${
                  isActive 
                    ? 'border-indigo-400 shadow-xl shadow-indigo-200/50' 
                    : 'border-purple-200 shadow-xl'
                } ${isPopular ? 'pt-10' : 'pt-6'} rounded-2xl overflow-hidden`}>
                  
                  {isActive && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Current Plan
                    </div>
                  )}
                  
                  {/* Plan Header */}
                  <div className="px-6 py-4 text-center border-b border-gray-100">
                    <div className="w-16 h-16 mx-auto mb-4 relative">
                      <div className="absolute inset-0 rounded-full bg-purple-100"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        {index === 0 ? (
                          <Sparkles className="w-8 h-8 text-purple-600" />
                        ) : index === 1 ? (
                          <Clock className="w-8 h-8 text-purple-600" />
                        ) : (
                          <Shield className="w-8 h-8 text-purple-600" />
                        )}
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-gray-900">{plan.name}</h2>
                    <p className="text-gray-600 text-sm min-h-[40px]">{plan.description}</p>
                    
                    <div className="mt-6 mb-4">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-3xl md:text-4xl font-bold text-gray-900">
                          {plan.currency === 'eur' ? '€' : '$'}{displayPrice}
                        </span>
                        <span className="text-gray-500 text-sm">/ month</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="flex-1 px-6 py-6">
                    <ul className="space-y-4">
                      {plan.features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-purple-600" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Action area */}
                  <div className="p-6 pt-2 border-t border-gray-100">
                    {isActive ? (
                      <Link 
                        href="/prompt" 
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-3 rounded-xl font-medium transition-all text-center flex items-center justify-center shadow-md shadow-green-600/20"
                      >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Access Your Blueprint
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleCheckout(plan.id)}
                        className={`w-full relative bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-3 rounded-xl font-medium transition-all shadow-md shadow-purple-600/20 ${
                          !isSelectable ? 'opacity-50 cursor-not-allowed' : ''
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
                          <>Get Started</>
                        )}
                      </button>
                    )}
                    {isPopular && (
                      <p className="text-center text-xs text-gray-500 mt-3">No credit card required to start</p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <motion.div 
          className="max-w-3xl mx-auto mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">Frequently Asked Questions</h2>
            <p className="text-gray-600">Have questions about our pricing? Find quick answers below.</p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-2">What's included in the Blueprint?</h3>
              <p className="text-gray-600">Our Blueprint includes a comprehensive system architecture, custom workflow design, and initial automation setup tailored to your specific business needs.</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-gray-600">Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades will apply at the end of your current billing cycle.</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Do you offer a money-back guarantee?</h3>
              <p className="text-gray-600">Yes, we offer a 14-day money-back guarantee for all our plans. If you're not satisfied, simply contact our support team for a full refund.</p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/faq" className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
              View all FAQs <span className="ml-1">→</span>
            </Link>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-16">
          <FinalCTA />
        </div>
      </div>
    </section>
  );
}