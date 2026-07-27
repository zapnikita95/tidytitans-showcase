"use client";

import Image from "next/image";
import { FadeIn, motion } from "./Motion";

export function FinalCTA() {
  return (
    <section id="cta" className="relative section-pad py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0f1a18] via-[var(--bg-elevated)] to-[#120e0c] px-6 py-14 md:px-14 md:py-20">
            <div className="pointer-events-none absolute -right-10 top-0 h-64 w-64 rounded-full bg-[var(--clean)]/15 blur-3xl" />
            <div className="pointer-events-none absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-[var(--dirt)]/10 blur-3xl" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="pixel-text text-[10px] text-[var(--clean)]">READY · START</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl md:leading-tight">
                  Пора забрать{" "}
                  <span className="text-[var(--clean)]">чистоту</span> у хаоса.
                </h2>
                <p className="mt-5 max-w-xl text-[var(--fg-muted)] leading-relaxed">
                  Tidy Titans — витрина продукта: семейный квест-уборка с пиксельной
                  графикой, арсеналом предметов и ощущением премиум-системы, а не
                  скучного чеклиста.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="https://tidytitans.ru"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--clean)] px-6 py-3.5 text-sm font-semibold text-[#06241c] transition hover:brightness-110 hover:shadow-[0_0_32px_var(--clean-glow)]"
                  >
                    Открыть tidytitans.ru
                    <span aria-hidden>→</span>
                  </a>
                  <a
                    href="#arsenal"
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium transition hover:border-[var(--clean)]/40"
                  >
                    Смотреть арсенал
                  </a>
                </div>
              </div>

              <div className="relative mx-auto flex h-56 w-full max-w-xs items-center justify-center md:h-64">
                {[
                  { src: "/assets/mop.png", x: "-18%", y: "10%", s: 72, d: 0 },
                  { src: "/assets/bucket.png", x: "55%", y: "0%", s: 80, d: 0.3 },
                  { src: "/assets/sponge.png", x: "0%", y: "48%", s: 64, d: 0.5 },
                  { src: "/assets/duster.png", x: "52%", y: "52%", s: 68, d: 0.7 },
                ].map((t) => (
                  <motion.div
                    key={t.src}
                    className="absolute"
                    style={{ left: t.x, top: t.y, width: t.s, height: t.s }}
                    animate={{ y: [0, -10, 0], rotate: [0, 4, -4, 0] }}
                    transition={{
                      duration: 3.5 + t.d,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: t.d,
                    }}
                  >
                    <Image
                      src={t.src}
                      alt=""
                      width={t.s}
                      height={t.s}
                      className="pixel-art h-full w-full object-contain drop-shadow-lg"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
