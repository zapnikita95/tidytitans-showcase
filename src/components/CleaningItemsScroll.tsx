"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const items = [
  { src: "/items/mop.png", alt: "Швабра", delay: 0, from: 100, to: -80 },
  { src: "/items/sponge.png", alt: "Губка", delay: 0.08, from: 60, to: -120 },
  { src: "/items/bucket.png", alt: "Ведро", delay: 0.16, from: 120, to: -50 },
  { src: "/items/beater.png", alt: "Выбивалка", delay: 0.24, from: 80, to: -100 },
];

function ItemCard({
  src,
  alt,
  delay,
  y,
}: {
  src: string;
  alt: string;
  delay: number;
  y: ReturnType<typeof useTransform<number, number>>;
}) {
  return (
    // внешний слой — ТОЛЬКО scroll parallax (не трогаем y анимацией)
    <motion.div style={{ y }} className="flex flex-col items-center will-change-transform">
      {/* внутренний — только opacity/scale на появлении, без y */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{
          duration: 0.65,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex flex-col items-center"
      >
        <motion.img
          src={src}
          alt={alt}
          className="h-auto w-28 pixel-art drop-shadow-[0_0_15px_rgba(100,180,255,0.25)] md:w-36"
          whileHover={{ scale: 1.08, rotate: 4 }}
          transition={{ type: "spring", stiffness: 300 }}
          draggable={false}
        />
        <span className="mt-3 font-mono text-sm tracking-wide text-zinc-400">{alt}</span>
      </motion.div>
    </motion.div>
  );
}

export default function CleaningItemsScroll() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [items[0].from, items[0].to]);
  const y2 = useTransform(scrollYProgress, [0, 1], [items[1].from, items[1].to]);
  const y3 = useTransform(scrollYProgress, [0, 1], [items[2].from, items[2].to]);
  const y4 = useTransform(scrollYProgress, [0, 1], [items[3].from, items[3].to]);
  const ys = [y1, y2, y3, y4];

  return (
    <section
      ref={ref}
      className="relative flex min-h-[110vh] items-center justify-center bg-[#0a0a0f] py-24"
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
          <ItemCard
            key={item.alt}
            src={item.src}
            alt={item.alt}
            delay={item.delay}
            y={ys[i]}
          />
        ))}
      </div>
    </section>
  );
}

export { CleaningItemsScroll };
