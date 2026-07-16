---
title: Best practices & guides
description: Get-started guides, verification checklists, reusable prompts, and Claude skill files for reliable AI use.
---

How to get reliable results from AI in coding and research, and check them before you
trust them: **get-started guides**, **verification checklists**, **reusable prompts**, and
**Claude skill files**.

## Getting started

The five-minute version:

- **What these tools are good at:** transforming material you give them
  (summarize, restructure, translate, explain, draft) and writing code you can
  test. The common thread: outputs you can *verify* faster than you could produce.
- **What they're bad at:** being a source. Facts, citations, and numbers produced
  from a model's memory need verification against a primary source, every time —
  see [Pitfalls](#pitfalls) for the measured failure rates.
- **Keep it on a leash when coding:** small diffs you read, tests that would catch
  a wrong answer, and a known-answer check for anything numerical. The
  [coding checklist](#ai-assisted-coding) below is the concrete version.
- **When not to use it:** when you couldn't tell a good output from a bad one.
  If you can't verify it, don't delegate it.
- **Learn prompting from:** the [Prompt Engineering Guide](https://www.promptingguide.ai)
  (free, tool-agnostic) — most "the AI is bad at this" complaints are one specific
  instruction away from working.

## Pitfalls

Where people get burned — each with a documented case, not folklore:

- **Hallucinated citations.** In a controlled study, 55% of the references
  GPT-3.5 produced and 18% of GPT-4's were entirely fabricated, and much of the
  remainder had substantive errors
  ([Walters & Wilder, 2023](https://doi.org/10.1038/s41598-023-41032-5)). Newer
  models are better but not safe: US lawyers were sanctioned for filing a brief
  with six invented cases
  ([Mata v. Avianca](https://apnews.com/article/artificial-intelligence-chatgpt-fake-case-lawyers-d6ae9fa79d0542db9e1455397aef381c)).
  Rule: a citation an AI gives you does not exist until you've opened it.
- **Confident-but-wrong numbers.** Models state numbers with the same fluency
  whether recalled correctly, approximated, or invented — there is no tonal
  difference to detect. Any number destined for a paper gets traced to a primary
  source or recomputed.
- **Leaking confidential data.** Anything pasted into a hosted service leaves your
  machine and may be retained; Samsung famously banned generative-AI tools after
  engineers pasted internal source code into ChatGPT
  ([TechCrunch, 2023](https://techcrunch.com/2023/05/02/samsung-bans-use-of-generative-ai-tools-like-chatgpt-after-april-internal-data-leak/)).
  For NDA'd inventories and industry data, use the
  [local options on the tools page](../tools/#local--self-hosted-inference), and
  check your data-management plan before pasting.

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
([Rankin et al.](https://doi.org/10.21203/rs.3.rs-9270723/v1)); the two most common failure
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

Copy-pasteable prompts with a one-line "use when". Add your own in the same format —
one fenced block, nothing project-specific.

### Verify a claim before citing it

*Use when an AI gave you a fact or citation you plan to put in a paper.*

```text
Here is a claim I want to cite: <claim>.
Find the primary source. Quote the exact sentence(s) from it that support or
contradict the claim, with a full citation including DOI. If you cannot locate a
primary source, say "no primary source found" — do not substitute a similar paper
and do not guess. If the source only partially supports the claim, state exactly
which part is unsupported.
```

### Adversarial review of AI-written code

*Use when accepting a non-trivial AI-written change to analysis code — ideally in a
fresh session, so the reviewer isn't grading its own work.*

```text
Review this diff as a skeptical colleague. Do not explain what it does — hunt for
what's wrong. Specifically check: (1) units and unit conversions on every changed
quantity; (2) defaults or identifiers that changed meaning (methods, database
versions, regions, years); (3) filters, cutoffs, or NA-handling that silently
drop data; (4) off-by-one and boundary conditions. For each finding, give the
line and a concrete failing input. If you find nothing, say what you checked.
```

### Surface a method's assumptions

*Use when applying an unfamiliar method (statistical, ML, or IE) to your data.*

```text
I plan to use <method> on <one-line description of data and goal>.
List the assumptions this method makes about the data, ordered by how badly the
result degrades when each is violated. For each: how do I test it on my data, and
what is the standard alternative if it fails? Cite a methods reference I can check.
```

### Data-leakage self-check

*Use when you've built an ML pipeline and want the leakage audit from the
[reproducibility checklist](#machine-learning-reproducibility) run against it.*

```text
Here is my modeling pipeline, in order: <paste the steps or the code>.
Audit it for data leakage. Check specifically: is the test set isolated before
any normalization, gap-filling, feature selection, or outlier removal? Is any
time-structured data split randomly? Does any preprocessing step see test rows?
Report each check as pass/fail with the offending step named, then suggest the
minimal reordering that fixes the failures.
```

### Extract without inventing

*Use when pulling structured data out of reports, EPDs, or papers.*

```text
Extract the following fields from the attached document: <fields>.
Rules: quote values exactly as written, with the page or section they came from.
If a field is not stated in the document, write "not stated" — do not infer,
convert, or fill from general knowledge. Flag any value whose unit differs from
the requested unit rather than converting it.
```

## Claude skill files

Reusable [Claude skills](https://docs.claude.com/en/docs/claude-code/skills) that
package a workflow (checklist + instructions) so it triggers automatically.

Two working skills to install or copy:

- [**`ml-reproducibility`**](https://github.com/simonvanlierde/ai4ie-demo/blob/main/skills/ml-reproducibility/SKILL.md) —
  enforces the [Rankin et al.](https://doi.org/10.21203/rs.3.rs-9270723/v1)
  recommendations whenever a model is trained or reviewed: test-set isolation
  before preprocessing, a linear baseline first, plain-language pipeline
  reporting, and the three disqualifying reviewer checks.
- [**`lca-data-sanity-check`**](https://github.com/simonvanlierde/ai4ie-demo/blob/main/skills/lca-data-sanity-check/SKILL.md) —
  a structured pass over AI-written pipeline code: units, defaults, thresholds,
  mappings, a known-answer test, and a mass/energy balance check.

To add your own, start from
[`skills/SKILL-template.md`](https://github.com/simonvanlierde/ai4ie-demo/blob/main/skills/SKILL-template.md);
one folder per skill under `skills/`.

See [CONTRIBUTING](https://github.com/simonvanlierde/ai4ie-demo/blob/main/CONTRIBUTING.md#adding-a-claude-skill)
for the format.
