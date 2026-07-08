---
title: Best practices & protocols
description: Verification checklists, reusable prompts, and Claude skill files for reliable AI use.
---

How to get reliable results from AI and check them before you trust them:
**verification checklists**, **reusable prompts**, and **Claude skill files**.

## Verification checklists

AI output looks confident whether or not it's right. Run a checklist before using it
in research.

:::caution[Scaffold]
Adapt these stubs to IE work and add domain-specific checks.
:::

### General AI output

- [ ] Did I state the task, constraints, and success criteria explicitly?
- [ ] Can I trace every claim to a source I checked myself?
- [ ] Did I test the opposite / an edge case?
- [ ] Would a domain expert agree, or does this just *sound* right?

### Citations and literature (IE-specific)

- [ ] Does every cited paper exist? (Check DOI / title, not just the formatting.)
- [ ] Do the numbers match the source, or were they paraphrased into being wrong?
- [ ] _TODO(wg): add checks for LCA data, MFA figures, emission factors._

### Code and data pipelines

- [ ] _TODO(wg): reproducibility, unit checks, provenance of input data._

## Reusable prompts

Prompts the group has found to work, with a note on *when* to use each.

<!-- TODO(wg): add prompts. Keep each one copy-pasteable in a fenced block, with a
     one-line "use when". Trim anything project-specific. -->

### Example: verify a claim before citing it

_Use when an AI gives you a fact or citation you plan to put in a paper._

```text
TODO(wg): replace with a vetted prompt. Sketch:
"Here is a claim: <claim>. Find the primary source. Quote the exact sentence that
supports or contradicts it, with a full citation. If you can't find a primary source,
say so. Do not guess."
```

## Claude skill files

Reusable [Claude skills](https://docs.claude.com/en/docs/claude-code/skills) that
package a workflow (checklist + instructions) so it triggers automatically.

- A **template** to start from: [`skills/SKILL-template.md`](https://github.com/simonvanlierde/ai4ie-demo/blob/main/skills/SKILL-template.md)
- _TODO(wg): contribute skills, e.g. an "LCA-data-sanity-check" skill, a
  "citation-verifier" skill. One folder per skill under `skills/`._

See [CONTRIBUTING](https://github.com/simonvanlierde/ai4ie-demo/blob/main/CONTRIBUTING.md#adding-a-claude-skill)
for the format.
