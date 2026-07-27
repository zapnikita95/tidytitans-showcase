"use client";

import { FadeIn, Stagger, StaggerItem } from "./Motion";

const pains = [
  {
    code: "01",
    icon: "✕",
    title: "Список дел, который никто не читает",
    text: "Записки на холодильнике, чаты в мессенджере, устные «убери комнату» — и тишина. Без игровой петли мотивация сдувается за день.",
  },
  {
    code: "02",
    icon: "◌",
    title: "Уборка = наказание",
    text: "Дети воспринимают чистоту как скуку. Родители — как вечный конфликт. В итоге дом грязный, а настроение ещё хуже.",
  },
  {
    code: "03",
    icon: "⌀",
    title: "Нет видимого прогресса",
    text: "Пыль вернулась, игрушки снова на полу. Без уровней, очков и «комнаты пройдены» ощущение, что топчетесь на месте.",
  },
  {
    code: "04",
    icon: "↯",
    title: "Каждый сам по себе",
    text: "Нет общей цели и командной победы. Tidy Titans делает уборку коопом: семья — пати, грязь — рейд.",
  },
];

export function Problem() {
  return (
    <section id="problem" className="relative section-pad py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="pixel-text text-[10px] text-[var(--dirt)]">CHAOS · BOSS FIGHT</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
            Хаос не строит уют.
            <br />
            <span className="text-[var(--fg-muted)]">Система — строит.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-[var(--fg-muted)] leading-relaxed">
            Большинство «приложений для дел» просто пишут задачи. Мы делаем иначе:
            сначала превращаем дом в карту квеста, грязь — в противников, а семью —
            в отряд титанов чистоты.
          </p>
        </FadeIn>

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2">
          {pains.map((p) => (
            <StaggerItem key={p.code}>
              <article className="card-surface group h-full rounded-2xl p-6 transition duration-300 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="pixel-text text-[10px] text-[var(--dirt)]/80">
                    {p.code}
                  </span>
                  <span className="text-lg text-[var(--fg-muted)] transition group-hover:text-[var(--dirt)]">
                    {p.icon}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight md:text-xl">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">
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
