"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

const trashItems = [
  {
    src: "/items/banana.png",
    alt: "Банановая шкурка",
    className: "left-[12%] top-[22%] w-24 md:w-32 md:left-[18%] md:top-[28%]",
    start: 0.18,
    end: 0.42,
  },
  {
    src: "/items/candy.png",
    alt: "Фантик",
    className: "right-[14%] top-[24%] w-16 md:w-20 md:right-[22%] md:top-[32%]",
    start: 0.28,
    end: 0.55,
  },
  {
    src: "/items/dust.png",
    alt: "Пыль",
    className: "left-[28%] bottom-[24%] w-20 md:w-28 md:left-[35%] md:bottom-[30%]",
    start: 0.35,
    end: 0.68,
  },
  {
    src: "/items/chocolate.png",
    alt: "Шоколад",
    className: "right-[22%] bottom-[22%] w-14 md:w-18 md:right-[30%] md:bottom-[28%]",
    start: 0.45,
    end: 0.78,
  },
] as const;

function TrashPiece({
  src,
  alt,
  className,
  start,
  end,
  progress,
  reduceMotion,
}: {
  src: string;
  alt: string;
  className: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
}) {
  const opacity = useTransform(
    progress,
    [start, end],
    reduceMotion ? [1, 1] : [1, 0]
  );
  const scale = useTransform(
    progress,
    [start, end],
    reduceMotion ? [1, 1] : [1, 0.55]
  );
  const y = useTransform(
    progress,
    [start, end],
    reduceMotion ? [0, 0] : [0, -48]
  );
  const rotate = useTransform(
    progress,
    [start, end],
    reduceMotion ? [0, 0] : [0, alt.length % 2 === 0 ? 25 : -30]
  );

  return (
    <motion.img
      src={src}
      alt={alt}
      style={{ opacity, scale, y, rotate }}
      className={`absolute pixel-art pointer-events-none select-none drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)] ${className}`}
      draggable={false}
    />
  );
}

export default function CleaningTrashAdvanced() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Инструменты (как в твоём финальном куске)
  const mopX = useTransform(scrollYProgress, [0.15, 0.7], reduceMotion ? [0, 0] : [-90, 160]);
  const mopRotate = useTransform(scrollYProgress, [0.15, 0.7], reduceMotion ? [0, 0] : [-18, 28]);

  const spongeX = useTransform(scrollYProgress, [0.22, 0.75], reduceMotion ? [0, 0] : [100, -90]);
  const spongeY = useTransform(scrollYProgress, [0.22, 0.75], reduceMotion ? [0, 0] : [40, -50]);

  const beaterRotate = useTransform(scrollYProgress, [0.3, 0.8], reduceMotion ? [0, 0] : [5, -50]);
  const beaterY = useTransform(scrollYProgress, [0.3, 0.8], reduceMotion ? [0, 0] : [30, -70]);

  const bucketY = useTransform(scrollYProgress, [0.1, 0.85], reduceMotion ? [0, 0] : [25, -30]);

  // общий слой мусора (sheet) гаснет медленнее
  const sheetOpacity = useTransform(
    scrollYProgress,
    [0.12, 0.35, 0.82],
    reduceMotion ? [0.35, 0.35, 0.35] : [0.45, 0.35, 0]
  );
  const sheetScale = useTransform(scrollYProgress, [0.12, 0.82], [1, 0.85]);

  // clean glow after trash gone
  const cleanGlow = useTransform(
    scrollYProgress,
    [0.5, 0.85],
    reduceMotion ? [0.15, 0.15] : [0, 0.55]
  );

  return (
    <section
      id="clean-quest"
      ref={ref}
      className="relative h-[180vh] overflow-hidden bg-[#0b0b10]"
      aria-label="Квест: уборка мусора"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center">
        {/* ambient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b10] via-[#12121a] to-[#0b0b10]" />
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: cleanGlow,
            background:
              "radial-gradient(ellipse 50% 40% at 50% 55%, rgba(62,224,184,0.18), transparent 65%)",
          }}
        />

        {/* grid floor vibe */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "linear-gradient(to top, black, transparent)",
          }}
        />

        {/* common trash sheet under pieces */}
        <motion.img
          src="/items/trash-sheet.png"
          alt=""
          aria-hidden
          style={{ opacity: sheetOpacity, scale: sheetScale }}
          className="pointer-events-none absolute left-1/2 top-1/2 w-[min(70vw,420px)] -translate-x-1/2 -translate-y-[42%] pixel-art select-none opacity-40"
          draggable={false}
        />

        {/* separate trash pieces disappear on scroll */}
        {trashItems.map((item) => (
          <TrashPiece
            key={item.alt}
            {...item}
            progress={scrollYProgress}
            reduceMotion={reduceMotion}
          />
        ))}

        {/* cleaning tools */}
        <motion.img
          src="/items/mop.png"
          alt="Швабра"
          style={{ x: mopX, rotate: mopRotate }}
          className="absolute left-[6%] z-10 w-28 pixel-art drop-shadow-[0_0_20px_rgba(62,224,184,0.25)] md:w-36"
          draggable={false}
        />

        <motion.img
          src="/items/sponge.png"
          alt="Губка"
          style={{ x: spongeX, y: spongeY }}
          className="absolute right-[10%] top-[30%] z-10 w-20 pixel-art drop-shadow-[0_0_18px_rgba(255,138,76,0.3)] md:w-24"
          draggable={false}
        />

        <motion.img
          src="/items/beater.png"
          alt="Выбивалка"
          style={{ rotate: beaterRotate, y: beaterY }}
          className="absolute bottom-[18%] right-[18%] z-10 w-28 origin-bottom pixel-art drop-shadow-[0_0_16px_rgba(126,240,208,0.25)] md:w-32"
          draggable={false}
        />

        <motion.img
          src="/items/bucket.png"
          alt="Ведро"
          style={{ y: bucketY }}
          className="absolute bottom-[15%] left-[20%] z-10 w-24 pixel-art drop-shadow-[0_0_22px_rgba(126,184,255,0.3)] md:w-28"
          draggable={false}
        />

        {/* Подсказка */}
        <div className="absolute bottom-12 z-20 text-center">
          <p className="font-mono text-sm tracking-wide text-zinc-500">
            Скролль, чтобы убрать мусор
          </p>
        </div>
      </div>
    </section>
  );
}

export { CleaningTrashAdvanced };
