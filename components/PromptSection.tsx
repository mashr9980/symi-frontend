"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation"; // For navigation
import config from "../config";
import { isTokenExpired, handleLogout, getPaymentStatusFromCache } from "../utils/auth";

export default function PromptSection() {
  const [question, setQuestion] = useState("Connecting to WebSocket..."); // Dynamic question from WebSocket
  const [userInput, setUserInput] = useState(""); // Tracks the user's input
  const [loading, setLoading] = useState(false); // Tracks loading state
  const webSocketRef = useRef<WebSocket | null>(null); // WebSocket reference
  const [isAuthorized, setIsAuthorized] = useState(false); // Tracks if the user is authorized
  const [showPopup, setShowPopup] = useState(false); // Tracks if the popup is visible
  const [businessName, setBusinessName] = useState(""); // Tracks the business name input
  const [ownerName, setOwnerName] = useState(""); // Tracks the owner name input
  const router = useRouter(); // Initialize the router

  // Check if the user is logged in
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      router.push("/auth/login"); // Redirect to login if not logged in
    } else {
      setIsAuthorized(true); // Allow access to the page
    }
  }, [router]);

// Check payment status before allowing access
  useEffect(() => {
    if (typeof window === "undefined") return;
    const { status, expiredStatus } = getPaymentStatusFromCache ? getPaymentStatusFromCache() : {};
      if (status === "premium" && expiredStatus === false) {
        //router.replace("/prompt");
        //return;
      }else{
        router.replace("/pricing");
      }
    // else continue as normal
  }, [router]);

  // Handle user input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  // Handle form submission or "Enter" key press
  const handleSendMessage = () => {
    if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({ message: userInput });
      console.log("WebSocket - Sending:", message); // Log sent message
      webSocketRef.current.send(message); // Send user input to WebSocket
      setUserInput(""); // Clear input field
      setLoading(true); // Set loading to true
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle popup form submission
  const handlePopupSubmit = async () => {
    const accessToken = localStorage.getItem("access_token"); // Get access token from cache
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
        alert("Report generated successfully!");
        setShowPopup(false); // Close the popup
        setBusinessName(""); // Reset the form
        setOwnerName("");

        const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = "ECommerece_Audit_Report.pdf"; // or extract from content-disposition header
  document.body.appendChild(a);
  a.click();

  a.remove();
  window.URL.revokeObjectURL(url);
      } else {
        alert("Failed to generate the report. Please try again.");
      }
    } catch (error) {
      console.error("Error generating report:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Establish WebSocket connection after page load
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token"); // Get access token from cache
    if (!accessToken) {
      console.error("Access token not found.");
      return;
    }
    
    if (isTokenExpired()) {
      console.error("Access token expired. Logging out...");
      handleLogout(router);
      return;
    }

    const ws = new WebSocket(config.webSocketUrl);

    ws.onopen = () => {
      console.log("WebSocket connection established.");
      // Send the access token as the first message
      const tokenMessage = JSON.stringify({ token: accessToken });
      console.log("WebSocket - Sending:", tokenMessage); // Log sent message
      ws.send(tokenMessage);
    };

    ws.onmessage = (event) => {
      console.log("WebSocket - Received:", event.data); // Log raw response
      try {
        const data = JSON.parse(event.data);
        console.log("Data Type:", data.type); // Log parsed response
        console.log("Parsed WebSocket Data:", data); // Log parsed response
    
        if (data.type?.toLowerCase() === "thinking") {
          setLoading(true); // Show loading effect when "thinking"
        }
    
        if (data.type?.toLowerCase() === "message") {
          setQuestion(data.content); // Update the question with the WebSocket response
          setLoading(false); // Stop loading when a message is received
        }
    
        // Trigger popup when type is 'complete'
        if (data.type?.toLowerCase() === "complete") {
          console.log("Opening popup...");
          setShowPopup(true); // Show the popup
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
        setLoading(false); // Stop loading on error
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setLoading(false); // Set loading to false on error
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");      
    };

    webSocketRef.current = ws;

    // Cleanup WebSocket connection on component unmount
    return () => {
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
    };
  }, []);

  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-white -z-10"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-blue-500/20 to-purple-500/30 rounded-3xl blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-gray-700 dark:text-gray-300">
        {/* Header */}
        <div className="text-center mb-16">
          <h4 className="section-subhead mb-6 py-10 whitespace-pre-line">
            {loading ? "Loading..." : question}
          </h4>
        </div>

        {/* Form Input */}
        <div className="mb-8">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className="w-2/3 mx-auto flex p-4 border border-gray-300 rounded-md"
            placeholder="Your answer here"
            disabled={loading} // Disable input while loading
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            onClick={handleSendMessage}
            className={`bg-[#4C00FF] hover:bg-[#4c2fd8] text-white px-8 py-3 rounded-xl text-base font-semibold transition duration-200 mt-8 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Sending..." : "Submit"}
          </button>  
        </div>

     {/* Popup Modal */}
     {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Generate Report</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Business Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Owner Name
              </label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handlePopupSubmit}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
              >
                Submit
              </button>
            </div>
          </div>

        
          </div>
      )}
      </div>
    </section>
  );
}