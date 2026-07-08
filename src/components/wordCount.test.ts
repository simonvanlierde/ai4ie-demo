import { expect, test } from "vitest";
import { countWords } from "./wordCount";

test("countWords ignores surrounding and collapsed whitespace", () => {
  expect(countWords("hello world")).toBe(2);
  expect(countWords("  spaced   out  ")).toBe(2);
  expect(countWords("one")).toBe(1);
  expect(countWords("")).toBe(0);
  expect(countWords("   ")).toBe(0);
});
