"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState } from "react";

/**
 * Аналог reznikov .saga + sword:
 * — 360vh sticky cinematic
 * — ОДИН объект: швабра как клинок горизонтально
 * — мусор на линии удара, исчезает когда «лезвие» доходит
 * — крупные фразы поверх, как у катаны
 * — progress bar
 */

type Speck = {
  id: string;
  src: string;
  alt: string;
  /** 0..1 along the blade path when it dies */
  hit: number;
  y: string;
  size: string;
  rot: number;
};

const SPECKS: Speck[] = [
  { id: "b", src: "/items/banana.png", alt: "Банан", hit: 0.28, y: "48%", size: "w-16 md:w-20", rot: -12 },
  { id: "c", src: "/items/candy.png", alt: "Фантик", hit: 0.42, y: "42%", size: "w-12 md:w-14", rot: 18 },
  { id: "d", src: "/items/dust.png", alt: "Пыль", hit: 0.56, y: "52%", size: "w-14 md:w-16", rot: 0 },
  { id: "ch", src: "/items/chocolate.png", alt: "Шоколад", hit: 0.7, y: "46%", size: "w-12 md:w-14", rot: -8 },
];

const LINES = [
  { at: 0.08, text: "Хаос на полу.", accent: false },
  { at: 0.28, text: "Один взмах — и банан ушёл.", accent: false },
  { at: 0.48, text: "Фантики. Пыль. Крошки.", accent: false },
  { at: 0.68, text: "Швабра доходит до края.", accent: false },
  { at: 0.84, text: "Пол чистый. Система работает.", accent: true },
];

function SpeckItem({
  speck,
  progress,
}: {
  speck: Speck;
  progress: ReturnType<typeof useTransform<number, number>> extends never
    ? never
    : import("framer-motion").MotionValue<number>;
}) {
  // x position along stage: spread 22% → 78%
  const left = 18 + speck.hit * 62;
  const opacity = useTransform(
    progress,
    [0, speck.hit - 0.04, speck.hit + 0.06, 1],
    [1, 1, 0, 0]
  );
  const scale = useTransform(
    progress,
    [0, speck.hit - 0.02, speck.hit + 0.08, 1],
    [1, 1.08, 0.2, 0.2]
  );
  const y = useTransform(progress, [0, speck.hit, speck.hit + 0.1, 1], [0, 0, -50, -50]);
  const rotate = useTransform(
    progress,
    [0, speck.hit, speck.hit + 0.1, 1],
    [speck.rot, speck.rot, speck.rot + 70, speck.rot + 70]
  );

  return (
    <motion.img
      src={speck.src}
      alt={speck.alt}
      style={{
        left: `${left}%`,
        top: speck.y,
        opacity,
        scale,
        y,
        rotate,
      }}
      className={`pointer-events-none absolute z-[5] -translate-x-1/2 -translate-y-1/2 pixel-art select-none drop-shadow-[0_12px_30px_rgba(0,0,0,0.5)] ${speck.size}`}
      draggable={false}
    />
  );
}

function Line({
  text,
  accent,
  at,
  progress,
}: {
  text: string;
  accent: boolean;
  at: number;
  progress: import("framer-motion").MotionValue<number>;
}) {
  const opacity = useTransform(progress, [at - 0.06, at, at + 0.12], [0, 1, 0]);
  const y = useTransform(progress, [at - 0.06, at, at + 0.12], [24, 0, -16]);

  return (
    <motion.p
      style={{ opacity, y }}
      className={`absolute inset-x-0 top-[18%] text-center text-[clamp(1.6rem,4.2vw,3.4rem)] font-semibold tracking-[-0.03em] ${
        accent ? "text-[var(--accent)]" : "text-[var(--ink)]"
      }`}
    >
      {text}
    </motion.p>
  );
}

