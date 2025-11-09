'use client';

import { useState } from "react";
import TypingAnimation from "./components/TypingAnimation";
import StickyModel from "./components/StickyModel";

export default function Home() {
  const [isCompleted1, setIsCompleted1] = useState(false);
  const [isCompleted2, setIsCompleted2] = useState(false);
  const [isCompleted3, setIsCompleted3] = useState(false);

  return (
    <>
      <TypingAnimation text="ページのスピードこそ命" />
      <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-black">
        <StickyModel />
        <section className="relative min-h-screen w-full flex items-center px-8 md:px-16 -mt-[200vh]">
          <div className="relative z-10 flex flex-col gap-16">
            <TypingAnimation
              text="サイトやアプリにおいて"
              className="text-4xl md:text-6xl font-extrabold text-left tracking-wide text-black dark:text-white"
              fullScreen={false}
              showBackgroundTransition={false}
              startOnScroll={true}
            />
            <TypingAnimation
              text="デザインや機能は大前提"
              className="text-4xl md:text-6xl font-extrabold text-left tracking-wide text-black dark:text-white"
              fullScreen={false}
              showBackgroundTransition={false}
              startOnScroll={true}
              highlightWords={[{ word: "大前提", backgroundColor: "#00e6e6" }]}
            />
            <TypingAnimation
              text="体験の質が全てを決める"
              className="text-4xl md:text-6xl font-extrabold text-left tracking-wide text-black dark:text-white"
              fullScreen={false}
              showBackgroundTransition={false}
              startOnScroll={true}
              highlightWords={[{ word: "体験の質", backgroundColor: "#00e6e6" }]}
            />
          </div>
        </section>
        <section className="relative min-h-screen w-full flex items-center justify-end px-8 md:px-16">
          <div className="relative z-10 flex flex-row-reverse gap-16 md:gap-24">
            <div style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}>
              <TypingAnimation
                text="速度が遅いだけで"
                className="text-4xl md:text-6xl font-extrabold tracking-wide text-black dark:text-white"
                fullScreen={false}
                showBackgroundTransition={false}
                startOnScroll={true}
                highlightWords={[{ word: "速度", backgroundColor: "#00e6e6" }]}
              />
            </div>
            <div style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}>
              <TypingAnimation
                text="ユーザーは離れ"
                className="text-4xl md:text-6xl font-extrabold tracking-wide text-black dark:text-white"
                fullScreen={false}
                showBackgroundTransition={false}
                startOnScroll={true}
                highlightWords={[{ word: "ユーザー", backgroundColor: "#00e6e6" }]}
              />
            </div>
            <div style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}>
              <TypingAnimation
                text="誰もいなくなる。"
                className="text-4xl md:text-6xl font-extrabold tracking-wide text-black dark:text-white"
                fullScreen={false}
                showBackgroundTransition={false}
                startOnScroll={true}
              />
            </div>
          </div>
        </section>
        <section className="relative min-h-[200vh] w-full px-8 md:px-16">
          {/* 右上 */}
          <div className="absolute top-[20vh] right-1/4">
            {/* 背景画像 */}
            <img
              src="/spra.png"
              alt=""
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] max-w-none h-auto pointer-events-none transition-opacity duration-100"
              style={{ zIndex: 0, opacity: isCompleted1 ? 1 : 0 }}
            />
            {/* 文字 */}
            <div className="relative max-w-md" style={{ zIndex: 1 }}>
              <TypingAnimation
                text={"速さは信頼、\n遅さは不安"}
                className="text-4xl md:text-6xl font-extrabold text-center tracking-wide leading-tight transition-colors duration-100"
                fullScreen={false}
                showBackgroundTransition={false}
                startOnScroll={true}
                codeTypingSpeed={30}
                transformSpeed={50}
                onComplete={() => setTimeout(() => setIsCompleted1(true), 0)}
              />
              <style jsx>{`
                div :global(h1) {
                  color: ${isCompleted1 ? '#fff' : '#323232'} !important;
                  white-space: pre-line;
                }
              `}</style>
            </div>
          </div>

          {/* 左中央 */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2">
            {/* 背景画像 */}
            <img
              src="/spra2.png"
              alt=""
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] max-w-none h-auto pointer-events-none transition-opacity duration-100"
              style={{ zIndex: 0, opacity: isCompleted2 ? 1 : 0 }}
            />
            {/* 文字 */}
            <div className="relative max-w-md" style={{ zIndex: 1 }}>
              <TypingAnimation
                text={"待たせない、\n体験を届ける"}
                className="text-4xl md:text-6xl font-extrabold text-center tracking-wide leading-tight transition-colors duration-100"
                fullScreen={false}
                showBackgroundTransition={false}
                startOnScroll={true}
                codeTypingSpeed={30}
                transformSpeed={50}
                onComplete={() => setTimeout(() => setIsCompleted2(true), 0)}
              />
              <style jsx>{`
                div :global(h1) {
                  color: ${isCompleted2 ? '#fff' : '#323232'} !important;
                  white-space: pre-line;
                }
              `}</style>
            </div>
          </div>

          {/* 右下 */}
          <div className="absolute bottom-[20vh] right-1/4">
            {/* 背景画像 */}
            <img
              src="/spra3.png"
              alt=""
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] max-w-none h-auto pointer-events-none transition-opacity duration-100"
              style={{ zIndex: 0, opacity: isCompleted3 ? 1 : 0 }}
            />
            {/* 文字 */}
            <div className="relative max-w-md" style={{ zIndex: 1 }}>
              <TypingAnimation
                text={"スピードこそ、\n最高のUX"}
                className="text-4xl md:text-6xl font-extrabold text-center tracking-wide leading-tight transition-colors duration-100"
                fullScreen={false}
                showBackgroundTransition={false}
                startOnScroll={true}
                codeTypingSpeed={30}
                transformSpeed={50}
                onComplete={() => setTimeout(() => setIsCompleted3(true), 0)}
              />
              <style jsx>{`
                div :global(h1) {
                  color: ${isCompleted3 ? '#fff' : '#323232'} !important;
                  white-space: pre-line;
                }
              `}</style>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
