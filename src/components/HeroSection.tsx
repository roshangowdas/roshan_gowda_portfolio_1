import React, { useEffect } from 'react';
import { motion, useSpring } from 'motion/react';
import { FadeIn } from './FadeIn';
import { useTheme } from '../context/ThemeContext';

export const HeroSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Spring physics for smooth parallax mouse tracking
  const springConfig = { stiffness: 120, damping: 20, mass: 0.5 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2;
      const normY = (e.clientY / innerHeight - 0.5) * 2;

      mouseX.set(normX);
      mouseY.set(normY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Derived parallax motion values
  const portraitX = useSpring(0, springConfig);
  const portraitY = useSpring(0, springConfig);
  const portraitRotateX = useSpring(0, springConfig);
  const portraitRotateY = useSpring(0, springConfig);

  const headingX = useSpring(0, springConfig);
  const headingY = useSpring(0, springConfig);

  const textX = useSpring(0, springConfig);
  const textY = useSpring(0, springConfig);

  useEffect(() => {
    const unsubscribeX = mouseX.on('change', (val) => {
      portraitX.set(val * 22);
      portraitRotateY.set(val * 7);
      headingX.set(-val * 16);
      textX.set(val * 10);
    });

    const unsubscribeY = mouseY.on('change', (val) => {
      portraitY.set(val * 18);
      portraitRotateX.set(-val * 7);
      headingY.set(-val * 12);
      textY.set(val * 8);
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [
    mouseX,
    mouseY,
    portraitX,
    portraitY,
    portraitRotateX,
    portraitRotateY,
    headingX,
    headingY,
    textX,
    textY,
  ]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navBtnClass = isLight
    ? "text-slate-800 font-semibold uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:text-purple-600 transition-colors duration-200 cursor-pointer"
    : "text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer";

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative h-screen w-full flex flex-col justify-between overflow-x-clip select-none [perspective:1000px] transition-colors duration-300 ${
        isLight ? 'bg-[#F8FAFC]' : 'bg-[#0C0C0C]'
      }`}
    >
      {/* 1. Navbar */}
      <FadeIn delay={0} y={-20} className="w-full z-20">
        <nav className="w-full flex items-center justify-start sm:justify-center gap-4 sm:gap-8 md:gap-12 px-6 md:px-10 pt-6 md:pt-8 pr-16 sm:pr-20">
          <button onClick={() => scrollTo('about')} className={navBtnClass}>
            About
          </button>
          <button onClick={() => scrollTo('services')} className={navBtnClass}>
            Experience
          </button>
          <button onClick={() => scrollTo('projects')} className={navBtnClass}>
            Projects
          </button>
          <button onClick={() => scrollTo('contact')} className={navBtnClass}>
            Contact
          </button>
        </nav>
      </FadeIn>

      {/* 2. Hero Heading (Background Parallax Layer) */}
      <div className="w-full overflow-visible flex justify-center items-center z-0 pointer-events-none my-auto px-4 sm:px-6">
        <FadeIn delay={0.15} y={40} className="w-full flex justify-center">
          <motion.h1
            style={{ x: headingX, y: headingY }}
            className="hero-heading font-black uppercase tracking-normal leading-none text-center text-[7.5vw] sm:text-[8.5vw] md:text-[9.5vw] lg:text-[10vw] max-w-full select-none py-2"
          >
            Hi, i&apos;m roshan
          </motion.h1>
        </FadeIn>
      </div>

      {/* 3. Bottom Bar */}
      <div className="w-full flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-20">
        <FadeIn delay={0.35} y={20}>
          <motion.p
            style={{
              x: textX,
              y: textY,
              fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)',
            }}
            className={`font-light uppercase tracking-wide leading-snug max-w-[180px] sm:max-w-[240px] md:max-w-[300px] transition-colors duration-300 ${
              isLight ? 'text-slate-800' : 'text-[#D7E2EA]'
            }`}
          >
            Full-Stack Developer & AI-Ready Engineer crafting modern web apps & open-source libraries
          </motion.p>
        </FadeIn>

        {/* Quick Social Profile Links */}
        <FadeIn delay={0.4} y={20} className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs font-mono uppercase tracking-widest text-white">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/roshangowdas"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center rounded-full text-white font-medium uppercase tracking-widest outline outline-2 outline-white -outline-offset-[3px] cursor-pointer transition-all duration-300 px-4 py-2 sm:px-5 sm:py-2.5 text-xs shadow-lg"
            style={{
              background:
                'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
              boxShadow:
                '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
            }}
          >
            <span>GitHub</span>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.linkedin.com/in/roshan-gowda-s-378343283/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center rounded-full text-white font-medium uppercase tracking-widest outline outline-2 outline-white -outline-offset-[3px] cursor-pointer transition-all duration-300 px-4 py-2 sm:px-5 sm:py-2.5 text-xs shadow-lg"
            style={{
              background:
                'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
              boxShadow:
                '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
            }}
          >
            <span>LinkedIn</span>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.npmjs.com/~roshan__gowda"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center rounded-full text-white font-medium uppercase tracking-widest outline outline-2 outline-white -outline-offset-[3px] cursor-pointer transition-all duration-300 px-4 py-2 sm:px-5 sm:py-2.5 text-xs shadow-lg"
            style={{
              background:
                'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
              boxShadow:
                '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
            }}
          >
            <span>npm</span>
          </motion.a>
        </FadeIn>
      </div>
    </motion.section>
  );
};
