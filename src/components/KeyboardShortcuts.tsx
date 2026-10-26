import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Keyboard, X, Command, Sparkles, Navigation } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ShortcutDefinition {
  key: string;
  displayKey: string;
  label: string;
  targetId: string;
}

const SHORTCUTS: ShortcutDefinition[] = [
  { key: 'h', displayKey: 'H', label: 'Top / Hero', targetId: 'top' },
  { key: 'a', displayKey: 'A', label: 'About Me', targetId: 'about' },
  { key: 't', displayKey: 'T', label: 'Tech Stack', targetId: 'tech-stack' },
  { key: 'e', displayKey: 'E', label: 'Experience', targetId: 'services' },
  { key: 'p', displayKey: 'P', label: 'Projects', targetId: 'projects' },
  { key: 'c', displayKey: 'C', label: 'Contact', targetId: 'contact' },
];

export const KeyboardShortcuts: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const jumpToSection = useCallback(
    (targetId: string, label: string, keyChar: string) => {
      if (targetId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }
      showToast(`Navigated to ${label} [${keyChar.toUpperCase()}]`);
    },
    [showToast]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Ignore shortcuts when typing in form inputs or editable areas
      const activeElement = document.activeElement;
      const isInputActive =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement instanceof HTMLSelectElement ||
        (activeElement as HTMLElement)?.isContentEditable;

      if (isInputActive) {
        return;
      }

      // 2. Ignore keypresses combined with Cmd/Ctrl or Alt modifiers to prevent hijacking browser shortcuts
      if (e.metaKey || e.ctrlKey || e.altKey) {
        return;
      }

      const key = e.key.toLowerCase();

      // 3. Toggle Help Modal with '?' or 'k'
      if (e.key === '?' || (e.key === 'Shift' && e.code === 'Slash') || (key === 'k' && !e.metaKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      // 4. Close Modal on Escape
      if (e.key === 'Escape') {
        if (isOpen) {
          setIsOpen(false);
        }
        return;
      }

      // 5. Match navigation shortcuts
      const matched = SHORTCUTS.find((s) => s.key === key);
      if (matched) {
        e.preventDefault();
        jumpToSection(matched.targetId, matched.label, matched.displayKey);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, jumpToSection]);

  return (
    <>
      {/* Floating KBD Trigger Button in bottom-left */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          title="Keyboard Navigation Shortcuts (?)"
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono transition-colors shadow-lg cursor-pointer ${
            isLight
              ? 'bg-white/90 text-slate-800 border border-slate-300 hover:bg-slate-100 shadow-slate-300/50'
              : 'bg-[#181818]/90 text-[#D7E2EA] border border-white/20 hover:bg-[#222222] shadow-black/50'
          }`}
        >
          <Keyboard className="w-3.5 h-3.5 text-purple-600" />
          <span className="hidden sm:inline font-medium">Shortcuts</span>
          <kbd className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
            isLight ? 'bg-slate-100 border-slate-300 text-purple-700' : 'bg-black/60 border-white/20 text-emerald-400'
          }`}>
            ?
          </kbd>
        </motion.button>
      </div>

      {/* Floating Navigation Feedback Toast Overlay */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full shadow-2xl border text-xs font-mono font-bold flex items-center gap-2 pointer-events-none ${
              isLight
                ? 'bg-slate-900 text-white border-purple-500 shadow-purple-900/20'
                : 'bg-black/90 text-white border-emerald-500/60 shadow-emerald-950/50'
            }`}
          >
            <Navigation className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shortcuts Help Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`relative z-10 w-full max-w-md rounded-3xl p-6 shadow-2xl border ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-900 shadow-slate-400/50'
                  : 'bg-[#121212] border-white/15 text-[#D7E2EA] shadow-black/80'
              }`}
            >
              {/* Header */}
              <div className={`flex items-center justify-between pb-4 border-b ${
                isLight ? 'border-slate-200' : 'border-white/10'
              }`}>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-600">
                    <Command className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold font-sans ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Keyboard Shortcuts
                    </h3>
                    <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-[#D7E2EA]/60'}`}>
                      Press keys anywhere on the site to jump instantly
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className={`p-1.5 rounded-full transition-colors cursor-pointer border ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                      : 'bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border-white/10'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Shortcut Key Table */}
              <div className="my-5 flex flex-col gap-2 font-mono text-xs">
                {SHORTCUTS.map((sc) => (
                  <button
                    key={sc.key}
                    onClick={() => {
                      setIsOpen(false);
                      jumpToSection(sc.targetId, sc.label, sc.displayKey);
                    }}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer text-left ${
                      isLight
                        ? 'bg-slate-50 hover:bg-purple-50 border-slate-200 hover:border-purple-300 text-slate-900'
                        : 'bg-white/5 hover:bg-purple-950/40 border-white/10 hover:border-purple-500/40 text-white'
                    }`}
                  >
                    <span className="font-sans font-medium">{sc.label}</span>
                    <kbd
                      className="px-2.5 py-1 rounded-lg text-xs font-bold text-white shadow-md outline outline-2 outline-white -outline-offset-[3px]"
                      style={{
                        background:
                          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      }}
                    >
                      {sc.displayKey}
                    </kbd>
                  </button>
                ))}

                {/* Toggle Modal Shortcut */}
                <div className={`flex items-center justify-between p-3 rounded-2xl border ${
                  isLight ? 'bg-slate-100/60 border-slate-200 text-slate-700' : 'bg-black/40 border-white/5 text-white/70'
                }`}>
                  <span className="font-sans">Toggle Shortcuts Menu</span>
                  <kbd className={`px-2 py-0.5 rounded text-xs font-bold border ${
                    isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-white/10 border-white/20 text-white'
                  }`}>
                    ?
                  </kbd>
                </div>
              </div>

              {/* Modal Footer Note */}
              <div className={`pt-3 border-t text-[11px] flex items-center justify-between ${
                isLight ? 'border-slate-200 text-slate-500' : 'border-white/10 text-white/50'
              }`}>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" /> Active on all pages
                </span>
                <span>Press <kbd className="font-mono font-bold">Esc</kbd> to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
