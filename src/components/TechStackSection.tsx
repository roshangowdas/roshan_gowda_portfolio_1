import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FadeIn } from './FadeIn';
import { Sparkles, Terminal, Code2, Database, Cpu, Wrench } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface TechItem {
  id: string;
  name: string;
  category: 'Languages' | 'Frontend' | 'Backend' | 'Databases' | 'Tools';
  categoryLabel: string;
  description: string;
  icon: React.ReactNode;
}

const techStack: TechItem[] = [
  {
    id: 'react',
    name: 'React.js',
    category: 'Frontend',
    categoryLabel: 'Frontend',
    description: 'Component-Based UI Architecture',
    icon: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-10 h-10 sm:w-11 sm:h-11">
        <circle cx="0" cy="0" r="2.05" fill="#0284C7" />
        <g stroke="#0284C7" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Languages',
    categoryLabel: 'Languages',
    description: 'ES6+ Asynchronous Logic & APIs',
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg">
        <path fill="#F7DF1E" d="M0 0h128v128H0z" />
        <path fill="#000" d="M67.312 103.938c3.25 5.422 7.672 9.047 15.016 9.047 6.328 0 10.391-3.172 10.391-7.578 0-5.203-4.125-7.109-11.062-10.125l-3.875-1.672c-11.203-4.766-18.672-10.703-18.672-23.234 0-11.578 8.953-20.25 22.828-20.25 9.844 0 16.922 3.484 21.75 11.953l-10.953 7.031c-2.484-4.328-5.844-6.172-10.594-6.172-4.516 0-7.328 2.344-7.328 5.703 0 4.109 2.875 5.922 9.203 8.656l3.875 1.672c13.047 5.594 20.672 11.203 20.672 23.953 0 13.688-10.828 21.609-26.484 21.609-14.859 0-23.719-6.969-28.094-15.547l13.328-8.047zM20.328 103.359c2.391 3.969 5.484 6.969 11.062 6.969 5.547 0 8.875-2.203 8.875-10.781V50.984h16.297v48.891c0 17.5-10.078 25.328-24.969 25.328-12.875 0-21.297-6.844-25.266-15.422l13.901-6.422z" />
      </svg>
    ),
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend',
    categoryLabel: 'Backend',
    description: 'Event-Driven Server Runtime',
    icon: (
      <svg viewBox="0 0 256 289" className="w-10 h-10 sm:w-11 sm:h-11">
        <path fill="#5FA04E" d="M128 0L0 73.9v141.1L128 289l128-73.9V73.9L128 0zm98 200.7L128 257 30 200.7V88.3L128 32l98 56.3v112.4z" />
        <path fill="#5FA04E" d="M128 62.4L54.7 104.7v84.6L128 231.6l73.3-42.3v-84.6L128 62.4zm44.2 113.8L128 201.7l-44.2-25.5v-51L128 99.7l44.2 25.5v51z" />
      </svg>
    ),
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'Backend',
    categoryLabel: 'Backend',
    description: 'RESTful Web Service Framework',
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10 sm:w-11 sm:h-11">
        <path fill="#0F172A" d="M128 64c0 35.346-28.654 64-64 64S0 99.346 0 64 28.654 0 64 0s64 28.654 64 64z" className="opacity-10" />
        <text x="64" y="80" fontSize="56" fontWeight="900" textAnchor="middle" fill="#0F172A" fontFamily="system-ui, sans-serif" letterSpacing="-2">
          ex
        </text>
      </svg>
    ),
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Databases',
    categoryLabel: 'Databases',
    description: 'Document NoSQL Data Schemas',
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10 sm:w-11 sm:h-11">
        <path fill="#47A248" d="M64 4c0 0-38 38.31-38 67.29 0 20.31 16.19 36.71 36.1 37.66V124h3.8V108.95c19.91-.95 36.1-17.35 36.1-37.66C102 42.31 64 4 64 4zm-1.9 101.05c-15.68-.95-28.02-13.82-28.02-29.36 0-21.38 24.03-51.11 29.92-58.14V105.05zm5.7 0V17.55c5.89 7.03 29.92 36.76 29.92 58.14 0 15.54-12.34 28.41-28.02 29.36z" />
      </svg>
    ),
  },
  {
    id: 'firebase',
    name: 'Firebase',
    category: 'Databases',
    categoryLabel: 'Databases',
    description: 'Auth & Firestore Cloud Database',
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10 sm:w-11 sm:h-11">
        <path fill="#FFCA28" d="M21.1 98.4L37.8 11a3 3 0 015.7-.8l13.6 25.5L21.1 98.4z" />
        <path fill="#FFA000" d="M72.8 53.6L57.1 24.2a3 3 0 00-5.4 0L21.1 98.4l51.7-44.8z" />
        <path fill="#F57C00" d="M106.9 98.4L90.8 17.6a3 3 0 00-5.6-.9L72.8 53.6l34.1 44.8z" />
        <path fill="#FFCA28" d="M23.9 104.8a5 5 0 006.3.3l33.8-29.3 33.8 29.3a5 5 0 006.3-.3L91.4 17.6a3 3 0 00-5.6-.9L72.8 53.6l-15.7-29.4a3 3 0 00-5.4 0L37.8 11a3 3 0 00-5.7-.8L23.9 104.8z" className="opacity-20" />
        <path fill="#FFA000" d="M64 122a5 5 0 01-3.2-1.2L20.3 88.5l1.8 12.3a5 5 0 001.8 3.3l36.9 22.7a5 5 0 006.4 0l36.9-22.7a5 5 0 001.8-3.3l1.8-12.3-40.5 32.3a5 5 0 01-3.2 1.2z" />
      </svg>
    ),
  },
  {
    id: 'cpp',
    name: 'C / C++',
    category: 'Languages',
    categoryLabel: 'Languages',
    description: 'System Logic & Data Structures',
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10 sm:w-11 sm:h-11">
        <path fill="#00599C" d="M117.5 37.1L67.6 8.3c-2.2-1.3-4.9-1.3-7.1 0L10.5 37.1c-2.2 1.3-3.6 3.6-3.6 6.1v57.6c0 2.5 1.4 4.8 3.6 6.1l49.9 28.8c2.2 1.3 4.9 1.3 7.1 0l49.9-28.8c2.2-1.3 3.6-3.6 3.6-6.1V43.2c.1-2.5-1.3-4.8-3.5-6.1z" />
        <path fill="#FFFFFF" d="M62 42.5c-11.8 0-19.5 8.2-19.5 21.5s7.7 21.5 19.5 21.5c8.2 0 14.5-3.8 17.5-9.8h-9c-1.8 2.8-4.8 4.2-8.5 4.2-6.5 0-10.2-4.8-10.2-15.8 0-11.2 3.8-15.8 10.2-15.8 3.8 0 6.8 1.5 8.5 4.2h9c-3-6-9.3-10-17.5-10zm25 15h4v6h-4v4h-6v-4h-4v-6h4v-4h6v4zm16 0h4v6h-4v4h-6v-4h-4v-6h4v-4h6v4z" />
      </svg>
    ),
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Languages',
    categoryLabel: 'Languages',
    description: 'Object-Oriented Programming',
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10 sm:w-11 sm:h-11">
        <path fill="#E76F00" d="M48.2 92.8s-7.1.8-10.1 2.2c-7 3.2 1.7 5.7 6.3 6.3 12.8 1.4 33.3.7 45.4-3.1 4.5-1.4 9.8-3.4 7.2-6.1-2.9-3-12.1-2.4-16.8-1.9-11 1.2-25.9.8-32 1.4zM52.3 79.8s-5.9 1.1-8.2 2.7c-6.1 4.2 2.2 6.5 7.1 6.6 12.6.5 29.6.5 40.5-2.7 3.8-1.1 8.2-3.3 5.5-5.2-2.7-2.2-10.4-1.6-14.8-1.1-9.9 1-23.7.8-30.1-.3z" />
        <path fill="#5382A1" d="M70.8 43.8c5.5 5.1 1.6 11.2-1.8 15.3-3.9 4.6-8.3 8.3-4.9 12 3.3 3.6 11.5 1.1 14.3-1.6 2.8-2.7 4.9-6.6 6-9.9 2.2-8.3-1.1-14.8-6.1-19.7-4.9-4.9-9.3-9.9-7.7-15.3 1.1-3.8 4.9-6 8.2-7.1-8.2.5-15.9 5.5-17 12.6-1.1 7.1 3.3 13.7 9 13.7z" />
        <path fill="#5382A1" d="M50.2 61.2c-5 2.1-10.6 5.5-13 10.7-3.2 6.9 1 14.1 7.2 18 10.2 6.4 23.3 7 34.8 5 9.1-1.6 18.9-5.1 24-12.8 1.8-2.7 3.2-6.1 2.3-9.3-.9-3.2-3.8-5.3-6.8-6.6l-1.2 2.7c2.2.9 4.4 2.4 4.9 4.7.5 2.3-.6 4.6-1.9 6.5-4 5.9-12.1 8.7-18.9 10-10.1 2-20.7 1.5-30.1-2.5-5.6-2.4-11.2-6.3-11.9-12.5-.7-6.2 3.8-11 8.8-13.8l-3.2-.1z" />
      </svg>
    ),
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Languages',
    categoryLabel: 'Languages',
    description: 'Scripting, Automation & AI Logic',
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10 sm:w-11 sm:h-11">
        <path fill="#3776AB" d="M63.3 8c-16.7 0-15.7 7.2-15.7 7.2l.1 7.5h16s15.7-.2 15.7 15.3v15.7H58.2S42.5 54 42.5 71c0 17 13.7 16.5 13.7 16.5h8.2v-8.7s-.3-10.4 10.2-10.4h17.6s9.9-.2 9.9-9.5V36.2S104.3 8 63.3 8zm-8.7 5.4a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z" />
        <path fill="#FFD43B" d="M64.7 120c16.7 0 15.7-7.2 15.7-7.2l-.1-7.5h-16s-15.7.2-15.7-15.3V74.3h21.2S85.5 74 85.5 57c0-17-13.7-16.5-13.7-16.5h-8.2v8.7s.3 10.4-10.2 10.4H35.8s-9.9.2-9.9 9.5v22.7S23.7 120 64.7 120zm8.7-5.4a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
      </svg>
    ),
  },
  {
    id: 'antigravity',
    name: 'Antigravity AI',
    category: 'Tools',
    categoryLabel: 'Tools & AI',
    description: 'Agentic AI & Full-Stack Automation',
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10 sm:w-11 sm:h-11">
        <defs>
          <linearGradient id="agGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <path fill="url(#agGrad)" d="M64 10L80.5 43.5L118 48.9L90.9 75.1L97.3 112.1L64 94.6L30.7 112.1L37.1 75.1L10 48.9L47.5 43.5L64 10Z" />
        <circle cx="64" cy="64" r="50" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray="8 6" />
      </svg>
    ),
  },
  {
    id: 'gemini',
    name: 'Gemini AI & Studio',
    category: 'Tools',
    categoryLabel: 'Tools & AI',
    description: 'AI Developer & Prompt Engineering',
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10 sm:w-11 sm:h-11">
        <path fill="url(#geminiGrad)" d="M64 0C64 35.346 35.346 64 0 64c35.346 0 64 28.654 64 64 0-35.346 28.654-64 64-64-35.346 0-64-28.654-64-64z" />
        <defs>
          <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A73E8" />
            <stop offset="50%" stopColor="#8E24AA" />
            <stop offset="100%" stopColor="#D93025" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: 'npm',
    name: 'npm Publishing',
    category: 'Tools',
    categoryLabel: 'Tools & AI',
    description: 'Open-Source Component Packaging',
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10 sm:w-11 sm:h-11">
        <path fill="#CB3837" d="M0 0h128v128H0z" />
        <path fill="#FFFFFF" d="M18 18h92v92H18z" />
        <path fill="#CB3837" d="M32 32h64v64H32z" />
        <path fill="#FFFFFF" d="M46 46h22v36H46zm36 0h14v36H82z" />
      </svg>
    ),
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'Tools',
    categoryLabel: 'Tools & AI',
    description: 'Branching, PRs & CI/CD Workflows',
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10 sm:w-11 sm:h-11">
        <path fill="#F05032" d="M125.6 58.3L69.7 2.4c-3.2-3.2-8.4-3.2-11.6 0L43.4 17.1l14.7 14.7c3.4-1.2 7.4-.4 10.1 2.3 2.8 2.8 3.5 6.7 2.4 10.1l14.2 14.2c3.4-1.2 7.4-.4 10.1 2.3 3.9 3.9 3.9 10.1 0 14-3.9 3.9-10.1 3.9-14 0-2.8-2.8-3.5-6.7-2.4-10.1L64.3 60.4v29.5c.8.4 1.5 1 2.1 1.6 3.9 3.9 3.9 10.1 0 14-3.9 3.9-10.1 3.9-14 0-3.9-3.9-3.9-10.1 0-14 .9-.9 2.1-1.6 3.3-2V58.9c-1.2-.4-2.3-1.1-3.3-2-2.8-2.8-3.6-6.8-2.3-10.3L35.2 31.8 2.4 64.6c-3.2 3.2-3.2 8.4 0 11.6l55.9 55.9c3.2 3.2 8.4 3.2 11.6 0l55.7-55.7c3.2-3.2 3.2-8.5 0-11.7z" />
      </svg>
    ),
  },
  {
    id: 'sql',
    name: 'SQL & DBMS',
    category: 'Databases',
    categoryLabel: 'Databases',
    description: 'Relational Schemas & Queries',
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10 sm:w-11 sm:h-11">
        <path fill="#00758F" d="M64 16c-26.5 0-48 8.4-48 18.7v58.6c0 10.3 21.5 18.7 48 18.7s48-8.4 48-18.7V34.7C112 24.4 90.5 16 64 16zm0 12c21.2 0 36 6 36 6.7s-14.8 6.7-36 6.7-36-6-36-6.7 14.8-6.7 36-6.7zm0 25.3c21.2 0 36 6 36 6.7s-14.8 6.7-36 6.7-36-6-36-6.7 14.8-6.7 36-6.7zm0 25.4c21.2 0 36 6 36 6.7s-14.8 6.7-36 6.7-36-6-36-6.7 14.8-6.7 36-6.7z" />
      </svg>
    ),
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: 'Frontend',
    categoryLabel: 'Frontend',
    description: 'Semantic Web Structure',
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10 sm:w-11 sm:h-11">
        <path fill="#E34F26" d="M19.2 110.1L8 0h112l-11.2 110.1L63.8 128z" />
        <path fill="#EF652A" d="M64 117.8l36.9-10.2 9.5-93.6H64z" />
        <path fill="#FFFFFF" d="M64 50.8H43.1l-1.4-16H64V19.2H24.3l.4 4.8 3.5 39.3H64zm0 37.1l-.2.1-15.5-4.2-1-11.2H31.6l1.9 21.8 30.3 8.4.2.1z" />
        <path fill="#EBEBEB" d="M63.9 50.8v15.6h19.5l-1.8 20.4-17.7 4.8v16.2l30.3-8.4 2.5-28.1.4-4.8.4-4.8h-4.3zM63.9 19.2v15.6h38.3l1.4-15.6z" />
      </svg>
    ),
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'Frontend',
    categoryLabel: 'Frontend',
    description: 'Modern Responsive Layouts',
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10 sm:w-11 sm:h-11">
        <path fill="#1572B6" d="M19.2 110.1L8 0h112l-11.2 110.1L63.8 128z" />
        <path fill="#33A9DC" d="M64 117.8l36.9-10.2 9.5-93.6H64z" />
        <path fill="#FFFFFF" d="M64 50.8H43.1l-1.4-16H64V19.2H24.3l.4 4.8 3.5 39.3H64zm0 37.1l-.2.1-15.5-4.2-1-11.2H31.6l1.9 21.8 30.3 8.4.2.1z" />
        <path fill="#EBEBEB" d="M63.9 50.8v15.6h19.5l-1.8 20.4-17.7 4.8v16.2l30.3-8.4 2.5-28.1.4-4.8.4-4.8h-4.3zM63.9 19.2v15.6h38.3l1.4-15.6z" />
      </svg>
    ),
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'Tools',
    categoryLabel: 'Tools & AI',
    description: 'IDE & Developer Extensions',
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10 sm:w-11 sm:h-11">
        <path fill="#007ACC" d="M123.5 13.8L97.1 1.1c-2-.9-4.3-.2-5.5 1.5L41.3 48 15 27.6c-1.8-1.4-4.3-1.1-5.7.7L1.2 38.6c-1.3 1.7-1 4.1.7 5.4l21.7 18.9L1.9 81.8c-1.7 1.3-2 3.7-.7 5.4l8.1 10.3c1.4 1.8 3.9 2.1 5.7.7l26.3-20.4 50.3 45.4c1.2 1.7 3.5 2.4 5.5 1.5l26.4-12.7c2.1-1 3.5-3.1 3.5-5.5V19.3c0-2.4-1.4-4.5-3.5-5.5zM96 88L64 64l32-24v48z" />
      </svg>
    ),
  },
];

