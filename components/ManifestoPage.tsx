"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "../components/Footer";
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
You’re not just a coach, a founder, a creator.
You’re a pattern. A logic. A unique rhythm of action and insight.

SYMI doesn’t box that — it builds around it.

Every system we create mirrors a person’s way of seeing.
It’s your second presence.
Your invisible assistant.
Your business logic — embodied.

We believe in calm leverage.
Not noise.
Not hacks.
Just clean structures, made to work while you rest, speak, write, or teach.

Our work begins when you stop running in circles.
It begins with a simple map — and a commitment to build something recursive.

We’re not selling automation.
We’re designing systems that earn, answer, and evolve.

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

We don’t promise freedom.
We offer something rarer: clarity that compounds.

And yes — there are others.
Not a trend. A pattern.
Coaches. Creators. Writers. Quiet operators.
People who’ve begun to build with us — not to escape the work,
but to build something that makes their work worth more.

You’ll meet them soon.

It starts with a Blueprint.
`;

const stanzas = manifestoText.trim().split(/\n\s*\n/);

export default function ManifestoPage() {
  return (
    <div className="w-full min-h-screen px-4 py-16 sm:py-24 flex flex-col items-center justify-center text-center relative overflow-hidden bg-gradient-to-br from-white via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30">
      <Head>
        <title>✧ SYMI Manifesto - Build Systems That Work Like You Do</title>
        <meta name="description" content="We believe in architecture over effort. Discover the SYMI philosophy." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Gradient background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-purple-500/20 to-pink-500/30 rounded-3xl blur-3xl pointer-events-none" />

      <motion.div
        className="max-w-3xl w-full space-y-12 z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="text-3xl sm:text-6xl font-semibold text-black leading-tight py-8 mt-20">
          SYMI Manifesto
        </h1>
        <motion.div
          className="space-y-6"
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
          <div className="mt-8 md:mt-12">
            <Link href="/blueprint" legacyBehavior>
              <a
                className="inline-block px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg md:text-xl"
              >
                Start with a Blueprint
                <span aria-hidden="true" className="ml-2">→</span>
              </a>
            </Link>
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
}