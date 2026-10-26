import React from 'react';
import { motion } from 'motion/react';
import { FadeIn } from './FadeIn';
import { ContactButton } from './ContactButton';
import { ContactForm } from './ContactForm';
import { Mail, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const FooterSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative z-20 w-full px-5 sm:px-8 md:px-10 pt-20 sm:pt-28 pb-12 border-t select-none overflow-hidden transition-colors duration-300 ${
        isLight
          ? 'bg-[#F8FAFC] text-slate-900 border-slate-200'
          : 'bg-[#0C0C0C] text-[#D7E2EA] border-current/10'
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Availability Badge */}
        <FadeIn delay={0} y={20}>
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs sm:text-sm uppercase tracking-widest mb-8 ${
            isLight
              ? 'bg-white border-slate-300 text-slate-800 shadow-sm font-semibold'
              : 'bg-[#181818] border-current/20 text-current'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for engineering roles & collaborations</span>
          </div>
        </FadeIn>

        {/* Big Callout Heading */}
        <FadeIn delay={0.1} y={30}>
          <h2
            className="hero-heading font-black uppercase leading-tight tracking-tight text-center max-w-4xl mb-8"
            style={{ fontSize: 'clamp(2.5rem, 7.5vw, 100px)' }}
          >
            Let&apos;s build something incredible
          </h2>
        </FadeIn>

        {/* Direct Contact Links */}
        <FadeIn delay={0.2} y={20} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <ContactButton
            label="Send Direct Email"
            onClick={() => (window.location.href = 'mailto:0243roshan@gmail.com')}
          />
          <a
            href="mailto:0243roshan@gmail.com"
            className={`inline-flex items-center gap-2 font-medium uppercase tracking-wider text-base sm:text-lg transition-colors underline underline-offset-8 ${
              isLight ? 'text-purple-700 hover:text-purple-900' : 'text-current hover:opacity-70'
            }`}
          >
            <Mail className="w-5 h-5 opacity-80" />
            <span>0243roshan@gmail.com</span>
          </a>
        </FadeIn>

        {/* Interactive Contact Form Component */}
        <FadeIn delay={0.25} y={30} className="w-full">
          <ContactForm />
        </FadeIn>

        {/* Bottom bar */}
        <div className={`w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs uppercase tracking-widest mt-8 pt-8 border-t ${
          isLight ? 'border-slate-200 text-slate-600' : 'border-current/10 opacity-60'
        }`}>
          <p>© {new Date().getFullYear()} ROSHAN GOWDA S -- ALL RIGHTS RESERVED</p>

          <button
            onClick={scrollToTop}
            className={`inline-flex items-center gap-2 transition-colors cursor-pointer group ${
              isLight ? 'hover:text-purple-700 text-slate-800 font-semibold' : 'hover:text-[#D7E2EA]'
            }`}
          >
            <span>Back to top</span>
            <Sparkles className="w-4 h-4 text-purple-600 group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </motion.footer>
  );
};
