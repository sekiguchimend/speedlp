'use client';

import { useEffect, useState, useRef } from 'react';
import ModelViewer from './ModelViewer';

export default function StickyModel() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / (containerHeight - window.innerHeight)));

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 0-0.5: 右側、0.5-1: 左側へ移動
  const isLeftSide = scrollProgress > 0.5;

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <div
        className="sticky top-0 h-screen w-1/2 z-0 transition-all duration-700 ease-in-out"
        style={{
          marginLeft: isLeftSide ? '0' : 'auto',
          marginRight: isLeftSide ? 'auto' : '0',
        }}
      >
        <ModelViewer />
      </div>
    </div>
  );
}
