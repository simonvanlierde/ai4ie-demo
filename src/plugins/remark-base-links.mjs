/**
 * Prefix root-absolute Markdown links with the site's `base`.
 *
 * Astro applies `base` to its own routing but not to hrefs written by hand in
 * Markdown, so content can't portably say `/tools/`. Relative links (`../tools/`)
 * do resolve, but only while the containing page is served with a trailing
 * slash — one `/ai4ie-demo` without it and every link on the page breaks.
 * Writing links root-absolute and rewriting them here is depth- and
 * trailing-slash-independent.
 */
const TRAILING_SLASH = /\/$/;

export function remarkBaseLinks({ base }) {
  const prefix = base.replace(TRAILING_SLASH, "");
  const withBase = (url) => (url === prefix || url.startsWith(`${prefix}/`) ? url : prefix + url); // idempotent

  // Only Markdown body links; frontmatter (e.g. Starlight hero actions) is read
  // straight from the collection and must spell out the base itself.
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === "link" && node.url.startsWith("/")) node.url = withBase(node.url);
    });
  };
}

// NOTE: 6-line walker instead of a `unist-util-visit` dependency.
function visit(node, fn) {
  fn(node);
  for (const child of node.children ?? []) visit(child, fn);
}
