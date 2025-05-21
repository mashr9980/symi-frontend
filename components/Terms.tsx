"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TermsPage() {
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
                Terms of Service
              </h1>
            </div>
          </div>

          <div className="mb-6 flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm border-b border-gray-200 dark:border-gray-700 pb-4">
            <p>Effective Date: 21/05/2025</p>
            <p>Last Updated: 21/05/2025</p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Welcome to SYMI — a space for intelligent systems, creative infrastructure, and digital transformation.
              By accessing this website or using any of our services, you agree to the following terms and conditions.
              Please read them carefully.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">1. Who We Are</h2>
            <p className="text-gray-700 dark:text-gray-300">
              SYMI is a design and system-building collective.
              We create and deliver digital tools, content, services, and infrastructure to individuals, businesses, and communities.
              Contact: contact@symi.io
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">2. Use of Our Services</h2>
            <p className="text-gray-700 dark:text-gray-300">
              By using our site or services, you agree to:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-700 dark:text-gray-300">
              <li>Use them lawfully and respectfully</li>
              <li>Not misuse, copy, or resell any part of our work without permission</li>
              <li>Not use our tools or services to produce or promote harmful, fraudulent, or illegal content</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              We reserve the right to suspend or revoke access if terms are violated.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">3. Intellectual Property</h2>
            <p className="text-gray-700 dark:text-gray-300">
              All content, text, design, visuals, and systems presented on this site are the exclusive property of SYMI, unless otherwise credited.
              You may not reuse, reproduce, or distribute any part of our materials without express written consent.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">4. Payments & Refunds</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Some services are free; others are sold as one-time purchases or paid offerings.
              All payments are processed securely via third-party providers.
              If something goes wrong or you are dissatisfied, contact us within 7 days for review: contact@symi.io
              We review refund requests on a case-by-case basis.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">5. Data & Privacy</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We collect only what's necessary to operate this site and deliver services.
              We do not track users unnecessarily, and we do not sell your data.
              Full details are available in our <Link href="/privacy" className="text-[#4C00FF] dark:text-[#8E65FF] hover:underline">Privacy Policy</Link>.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">6. Availability</h2>
            <p className="text-gray-700 dark:text-gray-300">
              While we aim for high uptime, we may occasionally pause access for updates, testing, or improvements.
              We are not liable for temporary disruptions caused by third-party hosting or services.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">7. Limitation of Liability</h2>
            <p className="text-gray-700 dark:text-gray-300">
              SYMI is not liable for:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-700 dark:text-gray-300">
              <li>Damages resulting from misuse of our services</li>
              <li>Third-party tools or services you choose to integrate</li>
              <li>Indirect or incidental losses</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              In any case, our liability is limited to the amount paid for the service involved.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">8. Modifications to These Terms</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may update these terms at any time. If we do, we'll update the date and post the changes here.
              Your continued use of SYMI after changes means you accept the new terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">9. Governing Law</h2>
            <p className="text-gray-700 dark:text-gray-300">
              These terms are governed by French law.
              In case of dispute, we'll always seek to resolve things constructively first.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-indigo-700 dark:text-indigo-400">10. Contact</h2>
            <p className="text-gray-700 dark:text-gray-300">
              For any questions, legal inquiries, or concerns, please write to:
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