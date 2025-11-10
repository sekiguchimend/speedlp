'use client';

import { useEffect, useRef, useState } from 'react';

const HIGHLIGHT_COLOR = "#00e6e6";

export default function AnimatedResult() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex px-8 md:px-16"
      style={{ minHeight: '150vh', paddingTop: '30vh' }}
    >
      {/* 水玉模様の背景 - 文字の下から画面下部まで */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: '45vh',
          bottom: 0,
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '100px 100px',
          backgroundPosition: '0 0',
          zIndex: 0,
          animation: 'dotSlide 5s linear infinite'
        }}
      ></div>
      <style jsx>{`
        @keyframes dotSlide {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 100px 0;
          }
        }
      `}</style>

      <div className="relative z-10" style={{ marginTop: '-50px' }}>
        <h2
          className="text-left inline-block relative"
          style={{
            color: '#000',
            fontSize: '240px',
            lineHeight: '1.2',
            fontWeight: '400',
            fontFamily: 'var(--font-bebas-neue)',
            letterSpacing: '0.1em',
            zIndex: 1
          }}
        >
          {'RESULT'.split('').map((char, index) => (
            <span
              key={index}
              style={{
                display: 'inline-block',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: `opacity 0.3s ease-out ${index * 0.05}s, transform 0.3s ease-out ${index * 0.05}s`
              }}
            >
              {char}
            </span>
          ))}
        </h2>
      </div>
      <span
        className="absolute"
        style={{
          height: '100px',
          backgroundColor: HIGHLIGHT_COLOR,
          left: 0,
          right: 0,
          top: 'calc(30vh + 100px)',
          zIndex: 0,
          transformOrigin: 'left',
          transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 0.5s ease-out'
        }}
      ></span>
    </section>
  );
}
