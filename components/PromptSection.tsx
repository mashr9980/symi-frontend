"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import config from "../config";
import { isTokenExpired, handleLogout, getPaymentStatusFromCache } from "../utils/auth";
import { Send, Mic, Bot, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Add TypeScript definitions for Web Speech API without extending Window
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
  
  // Refs
  const webSocketRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null); // Use 'any' to avoid type conflicts
  const router = useRouter();

  // Check window size for responsive layout
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Check if the user is logged in and has premium access
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  // Handle form submission or "Enter" key press
  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
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

  // Handle "Enter" key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-[#efe2fc] to-white text-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl flex flex-col h-screen mt-24">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mr-2 bg-[#4C00FF]/10">
              <Sparkles className="w-5 h-5 text-[#4C00FF]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">SYMI Blueprint</h1>
              <p className="text-sm text-gray-500">Building your custom Blueprint</p>
            </div>
          </div>
        </div>
        
        {/* Chat Container */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto mb-4 rounded-2xl p-4 shadow-lg bg-white/70 backdrop-blur-md max-h-[calc(90vh-240px)]"
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
                      ? 'bg-indigo-100' 
                      : 'bg-purple-100'
                  } mx-2`}>
                    {message.role === 'user' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <Bot className="h-4 w-4 text-purple-600" />
                    )}
                  </div>
                  
                  {/* Message bubble */}
                  <div 
                    className={`rounded-2xl px-4 py-2 shadow-sm ${
                      message.role === 'user'
                        ? 'bg-indigo-100 text-gray-800'
                        : 'bg-white text-gray-800'
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.content}</p>
                    <div className={`text-xs mt-1 text-right ${message.role === 'user' ? 'text-indigo-500' : 'text-gray-500'}`}>
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
                  <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-purple-100 mx-2">
                    <Bot className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="rounded-2xl px-6 py-3 shadow-sm bg-white">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '400ms' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </AnimatePresence>
        </div>
        
        {/* Input Area */}
        <div className="p-4 rounded-2xl shadow-lg bg-white">
          <div className="flex items-end gap-2">
            <div className="relative flex-1">
              <textarea
                placeholder="How can I help you scale your business system today?"
                value={userInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                className="w-full px-4 py-3 pr-12 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#4C00FF] bg-gray-50 text-gray-900 placeholder-gray-500 border-gray-200 border"
                rows={1}
                style={{ minHeight: '50px', maxHeight: '150px' }}
              />
            </div>
            
            <div className="flex gap-2">
              {/* Voice Input Button */}
              <button
                onClick={toggleListening}
                className={`p-3 rounded-xl transition-colors ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
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
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[#4C00FF] hover:bg-[#3A00CC] text-white'
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="mt-2 flex justify-between items-center">
            <div className="text-xs text-gray-500">
              {isListening ? 'Listening... Speak now' : 'Press Enter to send, Shift+Enter for new line'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-6 rounded-2xl shadow-2xl bg-white"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Generate Blueprint Report
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Business Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full p-2 rounded-lg bg-white text-gray-900 border-gray-300 border focus:outline-none focus:ring-2 focus:ring-[#4C00FF]"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Owner Name
              </label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full p-2 rounded-lg bg-white text-gray-900 border-gray-300 border focus:outline-none focus:ring-2 focus:ring-[#4C00FF]"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handlePopupSubmit}
                className="px-4 py-2 bg-[#4C00FF] hover:bg-[#3A00CC] text-white rounded-lg"
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