"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Композиция 1:1 с reznikov hero:
 * — пустота, glow, grid
 * — огромный title слева
 * — ОДИН якорь-объект справа (швабра как «меч»)
 * — watermark, mono sub, accent CTA
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const mopY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const mopRotate = useTransform(scrollYProgress, [0, 1], [-18, 10]);
  const mopScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const mopOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-[clamp(1.4rem,4vh,2.6rem)] pt-[clamp(6rem,12vh,9rem)]"
    >
      {/* sun / ember glow — как hero__sun, но teal */}
      <div
        className="pointer-events-none absolute left-1/2 top-[48%] aspect-square w-[min(72vw,860px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(62,224,184,0.12), rgba(26,158,130,0.05) 48%, transparent 66%)",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[58%] h-[min(78vw,900px)] w-[min(78vw,900px)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[20px]"
        style={{
          background:
            "radial-gradient(circle, rgba(62,224,184,0.16), rgba(255,138,76,0.06) 40%, transparent 66%)",
        }}
      />

      {/* grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background: `
            linear-gradient(var(--line-soft) 1px, transparent 1px) 0 0 / 100% clamp(90px,12vh,140px),
            radial-gradient(120% 80% at 50% 120%, rgba(62,224,184,0.08), transparent 60%)
          `,
          maskImage:
            "linear-gradient(transparent, #000 20%, #000 70%, transparent)",
        }}
      />

      <div className="pad relative z-10 mx-auto w-full max-w-[var(--maxw)]">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-6">
          <div className="max-w-[min(92vw,620px)]">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mono text-[var(--ink-2)]"
            >
              00 · семейный квест-уборка
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-[clamp(2.6rem,6.2vw,5.4rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-[var(--ink)]"
            >
              <span className="block">Уборка —</span>
              <span className="block text-[var(--accent)]">оружие.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.14 }}
              className="mono mt-[1.1rem] max-w-[42ch] leading-relaxed text-[var(--ink-2)]"
            >
              Строим систему чистоты для семьи. Не список дел, а квест,
              который каждый день возвращает уют в дом.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="mt-[2.2rem]"
            >
              <a href="#sweep" className="btn-accent">
                Начать квест <span aria-hidden>→</span>
              </a>
            </motion.div>
          </div>

          {/* THE weapon — one object, reznikov sword energy */}
          <div className="relative flex min-h-[42vh] items-center justify-center lg:min-h-[58vh]">
            <motion.div
              style={{ y: mopY, rotate: mopRotate, scale: mopScale, opacity: mopOpacity }}
              className="relative will-change-transform"
            >
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[55%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]/15 blur-3xl" />
              <motion.img
                src="/items/mop.png"
                alt="Швабра — оружие чистоты"
                initial={{ opacity: 0, scale: 0.9, rotate: -28 }}
                animate={{ opacity: 1, scale: 1, rotate: -18 }}
                transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="pixel-art relative z-10 h-auto w-[min(78vw,420px)] select-none drop-shadow-[0_30px_80px_rgba(62,224,184,0.25)]"
                draggable={false}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="pad relative z-10 mx-auto flex w-full max-w-[var(--maxw)] flex-wrap items-end justify-between gap-4">
        <p className="mono text-[0.65rem] text-[var(--ink-3)]">
          tidytitans.ru · clean system
        </p>
        <p className="mono text-[0.65rem] text-[var(--ink-3)]">↓ листай</p>
      </div>

      {/* watermark like Медиа© */}
      <div
        className="pointer-events-none absolute bottom-[0.02em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[clamp(6rem,17vw,16rem)] font-semibold leading-none tracking-[-0.05em] text-[rgba(243,239,230,0.07)]"
        aria-hidden
      >
        Titans
        <sup className="align-super text-[0.16em]">©</sup>
      </div>
    </section>
  );
}
