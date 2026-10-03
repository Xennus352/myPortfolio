import SectionHeading from "./SectionHeading";

type Contribution = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const LEVEL_COLORS = [
  "rgba(255,255,255,0.06)",
  "#3b2d6e",
  "#6d28d9",
  "#8b5cf6",
  "#c4b5fd",
];

async function getContributions(): Promise<Contribution[] | null> {
  try {
    const res = await fetch(
      "https://github-contributions-api.jogruber.de/v4/Xennus352?y=last",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || !Array.isArray(data.contributions)) return null;
    return data.contributions as Contribution[];
  } catch {
    return null;
  }
}

export default async function GitHubHeatmap() {
  const contributions = await getContributions();
  const total = contributions?.reduce((sum, c) => sum + c.count, 0) ?? null;

  // group into weeks (columns) of 7 days
  const weeks: Contribution[][] = [];
  if (contributions) {
    for (let i = 0; i < contributions.length; i += 7) {
      weeks.push(contributions.slice(i, i + 7));
    }
  }

  const CELL = 13;
  const GAP = 4;
  const STEP = CELL + GAP;
  const width = weeks.length * STEP;
  const height = 7 * STEP;

  return (
    <section id="activity" className="relative py-24 md:py-36">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-violet-700/10 blur-[80px] md:blur-[160px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="04"
          kicker="GitHub Activity"
          title={
            <>
              A year of <span className="text-gradient">commits</span>
            </>
          }
          description="Live contribution graph pulled straight from GitHub — every square is a day I shipped something."
        />

        <div className="glass group block overflow-hidden rounded-3xl p-6 transition-colors hover:border-white/15 md:p-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="font-display text-3xl font-bold text-white md:text-4xl">
                {total !== null ? total.toLocaleString() : "—"}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                contributions · last 12 months
              </p>
            </div>
            <a
              href="https://github.com/Xennus352"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-violet-200"
            >
              @Xennus352 →
            </a>
          </div>

          {contributions ? (
            <div className="overflow-x-auto pb-2">
              <style>{`
                @keyframes hm-in {
                  from { opacity: 0; transform: scale(0.3); }
                  to { opacity: 1; transform: scale(1); }
                }
                .hm-cell {
                  transform-box: fill-box;
                  transform-origin: center;
                  animation: hm-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) backwards;
                  transition: transform 0.15s ease, opacity 0.15s ease;
                  cursor: pointer;
                }
                .hm-cell:hover {
                  transform: scale(1.45);
                  opacity: 0.85;
                  stroke: rgba(196, 181, 253, 0.8);
                  stroke-width: 1;
                }
              `}</style>
              <svg
                viewBox={`0 0 ${width} ${height}`}
                className="h-auto w-full min-w-[720px]"
                role="img"
                aria-label="GitHub contribution heatmap"
              >
                {weeks.map((week, w) =>
                  week.map((day, d) => (
                    <rect
                      key={day.date}
                      className="hm-cell"
                      style={{ animationDelay: `${(w * 7 + d) * 4}ms` }}
                      x={w * STEP}
                      y={d * STEP}
                      width={CELL}
                      height={CELL}
                      rx={3.5}
                      fill={LEVEL_COLORS[day.level] ?? LEVEL_COLORS[0]}
                    >
                      <title>{`${day.count} contributions on ${day.date}`}</title>
                    </rect>
                  ))
                )}
              </svg>
            </div>
          ) : (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://ghchart.rshah.org/8b5cf6/Xennus352"
                alt="Xennus352's GitHub contribution chart"
                className="mx-auto h-auto w-full min-w-[640px] max-w-4xl"
              />
            </>
          )}

          {/* legend */}
          <div className="mt-6 flex items-center justify-end gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
            <span className="mr-1">Less</span>
            {LEVEL_COLORS.map((c, i) => (
              <span
                key={i}
                className="h-2.5 w-2.5 rounded-[4px]"
                style={{ background: c }}
              />
            ))}
            <span className="ml-1">More</span>
          </div>
        </div>
      </div>
    </section>
  );
}
