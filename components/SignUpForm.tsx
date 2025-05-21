'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import config from '../config'; 
import { useRouter } from 'next/navigation';
import { saveTokenWithExpiry } from "../utils/auth";

export default function SignUp() {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [professions, setProfessions] = useState([]);
  const router = useRouter();
  
  const checkPasswordStrength = (value: string) => {
    const strength = Math.min(value.length * 10, 100);
    setPasswordStrength(strength);
  };

  useEffect(() => {
    const fetchProfessions = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/professions`);
        if (response.ok) {
          const data = await response.json();
          setProfessions(data);
        } else {
          console.error('Failed to fetch professions');
        }
      } catch (error) {
        console.error('Error fetching professions:', error);
      }
    };

    fetchProfessions();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      profession_id: Number(formData.get("profession"))
    };

    try {
      const response = await fetch(`${config.apiBaseUrl}/users/signup`, {
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
          router.push("/prompt");
        }
      } else {
        const errorData = await response.json();
        alert(`Signup failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error during Signup:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#efe2fc] to-white dark:from-[#2D1B45] dark:to-[#1a1a2e] px-4 py-12">
      <div className="max-w-md w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-purple-100/50 dark:border-purple-500/20 text-center space-y-2 mt-12">
        {/* Symbol */}
        <div className="flex justify-center">
          <div className="relative w-14 h-14">
            <div className="w-full h-full bg-[#4C00FF] dark:bg-[#6E30FF] rounded-full"></div>
            <div className="absolute inset-0 bg-[#4C00FF]/30 dark:bg-[#6E30FF]/50 rounded-full blur-xl opacity-70 animate-pulse"></div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="relative">
          <div className="absolute h-1 bg-gray-100 dark:bg-gray-700 rounded-full w-full top-1/2"></div>
          <div className="relative flex justify-between">
            <div className="w-6 h-6 bg-[#4C00FF] dark:bg-[#6E30FF] rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs">2</div>
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs">3</div>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Join SYMI
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Create your account in a few steps
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input 
              type="text" 
              id="username" 
              name="username" 
              required 
              className="w-full px-4 py-3 border border-purple-200 dark:border-purple-800 rounded-xl text-sm bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4C00FF]/50 dark:focus:ring-[#6E30FF]/50 focus:border-[#4C00FF] dark:focus:border-[#6E30FF] transition-all"
              placeholder="Username" 
            />
          </div>

          <div className="relative">
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              className="w-full px-4 py-3 border border-purple-200 dark:border-purple-800 rounded-xl text-sm bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4C00FF]/50 dark:focus:ring-[#6E30FF]/50 focus:border-[#4C00FF] dark:focus:border-[#6E30FF] transition-all"
              placeholder="Email address" 
            />
          </div>

          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-3 border border-purple-200 dark:border-purple-800 rounded-xl text-sm bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4C00FF]/50 dark:focus:ring-[#6E30FF]/50 focus:border-[#4C00FF] dark:focus:border-[#6E30FF] transition-all"
              placeholder="Create password"
              onInput={(e) => checkPasswordStrength((e.target as HTMLInputElement).value)}
            />
            <div className="password-strength mt-2 h-1 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
              <div 
                className="h-full transition-all duration-300" 
                style={{ 
                  width: `${passwordStrength}%`, 
                  backgroundColor: passwordStrength > 75 ? '#4C00FF' : passwordStrength > 50 ? '#9B6BFF' : '#F56565' 
                }} 
              />
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block text-left">Minimum 8 characters with uppercase & number</span>
          </div>

          <div className="relative">
            <select
              name="profession"
              id="profession"
              required
              className="w-full px-4 py-3 border border-purple-200 dark:border-purple-800 rounded-xl text-sm bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4C00FF]/50 dark:focus:ring-[#6E30FF]/50 focus:border-[#4C00FF] dark:focus:border-[#6E30FF] transition-all appearance-none"
            >
              <option value="" disabled selected>Select your profession</option>
              {professions.map((profession: { id: number; name: string }) => (
                <option key={profession.id} value={profession.id}>
                  {profession.name}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="terms" 
              required 
              className="w-4 h-4 rounded border-purple-200 dark:border-purple-800 text-[#4C00FF] dark:text-[#6E30FF] focus:ring-[#4C00FF] dark:focus:ring-[#6E30FF]" 
            />
            <label htmlFor="terms" className="text-xs text-gray-500 dark:text-gray-400">
              I agree to the{' '}
              <Link href="/terms" className="text-[#4C00FF] dark:text-[#8E65FF] hover:text-[#4200e6] dark:hover:text-[#A585FF] mx-1">
              Terms
            </Link>
          and
          <Link href="/privacy" className="text-[#4C00FF] dark:text-[#8E65FF] hover:text-[#4200e6] dark:hover:text-[#A585FF] mx-1">
              Privacy Policy
            </Link>
            </label>
          </div>

          {/* Submit */}
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
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Sign In Link */}
        <div className="text-sm text-gray-500 dark:text-gray-400 pt-4">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#4C00FF] dark:text-[#8E65FF] hover:text-[#4200e6] dark:hover:text-[#A585FF] font-medium">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}