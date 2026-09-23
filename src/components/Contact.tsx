"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import SectionHeading from "./SectionHeading";

const METHODS = ["Telegram", "Gmail", "Phone", "Other"] as const;

const CHANNELS = [
  {
    label: "Telegram",
    value: "@kazue352",
    href: "https://t.me/kazue352",
    hint: "Fastest reply",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M21.94 2.4 19 20.6c-.17 1.02-.84 1.27-1.7.79l-4.7-3.47-2.27 2.18c-.25.25-.46.46-.94.46l.34-4.78L18.1 5.6c.38-.34-.08-.53-.59-.19L6.2 12.67l-4.63-1.45c-1-.31-1.03-1.01.22-1.49L20.45 1c.83-.31 1.56.19 1.49 1.4Z" />
      </svg>
    ),
  },
  {
    label: "Gmail",
    value: "xennus.dev@gmail.com",
    href: "mailto:xennus.dev@gmail.com",
    hint: "Open mail app",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M22 7.1v9.9c0 1.66-1.34 3-3 3H5c-1.66 0-3-1.34-3-3V7.1c.16.2.35.38.56.55l8.02 6.7c.84.7 2 .7 2.84 0l8.02-6.7c.21-.17.4-.35.56-.55ZM24 5.6c0-.23-.03-.46-.1-.68-.33-1.37-1.72-2.21-2.58-1.66l-9.12 7.62c-.12.1-.3.1-.42 0L2.6 3.26C1.86 2.7.39 3.42.09 4.86c-.06.22-.09.45-.09.67v.34l10.82 8.28c.72.56 1.73.56 2.45 0L24 5.94v-.34Z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/Xennus352",
    href: "https://github.com/Xennus352",
    hint: "See my projects",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.68.41.35.78 1.05.78 2.12v3.14c0 .3.2.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    ),
  },
];

type Status = "idle" | "sending" | "ok" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [method, setMethod] = useState<string>("Telegram");
  const [handle, setHandle] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const placeholders: Record<string, string> = {
    Telegram: "@your_username",
    Gmail: "you@gmail.com",
    Phone: "+959 123 456 789",
    Other: "skype / discord / website…",
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending" || status === "ok") return;
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, method, handle, role, message }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("ok");
      setName(""); setHandle(""); setRole(""); setMessage("");
      setTimeout(() => setStatus("idle"), 6000);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-36">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-1/4 h-[420px] w-[420px] rounded-full bg-orange-500/10 blur-[140px]" />
        <div className="absolute -left-20 bottom-0 h-[480px] w-[480px] rounded-full bg-violet-700/10 blur-[150px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="04"
          kicker="Contact"
          title={
            <>
              Let&apos;s talk
            </>
          }
          description="Have a project, a role or just an idea? Send it through — it lands straight in my Telegram."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          {/* channels */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex h-full flex-col gap-4 rounded-[2rem] card-surface p-8">
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-orange-400">
                Direct channels
              </p>
              <h3 className="font-display text-2xl font-bold uppercase leading-tight text-white md:text-3xl">
                Pick whichever is
                <br />
                easiest for you.
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                Every message from the form is forwarded to my Telegram instantly, but you can
                also reach me directly below.
              </p>

              <div className="mt-4 flex flex-col gap-3">
                {CHANNELS.map((c, i) => (
                  <motion.a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer noopener"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:border-violet-400/40 hover:bg-violet-500/10"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-orange-300 transition-colors group-hover:text-white">
                      {c.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-sm font-semibold uppercase tracking-wide text-white">
                        {c.label}
                      </span>
                      <span className="block truncate font-mono text-xs text-zinc-400">
                        {c.value}
                      </span>
                    </span>
                    <span className="ml-auto hidden shrink-0 rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-zinc-500 transition-colors group-hover:border-violet-400/40 group-hover:text-violet-200 sm:block">
                      {c.hint}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form
              onSubmit={submit}
              className="glass flex h-full flex-col gap-5 rounded-[2rem] p-6 md:p-8"
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-zinc-400">
                  Contact form
                </p>
                <span className={`flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${
                  status === "ok"
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                    : "border-white/10 bg-white/5 text-zinc-500"
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${status === "ok" ? "bg-emerald-400" : "bg-orange-400"}`} />
                  {status === "ok" ? "Delivered" : "Secure bot relay"}
                </span>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your name / company *">
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John from Acme Inc"
                    className="input"
                  />
                </Field>

                <Field label="Preferred contact *">
                  <div className="grid grid-cols-4 gap-1.5">
                    {METHODS.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMethod(m)}
                        className={`rounded-xl border px-2 py-2.5 font-mono text-[11px] uppercase tracking-wide transition-all ${
                          method === m
                            ? "border-violet-400/50 bg-violet-500/15 text-violet-200"
                            : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>

              <Field label={`Your ${method.toLowerCase()} handle *`}>
                <input
                  required
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder={placeholders[method]}
                  className="input"
                />
              </Field>

              <Field label="Role / job requirements">
                <input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Frontend Engineer — full time — remote"
                  className="input"
                />
              </Field>

              <Field label="Your message *">
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about the project, the role, the timeline — whatever you're dreaming up…"
                  rows={5}
                  className="input min-h-[140px] resize-y"
                />
              </Field>

              {status === "error" && (
                <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending" || status === "ok"}
                className="group relative mt-1 flex items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 font-mono text-xs uppercase tracking-[0.25em] text-black transition-all duration-300 hover:scale-[1.02] disabled:pointer-events-none disabled:opacity-80"
              >
                <span className="relative z-10">
                  {status === "sending"
                    ? "Sending…"
                    : status === "ok"
                      ? "Message delivered ✓"
                      : "Send via Telegram"}
                </span>
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="relative z-10 h-4 w-4"
                >
                  <path d="M21.94 2.4 19 20.6c-.17 1.02-.84 1.27-1.7.79l-4.7-3.47-2.27 2.18c-.25.25-.46.46-.94.46l.34-4.78L18.1 5.6c.38-.34-.08-.53-.59-.19L6.2 12.67l-4.63-1.45c-1-.31-1.03-1.01.22-1.49L20.45 1c.83-.31 1.56.19 1.49 1.4Z" />
                </svg>
              </button>

              <p className="text-center font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">
                Replies go straight to my Telegram · @kazue352
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex w-full flex-col gap-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400">
        {label}
      </span>
      {children}
    </label>
  );
}