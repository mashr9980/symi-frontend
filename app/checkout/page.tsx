// "use client";

// import { ArrowLeft, Shield, Clock, CheckCircle, Lock } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import Link from "next/link";
// import { Play } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import FAQSection from "@/components/FAQSection";
// import FinalCTA from "@/components/FinalCTA";

// const checkoutSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   email: z.string().email("Invalid email address"),
//   cardNumber: z.string().regex(/^\d{16}$/, "Invalid card number"),
//   cvc: z.string().regex(/^\d{3,4}$/, "Invalid CVC"),
// });

// type CheckoutForm = z.infer<typeof checkoutSchema>;

// export default function CheckoutPage() {
//   const router = useRouter();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [paymentError, setPaymentError] = useState("");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setFocus,
//   } = useForm<CheckoutForm>({
//     resolver: zodResolver(checkoutSchema),
//     mode: "onChange", // Validate on blur (field loses focus)
//   });

//   const onSubmit = async (data: CheckoutForm) => {
//     try {
//       setIsProcessing(true);
//       setPaymentError("");

//       // Here you would typically make an API call to your payment processor
//       // For demo purposes, we'll simulate a successful payment after 1 second
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       router.push("/success");
//     } catch (error) {
//       setPaymentError("Payment processing failed. Please try again.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-gradient-to-bl from-[#cfb8ee] via-[#815bcd] to-[#36238e] py-8">


//       <div className="max-w-7xl mx-auto px-4 py-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
//           {/* Left Column - Form */}
//           <div>
//           <h1 className="text-4xl sm:text-6xl font-serif text-white mb-4">
//           With Blueprint, you're activating your evolution.
//             </h1>
//             <p className="text-xl sm:text-2xl text-white/90 mb-8 lg:mb-12">
//             A partnership for progress begins here.
//             </p>

//             <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
//               {paymentError && (
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//                   {paymentError}
//                 </div>
//               )}

//               <div className="border-2 border-white/30 p-6 rounded-2xl space-y-6">
//                 <div>
//                   <label className="block text-white mb-2">Name</label>
//                   <input
//                     type="text"
//                     {...register("name")}
//                     placeholder="Enter your name"
//                     className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white"
//                   />
//                   {errors.name && (
//                     <p className="mt-1 text-red-300 text-sm">
//                       {errors.name.message}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-white mb-2">Email</label>
//                   <input
//                     type="email"
//                     {...register("email")}
//                     placeholder="Enter your email address"
//                     className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white"
//                   />
//                   {errors.email && (
//                     <p className="mt-1 text-red-300 text-sm">
//                       {errors.email.message}
//                     </p>
//                   )}
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="col-span-2 sm:col-span-1">
//                     <label className="block text-white mb-2">Card number</label>
//                     <input
//                       type="text"
//                       {...register("cardNumber")}
//                       placeholder="1234567890123456"
//                       maxLength={16}
//                       className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white"
//                     />
//                     {errors.cardNumber && (
//                       <p className="mt-1 text-red-300 text-sm">
//                         {errors.cardNumber.message}
//                       </p>
//                     )}
//                   </div>
//                   <div className="col-span-2 sm:col-span-1">
//                     <label className="block text-white mb-2">CVC</label>
//                     <input
//                       type="text"
//                       {...register("cvc")}
//                       placeholder="123"
//                       maxLength={4}
//                       className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white"
//                     />
//                     {errors.cvc && (
//                       <p className="mt-1 text-red-300 text-sm">
//                         {errors.cvc.message}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isProcessing}
//                   className="w-full bg-white text-purple-600 py-3 rounded-xl font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isProcessing ? "Processing..." : "Add credit card"}
//                 </button>

//                 <button className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-black/90 transition-colors flex items-center justify-center gap-2">
//                   <svg
//                     className="w-5 h-5"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                   >
//                     <path d="M20.067 8.478c.492.88.556 2.014.556 3.2v1.044c0 1.186-.064 2.32-.557 3.2-.494.88-1.23 1.478-2.215 1.478H5.152c-.984 0-1.72-.597-2.215-1.478C2.444 15.042 2.38 13.908 2.38 12.722v-1.044c0-1.186.064-2.32.557-3.2.494-.88 1.23-1.478 2.215-1.478h13.7c.984 0 1.72.597 2.215 1.478z" />
//                   </svg>
//                   PayPal
//                 </button>

