"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const floatingTools = [
  { src: "/assets/mop.png", alt: "Швабра", className: "left-[4%] top-[18%] w-16 md:w-24", delay: 0.2 },
  { src: "/assets/sponge.png", alt: "Губка", className: "right-[6%] top-[22%] w-14 md:w-20", delay: 0.35 },
  { src: "/assets/bucket.png", alt: "Ведро", className: "left-[8%] bottom-[18%] w-16 md:w-22", delay: 0.45 },
  { src: "/assets/duster.png", alt: "Выбивалка", className: "right-[8%] bottom-[20%] w-14 md:w-20", delay: 0.55 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yTools = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden hero-stage pt-24 pb-16"
    >
      {/* soft grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* floating dirt particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-sm bg-[var(--dirt)]/50"
            style={{
              width: 4 + (i % 3) * 2,
              height: 4 + (i % 2) * 2,
              left: `${8 + ((i * 7) % 84)}%`,
              top: `${12 + ((i * 11) % 70)}%`,
            }}
            animate={{
              y: [0, -18 - (i % 5) * 4, 0],
              x: [0, (i % 2 === 0 ? 8 : -8), 0],
              opacity: [0.25, 0.7, 0.25],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="section-pad relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pixel-text mb-5 text-[10px] leading-relaxed text-[var(--clean)] md:text-[11px]"
          >
            TIDY TITANS · FAMILY QUEST
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem] lg:leading-[1.05]"
          >
            Уборка —{" "}
            <span className="text-[var(--clean)] text-glow">это квест.</span>
            <br />
            <span className="text-[var(--fg-muted)] font-normal">
              Хаос — босс уровня.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-[var(--fg-muted)] md:text-lg"
          >
            Tidy Titans превращает семейную уборку в пиксельное приключение:
            комнаты — локации, грязь — мобы, чистота — победа. Вместе, весело,
            без криков и списка «кто не вымыл».
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--clean)] px-6 py-3.5 text-sm font-semibold text-[#06241c] transition hover:brightness-110 hover:shadow-[0_0_32px_var(--clean-glow)]"
            >
              Начать квест
              <span aria-hidden>→</span>
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-[var(--fg)] transition hover:border-[var(--clean)]/40 hover:bg-white/10"
            >
              Как это работает
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-6 text-xs text-[var(--fg-muted)]"
          >
            {[
              ["01", "Квесты по комнатам"],
              ["02", "Семейный кооп"],
              ["03", "Пиксельный вайб"],
            ].map(([n, t]) => (
              <div key={n} className="flex items-center gap-2">
                <span className="pixel-text text-[9px] text-[var(--clean)]">{n}</span>
                <span>{t}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero visual */}
        <motion.div style={{ y: yHero, opacity }} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-square">
            {/* glow ring */}
            <motion.div
              className="absolute inset-[12%] rounded-full bg-[var(--clean)]/10 blur-3xl"
              animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.85, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative h-[78%] w-[78%]">
                <Image
                  src="/assets/titan.png"
                  alt="Титан-уборщик Tidy Titans"
                  fill
                  priority
                  className="pixel-art object-contain drop-shadow-[0_20px_60px_rgba(62,224,184,0.25)]"
                  sizes="(max-width: 768px) 80vw, 420px"
                />
              </div>
            </motion.div>

            {/* floating tools around titan */}
            <motion.div style={{ y: yTools }} className="absolute inset-0">
              {floatingTools.map((tool) => (
                <motion.div
                  key={tool.src}
                  className={`absolute ${tool.className}`}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -8, 0],
                    rotate: [0, tool.delay > 0.4 ? 6 : -5, 0],
                  }}
                  transition={{
                    opacity: { delay: tool.delay, duration: 0.6 },
                    scale: { delay: tool.delay, duration: 0.6 },
                    y: {
                      delay: tool.delay + 0.5,
                      duration: 3.2 + tool.delay,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    rotate: {
                      delay: tool.delay + 0.5,
                      duration: 4 + tool.delay,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  whileHover={{ scale: 1.12, rotate: 8 }}
                >
                  <div className="relative aspect-square w-full">
                    <Image
                      src={tool.src}
                      alt={tool.alt}
                      fill
                      className="pixel-art object-contain drop-shadow-lg"
                      sizes="96px"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <p className="mt-2 text-center text-xs text-[var(--fg-muted)]">
            Главный титан + арсенал чистоты
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-[11px] text-[var(--fg-muted)]"
      >
        <span className="animate-pulse">↓ листай дальше</span>
      </motion.div>
    </section>
  );
}
