"use client";

import React, { useState } from "react";
import { faqsData } from "../data/faqs";
import { motion } from "framer-motion";

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full min-h-screen px-4 py-16 sm:py-24 flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Gradient background */}
       <div className="absolute inset-0 bg-gradient-to-br from-[#efe2fc] to-white -z-10"></div>

      <motion.div
        className="max-w-3xl w-full space-y-12 z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mt-6">
          Frequently Asked Questions
        </h1>
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          {faqsData.map((faq, idx) => (
            <motion.div
              key={faq.id}
              className="bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl shadow-md transition-all duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx }}
            >
              <button
                onClick={() => handleToggle(idx)}
                className="w-full text-left px-6 py-5 text-lg font-semibold text-gray-900 focus:outline-none flex justify-between items-center"
              >
                <span>{faq.question}</span>
                <span className="ml-4 text-indigo-500 text-2xl">
                  {openIndex === idx ? "−" : "+"}
                </span>
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-6 text-gray-700 text-base whitespace-pre-line animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FaqPage;