const categories = [
  { id: 'All', label: 'All Stack', icon: Sparkles },
  { id: 'Languages', label: 'Languages', icon: Terminal },
  { id: 'Frontend', label: 'Frontend', icon: Code2 },
  { id: 'Backend', label: 'Backend', icon: Cpu },
  { id: 'Databases', label: 'Databases & Cloud', icon: Database },
  { id: 'Tools', label: 'Tools & AI', icon: Wrench },
] as const;

export const TechStackSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredTechs =
    selectedCategory === 'All'
      ? techStack
      : techStack.filter((item) => item.category === selectedCategory);

  return (
    <motion.section
      id="tech-stack"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 flex flex-col items-center justify-center border-t border-b select-none transition-colors duration-300 ${
        isLight
          ? 'bg-slate-100/90 text-slate-900 border-slate-300'
          : 'bg-[#080808] text-[#D7E2EA] border-white/10'
      }`}
    >
      <div className="max-w-6xl w-full flex flex-col items-center text-center">
        {/* Section Heading matching site typography */}
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
          >
            Tech Stack
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} y={20}>
          <p className={`mt-4 max-w-lg text-sm sm:text-base font-light ${isLight ? 'text-slate-700' : 'text-[#D7E2EA]/60'}`}>
            Core technologies, languages, and developer tools powering Roshan&apos;s full-stack applications.
          </p>
        </FadeIn>

        {/* Category Filter Tabs */}
        <FadeIn delay={0.15} y={20} className="w-full mt-10">
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={
                    isActive
                      ? {
                          background:
                            'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                          boxShadow:
                            '0px 4px 12px rgba(181, 1, 167, 0.35), inset 4px 4px 12px #7721B1',
                        }
                      : {}
                  }
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'text-white font-bold scale-105 outline outline-2 outline-white -outline-offset-[3px]'
                      : isLight
                      ? 'bg-white hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-300 shadow-sm'
                      : 'bg-white/5 hover:bg-white/10 text-[#D7E2EA]/60 hover:text-white border border-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Minimal Editorial Tech Icon Grid */}
        <div className="w-full mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {filteredTechs.map((tech, idx) => {
            const indexFormatted = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;
            return (
              <FadeIn key={tech.id} delay={0.03 * (idx % 6)} y={20}>
                <div
                  className={`group relative flex flex-col justify-between items-center p-5 rounded-2xl transition-all duration-300 min-h-[175px] sm:min-h-[190px] cursor-pointer text-center ${
                    isLight
                      ? 'bg-white border border-slate-300 hover:border-purple-500 shadow-md hover:shadow-xl hover:shadow-purple-500/10'
                      : 'bg-[#0E0E0E] hover:bg-[#14011a]/80 border border-white/10 hover:border-purple-500/50 hover:outline hover:outline-2 hover:outline-white hover:-outline-offset-[3px] hover:shadow-[0px_4px_16px_rgba(181,1,167,0.3)]'
                  }`}
                >
                  {/* Top bar: Category & Number */}
                  <div className={`w-full flex justify-between items-center text-[10px] font-mono uppercase tracking-widest transition-colors ${
                    isLight ? 'text-slate-500 group-hover:text-purple-700 font-semibold' : 'text-white/30 group-hover:text-purple-300'
                  }`}>
                    <span>{tech.categoryLabel}</span>
                    <span>{indexFormatted}</span>
                  </div>

                  {/* Center Official Brand SVG Icon */}
                  <div className="my-auto transition-all duration-300 transform group-hover:scale-110 drop-shadow-md">
                    {tech.icon}
                  </div>

                  {/* Bottom Text Details */}
                  <div className="w-full flex flex-col items-center">
                    <h3 className={`text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors ${
                      isLight ? 'text-slate-900 group-hover:text-purple-900 font-bold' : 'text-[#D7E2EA] group-hover:text-white'
                    }`}>
                      {tech.name}
                    </h3>
                    <p className={`text-[10px] font-mono transition-colors mt-1 leading-tight max-w-[130px] ${
                      isLight ? 'text-slate-600 group-hover:text-slate-900' : 'text-white/40 group-hover:text-white/70'
                    }`}>
                      {tech.description}
                    </p>
                  </div>

                  {/* Bottom Accent Line */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 group-hover:w-3/4 transition-all duration-300 rounded-full"
                    style={{
                      background:
                        'linear-gradient(90deg, #B600A8, #7621B0, #BE4C00)',
                    }}
                  />
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
