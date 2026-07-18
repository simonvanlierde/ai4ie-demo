export type Filter = { ie: string[]; ml: string[]; type: string[]; papers: string[] };

type Tagged = { id?: string; ie?: string[]; ml?: string[]; type?: string[] };

const DIMS = ["ie", "ml", "type"] as const;
const KEYS = [...DIMS, "papers"] as const;

/** Active dimensions AND together; tags within one dimension OR together.
 * `papers` narrows to specific entry ids (the applications map links by id). */
export function matchesFilter(entry: Tagged, f: Filter): boolean {
  if (f.papers.length > 0 && !f.papers.includes(entry.id ?? "")) return false;
  return DIMS.every((d) => f[d].length === 0 || (entry[d] ?? []).some((t) => f[d].includes(t)));
}

export function parseFilterParams(search: string): Filter {
  const params = new URLSearchParams(search);
  const get = (k: string) => params.get(k)?.split(",").filter(Boolean) ?? [];
  return { ie: get("ie"), ml: get("ml"), type: get("type"), papers: get("papers") };
}

// NOTE: plain string build, no URLSearchParams — tag slugs and citation
// keys are alphanumeric/kebab-case and never need percent-escaping.
export function toFilterParams(f: Filter): string {
  const parts = KEYS.filter((k) => f[k].length > 0).map((k) => `${k}=${f[k].join(",")}`);
  return parts.length > 0 ? `?${parts.join("&")}` : "";
}

export const EMPTY_FILTER: Filter = { ie: [], ml: [], type: [], papers: [] };

// Base-absolute (reads the configured base) so links resolve regardless of the
// trailing slash on the current URL, and survive a repo rename.
export const BASE = import.meta.env.BASE_URL.replace(/\/?$/, "/");

/** Literature-page URL with the given filter pre-applied. */
export function litUrl(f: Partial<Filter> = {}): string {
  return `${BASE}literature/${toFilterParams({ ...EMPTY_FILTER, ...f })}`;
}

export type SortKey = "year" | "authors" | "title";

export const SORTS: { key: SortKey; label: string }[] = [
  { key: "year", label: "Newest first" },
  { key: "authors", label: "Author A–Z" },
  { key: "title", label: "Title A–Z" },
];

type Sortable = { year: number; authors: string; title: string };

/** Return a sorted copy: year descending, author/title ascending, each with a
 * secondary key so ties order deterministically. */
export function sortEntries<T extends Sortable>(entries: T[], key: SortKey): T[] {
  const cmp: Record<SortKey, (a: Sortable, b: Sortable) => number> = {
    year: (a, b) => b.year - a.year || a.authors.localeCompare(b.authors),
    authors: (a, b) => a.authors.localeCompare(b.authors) || b.year - a.year,
    title: (a, b) => a.title.localeCompare(b.title) || b.year - a.year,
  };
  return [...entries].sort(cmp[key]);
}
