"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, User, Mic } from "lucide-react"; // Using Lucide icons
import { motion } from "framer-motion"; // Optional for smooth animations
import { useRouter } from "next/navigation";

type Message = {
  text: string;
  sender: "user" | "bot";
  time?: string; // Time stamp for each message
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user", time: new Date().toLocaleTimeString() } as const;
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const botResponse = {
        text: `SYMI says: "${input}" received.`,
        sender: "bot",
        time: new Date().toLocaleTimeString(),
      } as const;
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  // Smooth scrolling to the newest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChatOpen = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      // Redirect to login if the user is not logged in
      alert("You need to log in to use the chat feature.");
      router.push("auth/login");
      return;
    }
    setIsOpen(true); // Open the chat if the user is logged in
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          //onClick={() => setIsOpen(true)}
          onClick={handleChatOpen}
          className="fixed bottom-6 left-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-5 rounded-full shadow-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-700 transition z-50 flex items-center gap-2"
        >
          <Bot className="w-5 h-5" />
          <span className="hidden sm:block">Chat</span>
        </button>
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 w-[380px] max-w-full h-[520px] bg-gradient-to-r from-white to-gray-200 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-3 shadow-md flex justify-between items-center border-b rounded-t-2xl">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              <span className="text-lg font-semibold">SYMI Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xl font-bold hover:text-indigo-400"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 text-sm">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                className={`flex items-start gap-3 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {msg.sender === "user" ? (
                  <>
                    <div className="flex-shrink-0">
                      <User className="w-8 h-8 text-gray-800" />
                    </div>
                    <div
                      className="px-4 py-2 rounded-xl shadow-sm bg-indigo-100 text-gray-800 text-sm max-w-[75%] transition duration-300 ease-in-out hover:bg-indigo-200"
                    >
                      <div>{msg.text}</div>
                      <div className="text-xs text-gray-500 text-right">{msg.time}</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-shrink-0">
                      <Bot className="w-8 h-8 text-indigo-600" />
                    </div>
                    <div
                      className="px-4 py-2 rounded-xl shadow-sm bg-indigo-50 text-indigo-800 text-sm max-w-[75%] transition duration-300 ease-in-out hover:bg-indigo-100"
                    >
                      <div>{msg.text}</div>
                      <div className="text-xs text-gray-500 text-right">{msg.time}</div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSend} className="flex gap-2 p-3 border-t bg-gradient-to-r from-indigo-100 to-indigo-200">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 rounded-full border text-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex gap-2">
              {/* Microphone Button */}
              <button
                type="button"
                className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-full p-3 flex items-center justify-center hover:opacity-80 transition"
              >
                <Mic className="w-5 h-5" />
              </button>

              {/* Send Button */}
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-full p-3 flex items-center justify-center hover:opacity-80 transition"
              >
                <Bot className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
