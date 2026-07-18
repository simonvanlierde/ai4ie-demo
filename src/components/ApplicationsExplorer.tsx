import { useState } from "react";
import type { AppEntry } from "../data/schemas";
import { IE_TAGS, ML_TAGS } from "../data/tags";
import { groupBy, toGrid } from "./appPivot";
import { BASE, litUrl } from "./litFilter";

type View = "ie" | "ml" | "grid";

const VIEWS: { key: View; label: string }[] = [
  { key: "ie", label: "By IE field" },
  { key: "ml", label: "By AI technique" },
  { key: "grid", label: "Grid" },
];

const label = (dim: "ie" | "ml", tag: string) =>
  dim === "ie" ? IE_TAGS[tag as keyof typeof IE_TAGS] : ML_TAGS[tag as keyof typeof ML_TAGS];

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
                            ? litUrl({ papers: a.papers })
                            : litUrl({ ie: a.ie, ml: a.ml })
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

/**
 * AI technique as rows, IE field as columns: there are far more techniques than
 * fields, so this reads as a tall table rather than a wide one. `toGrid` keeps
 * its IE × ML contract and keys cells "ie|ml"; only the presentation transposes.
 * `toGrid` already returns both axes in vocabulary order.
 */
function Grid({ entries }: { entries: AppEntry[] }) {
  const { rows: ies, cols: mls, cells } = toGrid(entries);

  return (
    <div className="apx-grid-wrap">
      <table className="apx-grid">
        <thead>
          <tr>
            <th aria-label="AI technique by IE field" />
            {ies.map((ie) => (
              <th key={ie} scope="col">
                <a href={litUrl({ ie: [ie] })}>{label("ie", ie)}</a>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mls.map((ml) => (
            <tr key={ml}>
              <th scope="row">
                <a href={litUrl({ ml: [ml] })}>{label("ml", ml)}</a>
              </th>
              {ies.map((ie) => {
                const apps = cells.get(`${ie}|${ml}`);
                if (!apps) return <td key={ie} />;
                const papers = [...new Set(apps.flatMap((a) => a.papers))];
                const title = apps.map((a) => a.name).join(" · ");
                return (
                  <td key={ie}>
                    {papers.length > 0 ? (
                      <a href={litUrl({ papers })} title={title}>
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
