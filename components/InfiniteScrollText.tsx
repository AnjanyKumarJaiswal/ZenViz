'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Word {
  text: string;
  className: string;
}

interface InfiniteScrollTextProps {
  words: Word[];
  speed?: number;
  className?: string;
  gap?: number;
}

export const InfiniteScrollText: React.FC<InfiniteScrollTextProps> = ({
  words,
  speed = 25,
  className,
  gap = 30
}) => {
  const duplicatedWords = [...words, ...words];
  
  return (
    <div className={cn("overflow-hidden w-full relative", className)}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [`0%`, `-50%`]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear"
          }
        }}
      >
        {duplicatedWords.map((word, idx) => (
          <div 
            key={`scroll-word-${idx}`} 
            className={cn(
              word.className, 
              "flex items-center px-4 text-4xl md:text-5xl lg:text-6xl font-bold"
            )}
            style={{ marginRight: `${gap}px` }}
          >
            {word.text}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteScrollText;
