"use client";
import {
  CheckCircle,
  Mail,
  Globe,
  LineChart,
  BarChart2,
  Briefcase,
} from "lucide-react";
import DeeperLinksSection from "./DeeperLinksSection";

export default function TrustBoostingSection() {
  return (
    <section className=" inset-0 bg-gradient-to-r from-purple-100 via-white to-purple-100 -z-10 py-20">
      <div className="absolute w-60 h-60 bg-purple-500/40 blur-2xl rounded-full z-0 hidden md:block"></div>

      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl font-normal text-gray-800 mb-12 tracking-tight">
          Built for modern entrepreneurs & systems thinkers.
        </h2>

        {/* Industries Served */}
        <div className="flex flex-wrap justify-center gap-12 mb-14">
          <div className="flex flex-col items-center w-full sm:w-auto">
            <div className="inline-block p-4 bg-purple-100 rounded-full shadow-md hover:bg-purple-200 transition">
              <Globe className="w-8 h-8 text-purple-600" />
            </div>
            <span className="mt-2 text-lg font-medium text-gray-600">SaaS</span>
          </div>
          <div className="flex flex-col items-center w-full sm:w-auto">
            <div className="inline-block p-4 bg-purple-100 rounded-full shadow-md hover:bg-purple-200 transition">
              <Briefcase className="w-8 h-8 text-purple-600" />
            </div>
            <span className="mt-2 text-lg font-medium text-gray-600">
              Coaching
            </span>
          </div>
          <div className="flex flex-col items-center w-full sm:w-auto">
            <div className="inline-block p-4 bg-purple-100 rounded-full shadow-md hover:bg-purple-200 transition">
              <Mail className="w-8 h-8 text-purple-600" />
            </div>
            <span className="mt-2 text-lg font-medium text-gray-600">
              E-commerce
            </span>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          <div className="bg-white p-10 rounded-xl shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
            <BarChart2 className="w-10 h-10 text-purple-600 mx-auto" />
            <h3 className="text-xl font-semibold mt-6 text-gray-800">
              Fully Automated Business OS
            </h3>
            <p className="text-gray-600 mt-2">
              Streamline operations without manual intervention.
            </p>
          </div>
          <div className="bg-white p-10 rounded-xl shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
            <LineChart className="w-10 h-10 text-purple-600 mx-auto" />
            <h3 className="text-xl font-semibold mt-6 text-gray-800">
              API-First Modular Logic
            </h3>
            <p className="text-gray-600 mt-2">
              Seamlessly integrate with your existing tools.
            </p>
          </div>
          <div className="bg-white p-10 rounded-xl shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
            <CheckCircle className="w-10 h-10 text-purple-600 mx-auto" />
            <h3 className="text-xl font-semibold mt-6 text-gray-800">
              Scalable & Customizable
            </h3>
            <p className="text-gray-600 mt-2">
              Easily grow and adapt your system as your business evolves.
            </p>
          </div>
        </div>

        {/* Optional Text */}
        <p className="text-lg font-medium text-gray-700 mt-12 max-w-2xl mx-auto">
          Join thousands of entrepreneurs already leveraging our fully automated
          system to transform their businesses.
        </p>
      </div>
      <DeeperLinksSection />
    </section>
  );
}
