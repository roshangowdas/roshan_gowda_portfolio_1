import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'motion/react';

// Web Audio API synth for subtle, elegant UI audio feedback
const playHoverSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Soft, organic sine frequency blip
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(980, ctx.currentTime + 0.035);

    // Very quiet, gentle volume envelope
    gain.gain.setValueAtTime(0.025, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.035);
  } catch {
    // Silently ignore audio restrictions
  }
};

const playClickSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // Silently ignore audio restrictions
  }
};

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const isHoveredRef = useRef(false);

  // High-precision responsive spring for central cursor dot
  const dotSpringConfig = { stiffness: 700, damping: 35, mass: 0.1 };
  const dotX = useSpring(-100, dotSpringConfig);
  const dotY = useSpring(-100, dotSpringConfig);

  // Organic fluid trailing spring for outer cursor ring
  const ringSpringConfig = { stiffness: 250, damping: 22, mass: 0.35 };
  const ringX = useSpring(-100, ringSpringConfig);
  const ringY = useSpring(-100, ringSpringConfig);

  useEffect(() => {
    // Disable on touch screen devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = Boolean(
          target.closest('button, a, input, select, textarea, img, [role="button"], .cursor-pointer')
        );

        if (interactive && !isHoveredRef.current) {
          playHoverSound();
        }

        isHoveredRef.current = interactive;
        setIsHovered(interactive);
      }
    };

    const handleMouseDown = () => {
      setIsClicked(true);
      playClickSound();
    };

    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [dotX, dotY, ringX, ringY, isVisible]);

  if (isTouchDevice) return null;

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-50">
      {/* Outer trailing ring */}
      <motion.div
        className="absolute top-0 left-0 rounded-full border border-emerald-400/80 pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          width: 32,
          height: 32,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 0.85 : 0,
        }}
        animate={{
          scale: isClicked ? 0.6 : isHovered ? 1.75 : 1,
          borderWidth: isClicked ? '2px' : '1px',
          borderColor: isHovered ? '#10B981' : 'rgba(255, 255, 255, 0.7)',
          backgroundColor: isClicked
            ? 'rgba(16, 185, 129, 0.35)'
            : isHovered
            ? 'rgba(16, 185, 129, 0.12)'
            : 'rgba(255, 255, 255, 0)',
        }}
        transition={{
          type: 'spring',
          stiffness: isClicked ? 800 : 350,
          damping: isClicked ? 25 : 20,
        }}
      />

      {/* Inner instant-response dot */}
      <motion.div
        className="absolute top-0 left-0 rounded-full bg-emerald-400 pointer-events-none shadow-[0_0_10px_rgba(16,185,129,0.8)]"
        style={{
          x: dotX,
          y: dotY,
          width: 6,
          height: 6,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isClicked ? 0.35 : isHovered ? 1.35 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: isClicked ? 900 : 500,
          damping: isClicked ? 20 : 25,
        }}
      />
    </div>
  );
};


