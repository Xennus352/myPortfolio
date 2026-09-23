"use client";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/Xennus352",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.68.41.35.78 1.05.78 2.12v3.14c0 .3.2.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "https://t.me/kazue352",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M21.94 2.4 19 20.6c-.17 1.02-.84 1.27-1.7.79l-4.7-3.47-2.27 2.18c-.25.25-.46.46-.94.46l.34-4.78L18.1 5.6c.38-.34-.08-.53-.59-.19L6.2 12.67l-4.63-1.45c-1-.31-1.03-1.01.22-1.49L20.45 1c.83-.31 1.56.19 1.49 1.4Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden pt-10">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 py-8 md:flex-row">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500">
            © 2026 Soe Moe Kyaw — all rights reserved
          </p>

          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={s.label}
                className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:text-white"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-600">
            Handcrafted with React · Three.js · Framer Motion
          </p>
        </div>
      </div>

      {/* giant watermark name */}
      <div className="pointer-events-none relative select-none overflow-hidden" aria-hidden>
        <div className="text-outline whitespace-nowrap text-center font-display text-[18vw] font-bold leading-[0.8] opacity-40">
          SOE MOE KYAW
        </div>
      </div>
    </footer>
  );
}