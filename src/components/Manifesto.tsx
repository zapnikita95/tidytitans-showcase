"use client";

import { FadeIn } from "./Motion";

export function Manifesto() {
  return (
    <section
      id="chaos"
      className="pad relative grid items-center gap-[clamp(3rem,8vw,10rem)] overflow-hidden py-[clamp(9rem,22vh,18rem)] md:grid-cols-2"
    >
      <div
        className="pointer-events-none absolute right-[-2vw] top-[8vh] select-none text-[34vh] font-semibold leading-none text-[rgba(62,224,184,0.05)]"
        aria-hidden
      >
        家
      </div>

      <FadeIn>
        <h2 className="max-w-[16ch] text-[clamp(2rem,6.5vw,6rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
          <span className="block">Хаос не строит</span>
          <span className="block">уют.</span>
          <span className="mt-2 block text-[var(--ink-3)]">Система — строит.</span>
        </h2>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="mono mb-5 text-[var(--accent)]">шум · система</p>
        <p className="max-w-[38ch] text-[clamp(0.95rem,1.5vw,1.2rem)] leading-[1.75] text-[var(--ink-2)]">
          Большинство приложений просто пишут задачи. Мы делаем иначе: сначала
          превращаем дом в карту квеста, грязь — в противников, а семью — в отряд.
          Регулярно. С видимым прогрессом. Без криков у холодильника.
        </p>
      </FadeIn>
    </section>
  );
}
