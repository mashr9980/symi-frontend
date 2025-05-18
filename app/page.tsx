// "use client";
// import { useEffect, useState } from "react";
// import { AnimatePresence } from "framer-motion";
// import Loader from "@/components/Loader";
// import HeroSection from "@/components/HeroSection";

// export default function Home() {
//   const [showSplash, setShowSplash] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowSplash(false);
//     }, 2500); // Match the loader duration

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <main className="min-h-screen bg-gradient-custom">
//       <AnimatePresence mode="wait">
//         {showSplash ? (
//           <Loader key="splash" />
//         ) : (
//           <>
//             <HeroSection />
//           </>
//         )}
//       </AnimatePresence>
//     </main>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import HeroSection from "@/components/HeroSection";
// import { SacredInput } from "@/components/SacredInput";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if access token exists in localStorage
      const accessToken = localStorage.getItem("access_token");
      //router.push("/blueprint");
      // if (accessToken) {
      //   // Redirect to the home page if the token exists
      //   router.push("/blueprint");
      // } else {
      //   // Redirect to the login page if the token does not exist
      //   router.push("/auth/login");
      // }
    }, 0); // Match the loader duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-custom">
      <AnimatePresence mode="wait">
      
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="sacred-grid"
          >
           
              <HeroSection />
       
          </motion.div>
        
      </AnimatePresence>
    </main>
  );
}
