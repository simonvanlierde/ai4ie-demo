# Awesome AI for Industrial Ecology

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](LICENSE)
[![CI](https://img.shields.io/github/actions/workflow/status/simonvanlierde/ai4ie-demo/ci.yml?)](https://github.com/simonvanlierde/ai4ie-demo/actions)
[![codecov](https://img.shields.io/codecov/c/github/simonvanlierde/ai4ie-demo)](https://codecov.io/gh/simonvanlierde/ai4ie-demo)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> A community-curated resource for using AI in industrial ecology research, maintained by
> the **AI4IE working group**.

**Live site:** <https://simonvanlierde.github.io/ai4ie-demo/>

This repo is a **scaffold**, not finished work: placeholder content and `TODO`
markers throughout, waiting for working-group members to fill in. Contributions are the
whole point.

## Sections

| Page | Contents |
|---|---|
| [Hardware](src/content/docs/hardware.md) | Local, federated, and self-hosted setups for running AI. |
| [Best practices & protocols](src/content/docs/best-practices.md) | Verification checklists, reusable prompts, Claude skill files. |
| [Tools](src/content/docs/tools.md) | Recommended software, services, and libraries. |
| [AI for coding & research](src/content/docs/guides.md) | Get-started guides. |
| [Map of AI in IE](src/content/docs/applications-map.mdx) | A draft taxonomy of AI applications, with slots for live demos. |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Short version: edit a Markdown file under
`src/content/docs/`, replace a `TODO`, and open a pull request. No local setup needed to
edit prose.

## How it's built

[Astro](https://astro.build) + the [Starlight](https://starlight.astro.build) docs theme.
Content is plain Markdown/MDX; interactive demos are **Astro islands** (client-side
components that ship zero JS on pages that don't use them). Pushing to `main` builds and
deploys to GitHub Pages.

- Content: `src/content/docs/*.md` (and `.mdx` for pages that embed a component).
- Sidebar, theme, site config: [`astro.config.mjs`](astro.config.mjs).
- Brand colors: [`src/styles/custom.css`](src/styles/custom.css).
- Example interactive island: [`src/components/DemoIsland.tsx`](src/components/DemoIsland.tsx).
- CI & deploy: [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

Preview locally (needs Node 26+):

```bash
npm install
npm run dev        # → http://localhost:4321/ai4ie-demo/
```

## License

[CC-BY-4.0](LICENSE)
