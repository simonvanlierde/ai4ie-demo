import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { parse } from "yaml";
import { IE_TAGS, ML_TAGS, TYPE_TAGS } from "./tags";

type LitEntry = {
  id: string;
  title: string;
  link: string;
  blurb: string;
  ie?: string[];
  ml?: string[];
  type: string[];
  added: string;
};
type AppEntry = { id: string; ie: string[]; ml: string[]; papers?: string[] };

const lit = parse(readFileSync("src/data/literature.yaml", "utf8")) as LitEntry[];
const apps = parse(readFileSync("src/data/applications.yaml", "utf8")) as AppEntry[];

describe("literature.yaml", () => {
  it("has unique ids and required fields", () => {
    const ids = lit.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const e of lit) {
      expect(e.title.length, e.id).toBeGreaterThan(0);
      expect(e.link, e.id).toMatch(/^https:\/\//);
      expect(e.blurb.length, e.id).toBeLessThanOrEqual(300);
      expect(e.type.length, e.id).toBeGreaterThan(0);
      expect(e.added, e.id).toMatch(/^\d{4}-\d{2}$/);
    }
  });
  it("has no duplicate links", () => {
    const links = lit.map((e) => e.link);
    expect(new Set(links).size).toBe(links.length);
  });
  it("uses only known tags", () => {
    for (const e of lit) {
      for (const t of e.ie ?? []) expect(IE_TAGS, `${e.id}: ie ${t}`).toHaveProperty(t);
      for (const t of e.ml ?? []) expect(ML_TAGS, `${e.id}: ml ${t}`).toHaveProperty(t);
      for (const t of e.type) expect(TYPE_TAGS, `${e.id}: type ${t}`).toHaveProperty(t);
    }
  });
});

describe("applications.yaml", () => {
  it("references only existing literature ids", () => {
    const ids = new Set(lit.map((e) => e.id));
    for (const a of apps)
      for (const p of a.papers ?? []) expect(ids.has(p), `${a.id} → ${p}`).toBe(true);
  });
  it("uses only known tags and has both dimensions", () => {
    for (const a of apps) {
      expect(a.ie.length, a.id).toBeGreaterThan(0);
      expect(a.ml.length, a.id).toBeGreaterThan(0);
      for (const t of a.ie) expect(IE_TAGS, `${a.id}: ie ${t}`).toHaveProperty(t);
      for (const t of a.ml) expect(ML_TAGS, `${a.id}: ml ${t}`).toHaveProperty(t);
    }
  });
});
