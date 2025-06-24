import "./globals.css";
import { Inter } from "next/font/google";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SYMI",
  description: "© 2025 SYMI. All rights reserved",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        {/* <Chatbot /> Floating chatbot added */}
        {/* <FloatingCTA /> */}
        <Footer />
      </body>
    </html>
  );
}