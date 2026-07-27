"use client";

import Image from "next/image";
import { FadeIn, Stagger, StaggerItem, motion } from "./Motion";

const items = [
  {
    src: "/assets/mop.png",
    name: "Швабра",
    role: "Main weapon",
    blurb: "Главное оружие титана. Рубит лужи, крошки и «невидимую» пыль на полу.",
    accent: "var(--clean)",
  },
  {
    src: "/assets/sponge.png",
    name: "Губка",
    role: "Burst clean",
    blurb: "Быстрый AOE по пятнам на кухне. Пузыри = крит-эффект чистоты.",
    accent: "var(--dirt)",
  },
  {
    src: "/assets/bucket.png",
    name: "Ведро",
    role: "Mana pool",
    blurb: "Ресурс отряда. Пена, вода, «заряды» для комбо-уборок всей семьёй.",
    accent: "#7eb8ff",
  },
  {
    src: "/assets/duster.png",
    name: "Выбивалка",
    role: "Range DPS",
    blurb: "Дальний бой с полками и углами. Пыль разлетается пикселями.",
    accent: "var(--accent-soft)",
  },
];

export function Arsenal() {
  return (
    <section id="arsenal" className="relative section-pad py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="pixel-text text-[10px] text-[var(--clean)]">CLEAN ARSENAL</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
            Арсенал чистоты
          </h2>
          <p className="mt-5 max-w-2xl text-[var(--fg-muted)] leading-relaxed">
            Не «меч контента» — набор предметов, которые ощущаются как loot.
            Пиксельный стиль, мягкое свечение, hover как в инвентаре RPG.
          </p>
        </FadeIn>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <StaggerItem key={item.name}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="card-surface group relative overflow-hidden rounded-2xl p-5"
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-30 blur-2xl transition group-hover:opacity-60"
                  style={{ background: item.accent }}
                />
                <div className="relative mx-auto flex h-40 w-40 items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 3.2 + i * 0.25,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={item.src}
                      alt={item.name}
                      fill
                      className="pixel-art object-contain drop-shadow-xl transition duration-300 group-hover:scale-105"
                      sizes="160px"
                    />
                  </motion.div>
                </div>
                <div className="relative mt-2">
                  <p className="pixel-text text-[9px]" style={{ color: item.accent }}>
                    {item.role}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
                    {item.blurb}
                  </p>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
