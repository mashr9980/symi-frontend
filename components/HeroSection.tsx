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

  const router = useRouter();

  // WebSocket ref
  const wsRef = useRef<WebSocket | null>(null);

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
          const { status, expiredStatus } = getPaymentStatusFromCache ? getPaymentStatusFromCache() : {};
          if (status === "premium" && expiredStatus === false) {
            router.replace("/prompt");
            return;
          } else if (status !== "premium" || expiredStatus === true) {
            router.replace("/pricing");
            return;
          }
          // Only show popup if not logged in or is admin
          setHasAskedSecondQuestion(true);
          setTrialExpired(true);
          return;
        }
      } catch {
        // ignore
      }
    }
  }, [router]);

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
  const handleChatSend = async () => {
    if (!inputText.trim() || loading) return;

    // If first chat is done and user tries to send again
    if (chatHistory.length > 0) {
      // 1. Check payment status from cache
      const { status, expiredStatus } = getPaymentStatusFromCache ? getPaymentStatusFromCache() : {};
      if (status === "premium" && expiredStatus === false) {
        router.replace("/prompt");
        return;
      } else if (status !== "premium" || expiredStatus === true) {
        router.replace("/pricing");
        return;
      }
      // Only show popup if not logged in or is admin
      setHasAskedSecondQuestion(true);
      setTrialExpired(true);
      return;
    }

    setLoading(true);
    setChatStarted(true);

    if (chatHistory.length === 0) {
      // Open WebSocket connection if not already open
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        wsRef.current = new WebSocket(config.webSocketUrl);

        wsRef.current.onopen = () => {
          wsRef.current?.send(inputText);
        };

        wsRef.current.onmessage = (event) => {
          const aiMessage = extractMessage(event.data);
          const chat = [{ user: inputText, ai: aiMessage }];
          setChatHistory(chat);
          setLoading(false);

          // Save to localStorage
          if (typeof window !== "undefined") {
            localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chat));
          }

          wsRef.current?.close();
        };

        wsRef.current.onerror = () => {
          setChatHistory([{ user: inputText, ai: "Sorry, there was a connection error." }]);
          setLoading(false);
        };
      } else {
        wsRef.current.send(inputText);
        setInputText("");
      }
    }
  };

  // Don't disable input after first chat, only disable when loading or popup
  const chatDisabled = loading || trialExpired;

  return (
    <div className="hero-section">
      {/* Soft Blur Background Accent */}
      <div className="absolute top-0 right-20 w-1/2 h-full bg-gradient-to-br from-blue-500/20 to-purple-500/30 rounded-3xl blur-3xl" />

      <div className="breathe-overlay max-w-3xl w-full text-center relative z-10 mt-4 sm:mt-32 ">
        {/* Hero Title */}
        <h1 className="hero-headline text-black text-[4rem] font-bold leading-tight text-center mb-6 letter-spacing:-0.05em">
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
            placeholder={loading ? "Sending..." : "Type one sentence. We’ll do the rest."}
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
        <p className="hero-subhead text-gray-500 mb-6 ">
          We architect systems that scale like your ambition.
        </p>

        {/* Chat Section */}
        <div className="w-full max-w-xl mx-auto mt-8">
          {(chatHistory.length > 0 || loading) && (
            <div className="bg-white/80 dark:bg-gray-900/60 rounded-xl shadow p-6 mb-4 text-left text-gray-700 dark:text-gray-300">
              <div className="mb-2 flex items-center">
                <span className="font-semibold text-indigo-700 dark:text-indigo-300">You:</span>
                <span className="ml-2 flex items-center">
                  {chatHistory.length > 0 ? chatHistory[0].user : inputText}
                  {loading && (
                    <span className="inline-flex items-center ml-2">
                      <svg className="animate-spin h-5 w-5 mr-1 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>
                      Sending...
                    </span>
                  )}
                </span>
              </div>
              <div>
                <span className="font-semibold text-purple-700 dark:text-purple-300">SYMI:</span>
                <span className="ml-2">
                  {chatHistory[0]?.ai}
                </span>
              </div>
              <div className="text-xs text-gray-400 mt-2">
                {loading
                  ? "SYMI is thinking..."
                  : "Chat is limited to one question. To continue, try asking another question."}
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-gray-700 dark:text-gray-300">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-semibold mb-4">Trial Expired</h2>
            <p className="mb-6">
              Your trial period has ended. If you want to proceed, please log in.
            </p>
            <button
              onClick={() => router.push("/auth/login")}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md font-semibold"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}