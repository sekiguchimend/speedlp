'use client';

import { useState, useEffect, useRef } from 'react';

interface TypingAnimationProps {
  text: string;
  codeTypingSpeed?: number;
  transformSpeed?: number;
  pauseBeforeTransform?: number;
  className?: string;
  fullScreen?: boolean;
  showBackgroundTransition?: boolean;
  startOnScroll?: boolean;
  highlightWords?: Array<{ word: string; backgroundColor: string }>;
  onComplete?: () => void;
}

export default function TypingAnimation({
  text,
  codeTypingSpeed = 50,
  transformSpeed = 80,
  pauseBeforeTransform = 200,
  className = 'text-6xl md:text-8xl font-extrabold text-center tracking-wide text-black dark:text-white',
  fullScreen = true,
  showBackgroundTransition = true,
  startOnScroll = false,
  highlightWords = [],
  onComplete,
}: TypingAnimationProps) {
  const targetText = text;
  const codeChars = 'abcdefghijklmnopqrstuvwxyz0123456789{}[]()<>=+-*/;';

  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState<'typing-code' | 'transforming'>('typing-code');
  const [transformIndex, setTransformIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isVisible, setIsVisible] = useState(!startOnScroll);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll detection
  useEffect(() => {
    if (!startOnScroll || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [startOnScroll, isVisible]);

  // 初期のコード文字列を生成
  const generateRandomCode = (length: number) => {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += codeChars[Math.floor(Math.random() * codeChars.length)];
    }
    return result;
  };

  useEffect(() => {
    if (!isVisible) return;

    if (phase === 'typing-code') {
      // フェーズ1: ランダムなコードをタイピング
      if (displayText.length < targetText.length) {
        const timer = setTimeout(() => {
          setDisplayText(prev => prev + codeChars[Math.floor(Math.random() * codeChars.length)]);
        }, codeTypingSpeed);
        return () => clearTimeout(timer);
      } else {
        // コードのタイピングが完了したら、少し待ってから変換フェーズへ
        const timer = setTimeout(() => {
          setPhase('transforming');
        }, pauseBeforeTransform);
        return () => clearTimeout(timer);
      }
    } else if (phase === 'transforming') {
      // フェーズ2: 左から順に実際のテキストに変換
      if (transformIndex < targetText.length) {
        const timer = setTimeout(() => {
          setDisplayText(prev => {
            const newText = prev.split('');
            newText[transformIndex] = targetText[transformIndex];
            return newText.join('');
          });
          setTransformIndex(prev => prev + 1);
        }, transformSpeed);
        return () => clearTimeout(timer);
      } else if (!isCompleted) {
        // 変換完了後、0.3秒待ってから色を変更
        const timer = setTimeout(() => {
          setIsCompleted(true);
          if (onComplete) {
            onComplete();
          }
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [isVisible, displayText, phase, transformIndex, targetText, codeChars, codeTypingSpeed, transformSpeed, pauseBeforeTransform, isCompleted, onComplete]);

  return (
    <div
      ref={containerRef}
      className={`flex items-center w-full transition-all duration-300 ${
        fullScreen ? 'min-h-screen justify-center' : 'justify-start'
      } ${
        showBackgroundTransition && isCompleted
          ? 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-black'
          : ''
      }`}
      style={{
        backgroundColor:
          showBackgroundTransition && !isCompleted ? '#000000' : undefined,
      }}
    >
      <h1
        className={`${className} ${isCompleted && showBackgroundTransition ? 'shake-animation' : ''}`}
        style={{
          color: showBackgroundTransition && !isCompleted ? '#fff' : undefined,
          transition: 'color 0.3s ease',
        }}
      >
        {(() => {
          const chars = displayText.split('');
          const result: React.JSX.Element[] = [];
          let i = 0;

          while (i < chars.length) {
            const isTransformed = phase === 'transforming' && i < transformIndex;
            const isCode = !isTransformed;

            // Check if this position is the start of a highlighted word
            let matchedHighlight: { word: string; backgroundColor: string } | null = null;
            for (const highlight of highlightWords) {
              const wordIndex = targetText.indexOf(highlight.word);
              if (wordIndex === i) {
                matchedHighlight = highlight;
                break;
              }
            }

            if (matchedHighlight && isCompleted) {
              // Render the entire highlighted word as a group
              const word = matchedHighlight.word;
              result.push(
                <span
                  key={i}
                  className={`transition-all duration-200 ${isCode ? 'font-mono' : 'font-[var(--font-dancing-script)]'}`}
                  style={{
                    backgroundColor: matchedHighlight.backgroundColor,
                    padding: '4px 12px',
                  }}
                >
                  {word}
                </span>
              );
              i += word.length;
            } else {
              // Render a single character
              result.push(
                <span
                  key={i}
                  className={`transition-all duration-200 ${isCode ? 'font-mono' : 'font-[var(--font-dancing-script)]'}`}
                >
                  {chars[i]}
                </span>
              );
              i++;
            }
          }

          return result;
        })()}
        {phase === 'typing-code' && displayText.length < targetText.length && (
          <span className="animate-pulse font-mono">|</span>
        )}
        {phase === 'transforming' && transformIndex < targetText.length && (
          <span className="animate-pulse font-[var(--font-dancing-script)]">|</span>
        )}
      </h1>
    </div>
  );
}
