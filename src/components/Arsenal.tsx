"use client";

import { FadeIn, Stagger, StaggerItem, motion } from "./Motion";

const items = [
  { src: "/items/mop.png", name: "Швабра", role: "main" },
  { src: "/items/sponge.png", name: "Губка", role: "burst" },
  { src: "/items/bucket.png", name: "Ведро", role: "pool" },
  { src: "/items/beater.png", name: "Щётка", role: "scrub" },
];

export function Arsenal() {
  return (
    <section className="pad border-t border-[var(--line)] py-[clamp(5rem,12vh,9rem)]">
      <div className="mx-auto max-w-[var(--maxw)]">
        <FadeIn>
          <p className="mono text-[var(--accent)]">арсенал</p>
          <h2 className="mt-4 max-w-[14ch] text-[clamp(1.8rem,4vw,3.2rem)] font-semibold tracking-[-0.03em]">
            Четыре предмета. Один язык.
          </h2>
        </FadeIn>

        <Stagger className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {items.map((item, i) => (
            <StaggerItem key={item.name}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-6 flex h-36 w-36 items-center justify-center md:h-44 md:w-44">
                  <div className="absolute inset-[18%] rounded-full bg-[var(--accent)]/10 blur-2xl" />
                  <img
                    src={item.src}
                    alt={item.name}
                    className="pixel-art relative h-[85%] w-[85%] object-contain drop-shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
                    draggable={false}
                  />
                </div>
                <p className="mono text-[var(--ink-3)]">0{i + 1} · {item.role}</p>
                <p className="mt-2 text-lg font-semibold tracking-tight">{item.name}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
