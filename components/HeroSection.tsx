"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ImageIcon, Send } from "lucide-react";
import Diagram from "./Diagram";
import FinalCTA from "./FinalCTA";
import config from "../config";
import { useRouter } from "next/navigation";
import { isTokenExpired, getPaymentStatusFromCache } from "../utils/auth";
const CHAT_STORAGE_KEY = "symi_hero_chat";

export default function HeroSection() {
  const [hasAskedSecondQuestion, setHasAskedSecondQuestion] = useState(false);
  const [inputText, setInputText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Chat state
  const [chatStarted, setChatStarted] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ user: string; ai: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [trialExpired, setTrialExpired] = useState(false);
  const [paymentData, setPaymentData] = useState<{ status: string | null, expiredStatus: boolean | null }>({ status: null, expiredStatus: null });
  const [isAdminPopup, setIsAdminPopup] = useState(false);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // WebSocket ref
  const wsRef = useRef<WebSocket | null>(null);

  // Check screen size for responsive layout
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize(); // Initial check
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Restore chat from localStorage if present
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(CHAT_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          parsed &&
          typeof parsed === "object" &&
          Array.isArray(parsed) &&
          parsed.length === 1 &&
          typeof parsed[0].user === "string" &&
          typeof parsed[0].ai === "string"
        ) {
          setChatHistory(parsed);

          // --- Check payment status on page load if chatHistory exists ---
          (async () => {
            const paymentData = await getPaymentStatusFromCache();
            setPaymentData(paymentData);

            const status = paymentData?.status;
            const expiredStatus = paymentData?.expiredStatus;

            const userRole = getUserRole();
            // Show appropriate popup based on user role
            if (userRole === "admin") {
              setIsAdminPopup(true); // Show admin-specific popup
              setHasAskedSecondQuestion(true);
            } else {
              // Show trial expired popup for regular users
              setHasAskedSecondQuestion(true);
              setTrialExpired(true);
            }
          })();
        }
      } catch {
        // ignore
      }
    }
  }, []);

  // Helper to get user role and login status from cache/localStorage
  function getUserRole() {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem("user_role");
    } catch {
      return null;
    }
  }

  // Helper to extract message content from JSON or plain string
  function extractMessage(data: string) {
    try {
      const parsed = JSON.parse(data);
      if (parsed && typeof parsed === "object" && "content" in parsed) {
        return parsed.content;
      }
      return data;
    } catch {
      return data;
    }
  }

  // Connect and send message via WebSocket
  // Helper function to format AI response content - more compact
  const formatAIContent = (content: string) => {
    return content
      // Convert markdown headers to more compact HTML
      .replace(/### \*\*(.*?)\*\*/g, '<div class="text-base font-semibold text-purple-600 dark:text-purple-400 mt-3 mb-2">$1</div>')
      .replace(/## 🎯 \*\*(.*?)\*\*/g, '<div class="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-3">🎯 $1</div>')
      .replace(/\*\*(.*?)\*\*/g, '<span class="font-medium text-gray-800 dark:text-gray-200">$1</span>')
      // Convert bullet points to compact list items
      .replace(/• (.*?)(?=\n|$)/g, '<div class="flex items-start mb-1"><span class="text-purple-500 mr-2">•</span><span class="text-sm">$1</span></div>')
      // Convert line breaks to minimal spacing
      .replace(/\n\n/g, '<div class="mb-2"></div>')
      .replace(/\n/g, '<br>')
      // Style the horizontal rule as subtle divider
      .replace(/---/g, '<div class="border-t border-gray-200 dark:border-gray-700 my-3"></div>')
      // Keep emojis normal size
      .replace(/(📊|🤖|📈|💰)/g, '$1');
  };

  // Connect and send message via WebSocket
  const handleChatSend = async () => {
    if (!inputText.trim() || loading) return;

    // Store the current input before clearing
    const userQuestion = inputText;

    // If first chat is done and user tries to send again
    if (chatHistory.length > 0) {
      // Show appropriate popup based on user role
      const userRole = getUserRole();
      if (userRole === "admin") {
        setIsAdminPopup(true);
        setHasAskedSecondQuestion(true);
      } else {
        setHasAskedSecondQuestion(true);
        setTrialExpired(true);
      }
      return;
    }

    setLoading(true);
    setChatStarted(true);
    setInputText(""); // Clear input immediately

    if (chatHistory.length === 0) {
      // Open WebSocket connection if not already open
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        wsRef.current = new WebSocket(config.webSocketUrlHome);

        wsRef.current.onopen = () => {
          wsRef.current?.send(userQuestion);
        };

        wsRef.current.onmessage = (event) => {
          try {
            // Parse the JSON message from WebSocket
            const messageData = JSON.parse(event.data);
            
            // Handle different message types
            if (messageData.type === "message") {
              const aiMessage = messageData.content;
              const chat = [{ user: userQuestion, ai: aiMessage }];
              setChatHistory(chat);
              setLoading(false);

              // Save to localStorage
              if (typeof window !== "undefined") {
                localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chat));
              }

              // Don't show popup automatically - wait for user's second question attempt
            } else if (messageData.type === "thinking") {
              // Handle thinking state
              console.log("AI is thinking:", messageData.message);
            } else if (messageData.type === "complete") {
              // Close WebSocket when demo is complete
              wsRef.current?.close();
            } else if (messageData.type === "error") {
              // Handle error messages
              const chat = [{ user: userQuestion, ai: messageData.message || "Sorry, there was an error." }];
              setChatHistory(chat);
              setLoading(false);
              wsRef.current?.close();
            }
          } catch (error) {
            // Fallback for non-JSON messages (if any)
            const aiMessage = event.data;
            const chat = [{ user: userQuestion, ai: aiMessage }];
            setChatHistory(chat);
            setLoading(false);
            wsRef.current?.close();
          }
        };

        wsRef.current.onerror = () => {
          setChatHistory([{ user: userQuestion, ai: "Sorry, there was a connection error. Please try again." }]);
          setLoading(false);
          wsRef.current?.close();
        };

        wsRef.current.onclose = () => {
          setLoading(false);
        };
      }
    }
  };

  // Don't disable input after first chat, only disable when loading or popup
  const chatDisabled = loading || trialExpired || isAdminPopup;

  return (
    <div className="hero-section">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#efe2fc] to-white -z-10"></div>

      <div className="breathe-overlay max-w-3xl w-full text-center relative z-10 mt-4 sm:mt-32 px-4 sm:px-0">
        {/* Hero Title */}
        <h1 className={`hero-headline text-black ${isMobile ? 'text-3xl' : 'text-[4rem]'} font-bold leading-tight text-center mb-6 letter-spacing:-0.05em`}>
          What are you building today?
        </h1>

        {/* Extra Blur Bubble */}
        <div className="absolute w-44 h-44 bg-purple-500/40 blur-2xl rounded-full z-0" />

        {/* Input Section */}
        <div className="w-full relative sacred-input-container">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={loading ? "Sending..." : "One sentence about who you are or what you're creating."}
            className={`text-gray-700 dark:text-gray-300 w-full pr-24 px-6 py-4 rounded-xl border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3300fa] transition ${loading ? "bg-gray-100 text-gray-400" : ""}`}
            disabled={chatDisabled}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleChatSend();
            }}
          />
          {loading && (
            <span className="absolute right-24 top-1/2 -translate-y-1/2 flex items-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              <span className="text-purple-500 text-sm">Sending...</span>
            </span>
          )}

          {/* Image Upload */}
          <motion.button
            className="absolute right-14 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition"
            onClick={() => fileInputRef.current?.click()}
            disabled={chatDisabled}
          >
            <ImageIcon className="w-6 h-6 text-sacred-ash" />
            <input ref={fileInputRef} type="file" hidden accept="image/*" />
          </motion.button>

          {/* Send Button */}
          <motion.button
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-sacred-ash text-sacred-ground rounded-full"
            onClick={handleChatSend}
            disabled={chatDisabled}
          >
            <Send className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Flow Diagram */}
        <Diagram />
        <p className="hero-subhead text-gray-500 mb-6 text-base sm:text-xl">
          We architect systems that scale like your ambition.
        </p>

        {/* Chat Section */}
        <div className="w-full max-w-2xl mx-auto mt-6">
      {(chatHistory.length > 0 || loading) && (
        <div className="bg-white/80 dark:bg-gray-900/60 rounded-xl shadow p-4 text-left text-gray-700 dark:text-gray-300">
          {/* User Question - Compact */}
          <div className="mb-3">
            <div className="flex items-start">
              <span className="font-semibold text-indigo-700 dark:text-indigo-300 mr-2 text-sm">You:</span>
              <span className="text-sm flex-1">
                {chatHistory.length > 0 ? chatHistory[0].user : inputText}
              </span>
            </div>
          </div>

          {/* AI Response - Compact */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
            <div className="flex items-start mb-2">
              <span className="font-semibold text-purple-700 dark:text-purple-300 mr-2 text-sm">SYMI:</span>
              {loading && (
                <div className="flex items-center">
                  <svg className="animate-spin h-4 w-4 mr-2 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  <span className="text-purple-500 text-xs">Analyzing...</span>
                </div>
              )}
            </div>
            
            {chatHistory[0]?.ai && (
              <div 
                className="text-sm leading-relaxed max-h-96 overflow-y-auto"
                dangerouslySetInnerHTML={{ 
                  __html: formatAIContent(chatHistory[0].ai) 
                }}
              />
            )}
          </div>

          {/* Status - Very compact */}
          <div className="text-xs text-gray-400 mt-3 pt-2 border-t border-gray-100 dark:border-gray-800">
            {loading
              ? "🧠 SYMI is thinking..."
              : "✨ This was your free demo. Ask another question to see upgrade options."}
          </div>
        </div>
      )}
    </div>

        {/* Final CTA */}
        <div className="mt-16">
          <FinalCTA />
        </div>
      </div>

      {/* Trial Expired Popup */}
      {trialExpired && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-gray-700 dark:text-gray-300 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4">Trial Expired</h2>
            <p className="mb-6">
              Your trial period has ended. If you want to proceed, please log in or upgrade your account.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => router.push("/auth/login")}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md font-semibold"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/pricing")}
                className="px-6 py-2 bg-purple-600 text-white rounded-md font-semibold mt-2 sm:mt-0"
              >
                View Pricing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin User Popup */}
      {isAdminPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-gray-700 dark:text-gray-300 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4">Admin Account Detected</h2>
            <p className="mb-6">
              Your account has admin privileges. Admin accounts cannot use the chat feature. 
              If you want to use the chat, please sign up with a personal account.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => setIsAdminPopup(false)}
                className="px-6 py-2 bg-gray-400 text-white rounded-md font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => router.push("/auth/signup")}
                className="px-6 py-2 bg-purple-600 text-white rounded-md font-semibold mt-2 sm:mt-0"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}