"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";

// Project data
const projects = [
  {
    id: 1,
    title: "ECHO FRAMEWORK",
    description: "The Logic of Listening: Introducing the Echo Framework",
    status: "Blueprint",
    releaseWave: "Phase II – Fractal Bloom (Q3 2025)",
    image: "/assets/icons/cc11.png",
    overview: `In the architecture of SYMI, no system is meant to live in isolation.
The Echo Framework is our response to fragmentation — a protocol that lets systems speak to each other through resonance, not rigidity.
Most automations are chains.
Echo is a circle.
It allows agents, dashboards, user data, and client journeys to evolve modularly but synchronously — not through brittle integrations, but by inheriting rhythm from one another.`,
    vision: `Echo is the spine of a recursive enterprise.
• A coach launches a system → Echo reflects it across client onboarding, content, and follow-up.
• A professor creates a course → Echo auto-aligns payments, access, and feedback.
• An artist uploads a release → Echo links storefront, email drop, and collector agent.
Echo is not an API. It's a memory field.
It doesn't just connect — it remembers, learns, and adapts.`,
    currentPhase: `→ Core architecture drafted
→ Recursive signal routing tested in isolated builds
→ Awaiting release in Operator Circle for full-field resonance tests`,
    whyItMatters: `SYMI isn't just here to automate.
It's here to make digital systems feel like organs —
coherent, alive, and listening to each other.
Echo is how they listen.`
  },
  {
    id: 2,
    title: "SYNTHESIS ENGINE",
    description: "From Noise to Intelligence: The Synthesis Engine",
    status: "Blueprint",
    releaseWave: "Phase I – Recursive Economy Activation (Q2–Q3 2025)",
    image: "/assets/icons/cc20.png",
    overview: `Synthesis Engine is SYMI's internal alchemist.
Its purpose: convert unstructured reality into structured intelligence.
You give it:
• Raw text
• Fragments of ideas
• Testimonials
• Sales calls
• Journals
• Logs
• Voice notes
It returns:
• Actionable insights
• Structured blueprints
• New agent behaviors
• Recurring content models
• Automatable processes`,
    vision: `Everyone holds gold in their noise.
Synthesis Engine is built to detect semantic patterns hidden in the chaos — and mirror them back as business logic.
It's GPT with memory.
Not just words — but structure, rhythm, application.
Imagine:
• Upload a 20-min client rant → get a new product structure
• Drop in 3 DMs → get a viral sequence plan
• Feed in 5 conversations → get a new AI agent pre-configured`,
    philosophy: `The world is not short on information.
It's short on transmutation.
SYMI's Synthesis Engine is here to distill signal from story.`,
    currentPhase: `→ Logic core designed
→ Data transformation protocols live in internal alpha
→ Integration with blueprint builder planned in Fractal Expansion Pack`,
    whyItMatters: `SYMI doesn't just build with input.
It evolves from everything you've ever said, tried, or felt —
and turns that into intelligence that grows with you.
Synthesis is how you remember what you already knew.`
  }
];

export default function SymiLab() {
  const [activeProject, setActiveProject] = useState<number | null>(null);

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
          <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-6 text-center ">
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
          <h2 className="text-4xl sm:text-5xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-6 text-center">Experimental Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/20 mix-blend-overlay" />
                  <div className="bg-gradient-to-br from-purple-100 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/20 p-6 flex justify-center items-center h-48">
                    <div className="relative w-24 h-24">
                      <div className={`absolute inset-0 bg-purple-500/20 rounded-full blur-xl transition-opacity duration-300 ${activeProject === project.id ? 'opacity-100' : 'opacity-40'}`} />
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="relative z-10 w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="text-xs px-3 py-1 rounded-full font-medium bg-amber-100 text-amber-800">
                      {project.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-2 text-sm text-indigo-600 dark:text-indigo-400">
                    {project.releaseWave}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  
                  {activeProject === project.id && (
                    <motion.div 
                      className="mt-6 space-y-6"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div>
                        <h4 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-200">Overview</h4>
                        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line text-sm">{project.overview}</p>
                      </div>
                      
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <h4 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-200">
                          {project.id === 1 ? 'Vision' : 'Vision'}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line text-sm">{project.vision}</p>
                      </div>
                      
                      {project.id === 2 && project.philosophy && (
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                          <h4 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-200">Philosophy</h4>
                          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line text-sm">{project.philosophy}</p>
                        </div>
                      )}
                      
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <h4 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-200">Current Phase</h4>
                        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line text-sm">{project.currentPhase}</p>
                      </div>
                      
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <h4 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-200">Why It Matters</h4>
                        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line text-sm">{project.whyItMatters}</p>
                      </div>
                    </motion.div>
                  )}
                  
                  <button 
                    className="mt-4 inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                  >
                    {activeProject === project.id ? 'Close details' : 'Explore project'}
                    <svg className={`ml-2 w-4 h-4 transition-transform ${activeProject === project.id ? 'rotate-180' : ''}`} 
                      fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
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
          <h2 className="text-2xl sm:text-5xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">Join the Lab</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Interested in collaborating on experimental systems? We're always looking for visionary thinkers.
          </p>
          <Link 
            href="/blueprint"
            className="inline-block bg-[#4C00FF] text-white px-8 py-4 rounded-2xl text-lg transition-all hover:animate-pulse"
          >
            Start with a Blueprint
          </Link>
        </motion.div>
      </div>
    </div>
  );
}