"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const FOCUS = [
  "Full-Stack Development",
  "Artificial Intelligence",
  "Cloud Technologies",
  "RAG & Local AI",
  "Semantic Search",
  "Entrepreneurship",
];

const STACK = [
  "Next.js",
  "React",
  "Flutter",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "Git",
  "Python",
  "Rust",
  "Supabase",
  "Appwrite",
  "AI Tools",
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-36">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 top-1/4 h-[420px] w-[700px] rounded-full bg-orange-600/10 blur-[160px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="01"
          kicker="About"
          title={
            <>
              Builder <span className="text-gradient">by heart</span>
            </>
          }
          description="A quick introduction to who I am, what I care about, and what I'm chasing next."
        />

        <div className="grid gap-10 md:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="space-y-5 text-base leading-relaxed text-zinc-400 md:col-span-3 md:text-lg"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.5 }}
            >
              Hi, I&apos;m <span className="text-zinc-100">Soe Moe Kyaw</span> —
              a software developer from Myanmar building modern, practical,
              user-friendly digital experiences. I work across{" "}
              <span className="text-zinc-100">
                full-stack development, AI, cloud, and product design
              </span>{" "}
              with Next.js, React, Flutter, PostgreSQL, Docker, Python, and
              modern AI tools.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              I&apos;m especially into{" "}
              <span className="text-zinc-100">
                AI and intelligent systems
              </span>{" "}
              — RAG, local AI models, semantic search, and personal knowledge
              systems. I like experimenting, solving hard problems, and turning
              ambitious ideas into products people actually use.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="border-l-2 border-violet-400/50 pl-4 font-display text-xl font-bold text-white md:text-2xl"
            >
              I don&apos;t just want to use technology — I want to build with it.
            </motion.p>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6 md:col-span-2"
          >
            <div className="glass rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                Focus areas
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {FOCUS.map((f, i) => (
                  <motion.span
                    key={f}
                    initial={{ opacity: 0, scale: 0.8, y: 8 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="cursor-default rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] text-zinc-300"
                  >
                    {f}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="glass rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                Tools I reach for
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {STACK.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.8, y: 8 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="cursor-default rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1.5 font-mono text-[11px] text-violet-200"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
