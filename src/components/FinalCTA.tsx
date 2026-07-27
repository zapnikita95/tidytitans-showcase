"use client";

import { FadeIn } from "./Motion";

export function FinalCTA() {
  return (
    <section id="cta" className="pad relative overflow-hidden py-[clamp(7rem,18vh,14rem)]">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(70vw,640px)] w-[min(70vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(62,224,184,0.14), transparent 65%)",
        }}
      />

      <FadeIn className="relative mx-auto max-w-[var(--maxw)] text-center">
        <p className="mono text-[var(--accent)]">старт</p>
        <h2 className="mx-auto mt-5 max-w-[16ch] text-[clamp(2rem,5.5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
          Пора забрать{" "}
          <span className="text-[var(--accent)]">чистоту</span> у хаоса.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-[var(--ink-2)] leading-relaxed">
          Tidy Titans — система, а не чеклист. Семья, квест, результат.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="https://tidytitans.ru" className="btn-accent">
            Открыть tidytitans.ru →
          </a>
          <a
            href="#sweep"
            className="mono text-[0.7rem] text-[var(--ink-2)] transition hover:text-[var(--ink)]"
          >
            Ещё раз зачистку
          </a>
        </div>
      </FadeIn>
    </section>
  );
}
