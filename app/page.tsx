import TypingAnimation from "./components/TypingAnimation";
import ModelViewer from "./components/ModelViewer";

export default function Home() {
  return (
    <>
      <TypingAnimation text="ページのスピードこそ命" />
      <section className="relative min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-black flex items-center px-8 md:px-16">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 z-0">
          <ModelViewer />
        </div>
        <div className="relative z-10 flex flex-col gap-16 max-w-full">
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
            text="スピードこそが命"
            className="text-4xl md:text-6xl font-extrabold text-left tracking-wide text-black dark:text-white"
            fullScreen={false}
            showBackgroundTransition={false}
            startOnScroll={true}
            highlightWords={[{ word: "スピード", backgroundColor: "#00e6e6" }]}
          />
        </div>
      </section>
    </>
  );
}
