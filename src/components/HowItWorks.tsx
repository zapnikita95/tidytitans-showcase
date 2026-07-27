"use client";

import { FadeIn, Stagger, StaggerItem } from "./Motion";

const steps = [
  {
    n: "01",
    title: "Карта дома",
    text: "Комнаты становятся локациями. Кухня, ванная, детская — у каждой свой уровень и свой «босс-грязи».",
  },
  {
    n: "02",
    title: "Выбор титана",
    text: "Каждый член семьи — титан с ролью: mop-main, dust-ranger, sponge-mage. Кооп без ссор о «кто что делает».",
  },
  {
    n: "03",
    title: "Квест на время",
    text: "Таймер, чеклист задач и пиксельные эффекты чистоты. Убрал пятно — моб побеждён, XP в копилку.",
  },
  {
    n: "04",
    title: "Победа семьи",
    text: "Общий экран «уровень пройден», награды, серия дней. Чистый дом = shared win, а не чей-то долг.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative section-pad border-y border-white/5 bg-[var(--bg-elevated)]/60 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="pixel-text text-[10px] text-[var(--clean)]">QUEST LOOP</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              Как работает система
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[var(--fg-muted)] md:text-base">
            Четыре шага — от хаоса к чистому дому. Без PDF-отчётов, с игровой логикой
            и ощущением «мы прошли рейд».
          </p>
        </FadeIn>

        <Stagger className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <StaggerItem key={s.n}>
              <div className="group relative h-full bg-[var(--bg)] p-6 transition hover:bg-[var(--bg-card)] md:p-7">
                <span className="pixel-text text-[11px] text-[var(--clean)]">{s.n}</span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">
                  {s.text}
                </p>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-[var(--clean)] to-transparent transition group-hover:scale-x-100" />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
