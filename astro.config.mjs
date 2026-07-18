// @ts-check

import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightLinksValidator from "starlight-links-validator";

// Repo coordinates: the one place to change when forking or renaming.
// (Markdown links in src/content can't read this; grep the old slug there too;
//  see the "Forking or renaming" note in CONTRIBUTING.md.)
const owner = "simonvanlierde";
const repo = "ai4ie-demo";
const repoUrl = `https://github.com/${owner}/${repo}`;

// https://astro.build/config
export default defineConfig({
  site: `https://${owner}.github.io`,
  base: `/${repo}`,

  // Old URLs that are live on the deployed site must keep working after a move.
  // (Astro base-prefixes the route but not the destination, hence `/${repo}`.)
  redirects: { "/hardware/": `/${repo}/tools/local-ai/` },

  integrations: [
    react(), // enables interactive React "islands" for demos
    starlight({
      // Fails the build on broken internal links / missing heading anchors.
      // Relative links are allowed because they're what resolves correctly under `base`.
      plugins: [starlightLinksValidator({ errorOnRelativeLinks: false })],
      // Show each page's last-git-commit date: signals a living, maintained resource.
      lastUpdated: true,
      favicon: "/favicon.svg",
      // Constructed "AI4IE" wordmark; Starlight swaps the two by theme. The mark
      // replaces the title text in the top bar (title still drives <title>/SEO).
      logo: {
        light: "./src/assets/ai4ie-logo.svg",
        dark: "./src/assets/ai4ie-logo-dark.svg",
        replacesTitle: true,
      },
      title: "Awesome AI for Industrial Ecology",
      description:
        "A community-curated guide to using AI in industrial ecology, maintained by the AI4IE working group.",
      // Social preview card (public/og.png). Starlight ships no og:image by
      // default, so shared links would otherwise preview as bare text.
      head: [
        {
          tag: "meta",
          attrs: { property: "og:image", content: `https://${owner}.github.io/${repo}/og.png` },
        },
        { tag: "meta", attrs: { property: "og:image:width", content: "1200" } },
        { tag: "meta", attrs: { property: "og:image:height", content: "630" } },
        { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" } },
        {
          tag: "meta",
          attrs: { name: "twitter:image", content: `https://${owner}.github.io/${repo}/og.png` },
        },
      ],
      social: [{ icon: "github", label: "GitHub", href: repoUrl }],
      editLink: {
        baseUrl: `${repoUrl}/edit/main/`,
      },
      // Self-hosted variable fonts (no CDN: reproducible, offline-friendly,
      // fits the federated/local-hosting ethos). Weight axis only, both themes.
      customCss: [
        "@fontsource-variable/bricolage-grotesque/wght.css",
        "@fontsource-variable/literata/wght.css",
        "@fontsource-variable/literata/wght-italic.css",
        "@fontsource-variable/martian-mono/wght.css",
        "./src/styles/custom.css",
      ],
      // Sidebar order + labels. Add new pages here (slug = filename without .md).
      sidebar: [
        { label: "Home", link: "/" },
        {
          label: "Map of AI applications in IE",
          items: [
            { label: "The map", slug: "applications-map" },
            { label: "Worked example: CV taxonomy", slug: "applications-map/cv-taxonomy" },
          ],
        },
        { label: "Literature & resources", slug: "literature" },
        {
          label: "Best practices & guides",
          items: [
            { label: "Getting started & pitfalls", slug: "best-practices" },
            { label: "Verification checklists", slug: "best-practices/checklists" },
            { label: "Prompts & skills", slug: "best-practices/prompts-and-skills" },
          ],
        },
        {
          label: "Tools & hardware",
          items: [
            { label: "Software tools", slug: "tools" },
            { label: "Local AI & hardware", slug: "tools/local-ai" },
            { label: "Datasets & models", slug: "tools/data-and-models" },
          ],
        },
        { label: "Demos", slug: "demos" },
      ],
    }),
  ],
});
