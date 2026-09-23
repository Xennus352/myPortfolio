"use client";

import { motion } from "framer-motion";

type Brand = { name: string; tag: string };

const ROW_ONE: Brand[] = [
  { name: "React", tag: "⚛" },
  { name: "Next.js", tag: "▲" },
  { name: "TypeScript", tag: "TS" },
  { name: "Tailwind", tag: "~" },
  { name: "Node.js", tag: "⬢" },
  { name: "Three.js", tag: "3D" },
  { name: "Framer Motion", tag: "◌" },
  { name: "Vite", tag: "⚡" },
];

const ROW_TWO: Brand[] = [
  { name: "WebGL", tag: "GL" },
  { name: "Git", tag: "⌥" },
  { name: "Vercel", tag: "▲" },
  { name: "GraphQL", tag: "◈" },
  { name: "PostgreSQL", tag: "◇" },
  { name: "Figma", tag: "◆" },
  { name: "React Three Fiber", tag: "R3F" },
  { name: "Docker", tag: "✦" },
];

function LogoRow({ brands, reverse, label }: { brands: Brand[]; reverse?: boolean; label: string }) {
  const doubled = [...brands, ...brands];
  return (
    <div
      className="marquee"
      style={
        {
          "--marquee-duration": reverse ? "46s" : "40s",
          "--marquee-direction": reverse ? "reverse" : "normal",
        } as React.CSSProperties
      }
      aria-label={label}
    >
      <div className="marquee-track items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-4 pr-4">
            {doubled
              .slice(half * brands.length, half * brands.length + brands.length)
              .map((b, i) => (
                <div
                  key={`${b.name}-${half}-${i}`}
                  className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-7 py-4 transition-colors duration-300 hover:border-white/20"
                >
                  <span className="font-mono text-sm text-zinc-500">{b.tag}</span>
                  <span className="font-display text-lg font-semibold uppercase tracking-widest text-zinc-300 transition-colors duration-300 hover:text-white">
                    {b.name}
                  </span>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section id="stack" className="relative py-24 md:py-32">
      <div className="mx-auto mb-12 max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" />
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-zinc-400">
            Trusted tools · endless motion
          </p>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" />
        </motion.div>
      </div>

      <div className="flex flex-col gap-5">
        <LogoRow brands={ROW_ONE} label="Technologies row one" />
        <LogoRow brands={ROW_TWO} reverse label="Technologies row two" />
      </div>
    </section>
  );
}