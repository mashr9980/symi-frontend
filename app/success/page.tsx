// "use client";

// import FinalCTA from "@/components/FinalCTA";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { getPaymentStatusFromCache } from "../../utils/auth";

// export default function SuccessPage() {
//   const router = useRouter();
//   const [isRedirecting, setIsRedirecting] = useState(false);
//   const [countdown, setCountdown] = useState(5);

//   useEffect(() => {
//     // Create confetti effect
//     const createConfetti = (delay: number) => {
//       setTimeout(() => {
//         const confetti = document.createElement("div");
//         confetti.className =
//           "w-2 h-2 rounded-full fixed top-1/2 left-1/2 animate-confetti z-50";
//         confetti.style.backgroundColor =
//           ["#ff00ff", "#00ffff", "#ffff00", "#ff6600", "#00ff66"][Math.floor(Math.random() * 5)];
//         confetti.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
//         document.body.appendChild(confetti);
//         setTimeout(() => confetti.remove(), 1000);
//       }, delay);
//     };

//     createConfetti(0);
//     createConfetti(500);
//     createConfetti(1000);

//     // Update payment status in cache and redirect to prompt page
//     const updatePaymentAndRedirect = async () => {
//       setIsRedirecting(true);
      
//       try {
//         // Clear cache to force a refresh
//         localStorage.removeItem("payment_status");
        
//         // Fetch fresh payment status
//         await getPaymentStatusFromCache();
        
//         // Start countdown timer
//         const timer = setInterval(() => {
//           setCountdown(prev => {
//             if (prev <= 1) {
//               clearInterval(timer);
//               // Redirect to prompt page after countdown finishes
//               router.push("/prompt");
//               return 0;
//             }
//             return prev - 1;
//           });
//         }, 1000);
        
//         return () => clearInterval(timer);
//       } catch (error) {
//         console.error("Error updating payment status:", error);
//         // Even if there's an error, we still redirect to prompt after a delay
//         setTimeout(() => {
//           router.push("/prompt");
//         }, 5000);
//       }
//     };

//     updatePaymentAndRedirect();
//   }, [router]);

//   return (
//     <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tl from-[#8e70f9] via-[#cebcfc] to-[#d4c4fd] px-4 py-12 relative">
//       {/* Glow Circles */}
//       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#ede4fe] rounded-full blur-3xl hidden md:block"></div>
//       <div className="absolute left-0 top-2/3 -translate-y-1/2 w-72 h-72 bg-[#ede4fe] rounded-full blur-3xl hidden md:block"></div>

//       {/* Centered Card */}
//       <div className="flex flex-col items-center justify-center w-full z-10">
//         <div className="w-full max-w-lg p-10 rounded-2xl backdrop-blur-md border border-white/15 bg-white/5 shadow-xl text-center animate-fadeScaleIn">
//           {/* Icon w/ Pulse */}
//           <div className="relative mb-6 flex justify-center">
//             <div className="w-16 h-16 rounded-full border border-white/20 bg-white/10 flex items-center justify-center relative">
//               <div className="absolute w-full h-full rounded-full animate-pulse border-2 border-amber-300 opacity-40 blur-md"></div>
//               <img
//                 src="/assets/icons/cc25.png"
//                 alt="Success Icon"
//                 className="w-10 h-10"
//               />
//             </div>
//           </div>

//           {/* Headline */}
//           <h1 className="text-[2rem] font-semibold text-white mb-4">
//             Payment Successful!
//           </h1>

//           {/* Subheadline */}
//           <p className="text-[1rem] text-white opacity-80 mb-8">
//             Thank you for your purchase. Your Blueprint is now being activated.
//           </p>

//           {/* Redirect Message */}
//           <div className="bg-white/10 border border-white/20 rounded-lg p-4 mb-6">
//             <p className="text-white">
//               {isRedirecting ? (
//                 <>
//                   <span className="font-semibold">Redirecting to your Blueprint in {countdown} seconds...</span>
//                   <span className="block mt-2 text-sm opacity-80">You'll be automatically redirected to your Blueprint prompt.</span>
//                 </>
//               ) : (
//                 "Preparing your Blueprint..."
//               )}
//             </p>
//           </div>

//           {/* Blueprint ID */}
//           <p className="text-sm font-mono text-white mb-6">
//             Transaction ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
//           </p>

//           {/* CTA Button */}
//           <div className="mt-8">
//             <Link
//               href="/prompt"
//               className="inline-block rounded-full px-6 py-3 bg-amber-500 text-white shadow hover:scale-105 transition"
//             >
//               Go to Blueprint Now
//             </Link>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }