'use client';

import { useState } from 'react';
import TypingAnimation from './TypingAnimation';

// 定数定義
const COLORS = {
  COMPLETED: '#fff',
  DEFAULT: '#323232',
} as const;

const ANIMATION_CONFIG = {
  CODE_TYPING_SPEED: 30,
  TRANSFORM_SPEED: 50,
  COMPLETION_DELAY: 0,
} as const;

interface ImageTextSectionProps {
  text: string;
  imageSrc: string;
  position: string;
  className?: string;
}

export default function ImageTextSection({
  text,
  imageSrc,
  position,
  className = '',
}: ImageTextSectionProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className={`absolute ${position} ${className}`}>
      {/* 背景画像 */}
      <img
        src={imageSrc}
        alt=""
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] max-w-none h-auto pointer-events-none transition-opacity duration-100"
        style={{ zIndex: 0, opacity: isCompleted ? 1 : 0 }}
      />
      {/* 文字 */}
      <div className="relative max-w-md" style={{ zIndex: 1 }}>
        <TypingAnimation
          text={text}
          className="text-4xl md:text-6xl font-extrabold text-center tracking-wide leading-tight transition-colors duration-100"
          fullScreen={false}
          showBackgroundTransition={false}
          startOnScroll={true}
          codeTypingSpeed={ANIMATION_CONFIG.CODE_TYPING_SPEED}
          transformSpeed={ANIMATION_CONFIG.TRANSFORM_SPEED}
          onComplete={() => setTimeout(() => setIsCompleted(true), ANIMATION_CONFIG.COMPLETION_DELAY)}
        />
        <style jsx>{`
          div :global(h1) {
            color: ${isCompleted ? COLORS.COMPLETED : COLORS.DEFAULT} !important;
            white-space: pre-line;
          }
        `}</style>
      </div>
    </div>
  );
}
