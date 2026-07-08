const WHITESPACE = /\s+/;

/** Word count, ignoring leading/trailing/collapsed whitespace. Empty or blank → 0. */
export function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(WHITESPACE).length : 0;
}
