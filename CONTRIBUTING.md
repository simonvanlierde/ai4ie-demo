# Contributing

This is a **working-group resource**. It's only as good as what members add. If you've
found hardware that works, a tool worth the time, a prompt that saves you an hour, or a place
AI is being used in IE, add it.

## The short version

1. Find the right page under `src/content/docs/`: `hardware.md`, `best-practices.md`,
   `tools.md`, `guides.md`, or `applications-map.mdx`.
2. Replace a `TODO` / `_placeholder_`, or add a new entry in the same format as its neighbours.
3. Open a pull request. One entry per PR is fine. Small is good.

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

- **External app** (anything that calls a model; it needs a backend): host it (Hugging
  Face Space, an institute server, a small FastAPI app) and embed it with an `<iframe>` on
  the [map page](src/content/docs/applications-map.mdx).
- **In-page island** (a client-side widget, no backend): copy
  [`src/components/DemoIsland.tsx`](src/components/DemoIsland.tsx), then use it in an `.mdx`
  page: `import YourDemo from '...'` and `<YourDemo client:load />`.

### Adding a Claude skill

Skills live under `skills/`, one folder per skill:

```text
skills/
  your-skill-name/
    SKILL.md        # the skill (see skills/SKILL-template.md)
    ...             # any supporting files
```

Start from [`skills/SKILL-template.md`](skills/SKILL-template.md). Keep it generic enough
that another member can use it without editing.

## Forking or renaming this repo

Two places hold the repo's identity:

1. `owner` / `repo` at the top of [`astro.config.mjs`](astro.config.mjs): drives the
   site URL, edit-pencil links, and the GitHub icon.
2. Absolute `github.com/…/blob/main/…` links in the Markdown under `src/content/`: plain
   Markdown can't read the config, so grep and replace the old slug:
   `grep -rl OLD-OWNER/OLD-REPO src/content`.

## Preview locally (optional)

```bash
npm install
npm run dev
# open http://localhost:4321/ai4ie-demo/
```

## Questions

Open an issue, or ask in the AI4IE working-group channel.
