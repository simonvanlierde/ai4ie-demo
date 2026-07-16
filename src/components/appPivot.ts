type App = { id: string; ie: string[]; ml: string[] };

/** Group applications by one tag dimension; multi-tagged entries appear in every group. */
export function groupBy<T extends App>(entries: T[], dim: "ie" | "ml"): Map<string, T[]> {
  const m = new Map<string, T[]>();
  for (const e of entries) for (const t of e[dim]) m.set(t, [...(m.get(t) ?? []), e]);
  return m;
}

/** IE × ML grid; only rows/cols with at least one entry, cells keyed "ie|ml". */
export function toGrid<T extends App>(entries: T[]) {
  const cells = new Map<string, T[]>();
  for (const e of entries)
    for (const ie of e.ie)
      for (const ml of e.ml) cells.set(`${ie}|${ml}`, [...(cells.get(`${ie}|${ml}`) ?? []), e]);
  const rows = [...new Set(entries.flatMap((e) => e.ie))];
  const cols = [...new Set(entries.flatMap((e) => e.ml))];
  return { rows, cols, cells };
}
