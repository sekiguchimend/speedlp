'use client';

import TypingAnimation from "./components/TypingAnimation";
import StickyModel from "./components/StickyModel";
import ImageTextSection from "./components/ImageTextSection";
import VerticalTextSection from "./components/VerticalTextSection";
import AnimatedResult from "./components/AnimatedResult";

// 定数定義
const HIGHLIGHT_COLOR = "#00e6e6";

const INTRO_TEXTS = [
  { text: "サイトやアプリにおいて" },
  { text: "デザインや機能は大前提", highlightWords: [{ word: "大前提", backgroundColor: HIGHLIGHT_COLOR }] },
  { text: "体験の質が全てを決める", highlightWords: [{ word: "体験の質", backgroundColor: HIGHLIGHT_COLOR }] },
];

const VERTICAL_TEXTS = [
  { text: "速度が遅いだけで", highlightWords: [{ word: "速度", backgroundColor: HIGHLIGHT_COLOR }] },
  { text: "ユーザーは離れ", highlightWords: [{ word: "ユーザー", backgroundColor: HIGHLIGHT_COLOR }] },
  { text: "誰もいなくなる。" },
];

const IMAGE_TEXT_SECTIONS = [
  { text: "速さは信頼、\n遅さは不安", imageSrc: "/spra.png", position: "top-[20vh] right-1/4" },
  { text: "待たせない、\n体験を届ける", imageSrc: "/spra2.png", position: "top-1/2 left-1/4 -translate-y-1/2" },
  { text: "スピードこそ、\n最高のUX", imageSrc: "/spra3.png", position: "bottom-[20vh] right-1/4" },
];

export default function Home() {
  return (
    <>
      <TypingAnimation text="ページのスピードこそ命" />
      <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-black">
        <StickyModel />
        <section className="relative min-h-screen w-full flex items-center px-8 md:px-16 -mt-[200vh]">
          <div className="relative z-10 flex flex-col gap-16">
            {INTRO_TEXTS.map((item, index) => (
              <TypingAnimation
                key={index}
                text={item.text}
                className="text-4xl md:text-6xl font-extrabold text-left tracking-wide text-black dark:text-white"
                fullScreen={false}
                showBackgroundTransition={false}
                startOnScroll={true}
                highlightWords={item.highlightWords}
              />
            ))}
          </div>
        </section>
        <section className="relative min-h-screen w-full flex items-center justify-end px-8 md:px-16">
          <div className="relative z-10 flex flex-row-reverse gap-16 md:gap-24">
            {VERTICAL_TEXTS.map((item, index) => (
              <VerticalTextSection
                key={index}
                text={item.text}
                highlightWords={item.highlightWords}
              />
            ))}
          </div>
        </section>
        <section className="relative min-h-[200vh] w-full px-8 md:px-16">
          {IMAGE_TEXT_SECTIONS.map((item, index) => (
            <ImageTextSection
              key={index}
              text={item.text}
              imageSrc={item.imageSrc}
              position={item.position}
            />
          ))}
        </section>
        <AnimatedResult />
      </div>
    </>
  );
}
