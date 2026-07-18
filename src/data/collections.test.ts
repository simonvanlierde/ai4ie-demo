import { readFileSync } from "node:fs";
import { z } from "astro/zod";
import { describe, expect, it } from "vitest";
import { parse } from "yaml";
import { applicationSchema, literatureSchema } from "./schemas";

// Field-level rules live in the schemas (same ones the site build enforces);
// these tests only add what zod can't express: uniqueness and cross-references.
type Raw = { id?: string; link?: string; papers?: string[] };
const lit = parse(readFileSync("src/data/literature.yaml", "utf8")) as Raw[];
const apps = parse(readFileSync("src/data/applications.yaml", "utf8")) as Raw[];

describe("literature.yaml", () => {
  it("matches the site schema", () => {
    z.array(literatureSchema).parse(lit);
  });
  it("has unique ids and links", () => {
    for (const e of lit) expect(e.id, "entry missing id").toBeTruthy();
    expect(new Set(lit.map((e) => e.id)).size).toBe(lit.length);
    expect(new Set(lit.map((e) => e.link)).size).toBe(lit.length);
  });
});

describe("applications.yaml", () => {
  it("matches the site schema", () => {
    z.array(applicationSchema).parse(apps);
  });
  it("has ids and references only existing literature ids", () => {
    const ids = new Set(lit.map((e) => e.id));
    for (const a of apps) {
      expect(a.id, "entry missing id").toBeTruthy();
      for (const p of a.papers ?? []) expect(ids.has(p), `${a.id} → ${p}`).toBe(true);
    }
  });
});
