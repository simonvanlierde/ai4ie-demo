import { describe, expect, it } from "vitest";
import { matchesFilter, parseFilterParams } from "./litFilter";

const entry = { ie: ["eol"], ml: ["cv", "segmentation"], type: ["method"] };

describe("matchesFilter", () => {
  it("matches everything when no filters are active", () => {
    expect(matchesFilter(entry, { ie: [], ml: [], type: [] })).toBe(true);
  });
  it("requires a hit in every active dimension (AND across, OR within)", () => {
    expect(matchesFilter(entry, { ie: ["eol"], ml: ["cv"], type: [] })).toBe(true);
    expect(matchesFilter(entry, { ie: ["lca"], ml: ["cv"], type: [] })).toBe(false);
    expect(matchesFilter(entry, { ie: [], ml: ["depth", "cv"], type: [] })).toBe(true);
  });
  it("treats missing tag arrays as empty", () => {
    expect(matchesFilter({ type: ["landmark-ml"] }, { ie: ["lca"], ml: [], type: [] })).toBe(false);
    expect(
      matchesFilter({ type: ["landmark-ml"] }, { ie: [], ml: [], type: ["landmark-ml"] }),
    ).toBe(true);
  });
});

describe("parseFilterParams", () => {
  it("parses comma-separated params and ignores unknown keys", () => {
    expect(parseFilterParams("?ie=eol,lca&ml=cv&foo=x")).toEqual({
      ie: ["eol", "lca"],
      ml: ["cv"],
      type: [],
    });
  });
  it("handles empty search", () => {
    expect(parseFilterParams("")).toEqual({ ie: [], ml: [], type: [] });
  });
});
