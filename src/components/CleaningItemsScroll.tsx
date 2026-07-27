"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const items = [
  { src: "/items/mop.png", alt: "Швабра", delay: 0 },
  { src: "/items/sponge.png", alt: "Губка", delay: 0.1 },
  { src: "/items/bucket.png", alt: "Ведро", delay: 0.2 },
  { src: "/items/beater.png", alt: "Выбивалка", delay: 0.3 },
];

export default function CleaningItemsScroll() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Лёгкий параллакс (разный для каждого предмета)
  const y1 = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [40, -120]);
  const y3 = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [100, -40]);
  const y4 = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [60, -90]);
  const transforms = [y1, y2, y3, y4];

  return (
    <section
      ref={ref}
      className="relative flex h-[120vh] items-center justify-center overflow-hidden bg-[#0a0a0f]"
      aria-label="Арсенал уборки"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#111118] to-[#0a0a0f]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(62,224,184,0.08), transparent 70%)",
        }}
      />

      <div className="relative z-10 grid max-w-5xl grid-cols-2 gap-8 px-6 md:grid-cols-4 md:gap-12">
        {items.map((item, i) => (
          <motion.div
            key={item.alt}
            style={{ y: transforms[i] }}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.7, y: 60 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.7,
              delay: item.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col items-center"
          >
            <motion.img
              src={item.src}
              alt={item.alt}
              className="pixel-art h-auto w-28 drop-shadow-[0_0_15px_rgba(100,180,255,0.25)] md:w-36"
              whileHover={
                reduceMotion
                  ? undefined
                  : { scale: 1.08, rotate: [-2, 2, 0] }
              }
              transition={{ type: "spring", stiffness: 300 }}
            />
            <span className="mt-3 font-mono text-sm tracking-wide text-zinc-400">
              {item.alt}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export { CleaningItemsScroll };
