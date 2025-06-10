// components/JoinLabDialog.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, User, MessageSquare, Send } from "lucide-react";

interface JoinLabDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const JoinLabDialog: React.FC<JoinLabDialogProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    interests: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Using your existing SYMI API endpoint
      const response = await fetch('https://api.symi.io/lab/join-lab', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          message: formData.message + (formData.interests ? `\n\nInterests: ${formData.interests}` : '')
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          setSubmitStatus('success');
          // Reset form after successful submission
          setTimeout(() => {
            setFormData({ name: "", email: "", message: "", interests: "" });
            setSubmitStatus('idle');
            onClose();
          }, 2000);
        } else {
          throw new Error(responseData.message || 'Submission failed');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-100/50 dark:border-purple-500/20 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-6 py-4 border-b border-purple-100/50 dark:border-purple-900/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">Join SYMI Lab</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Collaborate on experimental systems</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 text-green-800 dark:text-green-200 text-center"
              >
                ✨ Thank you for your interest in joining SYMI Lab! We've received your information and will be in touch soon.
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-800 dark:text-red-200 text-center"
              >
                ❌ Something went wrong. Please try again.
              </motion.div>
            )}

            <div className="space-y-4">
              {/* Name Field */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Full Name"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-purple-500/50 focus:border-indigo-500 dark:focus:border-purple-500 transition-all"
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-purple-500/50 focus:border-indigo-500 dark:focus:border-purple-500 transition-all"
                />
              </div>

              {/* Interests Field */}
              <div className="relative">
                <div className="absolute left-3 top-4">
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="interests"
                  value={formData.interests}
                  onChange={handleInputChange}
                  placeholder="Your areas of interest (AI, automation, systems design...)"
                  className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-purple-500/50 focus:border-indigo-500 dark:focus:border-purple-500 transition-all"
                />
              </div>

              {/* Message Field */}
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your vision and how you'd like to collaborate..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-purple-500/50 focus:border-indigo-500 dark:focus:border-purple-500 transition-all resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    ✓ Submitted!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Request
                  </>
                )}
              </button>
            </div>

            {/* Footer Note */}
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
              We'll review your request and get back to you within 48 hours.
            </p>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default JoinLabDialog;