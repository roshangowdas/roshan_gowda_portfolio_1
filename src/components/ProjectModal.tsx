import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Github,
  Package,
  ExternalLink,
  Check,
  Copy,
  Terminal,
  Zap,
  Code2,
  Layers,
  CheckCircle2,
  Sparkles,
  Cpu,
} from 'lucide-react';
import { ProjectItem } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  renderWidget?: (projectId: string) => React.ReactNode;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  renderWidget,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [copied, setCopied] = useState(false);

  // Close on Escape key press & prevent scroll behind modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleCopyLink = () => {
    const link = project.npmPackage || project.githubUrl || project.demoUrl || window.location.href;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          {/* Modal Content Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative z-10 w-full max-w-4xl border-2 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl my-auto max-h-[90vh] flex flex-col justify-between overflow-y-auto font-sans custom-scrollbar transition-colors duration-300 ${
              isLight
                ? 'bg-white border-emerald-600/40 text-slate-900 shadow-slate-400/50'
                : 'bg-[#111111] border-emerald-500/30 text-[#D7E2EA] shadow-emerald-950/40'
            }`}
          >
            {/* Top Navigation & Close Button */}
            <div className={`flex items-center justify-between border-b pb-5 mb-6 ${
              isLight ? 'border-slate-200' : 'border-white/10'
            }`}>
              <div className="flex items-center gap-3">
                <span className={`font-mono text-2xl font-black ${
                  isLight ? 'text-emerald-700' : 'text-emerald-400'
                }`}>
                  {project.number}
                </span>
                <span className={`uppercase text-xs font-semibold font-mono tracking-widest px-3 py-1 rounded-full ${
                  isLight
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {project.category}
                </span>
              </div>

              <button
                onClick={onClose}
                className={`p-2 rounded-full transition-colors cursor-pointer border ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                    : 'bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border-white/10'
                }`}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex flex-col gap-8">
              {/* Title & Subtitle */}
              <div className="flex flex-col gap-2">
                <h3 className={`text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {project.title}
                </h3>
                {project.subtitle && (
                  <div className={`flex items-center gap-2 text-xs sm:text-sm font-mono px-3 py-1.5 rounded-lg border w-fit ${
                    isLight
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                      : 'bg-emerald-950/40 text-emerald-300/90 border-emerald-500/20'
                  }`}>
                    <Terminal className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{project.subtitle}</span>
                  </div>
                )}
              </div>

              {/* Main Detailed Description */}
              <div className="flex flex-col gap-3">
                <h4 className={`text-xs uppercase font-mono font-bold tracking-widest flex items-center gap-2 ${
                  isLight ? 'text-emerald-800' : 'text-emerald-400'
                }`}>
                  <Zap className="w-3.5 h-3.5" /> Project Overview & Purpose
                </h4>
                <p className={`text-sm sm:text-base font-light leading-relaxed ${
                  isLight ? 'text-slate-700' : 'text-[#D7E2EA]/90'
                }`}>
                  {project.longDescription || project.description}
                </p>
              </div>

              {/* Interactive Widget Embedded Preview */}
              {renderWidget && (
                <div className="flex flex-col gap-3">
                  <h4 className={`text-xs uppercase font-mono font-bold tracking-widest flex items-center gap-2 ${
                    isLight ? 'text-emerald-800' : 'text-emerald-400'
                  }`}>
                    <Cpu className="w-3.5 h-3.5" /> Live Simulator & Architecture Preview
                  </h4>
                  <div className="w-full min-h-[220px] rounded-xl overflow-hidden border border-white/10 bg-black/40">
                    {renderWidget(project.id)}
                  </div>
                </div>
              )}

              {/* Key Features & Architecture Highlights Grid */}
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div className="flex flex-col gap-3">
                  <h4 className={`text-xs uppercase font-mono font-bold tracking-widest flex items-center gap-2 ${
                    isLight ? 'text-emerald-800' : 'text-emerald-400'
                  }`}>
                    <Layers className="w-3.5 h-3.5" /> Key Technical Capabilities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.keyFeatures.map((feature, idx) => (
                      <div
                        key={idx}
                        className={`border rounded-xl p-3.5 flex flex-col gap-1 transition-colors ${
                          isLight
                            ? 'bg-slate-50 border-slate-200 hover:border-emerald-500'
                            : 'bg-white/5 border-white/10 hover:border-emerald-500/40'
                        }`}
                      >
                        <span className={`text-xs font-bold flex items-center gap-1.5 ${
                          isLight ? 'text-slate-900' : 'text-white'
                        }`}>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          {feature.title}
                        </span>
                        <span className={`text-xs font-light leading-normal ${
                          isLight ? 'text-slate-600' : 'text-white/70'
                        }`}>
                          {feature.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights Bullet List if present */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="flex flex-col gap-3">
                  <h4 className={`text-xs uppercase font-mono font-bold tracking-widest flex items-center gap-2 ${
                    isLight ? 'text-emerald-800' : 'text-emerald-400'
                  }`}>
                    <Sparkles className="w-3.5 h-3.5" /> Impact & Achievements
                  </h4>
                  <ul className={`grid grid-cols-1 gap-2 font-sans text-xs sm:text-sm ${
                    isLight ? 'text-slate-800' : 'text-white/80'
                  }`}>
                    {project.highlights.map((item, idx) => (
                      <li key={idx} className={`flex items-start gap-2.5 p-2.5 rounded-lg border ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'
                      }`}>
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack Tags */}
              <div className="flex flex-col gap-3">
                <h4 className={`text-xs uppercase font-mono font-bold tracking-widest flex items-center gap-2 ${
                  isLight ? 'text-emerald-800' : 'text-emerald-400'
                }`}>
                  <Code2 className="w-3.5 h-3.5" /> Technologies & Tools
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1.5 rounded-full text-xs font-mono text-white font-medium shadow-md outline outline-2 outline-white -outline-offset-[3px]"
                      style={{
                        background:
                          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                        boxShadow:
                          '0px 4px 8px rgba(181, 1, 167, 0.3), inset 2px 2px 8px #7721B1',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className={`flex flex-wrap items-center justify-between gap-4 pt-8 mt-8 border-t ${
              isLight ? 'border-slate-200' : 'border-white/10'
            }`}>
              <button
                onClick={handleCopyLink}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-mono transition-colors cursor-pointer ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                    : 'bg-white/5 hover:bg-white/15 text-white/80 border-white/10'
                }`}
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
              </button>

              <div className="flex flex-wrap items-center gap-3">
                {project.npmPackage && (
                  <a
                    href={project.npmPackage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/50 text-rose-300 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-rose-500/20"
                  >
                    <Package className="w-4 h-4 text-rose-400" />
                    <span>NPM Package</span>
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-lg ${
                      isLight
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/60 text-emerald-300 hover:text-white'
                    }`}
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
