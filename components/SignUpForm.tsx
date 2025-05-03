'use client'; // Mark this component as a Client Component

import Head from 'next/head';
import { useState, useEffect } from 'react';
import config from '../config'; 
import { useRouter } from 'next/navigation';
import { saveTokenWithExpiry } from "../utils/auth";

export default function SignUp() {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state for the button
  const [professions, setProfessions] = useState([]);
  const router = useRouter();
  
  const checkPasswordStrength = (value: string) => {
    const strength = Math.min(value.length * 10, 100);
    setPasswordStrength(strength);
  };

    // Fetch professions on page load
    useEffect(() => {
      const fetchProfessions = async () => {
        try {
          const response = await fetch(`${config.apiBaseUrl}/professions`);
          if (response.ok) {
            const data = await response.json();
            setProfessions(data); // Set the professions in state
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
        const accessToken = responseData.access_token; // Extract the access token from the response
        const role = responseData.role;
        saveTokenWithExpiry(accessToken);
        localStorage.setItem("user_role", role);
        // Redirect based on user role
        if (role === "admin") {
            router.push("/blueprint"); // Redirect to admin dashboard
        } else {
          router.push("/prompt"); // Redirect to prompt page
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
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SYMI | Sign Up</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-tr from-[#f6f2ff] to-[#ebe9ff] text-gray-900 animate_animated animatefadeIn animate_slow">
        <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-100 pulse-shadow space-y-8">
          {/* Symbol */}
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-indigo-500 rounded-full breathe shadow-lg"></div>
          </div>

          {/* Progress Indicator */}
          <div className="relative pt-2">
            <div className="absolute h-1 bg-gray-100 rounded-full w-full top-1/2"></div>
            <div className="relative flex justify-between">
              <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs">2</div>
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs">3</div>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6"  onSubmit={handleSubmit}>
            {/* Email */}

            <div className="float-label-input">
              <input type="text" id="username" name="username" placeholder=" " required className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <label htmlFor="username" className="text-sm">User Name</label>
            </div>

            <div className="float-label-input">
              <input type="email" id="email" name="email" placeholder=" " required className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <label htmlFor="email" className="text-sm">Email</label>
            </div>

            {/* Password */}
            <div className="float-label-input relative">
              <input
                type="password"
                id="password"
                name="password"
                placeholder=" "
                required
                //pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                // onInput={(e) => checkPasswordStrength(e.target.value)}
              />
              <label htmlFor="password" className="text-sm">Create Password</label>
              <div className="password-strength mt-2 h-1 rounded-full overflow-hidden">
                <div className="h-full bg-gray-200 transition-all duration-300" style={{ width: `${passwordStrength}%`, backgroundColor: passwordStrength > 75 ? '#10B981' : passwordStrength > 50 ? '#F59E0B' : '#EF4444' }} />
              </div>
              <span className="text-xs text-gray-500 mt-1 block text-left">Minimum 8 characters with uppercase & number</span>
            </div>

            {/* Profession */}
            <div className="float-label-input">
              <select
                name="profession"
                id="profession"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-no-repeat bg-[right_1rem_center] appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value=""></option>
                {professions.map((profession: { id: number; name: string }) => (
                  <option key={profession.id} value={profession.id}>
                    {profession.name}
                  </option>
                ))}
              </select>
              <label htmlFor="profession" className="text-sm">Profession</label>
            </div>

            {/* Terms */}
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" required className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <label htmlFor="terms" className="text-xs text-gray-500">
                I agree to the{' '}
                <a href="#" className="text-indigo-500 underline">Terms</a> and{' '}
                <a href="#" className="text-indigo-500 underline">Privacy Policy</a>.
              </label>
            </div>

            {/* Submit */}
            <button type="submit" className="w-full gradient-btn text-white py-3 rounded-lg font-medium transition">Create Account</button>
          </form>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            <a href="/auth/google" className="social-auth-btn">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/></svg>
              Google
            </a>
            <button disabled className="social-auth-btn opacity-50 cursor-not-allowed">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="..."/></svg>
              GitHub
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
