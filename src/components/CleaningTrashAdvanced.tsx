"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";

/**
 * Scroll story (0 → 1):
 * 0.00–0.12  хаос на полу, инструменты ждут слева
 * 0.12–0.28  швабра замахивается и идёт к банану → HIT
 * 0.28–0.42  швабра + губка на фантик → HIT
 * 0.42–0.55  выбивалка + швабра на пыль → HIT
 * 0.55–0.70  швабра доходит до шоколада → HIT, мусор в ведро
 * 0.70–0.88  пол сияет, инструменты в победной позе
 * 0.88–1.00  «уровень пройден»
 *
 * Мусор стоит на ОДНОЙ линии пола. Швабра едет СЛЕВА НАПРАВО по этой линии.
 * Кусок гаснет в момент, когда «голова» швабры над ним.
 */

type TrashDef = {
  id: string;
  src: string;
  alt: string;
  /** позиция на полу, % от ширины сцены (0–100) */
  x: number;
  /** размер */
  size: string;
  /** progress когда швабра бьёт */
  hit: number;
  /** кто «добивает» визуально */
  tool: "mop" | "sponge" | "beater";
};

const TRASH: TrashDef[] = [
  {
    id: "banana",
    src: "/items/banana.png",
    alt: "Банановая шкурка",
    x: 28,
    size: "w-[4.5rem] md:w-24",
    hit: 0.3,
    tool: "mop",
  },
  {
    id: "candy",
    src: "/items/candy.png",
    alt: "Фантик",
    x: 44,
    size: "w-14 md:w-[4.5rem]",
    hit: 0.44,
    tool: "sponge",
  },
  {
    id: "dust",
    src: "/items/dust.png",
    alt: "Пыль и крошки",
    x: 60,
    size: "w-16 md:w-[5.5rem]",
    hit: 0.58,
    tool: "beater",
  },
  {
    id: "chocolate",
    src: "/items/chocolate.png",
    alt: "Шоколад",
    x: 76,
    size: "w-14 md:w-[4.5rem]",
    hit: 0.72,
    tool: "mop",
  },
];

/** окно исчезновения вокруг hit */
function hitWindow(hit: number, before = 0.04, after = 0.1) {
  return [Math.max(0, hit - before), Math.min(1, hit + after)] as const;
}

function TrashOnFloor({
  item,
  progress,
}: {
  item: TrashDef;
  progress: MotionValue<number>;
}) {
  const [a, b] = hitWindow(item.hit);
  // clamp-цепочки: до удара = 1, после = 0 навсегда (не воскресает)
  const opacity = useTransform(progress, [0, a, b, 1], [1, 1, 0, 0]);
  const scale = useTransform(progress, [0, a, a + 0.025, b, 1], [1, 1, 1.2, 0.15, 0.15]);
  const y = useTransform(progress, [0, a, b, 1], [0, 0, -42, -42]);
  const rotate = useTransform(
    progress,
    [0, a, b, 1],
    [0, 0, item.x > 50 ? 60 : -60, item.x > 50 ? 60 : -60]
  );
  const blur = useTransform(
    progress,
    [0, a, b, 1],
    ["blur(0px)", "blur(0px)", "blur(8px)", "blur(8px)"]
  );

  // дрожь прямо перед ударом
  const shakeX = useTransform(
    progress,
    [0, a - 0.05, a - 0.025, a, a + 0.02, 1],
    [0, 0, -4, 4, 0, 0]
  );

  return (
    <motion.div
      className="absolute bottom-[18%] z-[6] -translate-x-1/2 will-change-transform"
      style={{ left: `${item.x}%`, x: shakeX, opacity, scale, y, rotate, filter: blur }}
    >
      <img
        src={item.src}
        alt={item.alt}
        className={`${item.size} pixel-art select-none drop-shadow-[0_10px_18px_rgba(0,0,0,0.55)]`}
        draggable={false}
      />
    </motion.div>
  );
}

