import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={toggleTheme}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
      title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
      className={`relative flex items-center justify-center p-2.5 sm:p-3 rounded-full transition-colors duration-300 cursor-pointer shadow-lg z-50 ${
        isLight
          ? 'bg-white text-slate-900 border border-slate-300 hover:bg-slate-100 shadow-slate-300/50'
          : 'bg-[#181818]/90 text-amber-300 border border-white/20 hover:bg-[#222222] shadow-black/50'
      } ${className}`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, scale: 0, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 90, scale: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'backOut' }}
        className="flex items-center justify-center"
      >
        {isLight ? (
          <Moon className="w-5 h-5 text-indigo-600 fill-indigo-600/20" />
        ) : (
          <Sun className="w-5 h-5 text-amber-400 fill-amber-400/20" />
        )}
      </motion.div>
    </motion.button>
  );
};
