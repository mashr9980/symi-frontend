"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";

const manifestoText = `
Build systems that work like you do.

We believe in architecture over effort.

Not everyone wants to go faster.
Some want to go deeper.
To build something that grows with them — not burns them out.

We created SYMI for those who think in systems.
Who feel a truth in their structure, but lack the tools to express it.

We offer a starting point — a Blueprint —
and the possibility to grow it into something alive.

You are not a role.
You're not just a coach, a founder, a creator.
You're a pattern. A logic. A unique rhythm of action and insight.

SYMI doesn't box that — it builds around it.

Every system we create mirrors a person's way of seeing.
It's your second presence.
Your invisible assistant.
Your business logic — embodied.

We believe in calm leverage.
Not noise.
Not hacks.
Just clean structures, made to work while you rest, speak, write, or teach.

Our work begins when you stop running in circles.
It begins with a simple map — and a commitment to build something recursive.

We're not selling automation.
We're designing systems that earn, answer, and evolve.

Not for everyone.
But for those who want to scale without selling out.
To structure without stiffening.
To build a business that moves — but stays yours.

SYMI is a system.
But also a signal.
For a new kind of builder.
One who values depth over drama.
Substance over scale.
Freedom through form.

We don't promise freedom.
We offer something rarer: clarity that compounds.

And yes — there are others.
Not a trend. A pattern.
Coaches. Creators. Writers. Quiet operators.
People who've begun to build with us — not to escape the work,
but to build something that makes their work worth more.

You'll meet them soon.

It starts with a Blueprint.
`;

const stanzas = manifestoText.trim().split(/\n\s*\n/);

export default function ManifestoPage() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });

    // Parallax scroll effect for background elements
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.querySelectorAll('.parallax-bg').forEach((element, index) => {
        const speed = 0.05 + (index * 0.02);
        (element as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-purple-50 to-indigo-100 pt-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="parallax-bg absolute top-20 right-0 w-1/2 h-full bg-gradient-to-br from-purple-500/10 to-pink-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="parallax-bg absolute bottom-1/3 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-500/5 to-purple-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="parallax-bg absolute top-1/2 left-1/4 w-16 h-16 bg-indigo-500/20 rounded-full blur-xl pointer-events-none" />
      <div className="parallax-bg absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-500/20 rounded-full blur-xl pointer-events-none" />
      
      <div className="max-w-screen-xl mx-auto px-4 py-16 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center mb-12">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 blur-xl opacity-70 rounded-full transform scale-110"></div>
              <h1 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 leading-tight py-4 px-6 relative">
                SYMI Manifesto
              </h1>
            </div>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              {stanzas.map((stanza, idx) => (
                <motion.div
                  key={idx}
                  className={`bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-100/50 shadow-sm ${
                    idx === 0 || idx === stanzas.length - 1 
                      ? "bg-gradient-to-br from-white to-purple-50 shadow-lg border-purple-200/50" 
                      : ""
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.05 }}
                >
                  <p
                    className={
                      idx === 0
                        ? "text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed"
                        : idx === stanzas.length - 1
                        ? "text-xl md:text-2xl font-medium text-purple-700 mt-2"
                        : "text-lg md:text-xl text-gray-700 leading-relaxed whitespace-pre-line"
                    }
                  >
                    {stanza}
                  </p>
                </motion.div>
              ))}
              
              <div className="mt-16 flex justify-center">
                <Link href="/blueprint">
                  <motion.div
                    className="group relative inline-flex"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition duration-200"></div>
                    <button className="relative px-8 py-4 bg-white rounded-xl leading-none flex items-center">
                      <span className="flex items-center font-medium text-indigo-600 transition duration-200 group-hover:text-indigo-500">
                        Start with a Blueprint
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Subtle scroll indicator */}
      <motion.div 
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-sm text-gray-500 mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1">
          <motion.div 
            className="w-1.5 h-1.5 bg-gray-400 rounded-full"
            animate={{ 
              y: [0, 14, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}