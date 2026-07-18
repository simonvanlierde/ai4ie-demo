import { useState } from "react";
import type { AppEntry } from "../data/schemas";
import { IE_TAGS, ML_TAGS } from "../data/tags";
import { groupBy, toGrid } from "./appPivot";
import { type Filter, toFilterParams } from "./litFilter";

type View = "ie" | "ml" | "grid";

const VIEWS: { key: View; label: string }[] = [
  { key: "ie", label: "By IE field" },
  { key: "ml", label: "By AI technique" },
  { key: "grid", label: "Grid" },
];

const label = (dim: "ie" | "ml", tag: string) =>
  dim === "ie" ? IE_TAGS[tag as keyof typeof IE_TAGS] : ML_TAGS[tag as keyof typeof ML_TAGS];

// Base-absolute so links resolve regardless of trailing slash on the current URL.
const BASE = import.meta.env.BASE_URL.replace(/\/?$/, "/");

/** Literature-page URL with the given filter pre-applied. */
const lit = (f: Partial<Filter>) =>
  `${BASE}literature/${toFilterParams({ ie: [], ml: [], type: [], papers: [], ...f })}`;

/**
 * Pivotable view of applications.yaml: the same entries grouped by IE field,
 * by AI technique, or as an IE × ML grid. Entries and cells deep-link to the
 * literature list, by cited paper ids where an entry cites papers, by the
 * same tags otherwise.
 */
export default function ApplicationsExplorer({ entries }: { entries: AppEntry[] }) {
  const [view, setView] = useState<View>("ie");

  return (
    <div className="apx not-content">
      <div className="apx-switch" role="tablist" aria-label="Map view">
        {VIEWS.map((v) => (
          <button
            type="button"
            key={v.key}
            role="tab"
            aria-selected={view === v.key}
            onClick={() => setView(v.key)}
          >
            {v.label}
          </button>
        ))}
      </div>

      {view !== "grid" && (
        <div>
          {[...groupBy(entries, view)].map(([tag, apps]) => (
            <section key={tag} className="apx-group">
              <h3 className={`apx-group-label apx-${view}`}>{label(view, tag)}</h3>
              <ul className="apx-list">
                {apps.map((a) => (
                  <li key={a.id} className="apx-entry">
                    <span className="apx-name">{a.name}</span>
                    <p className="apx-summary">
                      {a.summary} <em className="apx-maturity">{a.maturity}</em>
                    </p>
                    <span className="apx-links">
                      {a.ie.map((t) => (
                        <span key={t} className="lit-tag lit-tag-ie">
                          {IE_TAGS[t]}
                        </span>
                      ))}
                      {a.ml.map((t) => (
                        <span key={t} className="lit-tag lit-tag-ml">
                          {ML_TAGS[t]}
                        </span>
                      ))}
                      <a
                        href={
                          a.papers.length > 0
                            ? lit({ papers: a.papers })
                            : lit({ ie: a.ie, ml: a.ml })
                        }
                      >
                        {a.papers.length > 0
                          ? `papers (${a.papers.length}) →`
                          : "related reading →"}
                      </a>
                      {a.demo && (
                        <a href={a.demo.startsWith("http") ? a.demo : BASE + a.demo}>demo →</a>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      {view === "grid" && <Grid entries={entries} />}
    </div>
  );
}

function Grid({ entries }: { entries: AppEntry[] }) {
  const { rows, cols, cells } = toGrid(entries);
  return (
    <div className="apx-grid-wrap">
      <table className="apx-grid">
        <thead>
          <tr>
            <th aria-label="IE field by AI technique" />
            {cols.map((c) => (
              <th key={c} scope="col">
                <a href={lit({ ml: [c] })}>{label("ml", c)}</a>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r}>
              <th scope="row">
                <a href={lit({ ie: [r] })}>{label("ie", r)}</a>
              </th>
              {cols.map((c) => {
                const apps = cells.get(`${r}|${c}`);
                if (!apps) return <td key={c} />;
                const papers = [...new Set(apps.flatMap((a) => a.papers))];
                const title = apps.map((a) => a.name).join(" · ");
                return (
                  <td key={c}>
                    {papers.length > 0 ? (
                      <a href={lit({ papers })} title={title}>
                        {apps.length}
                      </a>
                    ) : (
                      <span title={title}>{apps.length}</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
