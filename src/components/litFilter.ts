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
