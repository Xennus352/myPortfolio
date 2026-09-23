"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#060608]" />,
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = v;
  });

  return (
    <section id="top" ref={sectionRef} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ambient gradient glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-1/4 h-[560px] w-[560px] rounded-full bg-violet-600/20 blur-[160px]" />
          <div className="absolute -right-32 bottom-1/4 h-[480px] w-[480px] rounded-full bg-orange-500/15 blur-[150px]" />
          <div className="absolute inset-0 grid-bg opacity-40" />
        </div>

        <HeroScene progress={progress} />

        {/* content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pb-28 text-center md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
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

          <h1 className="font-display leading-[0.92] tracking-tight text-white">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="block text-[16vw] font-bold md:text-[clamp(4.5rem,11vh,9.5rem)]"
            >
              SOE MOE
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-gradient block text-[16vw] font-bold md:text-[clamp(4.5rem,11vh,9.5rem)]"
            >
              KYAW
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg"
          >
            Creative developer crafting{" "}
            <span className="text-zinc-100">cinematic, interactive 3D web
              experiences</span>{" "}
            where design, code and motion collide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#work"
              className="group relative overflow-hidden rounded-full bg-white px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-black"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                View my work
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-violet-600 to-orange-500 transition-transform duration-500 group-hover:translate-x-0" />
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/20 bg-white/5 px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-white backdrop-blur-md transition-colors hover:bg-white/10"
            >
              Get in touch
            </a>
          </motion.div>
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
      </div>
    </section>
  );
}