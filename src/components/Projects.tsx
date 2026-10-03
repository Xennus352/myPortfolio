"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import SectionHeading from "./SectionHeading";
import { formatDate, langColor, type Profile, type Repo } from "@/lib/github";

type Props = {
  repos: Repo[];
  profile: Profile | null;
};

type Sort = "recent" | "stars";

function byStarsDesc(a: Repo, b: Repo) {
  return (
    b.stargazers_count - a.stargazers_count ||
    (b.pushed_at > a.pushed_at ? 1 : -1)
  );
}

function repoFiles(language: string | null) {
  switch (language) {
    case "TypeScript":
    case "JavaScript":
      return ["src/", "lib/", "package.json", "README.md"];
    case "Python":
      return ["app.py", "src/", "requirements.txt", "README.md"];
    case "Java":
      return ["src/main/java/", "pom.xml", "README.md"];
    case "Dart":
      return ["lib/", "pubspec.yaml", "README.md"];
    case "PHP":
      return ["public/", "index.php", "composer.json", "README.md"];
    default:
      return ["src/", "docs/", "README.md"];
  }
}

function RepoTree({ repo }: { repo: Repo }) {
  const files = repoFiles(repo.language);
  return (
    <div className="hidden w-[240px] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/40 lg:block">
      <div className="flex items-center gap-1.5 border-b border-white/5 px-3.5 py-2.5">
        <span className="h-2 w-2 rounded-full bg-orange-400/80" />
        <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
        <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500">
          repo files
        </span>
      </div>
      <div className="flex flex-col px-4 py-3 font-mono text-[11px] leading-relaxed">
        <span className="text-zinc-400">
          {repo.name}/
        </span>
        {files.map((f, i) => {
          const last = i === files.length - 1;
          const folder = f.endsWith("/");
          return (
            <span key={f} className={folder ? "text-violet-300/80" : "text-emerald-300/70"}>
              {last ? "  └─ " : "  ├─ "}
              {f}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function Projects({ repos, profile }: Props) {
  const [lang, setLang] = useState<string>("All");
  const [sort, setSort] = useState<Sort>("recent");
  const [archiveOpen, setArchiveOpen] = useState(false);

  const languages = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of repos) {
      if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
      .map(([name, count]) => ({ name, count }));
  }, [repos]);

  const visible = useMemo(() => {
    const filtered = lang === "All" ? repos : repos.filter((r) => r.language === lang);
    return sort === "stars" ? [...filtered].sort(byStarsDesc) : filtered;
  }, [repos, lang, sort]);

  const totalStars = useMemo(
    () => repos.reduce((sum, r) => sum + r.stargazers_count, 0),
    [repos]
  );

  const featured = visible.slice(0, 3);
  const archive = visible.slice(3);
  const [hero, ...runners] = featured;
  const filtersKey = `${lang}-${sort}`;

  const stats = useMemo(() => {
    const lastPushed = repos[0]?.pushed_at ?? "";
    return {
      repos: repos.length,
      stars: totalStars,
      topLang: languages[0]?.name ?? "—",
      pushed: lastPushed ? formatDate(lastPushed) : "—",
    };
  }, [repos, totalStars, languages]);

  const name = profile?.login ?? "Xennus352";
  const url = profile?.html_url ?? "https://github.com/Xennus352";

  return (
    <section id="work" className="relative py-24 md:py-36">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-[460px] w-[700px] -translate-x-1/2 rounded-full bg-violet-700/10 blur-[80px] md:blur-[160px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="03"
          kicker="Work"
          title={
            <>
              Built in the <span className="text-gradient">open</span>
            </>
          }
          description="Every repo is pulled live from GitHub — fresh pushes take the spotlight, the rest live in the archive. Add or delete a repo there and this page follows."
        />

        {/* stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] md:grid-cols-4"
        >
          {[
            { label: "Public repos", value: stats.repos },
            { label: "Stars earned", value: stats.stars },
            { label: "Top language", value: stats.topLang },
            { label: "Last push", value: stats.pushed },
          ].map((s) => (
            <div key={s.label} className="bg-[#0a0a0e] p-5 text-center">
              <p className="font-display text-2xl font-bold text-white md:text-3xl">
                {s.value}
              </p>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* profile chip */}
        <motion.a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="group mx-auto mb-12 flex w-fit items-center gap-4 rounded-full border border-white/10 bg-white/[0.04] p-2 pr-6 backdrop-blur-sm md:backdrop-blur-md transition-colors duration-300 hover:border-violet-400/40 hover:bg-violet-500/10"
        >
          {profile && (
            <Image
              src={profile.avatar_url}
              alt={`${profile.login} avatar`}
              width={44}
              height={44}
              className="rounded-full ring-1 ring-white/15"
            />
          )}
          <span className="flex flex-col">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-white">
              {name}
            </span>
            <span className="font-mono text-[11px] text-zinc-500">
              {repos.length} repos · {totalStars} stars
              {profile ? ` · ${profile.followers} followers` : ""}
            </span>
          </span>
          <span className="ml-1 font-mono text-sm text-zinc-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white">
            →
          </span>
        </motion.a>

        {repos.length === 0 ? (
          <div className="rounded-3xl card-surface p-12 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
              GitHub is unreachable right now
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
              The live list couldn&apos;t be fetched. It&apos;ll be back on the
              next refresh — meanwhile the whole archive is on the profile.
            </p>
            <a
              href={url}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white transition-colors hover:border-white/30"
            >
              Open GitHub profile →
            </a>
          </div>
        ) : (
          <>
            {/* controls */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center"
            >
              <div
                className="flex flex-wrap items-center gap-2"
                role="group"
                aria-label="Filter projects by language"
              >
                <FilterChip
                  label="All"
                  active={lang === "All"}
                  count={repos.length}
                  onClick={() => setLang("All")}
                />
                {languages.map((l) => (
                  <FilterChip
                    key={l.name}
                    label={l.name}
                    active={lang === l.name}
                    count={l.count}
                    onClick={() => setLang(l.name)}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1 self-start rounded-full border border-white/10 bg-white/[0.04] p-1">
                {(["recent", "stars"] as const).map((s) => (
                  <button
                    key={s}
                    aria-pressed={sort === s}
                    onClick={() => setSort(s)}
                    className={`rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-all ${
                      sort === s
                        ? "bg-white text-black"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {s === "recent" ? "Recent" : "Top stars"}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* featured + archive cross-fade on filter change */}
            <motion.div key={filtersKey} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
              {visible.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
                    Nothing matches this filter
                  </p>
                  <button
                    onClick={() => {
                      setLang("All");
                      setSort("recent");
                    }}
                    className="mt-5 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:border-violet-400/40 hover:text-violet-100"
                  >
                    Clear filter
                  </button>
                </div>
              ) : (
                <>
                  {/* featured */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <motion.a
                      key={hero.id}
                      href={hero.html_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl card-surface p-7 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-white/25 md:col-span-2 lg:col-span-2 md:p-9"
                    >
                      <span
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background:
                            "radial-gradient(460px circle at 25% 0%, rgba(139,92,246,0.16), transparent 70%)",
                        }}
                      />
                      <div className="relative flex items-start justify-between gap-4">
                        <span className="rounded-full border border-violet-400/40 bg-violet-500/15 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-violet-200">
                          {sort === "stars" ? "Top starred" : "Latest push"}
                        </span>
                        <span className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-3.5 w-3.5 text-zinc-500"
                            aria-hidden
                          >
                            <path d="M12 2.5l2.45 5.1 5.55.66-4.1 3.88 1.05 5.5L12 14.77l-4.95 2.87 1.05-5.5-4.1-3.88 5.55-.66L12 2.5z" />
                          </svg>
                          {hero.stargazers_count}
                        </span>
                      </div>

                      <div className="relative mt-10">
                        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                          #{String(1).padStart(2, "0")} — featured
                        </p>
                        <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
                          {hero.name}
                        </h3>
                        <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400 md:text-base">
                          {hero.description ?? (
                            <span className="italic text-zinc-500">
                              Public{" "}
                              {hero.language?.toLowerCase() ?? "source"}{" "}
                              repository — open it on GitHub to explore.
                            </span>
                          )}
                        </p>
                      </div>

                      <div className="relative mt-10 flex items-end justify-between gap-6">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-[11px] text-zinc-300">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ background: langColor(hero.language) }}
                            />
                            {hero.language ?? "—"}
                          </span>
                          <span className="hidden font-mono text-[11px] text-zinc-600 sm:block">
                            {formatDate(hero.pushed_at)}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                          Open repo
                          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                            →
                          </span>
                        </span>
                      </div>

                      <div className="relative mt-8 hidden justify-end lg:flex">
                        <RepoTree repo={hero} />
                      </div>
                    </motion.a>

                    {runners.map((r, i) => (
                      <motion.a
                        key={r.id}
                        href={r.html_url}
                        target="_blank"
                        rel="noreferrer noopener"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.08 + i * 0.06,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="group relative flex flex-col overflow-hidden rounded-3xl card-surface p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-white/25 md:col-span-1"
                      >
                        <div className="flex items-start justify-between">
                          <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-600">
                            #{String(i + 2).padStart(2, "0")}
                          </span>
                          <span className="flex items-center gap-1 font-mono text-[11px] text-zinc-500">
                            {r.stargazers_count}
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden>
                              <path d="M12 2.5l2.45 5.1 5.55.66-4.1 3.88 1.05 5.5L12 14.77l-4.95 2.87 1.05-5.5-4.1-3.88 5.55-.66L12 2.5z" />
                            </svg>
                          </span>
                        </div>
                        <h3 className="mt-5 font-display text-xl font-bold text-zinc-100 transition-colors duration-300 group-hover:text-white">
                          {r.name}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                          {r.description ??
                            `Public ${r.language?.toLowerCase() ?? "source"} repo — explored on GitHub.`}
                        </p>
                        <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                          <span className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ background: langColor(r.language) }}
                            />
                            {r.language ?? "—"}
                          </span>
                          <span className="font-mono text-[11px] text-zinc-600">
                            {formatDate(r.pushed_at)}
                          </span>
                        </div>
                      </motion.a>
                    ))}
                  </div>

                  {/* archive ledger */}
                  {archive.length > 0 && (
                    <div className="mt-12">
                      <div className="mb-2 flex items-center justify-between px-1">
                        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-zinc-500">
                          The archive
                        </p>
                        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-600">
                          {archive.length} more
                        </p>
                      </div>

                      <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]">
                        {archive.slice(0, 5).map((r, i) => (
                          <ArchiveRow key={r.id} r={r} i={i} featuredLength={featured.length} />
                        ))}
                        <AnimatePresence initial={false}>
                          {archiveOpen &&
                            archive.slice(5).map((r, i) => (
                              <motion.div
                                key={r.id}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, delay: archiveOpen ? i * 0.03 : 0 }}
                                className="overflow-hidden"
                              >
                                <ArchiveRow r={r} i={i + 5} featuredLength={featured.length} />
                              </motion.div>
                            ))}
                        </AnimatePresence>
                      </div>

                      {archive.length > 5 && (
                        <button
                          onClick={() => setArchiveOpen((v) => !v)}
                          className="group mx-auto mt-6 flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400 transition-all duration-300 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white"
                        >
                          {archiveOpen ? "Fold archive" : `See more · ${archive.length - 5}`}
                          <motion.span
                            animate={{ rotate: archiveOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            ↓
                          </motion.span>
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </motion.div>

            {/* footer CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="mt-14 text-center"
            >
              <a
                href={url}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-zinc-200 transition-all duration-300 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white"
              >
                Browse the commit history
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}

function ArchiveRow({
  r,
  i,
  featuredLength,
}: {
  r: Repo;
  i: number;
  featuredLength: number;
}) {
  return (
    <a
      href={r.html_url}
      target="_blank"
      rel="noreferrer noopener"
      className="group relative flex items-center gap-x-4 border-b border-white/5 px-3 py-3.5 transition-colors duration-200 last:border-b-0 hover:bg-white/[0.03] sm:px-5"
    >
      <span className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-violet-400 to-orange-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <span className="w-8 shrink-0 font-mono text-[11px] tracking-[0.2em] text-zinc-600">
        {String(i + featuredLength + 1).padStart(2, "0")}
      </span>
      <span className="min-w-0 flex-none font-display text-sm font-bold text-zinc-200 transition-colors duration-200 group-hover:text-violet-200 sm:text-base">
        {r.name}
      </span>
      <span className="hidden min-w-0 flex-1 truncate text-sm text-zinc-500 md:block">
        {r.description ||
          `Public ${r.language?.toLowerCase() ?? "source"} repository`}
      </span>
      <span className="ml-auto hidden shrink-0 items-center gap-2 font-mono text-[11px] text-zinc-400 sm:flex sm:min-w-[110px]">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: langColor(r.language) }}
        />
        {r.language ?? "—"}
      </span>
      <span className="flex shrink-0 items-center gap-1 font-mono text-[11px] text-zinc-500">
        {r.stargazers_count}
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden>
          <path d="M12 2.5l2.45 5.1 5.55.66-4.1 3.88 1.05 5.5L12 14.77l-4.95 2.87 1.05-5.5-4.1-3.88 5.55-.66L12 2.5z" />
        </svg>
      </span>
      <span className="hidden shrink-0 font-mono text-[11px] text-zinc-600 md:block">
        {formatDate(r.pushed_at)}
      </span>
      <span className="shrink-0 text-zinc-600 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-white">
        ↗
      </span>
    </a>
  );
}

function FilterChip({
  label,
  active,
  count,
  onClick,
}: {
  label: string;
  active: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-all ${
        active
          ? "border-violet-400/50 bg-violet-500/15 text-violet-100"
          : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25 hover:text-white"
      }`}
    >
      {label}
      <span className={`ml-1.5 ${active ? "text-violet-300/70" : "text-zinc-600"}`}>
        {count}
      </span>
    </button>
  );
}