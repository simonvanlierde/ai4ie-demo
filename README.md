# Awesome AI for Industrial Ecology

A community-curated resource for using AI in industrial ecology research. Started in the AI4IE working group; [contributions welcome from anyone](CONTRIBUTING.md).

[![Live site](https://img.shields.io/badge/live_site-ai4ie-c2410c)](https://ai-4-ie.github.io/awesome-ai4ie/)
[![Contributing](https://img.shields.io/badge/contributing-guide-0f766e)](CONTRIBUTING.md)
[![Discord](https://img.shields.io/badge/chat-Discord-5865F2?logo=discord&logoColor=white)](https://discord.gg/zhHAZakXHX)
[![CI](https://img.shields.io/github/actions/workflow/status/ai-4-ie/awesome-ai4ie/ci.yml?label=CI)](https://github.com/ai-4-ie/awesome-ai4ie/actions)
[![Coverage](https://img.shields.io/codecov/c/github/ai-4-ie/awesome-ai4ie)](https://codecov.io/gh/ai-4-ie/awesome-ai4ie)
[![Built with Astro](https://img.shields.io/badge/built%20with-Astro-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![License: CC BY 4.0](https://img.shields.io/badge/license-CC--BY--4.0-lightgrey)](LICENSE)

**See it live: [ai-4-ie.github.io/awesome-ai4ie](https://ai-4-ie.github.io/awesome-ai4ie/)**

<a href="https://ai-4-ie.github.io/awesome-ai4ie/">
  <img src=".github/screenshot.png" alt="The AI4IE site homepage" width="800">
</a>

## What this is

This repo is a proposal to the AI4IE working group and to anyone else working at this
intersection, not a finished resource. Each section already has real content to react to: an applications map, a literature list, tool and hardware guidance, working Claude skills, and in-browser demos. Feel free to propose changes or additions via pull request, or open an issue if you want to discuss something first.

| Page | Contents |
| --- | --- |
| [Best practices & guides](src/content/docs/best-practices/) | Getting started and pitfalls, verification checklists, prompts and Claude skills. |
| [Tools & hardware](src/content/docs/tools/) | Software tools, local AI and hardware, datasets and models. |
| [Map of AI in IE](src/content/docs/applications-map/index.mdx) | A two-dimensional map of AI applications by IE field and AI technique. |
| [Literature & resources](src/content/docs/literature.mdx) | Tag-filterable reading list backed by `src/data/literature.yaml`. |
| [Demos](src/content/docs/demos.mdx) | In-browser (transformers.js) and embedded demos, tied to map cells. |

## Contributing

Add a paper or application to a YAML file under `src/data/`, or edit a Markdown page under `src/content/docs/`, and open a pull request. No local setup needed to edit text; see [CONTRIBUTING.md](CONTRIBUTING.md).

## How it's built

[Astro](https://astro.build) + the [Starlight](https://starlight.astro.build) docs theme. Content is plain Markdown/MDX; interactive demos are **Astro islands**, so pages that don't use one ship zero JavaScript. Pushing to `main` builds and deploys to GitHub Pages.

| Where | What |
| --- | --- |
| `src/content/docs/*.md` | Page content (`.mdx` when a page embeds a component). |
| [`astro.config.mjs`](astro.config.mjs) | Sidebar, theme, site config. |
| [`src/styles/custom.css`](src/styles/custom.css) | Brand colors. |
| [`src/components/ZeroShotDemo.tsx`](src/components/ZeroShotDemo.tsx) | In-browser CLIP demo island (transformers.js). |
| [`.github/workflows/ci.yml`](.github/workflows/ci.yml) | Lint, test, build, deploy. |

Preview locally (needs Node 26+):

```bash
npm install
npm run dev        # → http://localhost:4321/awesome-ai4ie/
```

## License

[CC-BY-4.0](LICENSE)