export default function CleanSaga() {
  const ref = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => setP(Math.round(v * 100)));

  // mop as horizontal blade: enters left, exits right — like katana
  const mopX = useTransform(scrollYProgress, [0.05, 0.9], ["-35%", "105%"]);
  const mopY = useTransform(scrollYProgress, [0.05, 0.3, 0.6, 0.9], ["8%", "0%", "-4%", "2%"]);
  const mopRotate = useTransform(scrollYProgress, [0.05, 0.5, 0.9], [-8, 0, 6]);
  // slash glow follows mop
  const slashLeft = useTransform(scrollYProgress, [0.08, 0.9], ["0%", "100%"]);
  const slashOpacity = useTransform(scrollYProgress, [0.08, 0.2, 0.85, 0.95], [0, 0.85, 0.9, 0.2]);

  // atmosphere
  const bgShift = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "radial-gradient(ellipse 80% 60% at 50% 50%, #1a1210 0%, #0b0c0e 70%)",
      "radial-gradient(ellipse 80% 60% at 50% 50%, #101816 0%, #0b0c0e 70%)",
      "radial-gradient(ellipse 80% 60% at 50% 50%, #0e1a16 0%, #0b0c0e 70%)",
    ]
  );
  const cleanVeil = useTransform(scrollYProgress, [0.55, 0.95], [0, 0.55]);
  const barW = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const hintOp = useTransform(scrollYProgress, [0, 0.1, 0.7, 0.85], [1, 1, 0.4, 0]);

  return (
    <section
      id="sweep"
      ref={ref}
      className="relative h-[360vh]"
      aria-label="Зачистка — cinematic scroll"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ background: bgShift }} />

        {/* sun disc like reznikov sword scene */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[min(50vw,420px)] w-[min(50vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(243,239,230,0.14), rgba(243,239,230,0.04) 45%, transparent 70%)",
          }}
        />

        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: cleanVeil,
            background:
              "radial-gradient(ellipse 70% 50% at 50% 55%, rgba(62,224,184,0.18), transparent 65%)",
          }}
        />

        {/* petals / dirt motes */}
        <DirtMotes progress={scrollYProgress} />

        {/* copy lines */}
        <div className="pointer-events-none absolute inset-0 z-20">
          {LINES.map((l) => (
            <Line key={l.at} {...l} progress={scrollYProgress} />
          ))}
        </div>

        {/* slash trail */}
        <motion.div
          className="pointer-events-none absolute top-1/2 z-[8] h-[2px] -translate-y-1/2"
          style={{
            left: 0,
            width: slashLeft,
            opacity: slashOpacity,
            background:
              "linear-gradient(90deg, transparent, rgba(62,224,184,0.15) 20%, rgba(62,224,184,0.55) 92%, transparent)",
            boxShadow: "0 0 24px rgba(62,224,184,0.35)",
          }}
        />

        {/* trash on the cut line */}
        <div className="absolute inset-0 z-10">
          {SPECKS.map((s) => (
            <SpeckItem key={s.id} speck={s} progress={scrollYProgress} />
          ))}
        </div>

        {/* THE MOP — horizontal weapon like katana */}
        <motion.div
          className="absolute top-1/2 z-30 w-[min(72vw,560px)] -translate-y-1/2 will-change-transform"
          style={{ left: mopX, y: mopY, rotate: mopRotate }}
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]/20 blur-2xl" />
          <img
            src="/items/mop-blade.jpg"
            alt="Швабра"
            className="relative w-full scale-110 select-none drop-shadow-[0_20px_60px_rgba(62,224,184,0.35)]"
            draggable={false}
          />
        </motion.div>

        {/* chrome */}
        <motion.div
          style={{ opacity: hintOp }}
          className="absolute bottom-[7vh] left-0 right-0 z-40 flex flex-col items-center gap-3"
        >
          <p className="mono text-[var(--ink-2)]">скролль — клинок чистоты</p>
          <div className="h-[2px] w-[clamp(140px,22vw,280px)] bg-[var(--line)]">
            <motion.span
              className="block h-full bg-gradient-to-r from-[var(--ember)] to-[var(--accent-2)]"
              style={{ width: barW }}
              data-testid="scroll-progress"
              data-progress={p}
            />
          </div>
          <p className="mono text-[10px] text-[var(--ink-3)]">{p}%</p>
        </motion.div>
      </div>
    </section>
  );
}

function DirtMotes({
  progress,
}: {
  progress: import("framer-motion").MotionValue<number>;
}) {
  const opacity = useTransform(progress, [0, 0.4, 0.85], [0.7, 0.4, 0.05]);
  return (
    <motion.div className="pointer-events-none absolute inset-0" style={{ opacity }} aria-hidden>
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-[1px] bg-[var(--ember)]/40"
          style={{
            width: 3 + (i % 3),
            height: 3 + (i % 2),
            left: `${8 + ((i * 17) % 84)}%`,
            top: `${20 + ((i * 13) % 55)}%`,
          }}
        />
      ))}
    </motion.div>
  );
}

export { CleanSaga };
