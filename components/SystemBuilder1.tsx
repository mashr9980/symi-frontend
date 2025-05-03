"use client";

import { motion } from "framer-motion";

export default function SystemBuilder1() {
  return (
    <div className="w-full min-h-screen px-4 py-16 sm:py-24 flex flex-col items-center justify-center text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-blue-500/20 to-purple-500/30 rounded-3xl blur-3xl" />

      <motion.div
        className="max-w-5xl w-full space-y-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="text-3xl sm:text-7xl font-semibold text-black leading-tight py-8">
          Modern entrepreneurs & systems thinkers
        </h1>

        <motion.p
          className="text-lg sm:text-xl font-light text-gray-700 pb-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Platforms. Systems. Websites. You name it. Whatever you imagine, we
          systemize it. We build. You lead. It’s your entire vision, brought to
          life.
        </motion.p>

        {/* Value Points */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-20 pt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          {/* Feature 1 */}
          <motion.div
            className="flex flex-col items-center space-y-4 px-8 py-16 bg-[rgba(255,255,255,0.05)] backdrop-blur-sm border border-[rgba(255,255,255,0.15)] rounded-xl hover:scale-105 hover:translate-y-[-4px] hover:shadow-xl transition-all duration-200 group"
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src="/assets/icons/cc32.png"
              alt="Automate lead capture"
              className="w-8 h-8 text-amber-500 group-hover:animate-pulse group-hover:filter group-hover:brightness-125 transition-colors duration-300"
            />
            <h3 className="text-3xl font-bold mb-2 text-black">Automate lead capture.</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Let your system qualify and engage automatically.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="flex flex-col items-center space-y-4 px-6 py-12 bg-[rgba(255,255,255,0.05)] backdrop-blur-sm border border-[rgba(255,255,255,0.15)] rounded-xl hover:scale-105 hover:translate-y-[-4px] hover:shadow-xl transition-all duration-200 group"
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src="/assets/icons/cc34.png"
              alt="Scale on demand"
              className="w-8 h-8 text-amber-500 group-hover:animate-pulse group-hover:filter group-hover:hue-rotate-60 transition-colors duration-300"
            />
            <h3 className="text-2xl font-bold mb-2 text-black">Scale on demand.</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Deploy workflows that grow with demand.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="flex flex-col items-center space-y-4 px-4 py-8 bg-[rgba(255,255,255,0.05)] backdrop-blur-sm border border-[rgba(255,255,255,0.15)] rounded-xl hover:scale-105 hover:translate-y-[-4px] hover:shadow-xl transition-all duration-200 group"
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src="/assets/icons/cc33.png"
              alt="Codify growth playbooks"
              className="w-8 h-8 text-amber-500 group-hover:animate-pulse group-hover:filter group-hover:hue-rotate-120 transition-colors duration-300"
            />
            <h3 className="text-xl font-bold mb-2 text-black">Codify growth playbooks.</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Turn strategy into executable code.
            </p>
          </motion.div>
        </motion.div>

        {/* Clear Price Positioning */}
        <motion.div
          className="pt-12 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p className="text-xl font-medium text-black">
            Starting at <span className="font-bold text-[#4C00FF]">€2,500</span>
          </p>
          <p className="text-gray-700 text-base">
            Full system architecture, frontend + backend, automation core.
          </p>
          <p className="text-sm text-gray-500 italic">
            Custom quote unlocked after Blueprint.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.button
          className="bg-[#4C00FF] hover:bg-[#4c2fd8] text-white px-8 py-4 rounded-xl text-base font-semibold transition duration-200 mt-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
Tailor Launch        </motion.button>

        {/* Final Note */}
        <motion.p
          className="text-sm text-gray-500 pt-6 w-full sm:w-2/3 mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <strong>SYMI System Builder™</strong> is already powering quiet
          revolutions behind modern businesses.
        </motion.p>
      </motion.div>
    </div>
  );
}
