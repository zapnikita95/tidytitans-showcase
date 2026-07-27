export function Footer() {
  return (
    <footer className="section-pad border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold">
            Tidy <span className="text-[var(--clean)]">Titans</span>
          </p>
          <p className="mt-1 text-xs text-[var(--fg-muted)]">
            Витрина · pixel quest cleaning · {new Date().getFullYear()}
          </p>
        </div>
        <p className="text-xs text-[var(--fg-muted)]">
          Стиль: тёмный премиум + игровой пиксель · для{" "}
          <a href="https://tidytitans.ru" className="text-[var(--clean)] hover:underline">
            tidytitans.ru
          </a>
        </p>
      </div>
    </footer>
  );
}
