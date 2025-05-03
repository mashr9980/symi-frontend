"use client";

import { useState } from "react";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpen(open === index ? null : index); // Toggle the FAQ dropdown
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="bg-[#8c68cf] backdrop-blur-lg p-6 rounded-xl space-y-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
          Frequently Asked Questions
        </h2>

        {/* FAQ Item 1 */}
        <div className="bg-white/10 text-white rounded-xl p-4 cursor-pointer">
          <div
            className="flex justify-between items-center"
            onClick={() => toggleAccordion(0)}
          >
            <span className="text-lg font-medium">What happens after I submit?</span>
            <span className="text-xl">{open === 0 ? "-" : "+"}</span>
          </div>
          {open === 0 && (
            <p className="mt-2 text-sm text-white/70">
              After submission, your blueprint will be processed, and you will receive a confirmation email with details and next steps.
            </p>
          )}
        </div>

        {/* FAQ Item 2 */}
        <div className="bg-white/10 text-white rounded-xl p-4 cursor-pointer">
          <div
            className="flex justify-between items-center"
            onClick={() => toggleAccordion(1)}
          >
            <span className="text-lg font-medium">Can I edit my blueprint later?</span>
            <span className="text-xl">{open === 1 ? "-" : "+"}</span>
          </div>
          {open === 1 && (
            <p className="mt-2 text-sm text-white/70">
              Yes, you can edit your blueprint at any time. You will have full control over its customization.
            </p>
          )}
        </div>

        {/* FAQ Item 3 */}
        <div className="bg-white/10 text-white rounded-xl p-4 cursor-pointer">
          <div
            className="flex justify-between items-center"
            onClick={() => toggleAccordion(2)}
          >
            <span className="text-lg font-medium">Do I need to install anything?</span>
            <span className="text-xl">{open === 2 ? "-" : "+"}</span>
          </div>
          {open === 2 && (
            <p className="mt-2 text-sm text-white/70">
              No, everything is handled online, and you don’t need to install any software to use your blueprint.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
