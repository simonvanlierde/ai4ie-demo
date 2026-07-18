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

/**
 * Tag-filterable reading list. SSRs the full list (filters need JS); the
 * active filter round-trips through URL params so filtered views are
 * shareable and the applications map can deep-link here (by tag or, via
 * `?papers=`, by cited entry ids).
 */
export default function LiteratureBrowser({ entries }: { entries: LitEntry[] }) {
  const [filter, setFilter] = useState<Filter>(EMPTY);
  const [sort, setSort] = useState<SortKey>("year");

  // Read the initial filter from the URL after hydration (SSR shows everything).
  useEffect(() => {
    setFilter(parseFilterParams(window.location.search));
  }, []);

  function toggle(dim: (typeof DIMENSIONS)[number]["key"], tag: string) {
    const active = filter[dim].includes(tag);
    const next = {
      ...filter,
      [dim]: active ? filter[dim].filter((t) => t !== tag) : [...filter[dim], tag],
    };
    setFilter(next);
    history.replaceState(null, "", window.location.pathname + toFilterParams(next));
  }

  function clear() {
    setFilter(EMPTY);
    history.replaceState(null, "", window.location.pathname);
  }

  const shown = sortEntries(
    entries.filter((e) => matchesFilter(e, filter)),
    sort,
  );
  const anyActive = DIMENSIONS.some((d) => filter[d.key].length > 0) || filter.papers.length > 0;

  return (
    <div className="lit-browser not-content">
      {DIMENSIONS.map((dim) => (
        <div className="lit-chip-row" key={dim.key}>
          <span className="lit-dim-label">{dim.label}</span>
          <div className="lit-chips">
            {Object.entries(dim.tags).map(([tag, label]) => (
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
        </div>
      ))}
      <p className="lit-count" role="status">
        {shown.length} of {entries.length} entries
        {anyActive && (
          <button type="button" className="lit-clear" onClick={clear}>
            clear filters
          </button>
        )}
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