function HitSpark({
  x,
  hit,
  progress,
}: {
  x: number;
  hit: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(
    progress,
    [0, hit - 0.01, hit + 0.02, hit + 0.12, 1],
    [0, 0, 1, 0, 0]
  );
  const scale = useTransform(progress, [0, hit, hit + 0.1, 1], [0.3, 0.3, 1.9, 1.9]);

  return (
    <motion.div
      className="pointer-events-none absolute bottom-[22%] z-[12] h-16 w-16 -translate-x-1/2"
      style={{ left: `${x}%`, opacity, scale }}
      aria-hidden
    >
      <div className="absolute inset-0 rounded-full bg-[var(--clean)]/40 blur-md" />
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-white shadow-[0_0_12px_#3ee0b8]" />
      <div className="absolute left-[20%] top-[30%] h-1.5 w-1.5 rounded-sm bg-[var(--clean)]" />
      <div className="absolute right-[18%] top-[40%] h-1 w-1 rounded-sm bg-white" />
      <div className="absolute bottom-[28%] left-[40%] h-1 w-1 rounded-sm bg-[var(--dirt)]" />
    </motion.div>
  );
}

export default function CleaningTrashAdvanced() {
  const ref = useRef<HTMLElement>(null);
  const [debugP, setDebugP] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setDebugP(Math.round(v * 100));
  });

  // ——— ШВАБРА: едет по полу слева → направо, голова у линии мусора ———
  // left% сцены: старт за кадром, финиш справа
  const mopLeft = useTransform(scrollYProgress, [0.1, 0.82], ["2%", "88%"]);
  // лёгкий «шаг» вверх-вниз как будто трёт пол
  const mopBob = useTransform(
    scrollYProgress,
    [0.1, 0.25, 0.4, 0.55, 0.7, 0.82],
    [0, -14, 4, -12, 6, -8]
  );
  // наклон: замах → удар → замах
  const mopRotate = useTransform(
    scrollYProgress,
    [0.08, 0.18, 0.3, 0.44, 0.58, 0.72, 0.85],
    [-8, -28, 12, -22, 14, -18, 6]
  );
  // scale punch на каждом hit
  const mopScale = useTransform(
    scrollYProgress,
    [0.28, 0.3, 0.32, 0.42, 0.44, 0.46, 0.56, 0.58, 0.6, 0.7, 0.72, 0.74],
    [1, 1.12, 1, 1, 1.12, 1, 1, 1.12, 1, 1, 1.14, 1]
  );

  // чистый след за шваброй (wipe)
  const wipeWidth = useTransform(scrollYProgress, [0.12, 0.82], ["0%", "92%"]);
  const wipeOpacity = useTransform(scrollYProgress, [0.12, 0.2, 0.85, 0.95], [0, 0.9, 0.95, 0.5]);

  // ——— ГУБКА: выходит к фантику (x~44%), трёт, уходит в ведро ———
  const spongeLeft = useTransform(
    scrollYProgress,
    [0.2, 0.36, 0.44, 0.52, 0.7],
    ["78%", "52%", "44%", "44%", "22%"]
  );
  const spongeBottom = useTransform(
    scrollYProgress,
    [0.2, 0.36, 0.44, 0.55, 0.72],
    ["42%", "22%", "20%", "18%", "16%"]
  );
  const spongeRotate = useTransform(scrollYProgress, [0.36, 0.44, 0.5], [0, -25, 15]);
  const spongeOpacity = useTransform(scrollYProgress, [0.18, 0.28, 0.75, 0.88], [0, 1, 1, 0.85]);

  // ——— ВЫБИВАЛКА: бьёт по пыли (x~60%) ———
  const beaterLeft = useTransform(
    scrollYProgress,
    [0.35, 0.5, 0.58, 0.68, 0.85],
    ["90%", "68%", "60%", "60%", "82%"]
  );
  const beaterBottom = useTransform(
    scrollYProgress,
    [0.35, 0.5, 0.58, 0.7],
    ["38%", "24%", "20%", "28%"]
  );
  const beaterRotate = useTransform(
    scrollYProgress,
    [0.48, 0.55, 0.58, 0.62, 0.7],
    [-20, -50, 15, -35, -10]
  );
  const beaterOpacity = useTransform(scrollYProgress, [0.32, 0.42, 0.8, 0.92], [0, 1, 1, 0.7]);

  // ——— ВЕДРО: якорь слева, подпрыгивает когда мусор «падает» внутрь ———
  const bucketY = useTransform(
    scrollYProgress,
    [0.28, 0.32, 0.42, 0.46, 0.56, 0.6, 0.7, 0.74, 0.9],
    [0, -18, 0, -18, 0, -16, 0, -22, 0]
  );
  const bucketScale = useTransform(
    scrollYProgress,
    [0.3, 0.32, 0.44, 0.46, 0.58, 0.6, 0.72, 0.74],
    [1, 1.08, 1, 1.08, 1, 1.08, 1, 1.12]
  );
  // «наполнение» ведра
  const fillHeight = useTransform(scrollYProgress, [0.25, 0.75], ["8%", "78%"]);

  // грязный пол → чистый
  const dirtOpacity = useTransform(scrollYProgress, [0, 0.2, 0.75, 0.9], [0.55, 0.45, 0.08, 0]);
  const cleanGlow = useTransform(scrollYProgress, [0.55, 0.85], [0, 0.75]);
  const stageScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.96, 1, 1, 1.02]);

  const hintOpacity = useTransform(scrollYProgress, [0, 0.12, 0.55, 0.7], [1, 1, 0.5, 0]);
  const doneOpacity = useTransform(scrollYProgress, [0.78, 0.9], [0, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.08, 0.2], [0, 1, 0.7]);

  // общий sheet мусора — только в начале, как «фон хаоса»
  const sheetOpacity = useTransform(scrollYProgress, [0, 0.15, 0.35], [0.25, 0.15, 0]);

  return (
    <section
      id="clean-quest"
      ref={ref}
      className="relative h-[260vh] bg-[#07080c]"
      aria-label="Квест: швабра убирает мусор"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="relative flex h-full w-full flex-col items-center justify-center px-4">
          {/* ambient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#07080c] via-[#0e1018] to-[#07080c]" />
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: cleanGlow,
              background:
                "radial-gradient(ellipse 55% 42% at 50% 62%, rgba(62,224,184,0.22), transparent 68%)",
            }}
          />

          {/* title */}
          <motion.div
            style={{ opacity: titleOpacity }}
            className="absolute top-20 z-20 text-center md:top-24"
          >
            <p className="pixel-text text-[10px] text-[var(--clean)]">BOSS · FLOOR CHAOS</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-white md:text-3xl">
              Швабра идёт по мусору
            </h2>
          </motion.div>

          {/* === STAGE === */}
          <motion.div
            style={{ scale: stageScale }}
            className="relative z-10 h-[min(72vh,560px)] w-full max-w-4xl"
          >
            {/* floor plate */}
            <div className="absolute inset-x-0 bottom-0 h-[42%] overflow-hidden rounded-t-[2rem] border border-white/[0.06] bg-gradient-to-b from-[#141820] to-[#0a0c10]">
              {/* dirty overlay */}
              <motion.div
                className="absolute inset-0"
                style={{
                  opacity: dirtOpacity,
                  background:
                    "radial-gradient(ellipse at 30% 60%, rgba(120,70,30,0.35), transparent 50%), radial-gradient(ellipse at 70% 40%, rgba(80,50,30,0.3), transparent 45%), repeating-linear-gradient(90deg, transparent, transparent 12px, rgba(0,0,0,0.12) 12px, rgba(0,0,0,0.12) 13px)",
                }}
              />

              {/* clean wipe trail following mop */}
              <motion.div
                className="absolute bottom-0 left-0 top-0 bg-gradient-to-r from-[rgba(62,224,184,0.12)] via-[rgba(62,224,184,0.08)] to-transparent"
                style={{ width: wipeWidth, opacity: wipeOpacity }}
              />
              <motion.div
                className="absolute bottom-0 left-0 top-0 border-r-2 border-[var(--clean)]/40"
                style={{ width: wipeWidth, opacity: wipeOpacity }}
              />

              {/* floor grid (clean look) */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
            </div>

            {/* soft stage glow rim */}
            <div className="pointer-events-none absolute inset-x-[8%] bottom-[8%] h-24 rounded-full bg-[var(--clean)]/10 blur-3xl" />

            {/* background trash sheet — fades early */}
            <motion.img
              src="/items/trash-sheet.png"
              alt=""
              aria-hidden
              style={{ opacity: sheetOpacity }}
              className="pointer-events-none absolute left-1/2 top-[28%] w-[55%] max-w-sm -translate-x-1/2 pixel-art opacity-30"
              draggable={false}
            />

            {/* trash ON the floor line */}
            {TRASH.map((item) => (
              <TrashOnFloor key={item.id} item={item} progress={scrollYProgress} />
            ))}

            {/* hit sparks synced to hits */}
            {TRASH.map((item) => (
              <HitSpark
                key={`spark-${item.id}`}
                x={item.x}
                hit={item.hit}
                progress={scrollYProgress}
              />
            ))}

            {/* ——— BUCKET (home base left) ——— */}
            <motion.div
              className="absolute bottom-[12%] left-[6%] z-20 w-20 md:left-[8%] md:w-28"
              style={{ y: bucketY, scale: bucketScale }}
            >
              <div className="relative">
                {/* fill level inside bucket */}
                <div className="absolute bottom-[18%] left-1/2 h-[42%] w-[55%] -translate-x-1/2 overflow-hidden rounded-b-md">
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#5a3a1a] to-[#c4783a]"
                    style={{ height: fillHeight }}
                  />
                </div>
                <img
                  src="/items/bucket.png"
                  alt="Ведро"
                  className="relative z-10 w-full pixel-art drop-shadow-[0_0_22px_rgba(126,184,255,0.35)]"
                  draggable={false}
                />
              </div>
              <p className="mt-1 text-center font-mono text-[9px] text-zinc-500">loot bin</p>
            </motion.div>

            {/* ——— MOP (hero tool, sweeps floor L→R) ——— */}
            <motion.div
              className="absolute bottom-[14%] z-30 w-24 -translate-x-1/2 will-change-transform md:w-32"
              style={{
                left: mopLeft,
                y: mopBob,
                rotate: mopRotate,
                scale: mopScale,
              }}
            >
              {/* contact glow under mop head */}
              <motion.div
                className="absolute -bottom-1 left-1/2 h-4 w-16 -translate-x-1/2 rounded-full bg-[var(--clean)]/50 blur-md"
                style={{ opacity: wipeOpacity }}
              />
              <img
                src="/items/mop.jpg"
                alt="Швабра"
                className="w-full pixel-art drop-shadow-[0_0_28px_rgba(62,224,184,0.45)]"
                draggable={false}
              />
            </motion.div>

            {/* ——— SPONGE (assists on candy) ——— */}
            <motion.div
              className="absolute z-20 w-14 -translate-x-1/2 will-change-transform md:w-20"
              style={{
                left: spongeLeft,
                bottom: spongeBottom,
                rotate: spongeRotate,
                opacity: spongeOpacity,
              }}
            >
              <img
                src="/items/sponge.png"
                alt="Губка"
                className="w-full pixel-art drop-shadow-[0_0_18px_rgba(255,138,76,0.4)]"
                draggable={false}
              />
            </motion.div>

            {/* ——— BEATER (assists on dust) ——— */}
            <motion.div
              className="absolute z-20 w-20 -translate-x-1/2 origin-bottom will-change-transform md:w-28"
              style={{
                left: beaterLeft,
                bottom: beaterBottom,
                rotate: beaterRotate,
                opacity: beaterOpacity,
              }}
            >
              <img
                src="/items/beater.png"
                alt="Выбивалка"
                className="w-full pixel-art drop-shadow-[0_0_16px_rgba(126,240,208,0.35)]"
                draggable={false}
              />
            </motion.div>
          </motion.div>

          {/* UI chrome */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-10 z-30 flex flex-col items-center gap-2"
          >
            <p className="font-mono text-sm tracking-wide text-zinc-400">
              Скролль — швабра зачищает пол
            </p>
            <div className="h-1.5 w-48 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full origin-left rounded-full bg-gradient-to-r from-[var(--clean)] to-[#7ef0d0]"
                style={{ scaleX: scrollYProgress }}
                data-testid="scroll-progress"
                data-progress={debugP}
              />
            </div>
            <p className="font-mono text-[10px] text-zinc-600">{debugP}% clean</p>
          </motion.div>

          <motion.div
            style={{ opacity: doneOpacity }}
            className="absolute bottom-16 z-30 text-center"
          >
            <p className="pixel-text text-[11px] text-[var(--clean)]">LEVEL CLEAR</p>
            <p className="mt-2 text-lg font-semibold text-white">Пол чистый. Квест пройден.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { CleaningTrashAdvanced };
