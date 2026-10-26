import React from 'react';
import { motion } from 'motion/react';
import { FadeIn } from './FadeIn';
import { Briefcase, Sparkles, Package } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const experiences = [
  {
    role: 'Full-Stack Development and AI-Ready Engineering Trainee',
    company: 'Intensive Engineering Program',
    period: '2026',
    icon: Sparkles,
    bullets: [
      'Engineered 5 responsive full-stack web applications utilizing React.js, Node.js, and Express.js during an intensive engineering training program.',
      'Accelerated software delivery cycles by 35% using prompt engineering and AI developer workflows (Google AI Studio, Gemini API) for automated code generation and test optimization.',
    ],
  },
  {
    role: 'Frontend Development Intern',
    company: 'Cognifyz Technologies',
    period: '2025',
    icon: Briefcase,
    bullets: [
      'Developed 5 responsive client-side web interfaces utilizing HTML5, CSS3, and JavaScript across multiple modern browsers.',
      'Performed code audits and optimization passes to ensure full cross-browser compatibility and strict adherence to responsive design standards.',
    ],
  },
  {
    role: 'Open-Source NPM Package Author',
    company: '@roshan__gowda/react-status-kit',
    period: '2026',
    icon: Package,
    bullets: [
      'Developed and published a production-ready open-source React component library designed to standardize asynchronous UI states (Loading, Error, Success).',
      'Engineered zero-dependency drop-in integration for seamless adoption across modern React projects.',
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 24,
      mass: 0.8,
    },
  },
};

export const ServicesSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <motion.section
      id="services"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-0 select-none transition-colors duration-300 ${
        isLight
          ? 'bg-[#0F172A] text-[#F8FAFC]'
          : 'bg-[#D7E2EA] text-[#0C0C0C]'
      }`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="text-current font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
            style={{ fontSize: 'clamp(3rem, 11vw, 150px)' }}
          >
            Experience
          </h2>
        </FadeIn>

        {/* Staggered Experience & Competency List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="border-t border-current/20 w-full"
        >
          {experiences.map((exp, idx) => {
            const IconComp = exp.icon;
            return (
              <motion.div
                key={exp.role}
                variants={itemVariants}
                className={`border-b border-current/20 py-8 sm:py-10 md:py-12 flex flex-col md:flex-row items-start justify-between gap-6 md:gap-10 group transition-colors duration-300 rounded-2xl px-3 sm:px-6 ${
                  isLight ? 'hover:bg-white/5' : 'hover:bg-black/5'
                }`}
              >
                {/* Left col: Number & Period */}
                <div className="flex md:flex-col items-center md:items-start justify-between w-full md:w-48 shrink-0">
                  <div className="font-black text-current leading-none text-4xl sm:text-5xl opacity-40 group-hover:opacity-100 transition-opacity">
                    0{idx + 1}
                  </div>
                  <span className={`text-xs uppercase tracking-widest font-mono font-semibold px-3 py-1 rounded-full mt-2 ${
                    isLight ? 'bg-white/10 text-emerald-300 border border-white/10' : 'bg-black/10 text-slate-800'
                  }`}>
                    {exp.period}
                  </span>
                </div>

                {/* Right col: Details */}
                <div className="flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-2 text-current/90 text-xs font-semibold uppercase tracking-wider">
                    <IconComp className={`w-4 h-4 ${isLight ? 'text-emerald-400' : 'text-emerald-700'}`} />
                    <span>{exp.company}</span>
                  </div>
                  <h3
                    className="font-semibold uppercase text-current leading-tight"
                    style={{ fontSize: 'clamp(1.1rem, 2vw, 1.8rem)' }}
                  >
                    {exp.role}
                  </h3>
                  <ul className="space-y-2 mt-1">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-sm sm:text-base font-light text-current/80 flex items-start gap-2">
                        <span className={`${isLight ? 'text-emerald-400' : 'text-emerald-700'} mt-1`}>•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};
