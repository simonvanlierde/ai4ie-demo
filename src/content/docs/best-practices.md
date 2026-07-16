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

### AI-assisted coding

AI-generated code runs and looks plausible whether or not it's doing the right thing. This is
especially risky in data pipelines (LCA, MFA, ML), where a silently wrong default or unit
conversion won't throw an error — it'll just quietly change your results.

- [ ] Did I read the actual diff, not just skim the chat summary of what changed?
- [ ] Are units, defaults, and thresholds still what I intended, not silently changed?
- [ ] Does every imported package/function actually exist and do what the AI claims?
- [ ] Did I run it on a case with a known answer, not just "it executed without error"?
- [ ] If I didn't fully understand a change, did I ask the AI to explain it before accepting it?

### Machine learning reproducibility

AI coding tools lower the barrier to using ML in applied research, which also lowers the
minimum domain knowledge needed to spot reproducibility errors. The checklist below is drawn
from a CML literature review of ML reproducibility in IE research
([Ranking et al.](https://doi.org/10.21203/rs.3.rs-9270723/v1)); the two most common failure
modes were **data leakage** and **poor computational reporting**.

- [ ] Is the test set isolated *before* any pre-processing, normalization, or gap-filling?
- [ ] If the data has a time dimension, was splitting done in a way that avoids temporal leakage
      (e.g. time-series cross-validation, not a random split)?
- [ ] Does the write-up plainly describe the pipeline steps in order (e.g. "we split the data,
      then normalized, then trained"), not just the model architecture?
- [ ] Is there a simple baseline (e.g. linear regression) reported alongside any complex model?
- [ ] Is ML actually needed here, or could the hypothesis be tested with empirical data instead?
- [ ] If data, code, or a model is withheld, is the reason stated (e.g. proprietary data), and is
      there a pointer to how similar data could be obtained?
- [ ] If an LLM was used in the modeling workflow itself (not just for coding), are its training
      data cutoff and provenance discussed as a possible source of test-set leakage?

:::note[For reviewers]
The following are disqualifying regardless of ML expertise: no hold-out test set, temporal
leakage, or normalization/gap-filling performed before the train/test split. A withheld or
proprietary dataset is not disqualifying on its own if the rest of the study follows best
practice and the reason is stated.
:::

## Reusable prompts

Prompts the group has found to work, with a note on *when* to use each.

<!-- TODO(wg): add prompts. Keep each one copy-pasteable in a fenced block, with a
     one-line "use when". Trim anything project-specific. -->

### Example: verify a claim before citing it

*Use when an AI gives you a fact or citation you plan to put in a paper.*

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
- *TODO(wg): contribute skills, e.g. an "LCA-data-sanity-check" skill, a
  "citation-verifier" skill. One folder per skill under `skills/`.*

See [CONTRIBUTING](https://github.com/simonvanlierde/ai4ie-demo/blob/main/CONTRIBUTING.md#adding-a-claude-skill)
for the format.
