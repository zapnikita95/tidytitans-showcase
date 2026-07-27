"use client";

import { FadeIn } from "./Motion";
import CleaningItemsScroll from "./CleaningItemsScroll";

export function Arsenal() {
  return (
    <>
      <section id="arsenal" className="relative section-pad pb-8 pt-24 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <p className="pixel-text text-[10px] text-[var(--clean)]">CLEAN ARSENAL</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
              Арсенал чистоты
            </h2>
            <p className="mt-5 max-w-2xl text-[var(--fg-muted)] leading-relaxed">
              Пиксельный loot: швабра, губка, ведро, выбивалка. Параллакс при скролле,
              hover как в инвентаре RPG.
            </p>
          </FadeIn>
        </div>
      </section>
      <CleaningItemsScroll />
    </>
  );
}
