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

  useEffect(() => {
  const role = localStorage.getItem("user_role");
  setUserRole(role);

  // Use getPaymentStatusFromCache to get payment status, plan_id, and premium status
  const { status, plan_id } = getPaymentStatusFromCache ? getPaymentStatusFromCache() : {};
  if (plan_id) {
    setActivePlanId(Number(plan_id)); // Ensure number type
  } else {
    setActivePlanId(null);
  }
  setIsPremium(status === "premium");
}, []);

  useEffect(() => {
    const fetchPricingPlans = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        router.push("/auth/login");
        return;
      }

      if (isTokenExpired()) {
        handleLogout(router);
        return;
      }

      try {
        const response = await fetch(
          `${config.apiBaseUrl}/pricing/admin/plans?token=${accessToken}`
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
  }, [router]);

  const handleCheckout = async (planId: number) => {
    const accessToken = localStorage.getItem("access_token");
    const userEmail = localStorage.getItem("user_email");
    if (!accessToken) {
      router.push("/auth/login");
      return;
    }

    try {
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
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        router.push(data.checkout_url);
      } else {
        console.error("Failed to create checkout session.");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <section className="relative overflow-hidden py-10">
      {/* Full Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-white -z-10"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-blue-500/20 to-purple-500/30 rounded-3xl blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-gray-700 dark:text-gray-300">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="section-subhead mb-6 py-10">Pricing</h1>
          <p className="text-lg sm:text-xl text-gray-800 max-w-2xl mx-auto pb-12">
            Choose the right level of intelligent automation to fit your vision.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white/5 backdrop-blur-sm rounded-3xl p-8 shadow-lg max-w-s mx-auto sm:max-w-lg hover:scale-105 hover:translate-y-1 hover:shadow-2xl transition-all duration-200 active:scale-95
                ${activePlanId === Number(plan.id) && isPremium ? "border-4 border-indigo-600" : ""}`}
              style={{ width: "375px", height: "500px" }}
            >
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
              <div className="space-y-4 mb-8">
                {plan.features.map((feature: string, i: number) => (
                  <FeatureItem key={i} text={feature} />
                ))}
              </div>
              {activePlanId === Number(plan.id) && isPremium ? (
                <div className="w-full flex justify-center items-center py-3">
                  <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-xl font-semibold text-lg">
                    Active
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => handleCheckout(plan.id)}
                  className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all ${
                    userRole === "admin" ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={userRole === "admin"}
                >
                  Start this Plan
                </button>
              )}
            </div>
          ))}
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
      <CheckCircle className="w-5 h-5 text-[#3A00F4]" />
      <span>{text}</span>
    </div>
  );
}