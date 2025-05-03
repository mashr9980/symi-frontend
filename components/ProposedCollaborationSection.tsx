"use client";

import { Lock } from "lucide-react";
import { useEffect, useState } from "react";
import FinalCTA from "./FinalCTA";

export default function ProposedCollaborationSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    vision: "",
    pathToExpansion: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  // Optional scroll effect on flow steps
  useEffect(() => {
    const handleScroll = () => {
      const steps = document.querySelectorAll(".flow-step");
      steps.forEach((el, index) => {
        const speed = 0.05 + index * 0.01;
        const offset = window.scrollY * speed;
        (el as HTMLElement).style.transform = `translateY(${offset}px)`;
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white -z-10"></div>

      {/* Main Form Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form Column */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif mb-6">
              Proposed
              <br />
              Collaboration
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl mb-8">
              A partnership for progress begins here
            </p>

            <p className="text-lg sm:text-xl mb-12 text-gray-700">
              At SYMI, we believe in the power of collaboration to drive
              innovation and growth. Share your vision, and let's explore how we
              can create a future where intelligence expands possibilities.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-6 py-4 bg-white/50 backdrop-blur rounded-2xl border border-gray-200"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-6 py-4 bg-white/50 backdrop-blur rounded-2xl border border-gray-200"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <input
                type="text"
                placeholder="Vision"
                className="w-full px-6 py-4 bg-white/50 backdrop-blur rounded-2xl border border-gray-200"
                value={formData.vision}
                onChange={(e) =>
                  setFormData({ ...formData, vision: e.target.value })
                }
              />

              <textarea
                placeholder="Describe your plans for growth..."
                rows={4}
                className="w-full px-6 py-4 bg-white/50 backdrop-blur rounded-2xl border border-gray-200 resize-none"
                value={formData.pathToExpansion}
                onChange={(e) =>
                  setFormData({ ...formData, pathToExpansion: e.target.value })
                }
              />

              <button
                type="submit"
                className="w-full bg-[#4C00FF] text-white py-4 rounded-full text-xl font-medium transition-colors hover:animate-pulse"
              >
                Submit Proposal
              </button>

              <div className="flex items-center gap-2 justify-center text-gray-600">
                <Lock className="w-4 h-4" />
                <span>Your information is secure</span>
              </div>
            </form>
          </div>

          {/* Visual Column */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/30 rounded-3xl blur-3xl" />
            <div className="relative">
              <img
                src="/assets/icons/cc13.png"
                alt="Automation Diagram"
                className="relative w-full h-auto max-w-md z-10"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 text-2xl sm:text-3xl font-serif">
            <div>Drive innovation</div>
            <div>Expand opportunities</div>
            <div>Foster long-term success</div>
          </div>
          <FinalCTA />
        </div>
      </div>
    </section>
  );
}
