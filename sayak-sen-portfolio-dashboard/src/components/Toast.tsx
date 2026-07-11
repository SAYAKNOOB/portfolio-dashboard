import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
  isDark: boolean;
}

export default function Toast({ message, onClose, isDark }: ToastProps) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className={`fixed bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full shadow-lg border flex items-center gap-2 z-50 ${
            isDark
              ? 'bg-neutral-800 text-neutral-200 border-neutral-700/80 shadow-black/50'
              : 'bg-white text-stone-700 border-stone-200 shadow-xl'
          }`}
        >
          <Info className="w-4 h-4 text-emerald-500" />
          <span className="text-sm font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
