"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { useRef } from "react";

const items = [
  {
    src: "/assets/mop.png",
    name: "Швабра",
    role: "Main weapon",
    blurb: "Рубит лужи и крошки. Главный стат — зона чистоты.",
    accent: "#3ee0b8",
    // parallax bias: negative = moves up slightly faster
    parallax: -40,
    rotateFrom: -12,
    floatY: 10,
    floatRot: 4,
    floatDur: 3.4,
  },
  {
    src: "/assets/sponge.png",
    name: "Губка",
    role: "Burst clean",
    blurb: "AOE по пятнам. Пузыри = крит-эффект.",
    accent: "#ff8a4c",
    parallax: -18,
    rotateFrom: 10,
    floatY: 8,
    floatRot: -5,
    floatDur: 2.9,
  },
  {
    src: "/assets/bucket.png",
    name: "Ведро",
    role: "Mana pool",
    blurb: "Ресурс отряда. Заряды для комбо-уборки.",
    accent: "#7eb8ff",
    parallax: -28,
    rotateFrom: -8,
    floatY: 12,
    floatRot: 3,
    floatDur: 3.8,
  },
  {
    src: "/assets/duster.png",
    name: "Щётка",
    role: "Floor scrub",
    blurb: "Жёсткий скраб. Финальная зачистка локации.",
    accent: "#7ef0d0",
    parallax: -12,
    rotateFrom: 14,
    floatY: 9,
    floatRot: -4,
    floatDur: 3.2,
  },
] as const;

type Item = (typeof items)[number];

function ScrollItem({
  item,
  index,
  progress,
  reduceMotion,
}: {
  item: Item;
  index: number;
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
}) {
  // staggered reveal windows along scroll progress
  const start = 0.05 + index * 0.08;
  const mid = start + 0.18;
  const end = 0.92;

  const y = useTransform(
    progress,
    [0, start, mid, end, 1],
    reduceMotion ? [0, 0, 0, 0, 0] : [72 + index * 12, 72 + index * 12, 0, item.parallax * 0.35, item.parallax]
  );

  const opacity = useTransform(
    progress,
    [0, start, mid, 0.95, 1],
    reduceMotion ? [1, 1, 1, 1, 1] : [0, 0, 1, 1, 0.85]
  );

  const scale = useTransform(
    progress,
    [0, start, mid, 1],
    reduceMotion ? [1, 1, 1, 1] : [0.86, 0.86, 1, 1]
  );

  const rotate = useTransform(
    progress,
    [0, start, mid, 1],
    reduceMotion ? [0, 0, 0, 0] : [item.rotateFrom, item.rotateFrom, 0, 0]
  );

  const blur = useTransform(
    progress,
    [0, start, mid],
    reduceMotion ? ["blur(0px)", "blur(0px)", "blur(0px)"] : ["blur(8px)", "blur(8px)", "blur(0px)"]
  );

  return (
    <motion.li
      style={{ y, opacity, scale, rotate, filter: blur }}
      className="list-none"
    >
      <motion.article
        whileHover={
          reduceMotion
            ? undefined
            : { y: -8, transition: { type: "spring", stiffness: 360, damping: 22 } }
        }
        className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4 backdrop-blur-sm transition-colors hover:border-[var(--clean)]/30 hover:from-[var(--clean)]/[0.08] hover:to-white/[0.02] md:p-5"
      >
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-25 blur-2xl transition-opacity duration-300 group-hover:opacity-55"
          style={{ background: item.accent }}
        />

        <span
          className="pixel-text absolute left-3 top-3 text-[9px] opacity-70"
          style={{ color: item.accent }}
        >
          0{index + 1}
        </span>

        <div className="relative mx-auto mt-4 flex h-28 w-28 items-center justify-center md:h-36 md:w-36">
          <motion.div
            className="relative h-full w-full"
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, -item.floatY, 0],
                    rotate: [0, item.floatRot, 0],
                  }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: item.floatDur,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.15,
                  }
            }
          >
            <Image
              src={item.src}
              alt={item.name}
              fill
              className="pixel-art object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)] transition duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 30vw, 160px"
            />
          </motion.div>
        </div>

        <div className="relative mt-3 text-center md:text-left">
          <p className="pixel-text text-[8px] md:text-[9px]" style={{ color: item.accent }}>
            {item.role}
          </p>
          <h3 className="mt-1.5 text-base font-semibold tracking-tight md:text-lg">
            {item.name}
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-[var(--fg-muted)] md:text-sm">
            {item.blurb}
          </p>
        </div>

        <div
          className="pointer-events-none absolute inset-x-6 bottom-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-current to-transparent opacity-80 transition duration-300 group-hover:scale-x-100"
          style={{ color: item.accent }}
        />
      </motion.article>
    </motion.li>
  );
}

type CleaningItemsScrollProps = {
  compact?: boolean;
  className?: string;
};

export function CleaningItemsScroll({
  compact = false,
  className = "",
}: CleaningItemsScrollProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // stage glow intensity tied to scroll
  const glowOpacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.2, 0.9, 0.9, 0.35]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [0, 0.4, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.25], [24, 0]);

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${compact ? "py-10" : "section-pad py-20 md:py-28"} ${className}`}
      aria-label="Пиксельный арсенал уборки"
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: glowOpacity,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(62,224,184,0.1), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {!compact && (
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="mb-12 text-center md:mb-16"
          >
            <p className="pixel-text text-[10px] text-[var(--clean)]">LOOT · SCROLL</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-4xl">
              Предметы появляются вместе с квестом
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[var(--fg-muted)] md:text-base">
              Scroll-driven reveal: stagger, parallax, float.
            </p>
          </motion.div>
        )}

        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {items.map((item, i) => (
            <ScrollItem
              key={item.name}
              item={item}
              index={i}
              progress={scrollYProgress}
              reduceMotion={reduceMotion}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default CleaningItemsScroll;
