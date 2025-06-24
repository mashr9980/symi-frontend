"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import config from "../config";
import { isTokenExpired, handleLogout, getPaymentStatusFromCache } from "../utils/auth";
import { Send, Mic, Bot, Sparkles, SkipForward } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Add TypeScript definitions for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
  interpretation: any;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  grammars: any;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognition, ev: Event) => any) | null;
  onnomatch: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

export default function PromptSection() {
  // State management
  const [question, setQuestion] = useState("How can I help you build your system today?");
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: string, content: string, timestamp: Date}[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Skip functionality states
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [showSkipConfirmation, setShowSkipConfirmation] = useState(false);
  const [chatComplete, setChatComplete] = useState(false);
  const [skippedToReport, setSkippedToReport] = useState(false);
  
  // Refs
  const webSocketRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      if (typeof window !== 'undefined') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(isDark);
      }
    };
    
    checkDarkMode();
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => checkDarkMode();
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [userInput]);

  // Check window size for responsive layout
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Check if the user is logged in and has premium access, and if user is admin
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminWarning, setShowAdminWarning] = useState(false);
  
  useEffect(() => {
    const checkAuthorization = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        router.push("/auth/login");
        return;
      }
      
      if (isTokenExpired()) {
        handleLogout(router);
        return;
      }
      
      // Check if user is admin
      const userRole = localStorage.getItem("user_role");
      if (userRole === "admin") {
        setIsAdmin(true);
        setShowAdminWarning(true);
        return;
      }
      
      try {
        const { status, expiredStatus } = await getPaymentStatusFromCache();
        if (status === "premium" && expiredStatus === false) {
          setIsAuthorized(true);
        } else {
          router.push("/pricing");
        }
      } catch (error) {
        console.error("Error checking authorization:", error);
        router.push("/pricing");
      }
    };
    
    checkAuthorization();
  }, [router]);

  // Setup WebSocket connection
  useEffect(() => {
    if (!isAuthorized) return;
    
    const setupWebSocket = () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) return;
      
      const ws = new WebSocket(config.webSocketUrl);
      
      ws.onopen = () => {
        console.log("WebSocket connection established");
        // Send token for authentication
        ws.send(JSON.stringify({ token: accessToken }));
        
        // Add initial system message to chat history
        setChatHistory(prev => [
          ...prev, 
          {
            role: 'assistant',
            content: "Welcome to your SYMI Blueprint. I'm here to help you build your custom system. What would you like to automate today?",
            timestamp: new Date()
          }
        ]);
      };
      
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type?.toLowerCase() === "thinking") {
            setLoading(true);
          }
          
          if (data.type?.toLowerCase() === "message") {
            setQuestion(data.content);
            setLoading(false);
            
            // Check for flags in the message
            if (data.flags) {
              if (data.flags.showSkipButton) {
                setShowSkipButton(true);
              }
              if (data.flags.chatComplete) {
                setChatComplete(true);
                setShowSkipButton(false);
              }
              if (data.flags.skippedToReport) {
                setSkippedToReport(true);
                setChatComplete(true);
                setShowSkipButton(false);
              }
              if (data.flags.auditComplete) {
                setChatComplete(true);
                setShowSkipButton(false);
              }
            }
            
            // Add message to chat history
            setChatHistory(prev => [
              ...prev, 
              {
                role: 'assistant',
                content: data.content,
                timestamp: new Date()
              }
            ]);
          }
          
          if (data.type?.toLowerCase() === "complete") {
            setChatComplete(true);
            setShowSkipButton(false);
            setShowPopup(true);
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
          setLoading(false);
        }
      };
      
      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setLoading(false);
      };
      
      ws.onclose = () => {
        console.log("WebSocket connection closed");
      };
      
      webSocketRef.current = ws;
    };
    
    setupWebSocket();
    
    return () => {
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
    };
  }, [isAuthorized]);

  // Auto-scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && chatContainerRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, loading]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Use 'any' type to avoid conflicts with existing declarations
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognitionAPI) {
        const recognition = new SpeechRecognitionAPI();
        
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result: any) => result.transcript)
            .join('');
          
          setUserInput(transcript);
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        recognitionRef.current = recognition;
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Handle user input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  // Handle form submission or "Enter" key press
  const handleSendMessage = () => {
    if (!userInput.trim() || loading) return;
    
    if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
      // First add user message to chat history
      setChatHistory(prev => [
        ...prev, 
        {
          role: 'user',
          content: userInput,
          timestamp: new Date()
        }
      ]);
      
      // Then send message to WebSocket
      const message = JSON.stringify({ message: userInput });
      webSocketRef.current.send(message);
      setUserInput("");
      setLoading(true);
    }
  };

  // Handle skip button click
  const handleSkipClick = () => {
    setShowSkipConfirmation(true);
  };

  // Handle skip confirmation
  const confirmSkip = () => {
    if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
      // Send skip action to backend
      const skipAction = JSON.stringify({ action: "skip_to_report" });
      webSocketRef.current.send(skipAction);
    }
    setShowSkipConfirmation(false);
  };

  // Handle skip cancellation
  const cancelSkip = () => {
    setShowSkipConfirmation(false);
  };

  // Handle "Enter" key press (send message on Enter, add new line on Shift+Enter)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle popup form submission
  const handlePopupSubmit = async () => {
    const accessToken = localStorage.getItem("access_token");
    try {
      const response = await fetch(`${config.apiBaseUrl}/reports/generate?token=${accessToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          business_name: businessName,
          owner_name: ownerName,
        }),
      });

      if (response.ok) {
        setShowPopup(false);
        setBusinessName("");
        setOwnerName("");

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = "SYMI_Blueprint_Report.pdf";
        document.body.appendChild(a);
        a.click();

        a.remove();
        window.URL.revokeObjectURL(url);
        
        // Add confirmation message to chat
        setChatHistory(prev => [
          ...prev, 
          {
            role: 'assistant',
            content: "Your Blueprint report has been generated and downloaded. I've included all the key insights and recommendations we've discussed.",
            timestamp: new Date()
          }
        ]);
      } else {
        alert("Failed to generate the report. Please try again.");
      }
    } catch (error) {
      console.error("Error generating report:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Toggle voice recognition
  const toggleListening = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Main render
  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#efe2fc] to-white dark:from-[#2D1B45] dark:to-[#1a1a2e] text-gray-800 dark:text-gray-200`}>
      <div className="container mx-auto px-4 py-8 max-w-7xl flex flex-col h-screen mt-20 sm:mt-24">
        {/* Admin Warning Modal */}
        {showAdminWarning && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md p-6 rounded-2xl shadow-2xl bg-white dark:bg-gray-800 border border-purple-100/50 dark:border-purple-500/20"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Admin Account Detected
              </h2>
              <div className="mb-6">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Your account has admin privileges. Admin accounts cannot use the Blueprint chatbot functionality.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  If you want to use the chatbot, please sign up with a personal account.
                </p>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => router.push("/")}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
                >
                  Go Back
                </button>
                <button
                  onClick={() => {
                    handleLogout(router);
                    router.push("/auth/signup");
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-[#4C00FF] to-[#6E30FF] hover:from-[#4200e6] hover:to-[#5d28d8] text-white rounded-lg shadow-md shadow-purple-500/20"
                >
                  Sign Up
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mr-2 bg-[#4C00FF]/10 dark:bg-[#4C00FF]/20">
              <Sparkles className="w-5 h-5 text-[#4C00FF] dark:text-[#6E30FF]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">SYMI Blueprint</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Building your custom Blueprint</p>
            </div>
          </div>
        </div>
        
        {/* Chat Container */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto mb-4 rounded-2xl p-4 sm:p-6 shadow-lg bg-white/70 dark:bg-gray-800/30 backdrop-blur-md max-h-[calc(90vh-240px)]"
        >
          <AnimatePresence>
            {chatHistory.map((message, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                    message.role === 'user' 
                      ? 'bg-indigo-100 dark:bg-indigo-900/50 ml-2' 
                      : 'bg-purple-100 dark:bg-purple-900/50 mr-2'
                  }`}>
                    {message.role === 'user' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <Bot className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    )}
                  </div>
                  
                  {/* Message bubble */}
                  <div 
                    className={`rounded-2xl px-4 py-2 shadow-sm ${
                      message.role === 'user'
                        ? 'bg-indigo-100 dark:bg-indigo-900/50 text-gray-800 dark:text-gray-200'
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.content}</p>
                    <div className={`text-xs mt-1 text-right ${message.role === 'user' ? 'text-indigo-500 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Loading indicator */}
            {loading && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex justify-start mb-4"
              >
                <div className="flex items-start max-w-[80%]">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-purple-100 dark:bg-purple-900/50 mr-2">
                    <Bot className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="rounded-2xl px-6 py-3 shadow-sm bg-white dark:bg-gray-800">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-bounce" style={{ animationDelay: '400ms' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </AnimatePresence>
        </div>

        {/* Report Generation Available Banner */}
        {(chatComplete || skippedToReport) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-800 dark:text-green-200 font-medium">
                  {skippedToReport 
                    ? "You've skipped to report generation. Your responses have been saved."
                    : "Great! You've completed the questionnaire."}
                </p>
                <p className="text-green-600 dark:text-green-300 text-sm">
                  You can now generate your Business Transformation Blueprint™ report.
                </p>
              </div>
              <button
                onClick={() => setShowPopup(true)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors shadow-sm"
              >
                Generate Report
              </button>
            </div>
          </motion.div>
        )}
        
        {/* Input Area */}
        {!chatComplete && !skippedToReport && (
          <div className="p-4 rounded-2xl shadow-lg bg-white/80 dark:bg-gray-800/50 backdrop-blur-md border border-purple-100/50 dark:border-purple-500/20">
            <div className="flex items-end gap-2">
              <div className="relative flex-1">
                <textarea
                  ref={textareaRef}
                  placeholder="How can I help you scale your business system today?"
                  value={userInput}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  className="w-full px-4 py-3 pr-12 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#4C00FF]/50 dark:focus:ring-[#6E30FF]/50 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-200 dark:border-gray-700"
                  rows={1}
                  style={{ minHeight: '50px', maxHeight: '150px' }}
                />
              </div>
              
              <div className="flex gap-2">
                {/* Skip Button - Only show when showSkipButton is true */}
                {showSkipButton && (
                  <button
                    onClick={handleSkipClick}
                    disabled={loading}
                    className="p-3 rounded-xl transition-colors bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    title="Skip remaining questions"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                )}

                {/* Voice Input Button */}
                <button
                  onClick={toggleListening}
                  className={`p-3 rounded-xl transition-colors ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'
                  }`}
                >
                  <Mic className="w-5 h-5" />
                </button>
                
                {/* Send Button */}
                <button
                  onClick={handleSendMessage}
                  disabled={!userInput.trim() || loading}
                  className={`p-3 rounded-xl transition-colors ${
                    !userInput.trim() || loading
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                      : 'bg-gradient-to-r from-[#4C00FF] to-[#6E30FF] hover:from-[#4200e6] hover:to-[#5d28d8] text-white shadow-md shadow-purple-500/20'
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="mt-2 flex justify-between items-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {isListening ? 'Listening... Speak now' : 'Press Enter to send, Shift+Enter for new line'}
              </div>
              {showSkipButton && (
                <div className="text-xs text-orange-600 dark:text-orange-400">
                  Click skip if you want to proceed to report generation
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Skip Confirmation Modal */}
      {showSkipConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-6 rounded-2xl shadow-2xl bg-white dark:bg-gray-800 border border-purple-100/50 dark:border-purple-500/20"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Skip Remaining Questions?
            </h2>
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Are you sure you want to skip the remaining questions and proceed to report generation?
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Your current responses will be saved, but you may miss some insights that could help improve your business system.
              </p>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelSkip}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
              >
                Continue Answering
              </button>
              <button
                onClick={confirmSkip}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg shadow-md"
              >
                Yes, Skip to Report
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-6 rounded-2xl shadow-2xl bg-white dark:bg-gray-800 border border-purple-100/50 dark:border-purple-500/20"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Generate Blueprint Report
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Business Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full p-2 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4C00FF]/50 dark:focus:ring-[#6E30FF]/50"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Owner Name
              </label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full p-2 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4C00FF]/50 dark:focus:ring-[#6E30FF]/50"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handlePopupSubmit}
                className="px-4 py-2 bg-gradient-to-r from-[#4C00FF] to-[#6E30FF] hover:from-[#4200e6] hover:to-[#5d28d8] text-white rounded-lg shadow-md shadow-purple-500/20"
              >
                Generate Report
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}