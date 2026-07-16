import { describe, expect, it } from "vitest";
import { groupBy, toGrid } from "./appPivot";

const apps = [
  { id: "a", ie: ["eol"], ml: ["cv"] },
  { id: "b", ie: ["eol", "lca"], ml: ["llm"] },
];

describe("groupBy", () => {
  it("groups by IE dimension with multi-tag entries in every group", () => {
    const g = groupBy(apps, "ie");
    expect(g.get("eol")?.map((e) => e.id)).toEqual(["a", "b"]);
    expect(g.get("lca")?.map((e) => e.id)).toEqual(["b"]);
  });
  it("groups by ML dimension", () => {
    const g = groupBy(apps, "ml");
    expect(g.get("cv")?.map((e) => e.id)).toEqual(["a"]);
    expect(g.get("llm")?.map((e) => e.id)).toEqual(["b"]);
  });
});

describe("toGrid", () => {
  it("only includes rows/cols that have entries, cell key is ie|ml", () => {
    const grid = toGrid(apps);
    expect(grid.rows).toEqual(["eol", "lca"]);
    expect(grid.cols).toEqual(["cv", "llm"]);
    expect(grid.cells.get("eol|cv")?.length).toBe(1);
    expect(grid.cells.get("lca|llm")?.length).toBe(1);
    expect(grid.cells.get("lca|cv")).toBeUndefined();
  });
});
