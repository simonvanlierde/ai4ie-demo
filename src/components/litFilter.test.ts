import { describe, expect, it } from "vitest";
import { matchesFilter, parseFilterParams, toFilterParams } from "./litFilter";

const entry = { ie: ["eol"], ml: ["cv", "segmentation"], type: ["method"] };

const none = { ie: [], ml: [], type: [], papers: [] };

describe("matchesFilter", () => {
  it("matches everything when no filters are active", () => {
    expect(matchesFilter(entry, none)).toBe(true);
  });
  it("requires a hit in every active dimension (AND across, OR within)", () => {
    expect(matchesFilter(entry, { ...none, ie: ["eol"], ml: ["cv"] })).toBe(true);
    expect(matchesFilter(entry, { ...none, ie: ["lca"], ml: ["cv"] })).toBe(false);
    expect(matchesFilter(entry, { ...none, ml: ["depth", "cv"] })).toBe(true);
  });
  it("treats missing tag arrays as empty", () => {
    expect(matchesFilter({ type: ["landmark-ml"] }, { ...none, ie: ["lca"] })).toBe(false);
    expect(matchesFilter({ type: ["landmark-ml"] }, { ...none, type: ["landmark-ml"] })).toBe(true);
  });
  it("narrows to specific entry ids via papers", () => {
    expect(matchesFilter({ id: "a" }, { ...none, papers: ["a", "b"] })).toBe(true);
    expect(matchesFilter({ id: "c" }, { ...none, papers: ["a", "b"] })).toBe(false);
    expect(matchesFilter({}, { ...none, papers: ["a"] })).toBe(false);
  });
});

describe("parseFilterParams", () => {
  it("parses comma-separated params and ignores unknown keys", () => {
    expect(parseFilterParams("?ie=eol,lca&ml=cv&foo=x")).toEqual({
      ...none,
      ie: ["eol", "lca"],
      ml: ["cv"],
    });
  });
  it("handles empty search", () => {
    expect(parseFilterParams("")).toEqual(none);
  });
  it("round-trips through toFilterParams", () => {
    const f = {
      ie: ["eol"],
      ml: ["cv", "depth"],
      type: [],
      papers: ["kirillovSegmentAnything2023"],
    };
    expect(parseFilterParams(toFilterParams(f))).toEqual(f);
  });
});