//                 <button className="w-full bg-white/10 text-white py-3 rounded-xl font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
//                   <svg
//                     className="w-6 h-5"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                   >
//                     <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" />
//                   </svg>
//                   G Pay
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={isProcessing}
//                   className="w-full bg-[#3A00F4] text-white py-3 rounded-xl font-medium transition-colors hover:animate-pulse text-center disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isProcessing
//                     ? "Processing..."
//                     : "Activate My Blueprint €199"}
//                 </button>
//               </div>

//               <div className="space-y-4 pt-6">
//                 <div className="flex items-center gap-3 text-white/90">
//                   <Lock className="w-8 h-8" />
//                   <span className="text-xl">
//                     Secure checkout with encrypted data
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-3 text-white/90">
//                   <Clock className="w-8 h-8" />
//                   <span className="text-xl">48-Hour Delivery</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-white/90">
//                   <CheckCircle className="w-8 h-8" />
//                   <span className="text-xl">Satisfaction Guarantee</span>
//                 </div>
//               </div>
//             </form>
//           </div>

//           {/* Right Column - Preview */}
//           <div className="hidden lg:flex flex-col items-center mt-20">
//             <div className="bg-[#6747b4] backdrop-blur-lg rounded-3xl p-8 mb-8 w-96 aspect-square flex items-center justify-center">
//               <img
//                 src="/assets/icons/cc.jpg"
//                 alt="Automation Diagram"
//                 className="relative w-full h-auto max-w-md z-10 rounded-2xl"
//               />
//             </div>

//             <div className="flex gap-4 mb-8">
//               <button className="bg-white/10 backdrop-blur px-6 py-2 rounded-full text-white flex items-center gap-2">
//                 <svg
//                   className="w-8 h-5"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M20.067 8.478c.492.88.556 2.014.556 3.2v1.044c0 1.186-.064 2.32-.557 3.2-.494.88-1.23 1.478-2.215 1.478H5.152c-.984 0-1.72-.597-2.215-1.478C2.444 15.042 2.38 13.908 2.38 12.722v-1.044c0-1.186.064-2.32.557-3.2.494-.88 1.23-1.478 2.215-1.478h13.7c.984 0 1.72.597 2.215 1.478z" />
//                 </svg>
//                 PayPal
//               </button>
//               <button className="bg-white/10 backdrop-blur px-6 py-2 rounded-full text-white flex items-center gap-2">
//                 <svg
//                   className="w-6 h-5"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" />
//                 </svg>
//                 Google Pay
//               </button>
//             </div>

//             <button className="bg-white/10 backdrop-blur w-2/3 py-2 rounded-full text-white mb-8">
//               Other payment method
//             </button>

//             <div className="space-y-4 mb-12">
//               <div className="flex items-center gap-3 text-white">
//                 <Shield className="w-8 h-8" />
//                 <span className="text-xl">Secure Checkout</span>
//               </div>
//               <div className="flex items-center gap-3 text-white">
//                 <Clock className="w-8 h-8" />
//                 <span className="text-xl">48-Hour Delivery</span>
//               </div>
//               <div className="flex items-center gap-3 text-white">
//                 <CheckCircle className="w-8 h-8" />
//                 <span className="text-xl">Satisfaction Guarantee</span>
//               </div>
//             </div>

//             <blockquote className="text-3xl font-serif text-white text-center w-2/3">
//               "Our Blueprint was the catalyst for a new era of growth."
//             </blockquote>

//             <div>
//               <span className="relative flex justify-center items-center">
//                 {/* Glowy Background Circle */}
//                 <div className="absolute w-44 h-44 bg-purple-500/30 blur-2xl rounded-full z-0"></div>

//                 {/* Foreground Image */}
//                 <img
//                   src="/assets/icons/cc11.png"
//                   alt="Automation Diagram"
//                   className="relative w-36  h-auto z-10"
//                 />
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//       <FAQSection />
//         {/* <FinalCTA /> */}
//     </main>
//   );
// }
