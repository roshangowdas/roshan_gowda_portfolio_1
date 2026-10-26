import React, { useRef, useState, useEffect } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: 'translate3d(0px, 0px, 0px)',
    transition: inactiveTransition,
    willChange: 'transform',
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.hypot(distX, distY);
      const threshold = Math.max(rect.width, rect.height) / 2 + padding;

      if (distance < threshold) {
        const transX = distX / strength;
        const transY = distY / strength;
        setStyle({
          transform: `translate3d(${transX}px, ${transY}px, 0px)`,
          transition: activeTransition,
          willChange: 'transform',
        });
      } else {
        setStyle({
          transform: 'translate3d(0px, 0px, 0px)',
          transition: inactiveTransition,
          willChange: 'transform',
        });
      }
    };

    const handleMouseLeave = () => {
      setStyle({
        transform: 'translate3d(0px, 0px, 0px)',
        transition: inactiveTransition,
        willChange: 'transform',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div ref={ref} style={style} className={`inline-block ${className}`}>
      {children}
    </div>
  );
};
