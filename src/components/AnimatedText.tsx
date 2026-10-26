import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return <motion.span style={{ opacity }}>{char}</motion.span>;
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalChars = text.length;
  let runningIndex = 0;

  return (
    <p
      ref={containerRef}
      className={`text-center font-medium leading-relaxed max-w-[560px] text-[#D7E2EA] ${className}`}
      style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
    >
      {words.map((word, wIdx) => {
        const wordChars = word.split('');
        const wordStartIndex = runningIndex;
        runningIndex += word.length + 1; // plus space

        return (
          <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.28em]">
            {wordChars.map((char, cIdx) => {
              const charGlobalIndex = wordStartIndex + cIdx;
              const start = charGlobalIndex / totalChars;
              const end = Math.min(1, (charGlobalIndex + 1) / totalChars);
              return (
                <Character
                  key={cIdx}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
        );
      })}
    </p>
  );
};
