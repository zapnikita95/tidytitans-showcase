"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";

const trashItems = [
  {
    src: "/items/banana.png",
    alt: "Банановая шкурка",
    className: "left-[12%] top-[22%] w-24 md:w-32 md:left-[18%] md:top-[28%]",
    start: 0.12,
    end: 0.4,
  },
  {
    src: "/items/candy.png",
    alt: "Фантик",
    className: "right-[14%] top-[24%] w-16 md:w-20 md:right-[22%] md:top-[32%]",
    start: 0.22,
    end: 0.52,
  },
  {
    src: "/items/dust.png",
    alt: "Пыль",
    className: "left-[28%] bottom-[24%] w-20 md:w-28 md:left-[35%] md:bottom-[30%]",
    start: 0.32,
    end: 0.65,
  },
  {
    src: "/items/chocolate.png",
    alt: "Шоколад",
    className: "right-[22%] bottom-[22%] w-16 md:w-20 md:right-[30%] md:bottom-[28%]",
    start: 0.42,
    end: 0.78,
  },
] as const;

function TrashPiece({
  src,
  alt,
  className,
  start,
  end,
  progress,
}: {
  src: string;
  alt: string;
  className: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
}) {
  // каждый кусок исчезает в своём окне progress
  const opacity = useTransform(progress, [start, end], [1, 0]);
  const scale = useTransform(progress, [start, end], [1, 0.45]);
  const y = useTransform(progress, [start, end], [0, -70]);
  const rotate = useTransform(
    progress,
    [start, end],
    [0, alt.length % 2 === 0 ? 28 : -32]
  );

  return (
    <motion.img
      src={src}
      alt={alt}
      style={{ opacity, scale, y, rotate }}
      className={`pointer-events-none absolute z-[5] select-none pixel-art drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)] ${className}`}
      draggable={false}
    />
  );
}

/**
 * Sticky scroll-quest: секция 200vh, экран sticky.
 * progress: 0 когда верх секции у верха viewport, 1 когда низ секции у низа.
 * ВАЖНО: у секции НЕ должно быть overflow:hidden — иначе sticky мёртвый.
 */
export default function CleaningTrashAdvanced() {
  const ref = useRef<HTMLElement>(null);
  const [debugP, setDebugP] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    // для sticky-сцены: прогресс = насколько проскроллили саму секцию
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setDebugP(Math.round(v * 100));
  });

  // Инструменты — заметный ход
  const mopX = useTransform(scrollYProgress, [0.05, 0.85], [-120, 220]);
  const mopRotate = useTransform(scrollYProgress, [0.05, 0.85], [-22, 32]);
  const mopY = useTransform(scrollYProgress, [0.05, 0.85], [40, -60]);

  const spongeX = useTransform(scrollYProgress, [0.1, 0.9], [140, -140]);
  const spongeY = useTransform(scrollYProgress, [0.1, 0.9], [50, -80]);

  const beaterRotate = useTransform(scrollYProgress, [0.15, 0.9], [8, -55]);
  const beaterY = useTransform(scrollYProgress, [0.15, 0.9], [40, -100]);

  const bucketY = useTransform(scrollYProgress, [0.05, 0.95], [50, -40]);

  const sheetOpacity = useTransform(scrollYProgress, [0.08, 0.3, 0.8], [0.5, 0.35, 0]);
  const sheetScale = useTransform(scrollYProgress, [0.08, 0.8], [1, 0.8]);

  const cleanGlow = useTransform(scrollYProgress, [0.45, 0.9], [0, 0.65]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15, 0.7, 0.9], [1, 1, 0.4, 0]);
  const doneOpacity = useTransform(scrollYProgress, [0.72, 0.9], [0, 1]);

  return (
    <section
      id="clean-quest"
      ref={ref}
      // height даёт «длину» квеста; overflow НЕ hidden
      className="relative h-[220vh] bg-[#0b0b10]"
      aria-label="Квест: уборка мусора"
    >
      {/* sticky pin — без overflow:hidden у предков */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b10] via-[#12121a] to-[#0b0b10]" />

          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: cleanGlow,
              background:
                "radial-gradient(ellipse 50% 40% at 50% 55%, rgba(62,224,184,0.2), transparent 65%)",
            }}
          />

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage: "linear-gradient(to top, black, transparent)",
            }}
          />

          {/* общий лист мусора */}
          <motion.img
            src="/items/trash-sheet.png"
            alt=""
            aria-hidden
            style={{ opacity: sheetOpacity, scale: sheetScale }}
            className="pointer-events-none absolute left-1/2 top-[48%] z-[1] w-[min(72vw,440px)] -translate-x-1/2 -translate-y-1/2 select-none pixel-art"
            draggable={false}
          />

          {trashItems.map((item) => (
            <TrashPiece key={item.alt} {...item} progress={scrollYProgress} />
          ))}

          {/* tools */}
          <motion.img
            src="/items/mop.png"
            alt="Швабра"
            style={{ x: mopX, y: mopY, rotate: mopRotate }}
            className="absolute left-[6%] top-[36%] z-10 w-28 select-none pixel-art drop-shadow-[0_0_20px_rgba(62,224,184,0.25)] will-change-transform md:w-36"
            draggable={false}
          />

          <motion.img
            src="/items/sponge.png"
            alt="Губка"
            style={{ x: spongeX, y: spongeY }}
            className="absolute right-[10%] top-[30%] z-10 w-20 select-none pixel-art drop-shadow-[0_0_18px_rgba(255,138,76,0.3)] will-change-transform md:w-24"
            draggable={false}
          />

          <motion.img
            src="/items/beater.png"
            alt="Выбивалка"
            style={{ rotate: beaterRotate, y: beaterY }}
            className="absolute bottom-[18%] right-[18%] z-10 w-28 origin-bottom select-none pixel-art drop-shadow-[0_0_16px_rgba(126,240,208,0.25)] will-change-transform md:w-32"
            draggable={false}
          />

          <motion.img
            src="/items/bucket.png"
            alt="Ведро"
            style={{ y: bucketY }}
            className="absolute bottom-[15%] left-[20%] z-10 w-24 select-none pixel-art drop-shadow-[0_0_22px_rgba(126,184,255,0.3)] will-change-transform md:w-28"
            draggable={false}
          />

          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-12 left-0 right-0 z-20 flex flex-col items-center gap-2 text-center"
          >
            <p className="font-mono text-sm tracking-wide text-zinc-500">
              Скролль, чтобы убрать мусор
            </p>
            {/* progress bar = живой индикатор, что скролл крутит сцену */}
            <div className="h-1 w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full origin-left rounded-full bg-[var(--clean)]"
                style={{ scaleX: scrollYProgress }}
                data-testid="scroll-progress"
                data-progress={debugP}
              />
            </div>
          </motion.div>

          <motion.p
            style={{ opacity: doneOpacity }}
            className="absolute bottom-20 left-0 right-0 z-20 text-center font-mono text-sm text-[var(--clean)]"
          >
            Чисто. Уровень пройден.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

export { CleaningTrashAdvanced };
