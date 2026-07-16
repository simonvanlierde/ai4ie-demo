import { useState } from "react";
import { IE_TAGS, ML_TAGS } from "../data/tags";
import { groupBy, toGrid } from "./appPivot";

export type AppEntry = {
  id: string;
  name: string;
  ie: string[];
  ml: string[];
  summary: string;
  maturity: string;
  papers: string[];
  demo?: string;
};

type View = "ie" | "ml" | "grid";

const VIEWS: { key: View; label: string }[] = [
  { key: "ie", label: "By IE field" },
  { key: "ml", label: "By AI technique" },
  { key: "grid", label: "Grid" },
];

const label = (dim: "ie" | "ml", tag: string) =>
  dim === "ie" ? IE_TAGS[tag as keyof typeof IE_TAGS] : ML_TAGS[tag as keyof typeof ML_TAGS];

/** Literature-page URL pre-filtered to this application's tags. */
const litLink = (ie: string[], ml: string[]) =>
  `../literature/?ie=${ie.join(",")}&ml=${ml.join(",")}`;

/**
 * Pivotable view of applications.yaml: the same entries grouped by IE field,
 * by AI technique, or as an IE × ML grid. Every entry and cell deep-links to
 * the literature list pre-filtered to the same tags.
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
                          {label("ie", t)}
                        </span>
                      ))}
                      {a.ml.map((t) => (
                        <span key={t} className="lit-tag lit-tag-ml">
                          {label("ml", t)}
                        </span>
                      ))}
                      <a href={litLink(a.ie, a.ml)}>
                        {a.papers.length > 0
                          ? `papers (${a.papers.length}) →`
                          : "related reading →"}
                      </a>
                      {a.demo && <a href={a.demo}>demo →</a>}
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
                <a href={`../literature/?ml=${c}`}>{label("ml", c)}</a>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r}>
              <th scope="row">
                <a href={`../literature/?ie=${r}`}>{label("ie", r)}</a>
              </th>
              {cols.map((c) => {
                const apps = cells.get(`${r}|${c}`);
                return (
                  <td key={c}>
                    {apps && (
                      <a
                        href={`../literature/?ie=${r}&ml=${c}`}
                        title={apps.map((a) => a.name).join(" · ")}
                      >
                        {apps.length}
                      </a>
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
