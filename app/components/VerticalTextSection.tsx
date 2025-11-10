'use client';

import TypingAnimation from './TypingAnimation';

interface HighlightWord {
  word: string;
  backgroundColor: string;
}

interface VerticalTextSectionProps {
  text: string;
  highlightWords?: HighlightWord[];
}

export default function VerticalTextSection({
  text,
  highlightWords,
}: VerticalTextSectionProps) {
  return (
    <div style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}>
      <TypingAnimation
        text={text}
        className="text-4xl md:text-6xl font-extrabold tracking-wide text-black dark:text-white"
        fullScreen={false}
        showBackgroundTransition={false}
        startOnScroll={true}
        highlightWords={highlightWords}
      />
    </div>
  );
}
