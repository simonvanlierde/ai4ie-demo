import { useEffect, useState } from "react";
import type { LitEntry } from "../data/schemas";
import { IE_TAGS, ML_TAGS, TYPE_TAGS } from "../data/tags";
import {
  type Filter,
  matchesFilter,
  parseFilterParams,
  SORTS,
  type SortKey,
  sortEntries,
  toFilterParams,
} from "./litFilter";

const EMPTY: Filter = { ie: [], ml: [], type: [], papers: [] };

const DIMENSIONS = [
  { key: "ie", label: "IE field", tags: IE_TAGS },
  { key: "ml", label: "AI technique", tags: ML_TAGS },
  { key: "type", label: "Type", tags: TYPE_TAGS },
] as const;

type DimKey = (typeof DIMENSIONS)[number]["key"];

/**
 * Tag-filterable reading list. SSRs the full list (filters need JS); the
 * active filter round-trips through URL params so filtered views are
 * shareable and the applications map can deep-link here (by tag or, via
 * `?papers=`, by cited entry ids).
 *
 * Each dimension collapses into a native <details> disclosure rather than a
 * wall of chips: `name` makes them mutually exclusive and gives keyboard
 * support for free, so no popover/focus-trap code is needed. Whatever is
 * actually filtering shows up as removable pills, in the same colours the
 * entries below use for the same tags.
 */
export default function LiteratureBrowser({ entries }: { entries: LitEntry[] }) {
  const [filter, setFilter] = useState<Filter>(EMPTY);
  const [sort, setSort] = useState<SortKey>("year");
  const [hydrated, setHydrated] = useState(false);

  // Read the initial filter and sort from the URL after hydration (SSR shows everything).
  useEffect(() => {
    setFilter(parseFilterParams(window.location.search));
    const s = new URLSearchParams(window.location.search).get("sort");
    if (SORTS.some((o) => o.key === s)) setSort(s as SortKey);
    setHydrated(true);
  }, []);

  // Keep the shareable URL in sync once the initial URL has been read. Sort rides
  // along so a shared link reproduces the order it was shared in; the default is
  // left out to keep the common URL clean.
  useEffect(() => {
    if (!hydrated) return;
    const query = toFilterParams(filter);
    const sortParam = sort === "year" ? "" : `${query ? "&" : "?"}sort=${sort}`;
    history.replaceState(null, "", window.location.pathname + query + sortParam);
  }, [filter, sort, hydrated]);

  function apply(next: Filter) {
    setFilter(next);
  }

  function toggle(dim: DimKey, tag: string) {
    const active = filter[dim].includes(tag);
    apply({
      ...filter,
      [dim]: active ? filter[dim].filter((t) => t !== tag) : [...filter[dim], tag],
    });
  }

  function clear() {
    setFilter(EMPTY);
  }

  const shown = sortEntries(
    entries.filter((e) => matchesFilter(e, filter)),
    sort,
  );
  const anyActive = DIMENSIONS.some((d) => filter[d.key].length > 0) || filter.papers.length > 0;

  // One pill per active tag, plus one for a `?papers=` deep-link, which would
  // otherwise narrow the list with nothing on screen to explain why.
  const pills = DIMENSIONS.flatMap((dim) =>
    filter[dim.key].map((tag) => ({
      id: `${dim.key}:${tag}`,
      dim: dim.key,
      tag,
      label: (dim.tags as Record<string, string>)[tag] ?? tag,
    })),
  );

  return (
    <div className="lit-browser not-content">
      <div className="lit-bar">
        <span className="lit-bar-label">Filter</span>
        {DIMENSIONS.map((dim) => {
          const count = filter[dim.key].length;
          return (
            <details className="lit-facet" name="lit-facet" key={dim.key}>
              <summary className="lit-facet-trigger">
                {dim.label}
                {count > 0 && (
                  <span className={`lit-facet-count lit-count-${dim.key}`}>{count}</span>
                )}
              </summary>
              <div className="lit-facet-panel">
                {Object.entries(dim.tags)
                  .sort(([, a], [, b]) => a.localeCompare(b))
                  .map(([tag, label]) => (
                    <button
                      type="button"
                      key={tag}
                      className={`lit-chip lit-chip-${dim.key}`}
                      aria-pressed={filter[dim.key].includes(tag)}
                      onClick={() => toggle(dim.key, tag)}
                    >
                      {label}
                    </button>
                  ))}
              </div>
            </details>
          );
        })}
      </div>

      {anyActive && (
        <div className="lit-active">
          {pills.map((p) => (
            <button
              type="button"
              key={p.id}
              className={`lit-pill lit-pill-${p.dim}`}
              aria-label={`Remove filter: ${p.label}`}
              onClick={() => toggle(p.dim, p.tag)}
            >
              {p.label}
              <span aria-hidden="true">×</span>
            </button>
          ))}
          {filter.papers.length > 0 && (
            <button
              type="button"
              className="lit-pill lit-pill-papers"
              aria-label="Remove filter: linked papers"
              onClick={() => apply({ ...filter, papers: [] })}
            >
              {filter.papers.length} linked {filter.papers.length === 1 ? "paper" : "papers"}
              <span aria-hidden="true">×</span>
            </button>
          )}
          <button type="button" className="lit-clear" onClick={clear}>
            Clear all
          </button>
        </div>
      )}

      <p className="lit-count" role="status">
        {shown.length} of {entries.length} entries
        <label className="lit-sort">
          Sort
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </p>
      <ol className="lit-list">
        {shown.map((e) => (
          <li key={e.id} className="lit-entry">
            <span className="lit-meta">
              {e.authors} · {e.year}
            </span>
            <a href={e.link} className="lit-title">
              {e.title}
            </a>
            <p className="lit-blurb">{e.blurb}</p>
            <span className="lit-tags">
              {e.ie.map((t) => (
                <span key={t} className="lit-tag lit-tag-ie">
                  {IE_TAGS[t]}
                </span>
              ))}
              {e.ml.map((t) => (
                <span key={t} className="lit-tag lit-tag-ml">
                  {ML_TAGS[t]}
                </span>
              ))}
              {e.type.map((t) => (
                <span key={t} className="lit-tag lit-tag-type">
                  {TYPE_TAGS[t]}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ol>
      {shown.length === 0 && (
        <p className="lit-empty">No entries match this combination. Remove a filter or two.</p>
      )}
    </div>
  );
}
