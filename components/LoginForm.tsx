'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import config from "../config";
import { saveTokenWithExpiry } from "../utils/auth";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
        const accessToken = responseData.access_token;
        const role = responseData.role;
        saveTokenWithExpiry(accessToken);
        localStorage.setItem("user_role", role);
        localStorage.setItem("user_email", data.email);
        
        if (role === "admin") {
          router.push("/blueprint");
        } else {
          router.push("/");
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#efe2fc] to-white dark:from-[#2D1B45] dark:to-[#1a1a2e] px-4 py-12">
      <div className="max-w-md w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-purple-100/50 dark:border-purple-500/20 text-center space-y-8">
        {/* Brand Logo/Icon */}
        <div className="flex justify-center mb-2">
          <div className="relative w-14 h-14">
            <div className="w-full h-full bg-[#4C00FF] dark:bg-[#6E30FF] rounded-full"></div>
            <div className="absolute inset-0 bg-[#4C00FF]/30 dark:bg-[#6E30FF]/50 rounded-full blur-xl opacity-70 animate-pulse"></div>
          </div>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Log in to your SYMI account
          </p>
        </div>

        {/* Login Form */}
        <form
          id="login-form"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              required
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              title="Enter a valid email"
              className="w-full px-4 py-3 border border-purple-200 dark:border-purple-800 rounded-xl text-sm bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4C00FF]/50 dark:focus:ring-[#6E30FF]/50 focus:border-[#4C00FF] dark:focus:border-[#6E30FF] transition-all"
              placeholder="Email address"
            />
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              id="password"
              required
              title="Enter your password"
              className="w-full px-4 py-3 border border-purple-200 dark:border-purple-800 rounded-xl text-sm bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4C00FF]/50 dark:focus:ring-[#6E30FF]/50 focus:border-[#4C00FF] dark:focus:border-[#6E30FF] transition-all"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-[#4C00FF] to-[#6E30FF] text-white py-3 rounded-xl font-medium hover:from-[#4200e6] hover:to-[#5d28d8] transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
              loading ? "opacity-70 cursor-wait" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 text-gray-400 dark:text-gray-600 text-sm">
          <span className="border-t border-gray-200 dark:border-gray-700 w-1/4"></span>
          <span className="text-xs uppercase tracking-wider">or</span>
          <span className="border-t border-gray-200 dark:border-gray-700 w-1/4"></span>
        </div>

        {/* Sign Up Option */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-[#4C00FF] dark:text-[#8E65FF] hover:text-[#4200e6] dark:hover:text-[#A585FF] font-medium"
          >
            Sign Up
          </Link>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-400 dark:text-gray-600 pt-6 leading-relaxed">
          By continuing, you agree to our
          <Link href="/terms" className="text-[#4C00FF] dark:text-[#8E65FF] hover:text-[#4200e6] dark:hover:text-[#A585FF] mx-1">
              Terms
            </Link>
          and
          <Link href="/privacy" className="text-[#4C00FF] dark:text-[#8E65FF] hover:text-[#4200e6] dark:hover:text-[#A585FF] mx-1">
              Privacy Policy
            </Link>
        </div>
      </div>
    </div>
  );
}