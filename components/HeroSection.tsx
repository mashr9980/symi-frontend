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
  const [showTrialMessage, setShowTrialMessage] = useState(false);
  const [showAdminMessage, setShowAdminMessage] = useState(false);
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
          // Don't show messages on page load, only when user tries to chat again
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

  // Auto-hide trial message after 5 seconds
  useEffect(() => {
    if (showTrialMessage) {
      const timer = setTimeout(() => {
        setShowTrialMessage(false);
      }, 5000); // Hide after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [showTrialMessage]);

  // Auto-hide admin message after 5 seconds
  useEffect(() => {
    if (showAdminMessage) {
      const timer = setTimeout(() => {
        setShowAdminMessage(false);
      }, 5000); // Hide after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [showAdminMessage]);

  // Connect and send message via WebSocket
  const handleChatSend = async () => {
    if (!inputText.trim() || loading) return;

    // Store the current input before clearing
    const userQuestion = inputText;

    // If first chat is done and user tries to send again
    if (chatHistory.length > 0) {
      // Show appropriate message based on user role
      const userRole = getUserRole();
      if (userRole === "admin") {
        setShowAdminMessage(true);
        setHasAskedSecondQuestion(true);
      } else {
        setHasAskedSecondQuestion(true);
        setShowTrialMessage(true);
      }
      setInputText(""); // Clear input
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

  // Don't disable input after first chat, only disable when loading
  const chatDisabled = loading;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#efe2fc] to-white dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30">
      {/* Decorative elements - similar to SYMI Lab */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-purple-500/10 to-pink-500/20 rounded-3xl blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-500/5 to-purple-500/15 rounded-full blur-2xl pointer-events-none" />
      
      <div className="max-w-screen-xl mx-auto px-4 py-16 pt-32 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Hero Title */}
          <h1 className={`hero-headline text-black dark:text-white ${isMobile ? 'text-3xl' : 'text-[4rem]'} font-bold leading-tight text-center mb-6 letter-spacing:-0.05em`}>
            What are you building today?
          </h1>

          {/* Input Section */}
          <div className="w-full relative sacred-input-container mb-8">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={loading ? "Sending..." : "One sentence about who you are or what you're creating."}
              className={`text-gray-700 dark:text-gray-300 w-full pr-24 px-6 py-4 rounded-xl border border-gray-300 dark:border-gray-600 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3300fa] transition backdrop-blur-sm backdrop-blur-sm ${loading ? "bg-gray-100 text-gray-400" : ""}`}
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
              className="absolute right-14 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              onClick={() => fileInputRef.current?.click()}
              disabled={chatDisabled}
            >
              <ImageIcon className="w-6 h-6 text-sacred-ash dark:text-gray-400" />
              <input ref={fileInputRef} type="file" hidden accept="image/*" />
            </motion.button>

            {/* Send Button */}
            <motion.button
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-sacred-ash dark:bg-purple-600 text-sacred-ground dark:text-white rounded-full hover:bg-opacity-80 transition"
              onClick={handleChatSend}
              disabled={chatDisabled}
            >
              <Send className="w-6 h-6" />
            </motion.button>
          </div>

          {showTrialMessage && (
            <motion.div 
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gradient-to-r from-orange-100 to-orange-50 dark:from-orange-900/90 dark:to-orange-800/80 border border-orange-200 dark:border-orange-700 rounded-2xl p-6 backdrop-blur-sm shadow-lg max-w-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="text-center">
                <p className="text-orange-800 dark:text-orange-200 font-medium mb-4 text-base">
                  Your trial has ended. Please log in or upgrade your account to continue.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={() => {
                      setShowTrialMessage(false);
                      router.push("/auth/login");
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-lg font-medium transition-all duration-200 text-sm shadow-sm"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setShowTrialMessage(false);
                      router.push("/pricing");
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-medium transition-all duration-200 text-sm shadow-sm"
                  >
                    View Pricing
                  </button>
                  <button
                    onClick={() => setShowTrialMessage(false)}
                    className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg font-medium transition-all duration-200 text-sm shadow-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {showAdminMessage && (
            <motion.div 
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/90 dark:to-blue-800/80 border border-blue-200 dark:border-blue-700 rounded-2xl p-6 backdrop-blur-sm shadow-lg max-w-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="text-center">
                <p className="text-blue-800 dark:text-blue-200 font-medium mb-4 text-base">
                  Admin accounts cannot use the chat feature. Please sign up with a personal account to use chat.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={() => setShowAdminMessage(false)}
                    className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg font-medium transition-all duration-200 text-sm shadow-sm"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowAdminMessage(false);
                      router.push("/auth/signup");
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-medium transition-all duration-200 text-sm shadow-sm"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Flow Diagram */}
          <div className="mb-8">
            <Diagram />
          </div>
          
          <p className="hero-subhead text-gray-500 dark:text-gray-400 mb-6 text-base sm:text-xl text-center">
            We architect systems that scale like your ambition.
          </p>

          {/* Chat Section */}
          <div className="w-full max-w-2xl mx-auto mt-6">
            {(chatHistory.length > 0 || loading) && (
              <div className="backdrop-blur-sm backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Your Conversation with SYMI
                </h3>
                
                <div className="space-y-4">
                  {/* Question Section */}
                  <div className="backdrop-blur-sm backdrop-blur-md border border-gray-200 dark:border-gray-600 rounded-xl shadow-md">
                    <div className="px-6 py-5">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 block mb-1">You asked:</span>
                          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {chatHistory.length > 0 ? chatHistory[0].user : inputText}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Answer Section */}
                  <div className="backdrop-blur-sm backdrop-blur-md border border-gray-200 dark:border-gray-600 rounded-xl shadow-md">
                    <div className="px-6 py-5">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-purple-600 dark:text-purple-400">SYMI's Response:</span>
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
                          className="text-base text-gray-700 dark:text-gray-300 leading-relaxed max-h-96 overflow-y-auto"
                          dangerouslySetInnerHTML={{ 
                            __html: formatAIContent(chatHistory[0].ai) 
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Status Section - FAQ Style */}
                  <div className="backdrop-blur-sm backdrop-blur-md border border-gray-200/40 dark:border-gray-600/40 rounded-xl shadow-md">
                    <div className="px-6 py-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                        {loading
                          ? "🧠 SYMI is thinking..."
                          : "✨ This was your free demo. Ask another question to see upgrade options."}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="mt-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <FinalCTA />
        </motion.div>
      </div>
    </div>
  );
}