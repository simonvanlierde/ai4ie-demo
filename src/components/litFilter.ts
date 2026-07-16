export type Filter = { ie: string[]; ml: string[]; type: string[] };

type Tagged = { ie?: string[]; ml?: string[]; type?: string[] };

const DIMS = ["ie", "ml", "type"] as const;

/** Active dimensions AND together; tags within one dimension OR together. */
export function matchesFilter(entry: Tagged, f: Filter): boolean {
  return DIMS.every((d) => f[d].length === 0 || (entry[d] ?? []).some((t) => f[d].includes(t)));
}

export function parseFilterParams(search: string): Filter {
  const params = new URLSearchParams(search);
  const get = (k: string) => params.get(k)?.split(",").filter(Boolean) ?? [];
  return { ie: get("ie"), ml: get("ml"), type: get("type") };
}

export function toFilterParams(f: Filter): string {
  const params = new URLSearchParams();
  for (const d of DIMS) if (f[d].length > 0) params.set(d, f[d].join(","));
  const s = params.toString();
  return s ? `?${decodeURIComponent(s)}` : "";
}
