"use client";

import FinalCTA from "@/components/FinalCTA";
import Link from "next/link";

export default function BlueprintV1() {
  return (
    <section className="relative overflow-hidden py-10">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-white -z-10" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-blue-500/20 to-purple-500/30 rounded-3xl blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="hero-headline text-black">
            SYMI TRANSFORMATION BLUEPRINT
          </h1>
          <div className="h-6" />
          <p className="section-subhead text-gray-800 max-w-2xl mx-auto">
            The Blueprint is your personalized system architecture. Designed to
            scale with precision, it maps your growth into automations, assets,
            and flow. You answer — we build{" "}
          </p>
          <p className="section-subhead text-gray-800 max-w-xl mx-auto mt-8">
            Strategic audit + one automation implementation for just €199
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Left Column */}
          <div className="mx-auto max-w-2xl bg-white rounded-3xl w-full lg:w-1/2">
            <div
              className="bg-gray-50 p-12 rounded-lg border border-transparent bg-clip-padding"
              style={{
                borderImage:
                  "linear-gradient(to bottom right, #f59e0b, transparent) 1",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
            >
              {/* Simulated Navbar */}
              <div className="border-b mb-6 rounded-t-lg py-4 shadow-sm">
                <div className="flex justify-start mb-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full bg-gray-200 mx-1"
                    />
                  ))}
                </div>
                <hr />
                <div className="flex justify-between items-center py-4">
                  <div className="text-xl">Logo</div>
                  <div className="space-x-4">
                    {["Overview", "Opportunities", "Execution"].map((item) => (
                      <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Report Content */}
              <div className="flex flex-col space-y-4">
                <h2 className="text-3xl font-semibold text-gray-800">
                  AUDIT REPORT
                </h2>
                <p className="text-xl text-gray-600">
                  Premium Business Audit for SaaS Excellence
                </p>
                <p className="text-lg text-gray-500">
                  For Alea Chen, InnovateCloud
                </p>

                <ul className="list-disc pl-5 text-gray-700">
                  <li
                    className="text-[1.25rem] leading-relaxed mb-6 hover:underline cursor-help"
                    title="Explanation Tooltip"
                  >
                    Sales potential not yet fully realized
                  </li>{" "}
                  <li
                    className="text-[1.25rem] leading-relaxed mb-6 hover:underline cursor-help"
                    title="Explanation Tooltip"
                  >
                    40+ hours weekly in non-scalable work
                  </li>{" "}
                  <li
                    className="text-[1.25rem] leading-relaxed mb-6 hover:underline cursor-help"
                    title="Explanation Tooltip"
                  >
                    Immediate optimization opportunities
                  </li>
                </ul>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Automation Offer
                  </h3>
                  <p className="text-gray-600">
                    Customer onboarding streamlined
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex justify-center items-start w-full lg:w-1/2 z-10">
            <div className="mt-20 lg:mt-40">
              <Link href="/prompt">
                <button className="cta-button min-w-[160px] px-8 py-4 text-lg cursor-pointer font-semibold bg-[#4C00FF] hover:bg-[#4c2fd8] text-white rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-y-95">
                  Start with the Blueprint
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <FinalCTA />

        {/* Scroll Cue */}
        <div className="flex justify-center mt-20">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-center justify-center animate-bounce">
            <div className="w-2 h-2 bg-gray-500 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
