"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  Lightbulb, 
  Workflow, 
  Settings, 
  ShieldCheck, 
  Code, 
  Database, 
  CloudLightning, 
  BarChart3, 
  Activity
} from "lucide-react";
import FinalCTA from "./FinalCTA";
import Link from "next/link";

export default function SystemBuilder1() {
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

  return (
    <div className="w-full min-h-screen px-4 py-16 sm:py-24 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#F6F1FD] to-[#ECE6FB]">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-blue-500/20 to-purple-500/30 rounded-3xl blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#8e70f9]/20 rounded-full blur-3xl" />

      <motion.div
        className="max-w-5xl w-full space-y-16 z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="text-center space-y-6">
          <motion.div
            className="inline-block bg-[#4c00ff]/10 px-4 py-2 rounded-full mt-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* <span className="text-[#4c00ff] font-medium">System Builder</span> */}
          </motion.div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-5xl font-semibold text-black leading-tight">
            Modern entrepreneurs &
            <span className="block bg-gradient-to-r from-[#4c00ff] to-[#8e70f9] text-transparent bg-clip-text">systems thinkers</span>
          </h1>

          <motion.p
            className="text-lg sm:text-xl font-light text-gray-700 pb-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Platforms. Systems. Websites. You name it. Whatever you imagine, we
            systemize it. We build. You lead. It's your entire vision, brought to
            life.
          </motion.p>
        </div>

        {/* Visualization with Blurred Orbs */}
        <motion.div 
          className="relative w-full h-64 sm:h-80 my-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#4c00ff]/20 rounded-full blur-xl" />
          <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#8e70f9]/20 rounded-full blur-xl" />
          <div className="absolute bottom-1/3 right-1/3 transform translate-x-1/2 translate-y-1/2 w-36 h-36 bg-[#c8b5fa]/30 rounded-full blur-xl" />
          
          {/* Central Image */}
          {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
            <img
              src="/assets/icons/cc32.png"
              alt="System Visualization"
              className="w-40 h-40 sm:w-48 sm:h-48 object-contain"
            />
          </div> */}
          
          {/* Floating Icons */}
          <motion.div 
            className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-xl shadow-lg"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Code className="w-6 h-6 text-[#4c00ff]" />
          </motion.div>
          
          <motion.div 
            className="absolute top-2/3 left-1/5 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-xl shadow-lg"
            animate={{ 
              y: [0, 10, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 3.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Database className="w-6 h-6 text-[#8e70f9]" />
          </motion.div>
          
          <motion.div 
            className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-xl shadow-lg"
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, 8, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <CloudLightning className="w-6 h-6 text-[#4c00ff]" />
          </motion.div>
          
          <motion.div 
            className="absolute bottom-1/4 right-1/3 transform translate-x-1/2 translate-y-1/2 bg-white/80 p-3 rounded-xl shadow-lg"
            animate={{ 
              y: [0, -12, 0],
              rotate: [0, -8, 0]
            }}
            transition={{ 
              duration: 4.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <BarChart3 className="w-6 h-6 text-[#8e70f9]" />
          </motion.div>
        </motion.div>

        {/* Value Points */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          {/* Feature 1 */}
          <motion.div
            className="flex flex-col items-center space-y-4 px-6 py-8 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 border border-purple-100/30 hover:border-purple-200/50"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="w-12 h-12 flex items-center justify-center bg-[#4c00ff]/10 rounded-xl">
              <Lightbulb className="w-6 h-6 text-[#4c00ff]" />
            </div>
            <h3 className="text-xl font-bold mb-1 text-gray-800">Automate lead capture.</h3>
            <p className="text-gray-600 text-sm leading-relaxed text-center">
              Let your system qualify and engage automatically.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="flex flex-col items-center space-y-4 px-6 py-8 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 border border-purple-100/30 hover:border-purple-200/50"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="w-12 h-12 flex items-center justify-center bg-[#8e70f9]/10 rounded-xl">
              <Workflow className="w-6 h-6 text-[#8e70f9]" />
            </div>
            <h3 className="text-xl font-bold mb-1 text-gray-800">Scale on demand.</h3>
            <p className="text-gray-600 text-sm leading-relaxed text-center">
              Deploy workflows that grow with demand.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="flex flex-col items-center space-y-4 px-6 py-8 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 border border-purple-100/30 hover:border-purple-200/50"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="w-12 h-12 flex items-center justify-center bg-[#6747b4]/10 rounded-xl">
              <Settings className="w-6 h-6 text-[#6747b4]" />
            </div>
            <h3 className="text-xl font-bold mb-1 text-gray-800">Codify growth playbooks.</h3>
            <p className="text-gray-600 text-sm leading-relaxed text-center">
              Turn strategy into executable code.
            </p>
          </motion.div>
        </motion.div>

        {/* Clear Price Positioning */}
        <motion.div
          className="pt-6 pb-8 px-8 space-y-4 bg-white rounded-2xl shadow-xl border border-purple-100/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                Starting at <span className="text-[#4C00FF]">€2,500</span>
              </p>
              <p className="text-gray-700 text-base mt-1">
                Full system architecture, frontend + backend, automation core.
              </p>
            </div>
            
            <Link
              href="/blueprint"
              className="px-6 py-3 bg-[#4C00FF] text-white rounded-xl shadow-lg shadow-[#4C00FF]/20 hover:bg-[#3A00CC] transition-all font-medium flex items-center gap-2"
            >
              <span>Get Started with Blueprint</span>
              <span className="text-lg">→</span>
            </Link>
          </div>
          <p className="text-sm text-gray-500 italic text-center sm:text-left">
            Custom quote unlocked after Blueprint.
          </p>
        </motion.div>

        {/* Testimonial Section */}
        <div className="rounded-2xl bg-gradient-to-br from-[#4c00ff]/5 to-[#8e70f9]/10 p-8 border border-purple-100/20">
          <div className="flex flex-col items-center">
            <div className="mb-6 w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img 
                src="/assets/icons/cc11.png" 
                alt="Testimonial"
                className="w-full h-full object-cover"
              />
            </div>
            <blockquote className="text-xl sm:text-2xl text-gray-800 text-center italic font-serif mb-6">
              "SYMI System Builder is not software — it's a structural shift."
            </blockquote>
            {/* <div className="text-center">
              <p className="font-medium text-gray-900">Alea Chen</p>
              <p className="text-sm text-gray-600">CEO, InnovateCloud</p>
            </div> */}
          </div>
        </div>

        {/* Final Note */}
        <motion.p
          className="text-sm text-center text-gray-500 pt-6 w-full sm:w-2/3 mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <strong>SYMI System Builder™</strong> is already powering quiet
          revolutions behind modern businesses.
        </motion.p>
        
        {/* Final CTA */}
        <FinalCTA />
      </motion.div>

      {/* Second part of system builder */}
      <div className="max-w-7xl w-full mt-20 pt-20 border-t border-purple-100/30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800">Core Architecture</h2>
            <p className="text-gray-700 mb-8 text-lg">
              Our systems are built on a recursive architecture that creates resilient intelligence structures.
              The core is designed to adapt and evolve with your business needs.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#4c00ff]/10 flex items-center justify-center mt-1 flex-shrink-0">
                  <Activity className="w-5 h-5 text-[#4c00ff]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Real-time Adaptability</h3>
                  <p className="text-gray-600">
                    Systems that learn and evolve based on data patterns and user interactions.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#8e70f9]/10 flex items-center justify-center mt-1 flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#8e70f9]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Enterprise Security</h3>
                  <p className="text-gray-600">
                    Built with industry-leading security protocols and continuous monitoring.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#c8b5fa]/20 flex items-center justify-center mt-1 flex-shrink-0">
                  <Database className="w-5 h-5 text-[#6747b4]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Scalable Infrastructure</h3>
                  <p className="text-gray-600">
                    Built to grow with your business from day one, without redesigns or rebuilds.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4c00ff]/10 to-[#8e70f9]/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-100/30">
              <img 
                src="/assets/icons/cc18.png" 
                alt="System Architecture" 
                className="w-full h-auto"
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}