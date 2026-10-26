/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { ScrollToTop } from './components/ScrollToTop';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { TechStackSection } from './components/TechStackSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { FooterSection } from './components/FooterSection';
import { KeyboardShortcuts } from './components/KeyboardShortcuts';
import { SectionDivider } from './components/SectionDivider';

function MainApp() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <main
      className={`min-h-screen font-['Kanit',sans-serif] overflow-x-clip transition-colors duration-300 ${
        isLight
          ? 'bg-[#F8FAFC] text-[#0F172A] selection:bg-purple-500/20 selection:text-slate-900'
          : 'bg-[#0C0C0C] text-[#D7E2EA] selection:bg-[#B600A8]/30 selection:text-white'
      }`}
    >
      {/* Fixed Floating Theme Toggle Button in top-right */}
      <div className="fixed top-5 right-5 sm:top-7 sm:right-8 z-50">
        <ThemeToggle />
      </div>

      {/* Scroll Depth Progress Bar */}
      <ScrollProgressBar />

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Floating Scroll to Top FAB */}
      <ScrollToTop />

      {/* Global Keyboard Navigation Shortcuts */}
      <KeyboardShortcuts />

      {/* 1. HeroSection */}
      <HeroSection />

      {/* Divider 1: Hero -> About */}
      <SectionDivider variant="cyan" />

      {/* 2. AboutSection */}
      <AboutSection />

      {/* Divider 2: About -> Tech Stack */}
      <SectionDivider variant="purple" />

      {/* 3. TechStackSection */}
      <TechStackSection />

      {/* Divider 3: Tech Stack -> Services */}
      <SectionDivider variant="amber" />

      {/* 4. ServicesSection */}
      <ServicesSection />

      {/* Divider 4: Services -> Projects */}
      <SectionDivider variant="emerald" />

      {/* 5. ProjectsSection */}
      <ProjectsSection />

      {/* Divider 5: Projects -> Contact/Footer */}
      <SectionDivider variant="cyan" />

      {/* 6. FooterSection (Contact & Links) */}
      <FooterSection />
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
