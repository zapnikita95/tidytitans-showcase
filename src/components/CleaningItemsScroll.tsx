"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const items = [
  {
    src: "/assets/mop.png",
    name: "Швабра",
    role: "Main weapon",
    blurb: "Рубит лужи и крошки. Главный стат — зона чистоты.",
    accent: "#3ee0b8",
    float: { y: 10, rotate: 4, duration: 3.4 },
  },
  {
    src: "/assets/sponge.png",
    name: "Губка",
    role: "Burst clean",
    blurb: "AOE по пятнам. Пузыри = крит-эффект.",
    accent: "#ff8a4c",
    float: { y: 8, rotate: -5, duration: 2.9 },
  },
  {
    src: "/assets/bucket.png",
    name: "Ведро",
    role: "Mana pool",
    blurb: "Ресурс отряда. Заряды для комбо-уборки.",
    accent: "#7eb8ff",
    float: { y: 12, rotate: 3, duration: 3.8 },
  },
  {
    src: "/assets/duster.png",
    name: "Щётка",
    role: "Floor scrub",
    blurb: "Жёсткий скраб. Финальная зачистка локации.",
    accent: "#7ef0d0",
    float: { y: 9, rotate: -4, duration: 3.2 },
  },
] as const;

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 40, scale: 0.92, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease },
  },
};

type CleaningItemsScrollProps = {
  /** compact = strip without big heading */
  compact?: boolean;
  className?: string;
};

export function CleaningItemsScroll({
  compact = false,
  className = "",
}: CleaningItemsScrollProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className={`relative overflow-hidden ${compact ? "py-10" : "section-pad py-20 md:py-28"} ${className}`}
      aria-label="Пиксельный арсенал уборки"
    >
      {/* soft stage glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(62,224,184,0.08), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {!compact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="mb-12 text-center md:mb-16"
          >
            <p className="pixel-text text-[10px] text-[var(--clean)]">
              LOOT · SCROLL
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-4xl">
              Предметы появляются вместе с квестом
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[var(--fg-muted)] md:text-base">
              Stagger при скролле, лёгкий float, hover как в инвентаре.
            </p>
          </motion.div>
        )}

        <motion.ul
          className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25, margin: "-40px" }}
        >
          {items.map((item, i) => (
            <motion.li key={item.name} variants={card} className="list-none">
              <motion.article
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -8, transition: { type: "spring", stiffness: 360, damping: 22 } }
                }
                className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4 backdrop-blur-sm transition-colors hover:border-[var(--clean)]/30 hover:from-[var(--clean)]/[0.08] hover:to-white/[0.02] md:p-5"
              >
                {/* accent glow */}
                <div
                  className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-25 blur-2xl transition-opacity duration-300 group-hover:opacity-55"
                  style={{ background: item.accent }}
                />

                {/* index badge */}
                <span
                  className="pixel-text absolute left-3 top-3 text-[9px] opacity-70"
                  style={{ color: item.accent }}
                >
                  0{i + 1}
                </span>

                {/* floating sprite */}
                <div className="relative mx-auto mt-4 flex h-28 w-28 items-center justify-center md:h-36 md:w-36">
                  <motion.div
                    className="relative h-full w-full"
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            y: [0, -item.float.y, 0],
                            rotate: [0, item.float.rotate, 0],
                          }
                    }
                    transition={
                      reduceMotion
                        ? undefined
                        : {
                            duration: item.float.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.15,
                          }
                    }
                  >
                    <Image
                      src={item.src}
                      alt={item.name}
                      fill
                      className="pixel-art object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)] transition duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 30vw, 160px"
                    />
                  </motion.div>
                </div>

                <div className="relative mt-3 text-center md:text-left">
                  <p
                    className="pixel-text text-[8px] md:text-[9px]"
                    style={{ color: item.accent }}
                  >
                    {item.role}
                  </p>
                  <h3 className="mt-1.5 text-base font-semibold tracking-tight md:text-lg">
                    {item.name}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--fg-muted)] md:text-sm">
                    {item.blurb}
                  </p>
                </div>

                {/* bottom hairline on hover */}
                <div
                  className="pointer-events-none absolute inset-x-6 bottom-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-current to-transparent opacity-80 transition duration-300 group-hover:scale-x-100"
                  style={{ color: item.accent }}
                />
              </motion.article>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

export default CleaningItemsScroll;
