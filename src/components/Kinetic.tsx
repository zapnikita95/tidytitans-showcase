"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const WORDS = ["Хаос", "Список", "Ссора", "Квест", "Система", "Чистота"];

/**
 * reznikov .kinetic — 300vh sticky, одно слово меняется по скроллу, bar внизу
 */
export function Kinetic() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const kanaScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.3]);
  const kanaRotate = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // word index 0..n-1
  const wordIndex = useTransform(scrollYProgress, [0, 1], [0, WORDS.length - 0.001]);

  return (
    <section ref={ref} className="relative h-[300vh]" aria-label="Кинетика смыслов">
      <div className="sticky top-0 grid h-[100svh] place-items-center overflow-hidden">
        <motion.div
          style={{ scale: kanaScale, rotate: kanaRotate }}
          className="pointer-events-none absolute select-none text-[42vh] font-semibold leading-none text-[rgba(244,241,234,0.035)]"
          aria-hidden
        >
          清
        </motion.div>

        <div className="relative w-full text-center">
          <WordTrack progress={wordIndex} />
        </div>

        <div className="absolute bottom-[8vh] left-1/2 h-[2px] w-[clamp(140px,22vw,280px)] -translate-x-1/2 bg-[var(--line)]">
          <motion.span
            className="block h-full bg-gradient-to-r from-[var(--ember)] to-[var(--accent-2)]"
            style={{ width: bar }}
          />
        </div>
      </div>
    </section>
  );
}

function WordTrack({ progress }: { progress: ReturnType<typeof useTransform<number, number>> }) {
  // re-render via motion values on each word's opacity
  return (
    <div className="relative mx-auto h-[1.2em] w-full max-w-4xl">
      {WORDS.map((w, i) => (
        <KineticWord key={w} word={w} index={i} progress={progress} total={WORDS.length} />
      ))}
    </div>
  );
}

function KineticWord({
  word,
  index,
  progress,
  total,
}: {
  word: string;
  index: number;
  progress: ReturnType<typeof useTransform<number, number>>;
  total: number;
}) {
  // peak when progress ≈ index
  const opacity = useTransform(progress, (v) => {
    const d = Math.abs(v - index);
    if (d > 0.85) return 0;
    return Math.max(0, 1 - d * 1.35);
  });
  const y = useTransform(progress, (v) => {
    const d = v - index;
    return d * -28;
  });
  const blur = useTransform(progress, (v) => {
    const d = Math.abs(v - index);
    return `blur(${Math.min(10, d * 8)}px)`;
  });

  const isAccent = index >= total - 2;

  return (
    <motion.p
      style={{ opacity, y, filter: blur }}
      className={`absolute inset-x-0 top-0 text-[clamp(2.4rem,7vw,5.5rem)] font-semibold tracking-[-0.04em] ${
        isAccent ? "text-[var(--accent)]" : "text-[var(--ink)]"
      }`}
    >
      {word}
    </motion.p>
  );
}
