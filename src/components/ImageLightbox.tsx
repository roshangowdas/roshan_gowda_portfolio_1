import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface ImageLightboxProps {
  src: string | null;
  alt?: string;
  title?: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  src,
  alt = 'Project Image Detail',
  title,
  onClose,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!src) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev && onPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext && onNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    if (src) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [src, onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md select-none"
          onClick={onClose}
        >
          {/* Controls Bar Top */}
          <div
            className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-10 pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            {title ? (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs sm:text-sm font-medium uppercase tracking-widest pointer-events-auto">
                <Maximize2 className="w-3.5 h-3.5 opacity-70" />
                <span>{title}</span>
              </div>
            ) : (
              <div />
            )}

            <button
              onClick={onClose}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Navigation Prev Button */}
          {hasPrev && onPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          )}

          {/* Navigation Next Button */}
          {hasNext && onNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          )}

          {/* Image Container with Smooth Scaling */}
          <motion.div
            key={src}
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10"
            />
            {alt && (
              <p className="mt-4 text-center text-xs sm:text-sm text-white/70 font-light tracking-wide uppercase">
                {alt}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
