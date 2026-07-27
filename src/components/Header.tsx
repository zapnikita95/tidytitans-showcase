"use client";

import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-40"
    >
      <div className="pad mx-auto flex h-[4.25rem] max-w-[var(--maxw)] items-center justify-between">
        <a href="#top" className="text-[0.95rem] font-semibold tracking-tight text-[var(--ink)]">
          Tidy <span className="text-[var(--accent)]">Titans</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {[
            ["#chaos", "Хаос"],
            ["#system", "Система"],
            ["#sweep", "Зачистка"],
            ["#cta", "Старт"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="mono text-[0.65rem] text-[var(--ink-2)] transition hover:text-[var(--ink)]"
            >
              {label}
            </a>
          ))}
        </nav>
        <a href="#cta" className="mono text-[0.65rem] text-[var(--accent)]">
          Начать →
        </a>
      </div>
    </motion.header>
  );
}
