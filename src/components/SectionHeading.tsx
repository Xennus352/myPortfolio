"use client";

import { motion } from "framer-motion";

type Props = {
  index: string;
  kicker: string;
  title: React.ReactNode;
  description?: string;
};

export default function SectionHeading({ index, kicker, title, description }: Props) {
  return (
    <div className="mx-auto mb-14 max-w-3xl px-6 text-center md:mb-20">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-zinc-500"
      >
        <span className="text-zinc-400">{index}</span> · {kicker}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="font-display text-4xl font-bold uppercase tracking-tight text-zinc-50 md:text-6xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-400"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}