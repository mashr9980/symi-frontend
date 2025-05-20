"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";

// Sample project data - you can replace this with actual data later
const projects = [
  {
    id: 1,
    title: "Neural Scheduler",
    description: "An AI-powered scheduling system that adapts to your workflow patterns and optimizes your calendar automatically.",
    status: "experimental",
    image: "/assets/icons/cc18.png",
    link: "#neural-scheduler"
  },
  {
    id: 2,
    title: "Echo Framework",
    description: "A modular architecture for connecting business systems with minimal integration overhead.",
    status: "blueprint",
    image: "/assets/icons/cc11.png",
    link: "#echo-framework"
  },
  {
    id: 3,
    title: "Quantum Responder",
    description: "Client engagement platform that learns from every interaction to provide increasingly relevant responses.",
    status: "development",
    image: "/assets/icons/cc23.png",
    link: "#quantum-responder"
  },
  {
    id: 4,
    title: "Synthesis Engine",
    description: "Data transformation protocol that converts unstructured information into actionable business intelligence.",
    status: "blueprint",
    image: "/assets/icons/cc20.png",
    link: "#synthesis-engine"
  }
];

export default function SymiLab() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30">
      <Head>
        <title>✧ SYMI Lab - Where Future Systems Are Born</title>
        <meta name="description" content="SYMI Lab is where we publish, archive, and preview experimental creations, agents, and architectures shaped by the SYMI mind." />
      </Head>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-purple-500/20 to-pink-500/30 rounded-3xl blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-500/10 to-purple-500/20 rounded-full blur-2xl pointer-events-none" />
      
      <div className="max-w-screen-xl mx-auto px-4 py-16 pt-32 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-6xl font-semibold text-black dark:text-white leading-tight text-center mb-12">
            SYMI Lab
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              <motion.p
                className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-200 mb-10 md:mb-12 leading-snug text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                SYMI Lab is where future systems are born.
              </motion.p>
              
              <motion.p
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 my-6 md:my-8 leading-relaxed text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Here we publish, archive, and preview the experimental creations, agents, and architectures shaped by the SYMI mind.
              </motion.p>
              
              <motion.p
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 my-6 md:my-8 leading-relaxed text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Some will become products. Others will stay as blueprints.
              </motion.p>
              
              <motion.p
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 my-6 md:my-8 leading-relaxed text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                But all of them are possibilities — visible echoes of an invisible system.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        {/* Project Showcase */}
        <motion.div
          className="mt-20 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-center mb-16">Experimental Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/20 mix-blend-overlay" />
                  <div className="bg-gradient-to-br from-purple-100 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/20 p-6 flex justify-center items-center h-48">
                    <div className="relative w-24 h-24">
                      <div className={`absolute inset-0 bg-purple-500/20 rounded-full blur-xl transition-opacity duration-300 ${hoveredProject === project.id ? 'opacity-100' : 'opacity-40'}`} />
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="relative z-10 w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      project.status === 'experimental' ? 'bg-amber-100 text-amber-800' :
                      project.status === 'blueprint' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <Link 
                    href={project.link}
                    className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                  >
                    Explore project
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Get Involved Section */}
        <motion.div
          className="mt-24 max-w-3xl mx-auto text-center bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-purple-100 dark:border-purple-900/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Join the Lab</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Interested in collaborating on experimental systems? We're always looking for visionary thinkers.
          </p>
          <Link 
            href="/blueprint"
            className="border-2 bg-[#5212ff] text-white  px-8 py-4 rounded-2xl text-lg transition-all hover:animate-pulse"
          >
            Start with a Blueprint
          </Link>
        </motion.div>
      </div>
    </div>
  );
}