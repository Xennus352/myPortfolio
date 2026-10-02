"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#060608]" />,
});

const STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "Three.js",
  "WebGL",
  "Framer Motion",
  "GSAP",
  "Tailwind",
];

const line = {
  hidden: { y: "110%", rotateX: 24 },
  show: (i: number) => ({
    y: "0%",
    rotateX: 0,
    transition: {
      duration: 0.9,
      delay: 0.35 + i * 0.14,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Hero() {
  const progress = useRef(0);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      {/* ambient gradient glows */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 top-1/4 h-[560px] w-[560px] rounded-full bg-violet-600/20 blur-[160px]"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.9, 0.6, 0.9] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-32 bottom-1/4 h-[480px] w-[480px] rounded-full bg-orange-500/15 blur-[150px]"
        />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#060608_85%)]" />
      </div>

      <HeroScene progress={progress} />

      {/* giant outline word behind */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="text-outline select-none font-display text-[26vw] font-bold leading-none opacity-30">
          CREATIVE
        </span>
      </div>

      {/* content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pb-36 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6 flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-300">
            Available for work
          </span>
        </motion.div>

        <h1 className="font-display leading-[0.92] tracking-tight text-white [perspective:800px]">
          {["SOE MOE", "KYAW"].map((word, i) => (
            <span key={word} className="block overflow-hidden pb-1">
              <motion.span
                custom={i}
                variants={line}
                initial="hidden"
                animate="show"
                className={`block text-[16vw] font-bold md:text-[clamp(4.5rem,11vh,9.5rem)] ${
                  i === 1 ? "text-gradient" : ""
                }`}
                style={{ transformOrigin: "bottom" }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg"
        >
          Creative developer crafting{" "}
          <span className="text-zinc-100">cinematic, interactive 3D web experiences</span>{" "}
          where design, code and motion collide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href="#work"
            className="group relative overflow-hidden rounded-full bg-white px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-black transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98]"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              View my work
            </span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-violet-600 to-orange-500 transition-transform duration-500 group-hover:translate-x-0" />
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/20 bg-white/5 px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.04] hover:bg-white/10 active:scale-[0.98]"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      {/* marquee strip */}
      <div className="absolute inset-x-0 bottom-20 z-10 marquee">
        <div className="marquee-track gap-10" style={{ ["--marquee-duration" as string]: "28s" }}>
          {[...STACK, ...STACK].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-10 font-mono text-xs uppercase tracking-[0.4em] text-zinc-600"
            >
              {item}
              <span className="text-orange-500/60">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-500">
            Scroll to explore
          </span>
          <div className="h-10 w-px overflow-hidden bg-white/10">
            <motion.div
              animate={{ y: [-40, 40] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="h-5 w-px bg-orange-400"
            />
          </div>
        </div>
      </motion.div>

      {/* bottom fade for smooth transition into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-b from-transparent to-[#060608]" />
    </section>
  );
}
