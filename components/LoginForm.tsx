'use client'; // Mark this component as a Client Component

import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation
import config from "../config"; // Import the config file for the base URL
import { saveTokenWithExpiry } from "../utils/auth";

export default function LoginForm() {
  const [loading, setLoading] = useState(false); // Loading state for the button
  const router = useRouter(); // Initialize the router

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const response = await fetch(`${config.apiBaseUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        const accessToken = responseData.access_token; // Extract the access token from the response
        const role = responseData.role;
        // Save token with a 1-hour expiry (3600000 ms)
        saveTokenWithExpiry(accessToken);
        localStorage.setItem("user_role", role);
        localStorage.setItem("user_email", data.email);
        // Redirect based on user role
        if (role === "admin") {
          router.push("/blueprint"); // Redirect to admin dashboard
        } else {
          router.push("/prompt"); // Redirect to prompt page
        }
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/auth/google/login`, {
        method: "GET",
        headers: {
          "Content-Type": "text/html",
        },
      });
  
      if (response.ok) {
        const htmlContent = await response.text();
        const newWindow = window.open(htmlContent,'_blank', 'width=600,height=400');
        if (newWindow) {
          newWindow.focus();
      } else {
          console.error('Failed to open the new window');
      }
      } else {
        alert("Failed to load Google Sign-In page.");
      }
    } catch (error) {
      console.error("Error fetching Google Sign-In page:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center bg-gradient-to-tr from-[#f6f2ff] to-[#ebe9ff] text-gray-900 justify-center px-4 py-12 animate__animated animate__fadeIn animate__slow">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SYMI | Login</title>
      </Head>

      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-100 text-center space-y-8 pulse-shadow">
        {/* SYMI Symbol */}
        <div className="flex justify-center mb-2">
          <div className="relative w-12 h-12 breathe">
            <div className="w-full h-full bg-indigo-500 rounded-full"></div>
            <div className="absolute inset-0 bg-indigo-300 rounded-full blur-xl opacity-30 animate-pulse"></div>
          </div>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Welcome to SYMI
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Access your personalized system
          </p>
        </div>

        {/* Login Form */}
        <form
          id="login-form"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="float-label-input">
            <input
              type="email"
              name="email"
              id="email"
              placeholder=" "
              required
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              title="Enter a valid email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm input-focus-effect focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <label htmlFor="email">Your email address</label>
          </div>

          <div className="float-label-input">
            <input
              type="password"
              name="password"
              id="password"
              placeholder=" "
              required
              title="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm input-focus-effect focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <label htmlFor="password">Your password</label>
          </div>

          <button
            type="submit"
            className={`w-full gradient-btn text-white py-3 rounded-lg font-medium transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 text-gray-400 text-sm py-2">
          <span className="border-t border-gray-200 w-1/4"></span>
          <span className="text-xs uppercase tracking-wider">or</span>
          <span className="border-t border-gray-200 w-1/4"></span>
        </div>

        {/* Google Sign-in
        <a
           onClick={handleGoogleSignIn}
           target="_blank"
          className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition transform hover:-translate-y-1 hover:shadow-md"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </a> */}

        {/* Sign Up Option */}
        <div className="text-sm text-gray-500 pt-6">
          Don't have an account?{" "}
          <a
            href="/auth/signup"
            className="text-indigo-500 hover:text-indigo-600 underline"
          >
            Sign Up
          </a>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-400 pt-6 leading-relaxed">
          By continuing, you agree to our
          <a
            href="#"
            className="text-indigo-500 hover:text-indigo-600 underline"
          >
            Terms
          </a>
          <span className="mx-1">and</span>
          <a
            href="#"
            className="text-indigo-500 hover:text-indigo-600 underline"
          >
            Privacy Policy
          </a>
          .
        </div>

        <div className="pt-4">
          <a href="#" className="text-xs text-indigo-500 hover:text-indigo-600">
            Need help signing in?
          </a>
        </div>
      </div>
    </div>
  );
}