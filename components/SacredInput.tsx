'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Send, ImageIcon } from 'lucide-react';
import { useVoiceInput } from '@/hooks/useVoiceInput';

export const SacredInput = () => {
  const [input, setInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isListening, transcript, startListening, stopListening } = useVoiceInput();

  useEffect(() => { transcript && setInput(prev => prev + ' ' + transcript) }, [transcript]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    file && new FileReader().readAsDataURL(file);
  };

  return (
    <div className="sacred-input-container w-full max-w-3xl">
      <motion.div
        className="bg-white/5 backdrop-blur-lg rounded-xl p-4 shadow-sacred"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Speak your truth or upload an image..."
              className="w-full bg-transparent resize-none outline-none text-sacred-ground placeholder-sacred-ash/60"
              rows={1}
            />
            
            <AnimatePresence>
              {imagePreview && (
                <motion.div/* ... */>
                  <div className="w-8 h-8 rounded-full bg-sacred-ash/10 border border-sacred-ash/20">
                    <ImageIcon className="w-4 h-4 text-sacred-ash" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex gap-2">
            <motion.button>
              <ImageIcon className="w-6 h-6 text-sacred-ash" />
              <input ref={fileInputRef} type="file" hidden accept="image/*" />
            </motion.button>  

            <motion.button
              className="p-2 bg-sacred-ash text-sacred-ground rounded-full"
              onClick={() => { /* Submission logic */ }}
            >
              <Send className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isListening && (
            <motion.div/* Visual Feedback */ className="border-2 border-sacred-breath/20" />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
