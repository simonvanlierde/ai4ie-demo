# Contributing

This is a **working-group resource**. It's only as good as what members add. If you've
found hardware that works, a tool worth the time, a prompt that saves you an hour, or a place
AI is being used in IE, add it.

## The short version

1. **Papers and applications live in data files**, not prose:
   [`src/data/literature.yaml`](src/data/literature.yaml) and
   [`src/data/applications.yaml`](src/data/applications.yaml). Copy a neighbouring
   entry, edit the fields, done; the pages render themselves.
2. **Everything else** is a Markdown page under `src/content/docs/`:
   `best-practices/`, `tools/`, `demos.mdx`, `applications-map/index.mdx`.
   Add an entry in the same format as its neighbours.
3. Open a pull request. One entry per PR is fine. Small is good.

### Adding a paper or an application

- Tags come from the shared vocabulary in [`src/data/tags.ts`](src/data/tags.ts)
  (IE field · AI technique · entry type). Need a tag that doesn't exist? Add it
  there in the same PR; a tag ships together with its first entry.
- Literature entries need: `id` (citation key), `title`, `authors`, `year`, `link`
  (DOI preferred), a one-line `blurb` saying why it's worth reading, tags, and
  `added: YYYY-MM`.
- Application entries need both tag dimensions (`ie:` and `ml:`), an honest
  one-line `maturity:`, and `papers:` referencing literature ids.
- `npm run test` validates every field, tag, and cross-reference; CI runs it on
  your PR, so a typo can't break the site.

You don't need to run anything locally to edit text. Editing the Markdown on GitHub is
enough, or use the **edit pencil** on any page of the live site, which takes you straight
to the file.

## Ground rules

- **No fabricated entries.** Every tool, paper, or number must be real and checkable.
  If you're not sure, mark it `TODO` and say what needs confirming.
- **Be honest about limits.** "Good for X, not for Y" is more useful than a rave.
- **Date what goes stale.** Prices, specs, and model names change; add the month you
  checked (`YYYY-MM`).
- **Sensitive data:** flag whether a tool sends data off-device. It matters for
  confidential industry and personal data.
- **Match the existing format** on the page you're editing. Don't restructure a page in
  a content PR.

## How the site works

[Astro](https://astro.build) + the [Starlight](https://starlight.astro.build) docs theme.
Each Markdown file under `src/content/docs/` is a page. The **sidebar order and titles
live in [`astro.config.mjs`](astro.config.mjs)** under `sidebar:`. GitHub builds and
deploys on merge to `main`.

To add a **new section page**:

1. Create `src/content/docs/your-section.md` with a title in the front matter:

   ```markdown
   ---
   title: Your section title
   ---

   Your content…
   ```

2. Add it to the `sidebar` in `astro.config.mjs` where you want it:

   ```js
   { label: 'Your section title', slug: 'your-section' },
   ```

### Adding an interactive demo

Two options:

- **External app** (anything that calls a hosted model; it needs a backend): host it
  (Hugging Face Space, an institute server, a small FastAPI app) and embed it with an
  `<iframe>` on the [demos page](src/content/docs/demos.mdx).
- **In-page island** (client-side, no backend needed, including in-browser inference via
  transformers.js): copy
  [`src/components/ZeroShotDemo.tsx`](src/components/ZeroShotDemo.tsx), then use it in
  an `.mdx` page: `import YourDemo from '...'` and `<YourDemo client:only="react" />`.

Link new demos from the matching `demo:` field in `src/data/applications.yaml`.

### Adding a Claude skill

Skills live under `skills/`, one folder per skill:

```text
skills/
  your-skill-name/
    SKILL.md        # the skill (see skills/SKILL-template.md)
    ...             # any supporting files
```

Start from [`skills/SKILL-template.md`](skills/SKILL-template.md), or use
[`skills/ml-reproducibility/SKILL.md`](skills/ml-reproducibility/SKILL.md) as a worked
example. Keep it generic enough that another member can use it without editing.

## Forking or renaming this repo

Two places hold the repo's identity:

1. `owner` / `repo` at the top of [`astro.config.mjs`](astro.config.mjs): drives the
   site URL, edit-pencil links, and the GitHub icon.
2. Absolute links in the Markdown under `src/content/` and `src/data/`: both the
   `github.com/…/blob/main/…` links and the site-internal `/REPO-NAME/…` links carry
   the repo slug, because plain Markdown can't read the config. Grep and replace:
   `grep -rl OLD-REPO src/content src/data`.

## Preview locally (optional)

```bash
npm install
npm run dev
# open http://localhost:4321/ai4ie-demo/
```

## Questions

Open an issue, or ask in the AI4IE working-group channel.
