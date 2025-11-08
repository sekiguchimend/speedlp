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
  // scrollProgress 0.5-1.0の範囲で右(50%)から左(0%)にスムーズに移動
  const moveProgress = Math.max(0, Math.min(1, (scrollProgress - 0.5) * 2));
  const leftPosition = 50 - (moveProgress * 50); // 50% -> 0%

  // 移動中（定位置到達前）は高速回転
  const isMoving = moveProgress > 0 && moveProgress < 0.99;

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '200vh' }}>
      <div
        className="sticky top-0 h-screen w-1/2 z-0 pointer-events-none"
        style={{
          marginLeft: `${leftPosition}%`,
        }}
      >
        <ModelViewer isMoving={isMoving} />
      </div>
    </div>
  );
}
