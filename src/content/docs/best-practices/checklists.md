---
title: Verification checklists
description: Checklists for AI-assisted coding and ML reproducibility, drawn from documented failure modes in IE research.
---

AI output looks confident whether or not it's right. Run the matching checklist
before results go anywhere near a paper.

## AI-assisted coding

AI-generated code runs and looks plausible whether or not it's doing the right thing. This is
especially risky in data pipelines (LCA, MFA, ML), where a silently wrong default or unit
conversion won't throw an error; it will just quietly change your results.

- [ ] Did I read the actual diff, not just skim the chat summary of what changed?
- [ ] Are units, defaults, and thresholds still what I intended, not silently changed?
- [ ] Does every imported package/function actually exist and do what the AI claims?
- [ ] Did I run it on a case with a known answer, not just "it executed without error"?
- [ ] If I didn't fully understand a change, did I ask the AI to explain it before accepting it?

## Machine learning reproducibility

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

The [`ml-reproducibility` skill](/ai4ie-demo/best-practices/prompts-and-skills/#ml-reproducibility)
runs this checklist automatically whenever an AI assistant touches a model.
