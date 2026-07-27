"use client";

import Image from "next/image";
import { FadeIn, Stagger, StaggerItem, motion } from "./Motion";

const rooms = [
  { name: "Кухня", status: "Босс: жир на плите", progress: 72, tone: "var(--dirt)" },
  { name: "Детская", status: "Мобы: Lego-орда", progress: 45, tone: "var(--clean)" },
  { name: "Ванная", status: "Элита: налёт", progress: 88, tone: "#7eb8ff" },
  { name: "Гостиная", status: "Рейд: пыль + крошки", progress: 30, tone: "var(--accent-soft)" },
];

export function QuestMap() {
  return (
    <section id="quest" className="relative section-pad border-y border-white/5 bg-[var(--bg-elevated)]/50 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <FadeIn>
          <p className="pixel-text text-[10px] text-[var(--clean)]">HOUSE MAP</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            Дом как карта квеста
          </h2>
          <p className="mt-5 text-[var(--fg-muted)] leading-relaxed">
            Каждая комната — отдельный уровень. Прогресс видно сразу: полоска
            чистоты, статус босса и награда за зачистку. Дети видят «игру»,
            родители — реальный результат.
          </p>

          <Stagger className="mt-10 space-y-4" stagger={0.1}>
            {rooms.map((room) => (
              <StaggerItem key={room.name}>
                <div className="card-surface rounded-xl p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{room.name}</p>
                      <p className="mt-0.5 text-xs text-[var(--fg-muted)]">{room.status}</p>
                    </div>
                    <span className="pixel-text text-[10px]" style={{ color: room.tone }}>
                      {room.progress}%
                    </span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: room.tone }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${room.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                    />
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </FadeIn>

        <FadeIn delay={0.15} className="relative">
          <div className="relative mx-auto aspect-square max-w-md">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[var(--clean)]/20 via-transparent to-[var(--dirt)]/15 blur-2xl" />
            <div className="card-surface relative flex h-full flex-col items-center justify-center overflow-hidden rounded-[2rem] p-8 glow-clean">
              <motion.div
                animate={{ rotate: [0, 2, -2, 0], y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-56 w-56 md:h-64 md:w-64"
              >
                <Image
                  src="/assets/titan.png"
                  alt="Титан готов к квесту"
                  fill
                  className="pixel-art object-contain"
                  sizes="256px"
                />
              </motion.div>
              <p className="pixel-text mt-4 text-center text-[10px] leading-relaxed text-[var(--clean)]">
                LEVEL CLEAR
              </p>
              <p className="mt-2 text-center text-sm text-[var(--fg-muted)]">
                Семья + арсенал = чистый дом
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
