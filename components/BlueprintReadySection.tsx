"use client";

import { Mail, CheckSquare } from "lucide-react";
import Link from "next/link";

export default function BlueprintReadySection() {
  return (
    <section id="blueprint-ready" className="max-w-7xl mx-auto px-4 py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white -z-10"></div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-8xl font-serif mb-6">
          Your Blueprint<br />
          is Ready.
        </h1>
        
        <p className="text-3xl mb-16">
          Your custom-built automation system<br />
          begins here.
        </p>

        <div className="grid grid-cols-2 gap-16 mb-20">
          {/* Left Column - Blueprint Card */}
          <div className="bg-white rounded-3xl p-12 shadow-lg aspect-square flex flex-col items-center justify-center">
            <div className="w-32 h-32 border-2 border-blue-600 rounded-xl relative mb-8">
              <div className="absolute inset-4 border-2 border-blue-600"></div>
              <div className="absolute inset-1/3 w-1/3 h-1/3 bg-blue-600 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <div className="text-2xl font-bold">BLUEPRINT</div>
            <div className="text-gray-600 mt-4">Step 2 of 3</div>
          </div>

          {/* Right Column - Content */}
          <div className="text-left">
            <h2 className="text-3xl font-bold mb-8">Included Automation</h2>
            
            <div className="flex flex-col gap-4 mb-12">
              <Mail className="w-8 h-8" />
              <CheckSquare className="w-8 h-8" />
            </div>

            <h2 className="text-3xl font-bold mb-6">Next Steps:</h2>
            <ul className="space-y-4 text-xl mb-12">
              <li>• Activate your first automation (takes &lt; 5 mins)</li>
              <li>• Book a call if needed</li>
              <li>• Expand your system when ready</li>
            </ul>

            <div className="space-y-4">
              <Link 
                href="/blueprint"
                className="block w-full bg-blue-600 text-white py-4 rounded-full text-xl font-medium hover:bg-blue-700 transition-colors text-center"
              >
                Open Blueprint
              </Link>
              <Link 
                href="/automations"
                className="block w-full border-2 border-black py-4 rounded-full text-xl font-medium hover:bg-gray-50 transition-colors text-center"
              >
                Add More Automations
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-2xl mb-4">
            Used by 1,200+ businesses across industries.
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-gray-600">Verified by SYMI</span>
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <CheckSquare className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}