"use client";

import { motion } from "framer-motion";

const links = [
  { href: "#problem", label: "Хаос" },
  { href: "#how", label: "Как работает" },
  { href: "#arsenal", label: "Арсенал" },
  { href: "#quest", label: "Квест" },
];

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-40 border-b border-white/5 bg-[var(--bg)]/70 backdrop-blur-xl"
    >
      <div className="section-pad mx-auto flex h-16 max-w-6xl items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--clean)]/15 ring-1 ring-[var(--clean)]/30 text-sm">
            🧹
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Tidy{" "}
            <span className="text-[var(--clean)] group-hover:text-glow transition">
              Titans
            </span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--fg-muted)]">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-[var(--fg)] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#cta"
          className="rounded-full bg-[var(--clean)] px-4 py-2 text-xs font-semibold text-[#06241c] transition hover:brightness-110 hover:shadow-[0_0_24px_var(--clean-glow)]"
        >
          Начать квест
        </a>
      </div>
    </motion.header>
  );
}
