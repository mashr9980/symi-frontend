// "use client";

// import FinalCTA from "@/components/FinalCTA";
// import { CheckSquare } from "lucide-react";
// import Link from "next/link";

// export default function BlueprintReadyPage() {
//   return (
//     <main className="min-h-screen bg-gradient-to-br from-purple-50 to-white pt-6">
//       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#ede4fe] rounded-full blur-3xl"></div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12">
//         <div className="max-w-5xl mx-auto text-center relative">
//           <div className="absolute top-1/2 right-3/4 -translate-y-1/2 w-96 h-96 bg-[#e7dafe] rounded-full blur-3xl pointer-events-none -z-10"></div>
//           <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif mb-6 leading-tight tracking-wide">
//             Your Blueprint
//             <br />
//             is Ready.
//           </h1>

//           <p className="text-xl sm:text-2xl lg:text-3xl mb-12">
//             Your custom-built automation system
//             <br />
//             begins here.
//           </p>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 mb-20">
//             {/* Left Column - Blueprint Card */}
//             <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg flex flex-col items-center justify-center w-full aspect-square max-w-md mx-auto">
//               <div className="absolute w-44 h-44 bg-purple-500/30 blur-2xl rounded-full z-0"></div>
//               <img
//                 src="/assets/icons/cc24.png"
//                 alt="Automation Diagram"
//                 className="w-48 sm:w-60 h-auto"
//               />
//               <div className="text-3xl sm:text-4xl font-semibold mt-6 sm:mt-8">BLUEPRINT</div>
//               <div className="text-gray-600 mt-6">Step 2 of 3</div>
//             </div>

//             {/* Right Column - Content */}
//             <div className="text-center lg:text-left flex flex-col justify-center">
//               <h2 className="text-2xl sm:text-3xl font-bold mb-6">Included Automation</h2>

//               <div className="flex justify-center lg:justify-start mb-4">
//                 <img
//                   src="/assets/icons/cc23.png"
//                   alt="Automation Icon"
//                   className="w-16 sm:w-20 h-auto"
//                 />
//               </div>

//               <h2 className="text-2xl sm:text-3xl font-bold mb-4">Next Steps:</h2>
//               <ul className="space-y-3 text-lg sm:text-xl mb-10">
//                 <li>• Activate your first automation </li>
//                 <li>• Book a call if needed</li>
//                 <li>• Expand your system when ready</li>
//               </ul>

//               <div className="space-y-4">
//                 <Link
//                   href="/blueprint"
//                   className="block w-full bg-[#2700fa] text-white py-3 sm:py-4 rounded-full text-lg sm:text-xl font-medium transition-colors hover:animate-pulse text-center"
//                 >
//                   Open Blueprint
//                 </Link>
//                 <Link
//                   href="/automations"
//                   className="block w-full border-2 border-black py-3 sm:py-4 rounded-full text-lg sm:text-xl font-medium hover:bg-gray-50 transition-colors text-center"
//                 >
//                   Add More Automations
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="text-center">
//             <p className="text-lg sm:text-2xl mb-4">
//               Used by 1,200+ businesses across industries.
//             </p>
//             <div className="flex items-center justify-center gap-2">
//               <span className="text-gray-600">Verified by SYMI</span>
//               <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
//                 <CheckSquare className="w-4 h-4 text-white" />
//               </div>
//             </div>
//           </div>
//           <FinalCTA />
//         </div>
//       </div>
//     </main>
//   );
// }
