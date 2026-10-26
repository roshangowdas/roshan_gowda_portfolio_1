import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ScrollToTop: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="scroll-to-top"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
          className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full backdrop-blur-md shadow-lg flex items-center justify-center transition-colors duration-300 group cursor-pointer ${
            isLight
              ? 'bg-white/90 text-slate-800 border border-slate-300 hover:text-purple-600 hover:border-purple-400 shadow-slate-300/50'
              : 'bg-[#161616]/90 text-[#D7E2EA] border border-white/20 hover:text-emerald-400 hover:border-emerald-400/60 shadow-black/50'
          }`}
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:-translate-y-1 transition-transform duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
