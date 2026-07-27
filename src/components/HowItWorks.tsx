"use client";

import { FadeIn, Stagger, StaggerItem } from "./Motion";

const steps = [
  {
    n: "01",
    title: "Разбор дома",
    text: "Комнаты становятся локациями. Видно, где хаос и с чего начинать рейд.",
  },
  {
    n: "02",
    title: "Отряд титанов",
    text: "Каждый член семьи — роль. Не «кто виноват», а кто какой слот закрывает.",
  },
  {
    n: "03",
    title: "Квест на время",
    text: "Таймер, задачи, пиксельный прогресс. Убрал пятно — моб побеждён.",
  },
  {
    n: "04",
    title: "Победа семьи",
    text: "Общий экран «уровень пройден». Чистый дом = shared win.",
  },
];

export function HowItWorks() {
  return (
    <section id="system" className="pad py-[clamp(5rem,12vh,9rem)]">
      <div className="mx-auto max-w-[var(--maxw)]">
        <FadeIn className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mono text-[var(--accent)]">как работает</p>
            <h2 className="mt-4 text-[clamp(1.8rem,4vw,3.2rem)] font-semibold tracking-[-0.03em]">
              Четыре шага системы
            </h2>
          </div>
          <p className="max-w-sm text-[0.95rem] leading-relaxed text-[var(--ink-2)]">
            Не PDF в стол. Рабочий loop: карта → роли → квест → победа.
          </p>
        </FadeIn>

        <Stagger className="mt-14 grid gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <StaggerItem key={s.n}>
              <div className="group h-full bg-[var(--bg)] p-7 hover:bg-[var(--bg-2)]">
                <span className="mono text-[var(--accent)]">{s.n}</span>
                <h3 className="mt-8 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-2)]">{s.text}</p>
                <div className="mt-8 h-px origin-left scale-x-0 bg-gradient-to-r from-[var(--accent)] to-transparent transition group-hover:scale-x-100" />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
