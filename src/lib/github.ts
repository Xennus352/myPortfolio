export type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  topics: string[];
};

export type Profile = {
  login: string;
  html_url: string;
  avatar_url: string;
  followers: number;
  public_repos: number;
};

const REVALIDATE = 300;
const HEADERS = { Accept: "application/vnd.github+json" } as const;

function byPushedDesc(a: string, b: string) {
  return b > a ? 1 : b < a ? -1 : 0;
}

export async function getRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(
      "https://api.github.com/users/Xennus352/repos?per_page=100&sort=pushed",
      { headers: HEADERS, next: { revalidate: REVALIDATE } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data
      .map((r) => ({
        id: r.id as number,
        name: r.name as string,
        html_url: r.html_url as string,
        description: (r.description as string | null) ?? null,
        language: (r.language as string | null) ?? null,
        stargazers_count: r.stargazers_count as number,
        fork: r.fork as boolean,
        archived: r.archived as boolean,
        pushed_at: (r.pushed_at as string) ?? "",
        topics: Array.isArray(r.topics) ? (r.topics as string[]) : [],
      }))
      .sort((a, b) => byPushedDesc(a.pushed_at, b.pushed_at));
  } catch {
    return [];
  }
}

export async function getProfile(): Promise<Profile | null> {
  try {
    const res = await fetch("https://api.github.com/users/Xennus352", {
      headers: HEADERS,
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    const d = await res.json();
    if (!d || typeof d !== "object") return null;
    return {
      login: d.login as string,
      html_url: d.html_url as string,
      avatar_url: d.avatar_url as string,
      followers: d.followers as number,
      public_repos: d.public_repos as number,
    };
  } catch {
    return null;
  }
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function formatDate(iso: string) {
  const y = Number(iso.slice(0, 4));
  const m = Number(iso.slice(5, 7));
  const d = Number(iso.slice(8, 10));
  if (!y || !m || !d) return "recently";
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  Java: "#b07219",
  Dart: "#00b4ab",
  PHP: "#4f5d95",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Go: "#00add8",
  Rust: "#dea584",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Swift: "#f05138",
  Kotlin: "#a97bff",
  Ruby: "#701516",
};

export function langColor(language: string | null) {
  if (!language) return "#62626e";
  return LANG_COLORS[language] ?? "#9a9aa8";
}