"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  Workflow,
  Settings,
  ShieldCheck,
} from "lucide-react";
import FinalCTA from "./FinalCTA";

export default function SystemBuilder2() {
  return (
    <div className="w-full min-h-screen px-4 sm:px-6 py-16 sm:py-24 flex flex-col items-center text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-blue-500/20 to-purple-500/30 rounded-3xl blur-3xl" />

      <motion.div
        className="max-w-4xl w-full space-y-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
          Already building quietly behind dozens of modern systems.
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 pt-8 sm:pt-10 max-w-4xl mx-auto">
          <FeatureCard
            icon={<Lightbulb className="w-7 h-7" />}
            title="Intelligent Builder"
            desc="Your vision, structured in minutes."
          />
          <FeatureCard
            icon={<Workflow className="w-7 h-7" />}
            title="Orchestrator"
            desc="Every tool. One flow."
          />
          <FeatureCard
            icon={<Settings className="w-7 h-7" />}
            title="Automation Engine"
            desc="Tasks disappear. Energy compounds."
          />
          <FeatureCard
            icon={<ShieldCheck className="w-7 h-7" />}
            title="Client Portals"
            desc="Elegant doors to your world."
          />
        </div>

        <div className="py-12">
          <div className="flex justify-center items-center gap-6 text-sm text-gray-600 flex-wrap">
            <span>API-First</span>
            <span>Modular</span>
            <span>Scalable</span>
            <span>Custom-Crafted</span>
          </div>
        </div>
        <FinalCTA />
      </motion.div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      className="flex flex-col items-center text-center space-y-3 px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-[#EDE7FB] text-[#4C00FF] p-4 rounded-full">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-black">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </motion.div>
  );
}
