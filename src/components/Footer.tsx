export function Footer() {
  return (
    <footer className="pad border-t border-[var(--line)] py-10">
      <div className="mx-auto flex max-w-[var(--maxw)] flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm font-semibold">
          Tidy <span className="text-[var(--accent)]">Titans</span>
        </p>
        <p className="mono text-[0.65rem] text-[var(--ink-3)]">
          © {new Date().getFullYear()} · clean system showcase
        </p>
      </div>
    </footer>
  );
}
