"use client";

import { FadeIn, Stagger, StaggerItem } from "./Motion";

const pains = [
  {
    n: "01",
    icon: "✕",
    title: "Список, который никто не читает",
    text: "Записки, чаты, «убери комнату» — и тишина. Без игровой петли мотивация сдувается за день.",
  },
  {
    n: "02",
    icon: "◌",
    title: "Уборка = наказание",
    text: "Дети видят скуку. Родители — конфликт. Дом грязный, настроение хуже.",
  },
  {
    n: "03",
    icon: "⌀",
    title: "Нет видимого прогресса",
    text: "Пыль вернулась. Без уровней и «комната пройдена» кажется, что топчетесь на месте.",
  },
  {
    n: "04",
    icon: "↯",
    title: "Каждый сам по себе",
    text: "Нет общей цели. Tidy Titans делает уборку коопом: семья — пати, грязь — рейд.",
  },
];

export function Problem() {
  return (
    <section className="pad border-y border-[var(--line)] py-[clamp(5rem,12vh,9rem)]">
      <div className="mx-auto max-w-[var(--maxw)]">
        <FadeIn>
          <p className="mono text-[var(--ember)]">проблема</p>
          <h2 className="mt-4 max-w-[18ch] text-[clamp(1.8rem,4vw,3.2rem)] font-semibold tracking-[-0.03em]">
            Почему дом снова в хаосе
          </h2>
        </FadeIn>

        <Stagger className="mt-14 grid gap-px overflow-hidden rounded-sm border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
          {pains.map((p) => (
            <StaggerItem key={p.n}>
              <article className="group h-full bg-[var(--bg)] p-7 transition hover:bg-[var(--bg-2)] md:p-9">
                <div className="flex items-start justify-between">
                  <span className="mono text-[var(--ink-3)]">{p.n}</span>
                  <span className="text-[var(--ink-3)] transition group-hover:text-[var(--ember)]">
                    {p.icon}
                  </span>
                </div>
                <h3 className="mt-6 text-[1.25rem] font-semibold tracking-tight md:text-[1.4rem]">
                  {p.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--ink-2)]">
                  {p.text}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
