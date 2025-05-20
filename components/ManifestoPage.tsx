"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";

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
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30">
      <Head>
        <title>✧ SYMI Manifesto - Build Systems That Work Like You Do</title>
        <meta name="description" content="We believe in architecture over effort. Discover the SYMI philosophy." />
        <link rel="icon" href="/favicon.ico" />
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
            SYMI Manifesto
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              {stanzas.map((stanza, idx) => (
                <motion.p
                  key={idx}
                  className={
                    idx === 0
                      ? "text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-200 mb-10 md:mb-12 leading-snug"
                      : idx === stanzas.length - 1
                      ? "text-xl md:text-2xl font-medium text-purple-700 dark:text-purple-300 mt-12 md:mt-16 mb-10 md:mb-12"
                      : "text-lg md:text-xl text-gray-600 dark:text-gray-300 my-6 md:my-8 leading-relaxed whitespace-pre-line"
                  }
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.05 }}
                >
                  {stanza}
                </motion.p>
              ))}
              
              <div className="mt-16 flex justify-center">
                <Link href="/blueprint" legacyBehavior>
                  <a
                    className="border-2 bg-[#5212ff] text-white  px-8 py-4 rounded-2xl text-lg transition-all hover:animate-pulse"
                  >
                    Start with a Blueprint
                    <span aria-hidden="true" className="ml-2">→</span>
                  </a>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}