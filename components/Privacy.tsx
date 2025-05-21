"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#efe2fc] to-white dark:from-[#2D1B45] dark:to-[#1a1a2e] text-gray-800 dark:text-gray-200 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl p-8 sm:p-10 border border-purple-100/50 dark:border-purple-500/20"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-[#4C00FF]/20 rounded-full blur-xl opacity-70"></div>
              <h1 className="text-4xl sm:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 relative py-2">
                Privacy Policy
              </h1>
            </div>
          </div>

          <div className="mb-6 flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm border-b border-gray-200 dark:border-gray-700 pb-4">
            <p>Effective Date: 21/05/2025</p>
            <p>Last Updated: 21/05/2025</p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              At SYMI, your privacy matters. This Privacy Policy explains how we collect, use, and protect your information when you interact with our website, systems, and services.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">1. What We Collect</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may collect the following data when you use SYMI:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-700 dark:text-gray-300">
              <li>Name and contact information (email, phone)</li>
              <li>Usage data (pages visited, forms submitted)</li>
              <li>Payment details (only if you purchase a service)</li>
              <li>Input data you submit through our systems or agents</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              We do not collect sensitive personal data unless you choose to provide it.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">2. How We Use Your Data</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We use your data to:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-700 dark:text-gray-300">
              <li>Deliver the services you request</li>
              <li>Improve our systems and user experience</li>
              <li>Respond to inquiries and support requests</li>
              <li>Process secure payments</li>
              <li>Send service updates or relevant communication (you can opt out anytime)</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">3. Data Protection</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We store data securely using encrypted protocols and trusted infrastructure.
              We implement appropriate technical and organizational safeguards to protect your data.
              We do not sell your personal information.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">4. Third-Party Services</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We use trusted third-party services (e.g. payment processors, automation tools like OPERA) that may process data on our behalf.
              These services are vetted and comply with global privacy regulations.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">5. Your Rights</h2>
            <p className="text-gray-700 dark:text-gray-300">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-700 dark:text-gray-300">
              <li>Access your data</li>
              <li>Request correction or deletion</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              To make a request, contact us at: <a href="mailto:contact@symi.io" className="text-[#4C00FF] dark:text-[#8E65FF] hover:underline">contact@symi.io</a>
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">6. Cookies</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We currently do not use cookies or tracking technologies on our website.
              If this changes, we will update this policy accordingly and provide transparent information.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">7. Policy Updates</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may revise this Privacy Policy to reflect service changes or legal requirements.
              All updates will be posted here with the updated date.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">8. Contact</h2>
            <p className="text-gray-700 dark:text-gray-300">
              For questions or privacy-related concerns, email us at:
              <br />
              <a href="mailto:contact@symi.io" className="text-[#4C00FF] dark:text-[#8E65FF] hover:underline">contact@symi.io</a>
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <Link href="/blueprint" className="px-6 py-3 bg-gradient-to-r from-[#4C00FF] to-[#6E30FF] hover:from-[#4200e6] hover:to-[#5d28d8] text-white rounded-xl shadow-md shadow-purple-500/20 transition-all">
              Return to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}