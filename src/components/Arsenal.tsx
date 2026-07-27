"use client";

import { FadeIn } from "./Motion";
import { CleaningItemsScroll } from "./CleaningItemsScroll";

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
            Пиксельный стиль, scroll-stagger и плавный floating на тёмной витрине.
          </p>
        </FadeIn>
      </div>

      {/* scroll-stagger + float items */}
      <CleaningItemsScroll compact className="mt-6 px-0" />
    </section>
  );
}
