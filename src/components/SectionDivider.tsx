import React from 'react';
import { motion } from 'framer-motion';

interface SectionDividerProps {
  className?: string;
  variant?: 'cyan' | 'purple' | 'amber' | 'emerald';
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  className = '',
  variant = 'cyan'
}) => {
  const gradientColors = {
    cyan: 'from-transparent via-cyan-500/60 dark:via-cyan-400/70 to-transparent',
    purple: 'from-transparent via-purple-500/60 dark:via-purple-400/70 to-transparent',
    amber: 'from-transparent via-amber-500/60 dark:via-amber-400/70 to-transparent',
    emerald: 'from-transparent via-emerald-500/60 dark:via-emerald-400/70 to-transparent',
  }[variant];

  const dotGlow = {
    cyan: 'shadow-[0_0_10px_rgba(6,182,212,0.6)] border-cyan-500/50 dark:border-cyan-400/60',
    purple: 'shadow-[0_0_10px_rgba(168,85,247,0.6)] border-purple-500/50 dark:border-purple-400/60',
    amber: 'shadow-[0_0_10px_rgba(245,158,11,0.6)] border-amber-500/50 dark:border-amber-400/60',
    emerald: 'shadow-[0_0_10px_rgba(16,185,129,0.6)] border-emerald-500/50 dark:border-emerald-400/60',
  }[variant];

  return (
    <div className={`relative w-full py-6 md:py-10 flex items-center justify-center overflow-hidden pointer-events-none select-none ${className}`}>
      {/* Container with constrained width matching content alignment */}
      <div className="relative w-full max-w-6xl mx-auto px-4 flex items-center justify-center">
        {/* Base hairline divider track */}
        <div className="w-full h-[1px] bg-slate-200/80 dark:bg-slate-800/80 relative overflow-hidden">
          {/* Animated travelling light beam pulse */}
          <motion.div
            className={`absolute top-0 bottom-0 w-1/3 bg-gradient-to-r ${gradientColors}`}
            animate={{
              x: ['-100%', '300%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 1,
            }}
          />

          {/* Ambient soft glow backdrop pulse */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${gradientColors} blur-[1px]`}
            animate={{
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Subtle center geometric node with gentle breathing glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <motion.div
            className={`w-2 h-2 rounded-full bg-slate-900 dark:bg-white border ${dotGlow} transition-colors duration-300`}
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>
    </div>
  );
};
