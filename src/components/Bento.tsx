"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";

type Card = {
  title: string;
  desc: string;
  icon: React.ReactNode;
  accent: string;
  visual?: "orb" | "bars" | "griddots" | "orbit" | "lines" | "terminal";
  stat?: string;
  statLabel?: string;
};

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

const CARDS: Card[] = [
  {
    title: "Creative Development",
    desc: "Full-stack product builds where every pixel, interaction and frame is pushed to feel cinematic and intentional.",
    icon: icon("M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z"),
    accent: "from-violet-500/30 to-orange-500/20",
    visual: "orb",
    stat: "4+",
    statLabel: "years crafting",
  },
  {
    title: "Frontend",
    desc: "React, Next.js, Tailwind — obsessively fast, responsive and accessible interfaces.",
    icon: icon("M8 9l-3 3 3 3M16 9l3 3-3 3M14 5l-4 14"),
    accent: "from-sky-500/30 to-violet-500/20",
    visual: "lines",
  },
  {
    title: "3D & WebGL",
    desc: "three.js scenes, GLB models and scroll-scrubbed worlds in the browser.",
    icon: icon("M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2c3 4 3 14 0 20M12 2c-3 4-3 14 0 20"),
    accent: "from-orange-500/30 to-red-500/20",
    visual: "orbit",
  },
  {
    title: "AI Workflows",
    desc: "Designing with Gemini, shipping AI-assisted pipelines and automating the boring parts.",
    icon: icon("M12 3a4 4 0 00-4 4v.5A5 5 0 003 12a5 5 0 005 5h8a5 5 0 005-5 5 5 0 00-5-4.5V7a4 4 0 00-4-4zM12 3v18"),
    accent: "from-fuchsia-500/30 to-violet-500/20",
    visual: "terminal",
  },
  {
    title: "Motion & Interaction",
    desc: "Scroll-driven cinema with Framer Motion, frame-by-frame scrubbing and micro-interactions.",
    icon: icon("M4 14l6-6 4 4 6-7M4 14l6 6 4-4 6 7"),
    accent: "from-emerald-500/30 to-sky-500/20",
    visual: "bars",
  },
  {
    title: "Backend & APIs",
    desc: "Node, PostgreSQL, GraphQL — durable, typed services behind the pretty front.",
    icon: icon("M4 5h16v14H4zM4 9h16M8 13h4M8 17h8"),
    accent: "from-indigo-500/30 to-emerald-500/20",
    visual: "griddots",
  },
];

function Visual({ kind, accent }: { kind: NonNullable<Card["visual"]>; accent: string }) {
  if (kind === "orb") {
    return (
      <div className="relative">
        <div className={`h-24 w-24 rounded-full bg-gradient-to-br ${accent} blur-2xl`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full border border-white/20 bg-gradient-to-br from-white/25 to-white/5" />
        </div>
      </div>
    );
  }
  if (kind === "bars") {
    return (
      <div className="flex h-16 items-end gap-1.5">
        {[30, 55, 40, 75, 50, 90, 62, 45, 80].map((h, i) => (
          <span
            key={i}
            style={{ height: `${h}%` }}
            className={`w-2.5 rounded-sm bg-gradient-to-t ${accent} opacity-80`}
          />
        ))}
      </div>
    );
  }
  if (kind === "griddots") {
    return (
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className={`h-2.5 w-2.5 rounded-full bg-gradient-to-br ${accent} opacity-70`} />
        ))}
      </div>
    );
  }
  if (kind === "orbit") {
    return (
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 animate-spin rounded-full border border-dashed border-orange-400/50 [animation-duration:9s]" />
        <div className="absolute inset-3 animate-spin rounded-full border border-violet-400/50 [animation-direction:reverse] [animation-duration:6s]" />
        <div className="absolute inset-0 m-auto h-2.5 w-2.5 rounded-full bg-orange-400" />
      </div>
    );
  }
  if (kind === "lines") {
    return (
      <div className="flex w-full flex-col gap-2">
        {[100, 80, 92, 62].map((w, i) => (
          <span key={i} className={`h-1.5 rounded-full bg-gradient-to-r ${accent}`} style={{ width: `${w}%` }} />
        ))}
      </div>
    );
  }
  return (
    <div className="w-full rounded-xl border border-white/10 bg-black/50 p-3 font-mono text-[11px] leading-relaxed text-emerald-300/90">
      <p className="text-zinc-500">$ build --with-ai</p>
      <p>&gt; analyzing vision… done</p>
      <p>&gt; shipping experience… done</p>
      <p className="animate-pulse text-white">&gt; awaiting next brief_</p>
    </div>
  );
}

export default function Bento() {
  const bigRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (!bigRef.current) return;
    const rect = bigRef.current.getBoundingClientRect();
    bigRef.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    bigRef.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const [big, ...rest] = CARDS;

  return (
    <section id="craft" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="02"
          kicker="Craft"
          title={
            <>
              Skills & <span className="text-gradient">abilities</span>
            </>
          }
          description="A bento of the disciplines I mix every day to turn bold ideas into interactive, production-ready experiences."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
          {/* big hero card */}
          <motion.div
            ref={bigRef}
            onMouseMove={onMove}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="group relative overflow-hidden rounded-3xl card-surface p-8 md:col-span-4 md:row-span-2 md:p-10"
            style={{ ["--mx" as string]: "50%", ["--my" as string]: "50%" }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(420px circle at var(--mx) var(--my), rgba(139,92,246,0.18), transparent 65%)",
              }}
            />
            <div className="relative flex flex-col gap-10 md:h-full md:justify-between">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="flex size-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-violet-300">
                  {big.icon}
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                  Core
                </span>
              </div>

              <div>
                <h3 className="font-display text-3xl font-bold uppercase leading-tight text-white md:text-5xl">
                  {big.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400 md:text-base">
                  {big.desc}
                </p>
              </div>

              <div className="flex items-end justify-between gap-6">
                <div>
                  <p className="font-display text-5xl font-bold text-gradient md:text-6xl">{big.stat}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500">
                    {big.statLabel}
                  </p>
                </div>
                <div className="animate-float-slow hidden md:block">
                  <Visual kind={big.visual!} accent={big.accent} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* remaining cards */}
          {rest.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-3xl card-surface p-6 hover:border-white/20 md:col-span-2"
            >
              <div className="flex items-start justify-between">
                <div className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-orange-300 transition-transform duration-300 group-hover:scale-110">
                  {c.icon}
                </div>
                <span className="font-mono text-[10px] text-zinc-600">0{i + 2}</span>
              </div>
              <h3 className="mb-2 mt-6 font-display text-lg font-bold uppercase tracking-wide text-white">
                {c.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">{c.desc}</p>
              <div className="mt-6">
                <Visual kind={c.visual!} accent={c.accent} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}