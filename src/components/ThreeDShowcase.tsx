"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import type { StudioSettings } from "./three/ShowcaseScene";

const ShowcaseScene = dynamic(() => import("@/components/three/ShowcaseScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#08080b]">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
        Loading 3D engine…
      </span>
    </div>
  ),
});

const COLORS = [
  { name: "Violet", value: "#8b5cf6" },
  { name: "Orange", value: "#fb923c" },
  { name: "Emerald", value: "#34d399" },
  { name: "Sky", value: "#38bdf8" },
  { name: "Rose", value: "#fb7185" },
];

export default function ThreeDShowcase() {
  const [ui, setUi] = useState<StudioSettings>({
    speed: 1,
    wireframe: false,
    particles: true,
    auto: true,
    color: "#8b5cf6",
  });

  const settings = useRef(ui);
  useEffect(() => {
    settings.current = ui;
  }, [ui]);

  const set = <K extends keyof StudioSettings>(key: K, value: StudioSettings[K]) => {
    setUi((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section id="studio" className="relative py-24 md:py-36">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-violet-700/10 blur-[160px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="03"
          kicker="3D Studio"
          title={
            <>
              Play with my <span className="text-gradient">playground</span>
            </>
          }
          description="This isn't a mockup. It's a live three.js scene running in your browser — drag to orbit, flip the toggles and watch it respond in real time."
        />

        <div className="glass relative overflow-hidden rounded-[2rem] p-4 md:p-6">
          {/* status bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-3 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400">
                studio.prototype — live preview
              </span>
            </div>
            <span className="hidden rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300 md:block">
              WebGL · 60 FPS
            </span>
          </div>

          <div className="relative mt-4 h-[460px] overflow-hidden rounded-3xl border border-white/10 bg-[#070709] md:h-[560px]">
            {/* corner labels */}
            <div className="pointer-events-none absolute left-5 top-5 z-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                Model
              </p>
              <p className="mt-1 font-display text-sm font-semibold text-white">Torus Knot ∞</p>
            </div>
            <div className="pointer-events-none absolute right-5 top-5 z-10 text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                Drag to orbit
              </p>
              <p className="mt-1 font-mono text-[10px] text-zinc-400">left mouse or touch</p>
            </div>

            <ShowcaseScene settings={settings} />

            {/* HUD controls */}
            <div className="absolute bottom-5 left-1/2 z-10 w-[calc(100%-2.5rem)] max-w-2xl -translate-x-1/2 rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur-xl">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Toggle
                    label="Auto"
                    on={ui.auto}
                    onClick={() => set("auto", !ui.auto)}
                  />
                  <Toggle
                    label="Wire"
                    on={ui.wireframe}
                    onClick={() => set("wireframe", !ui.wireframe)}
                  />
                  <Toggle
                    label="Particles"
                    on={ui.particles}
                    onClick={() => set("particles", !ui.particles)}
                  />
                </div>

                <label className="flex min-w-[180px] flex-1 items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                    Speed
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={3}
                    step={0.1}
                    defaultValue={ui.speed}
                    onChange={(e) => set("speed", Number(e.target.value))}
                    className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/15 accent-violet-500"
                  />
                  <span className="w-8 text-right font-mono text-xs text-zinc-300">
                    {ui.speed.toFixed(1)}×
                  </span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                    Accent
                  </span>
                  {COLORS.map((c) => (
                    <button
                      key={c.value}
                      aria-label={`Accent ${c.name}`}
                      title={c.name}
                      onClick={() => set("color", c.value)}
                      className={`h-5 w-5 rounded-full border transition-transform hover:scale-110 ${
                        ui.color === c.value
                          ? "border-white ring-2 ring-white/40"
                          : "border-white/20"
                      }`}
                      style={{ background: c.value }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Toggle({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-all ${
        on
          ? "border-violet-400/40 bg-violet-500/15 text-violet-200"
          : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
      }`}
    >
      <span
        className={`h-3 w-3 rounded-full border ${on ? "border-violet-300 bg-violet-400" : "border-white/30"}`}
      />
      {label}
    </button>
  );
}