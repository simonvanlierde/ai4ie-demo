---
name: lca-data-sanity-check
description: Use when AI has written or edited code in an LCA/MFA/IO data pipeline — catches silently changed units, defaults, thresholds, and mappings that run without error but change results.
---

# LCA / MFA data-pipeline sanity check

AI-generated pipeline code usually *runs*. The dangerous failures in IE work are the
ones that run silently: a unit conversion dropped, a default swapped, a
characterization method substituted. This skill is a structured pass over an
AI-produced diff before its results are trusted.

## When to apply

- After any AI-assisted change to code that computes impacts, flows, stocks, or
  footprints (Brightway, ODYM, pymrio, pandas pipelines, spreadsheets-as-code).
- Before results from such code go into a paper, report, or dataset release.

## The pass

1. **Read the diff, not the summary.** Check every changed line against what you
   asked for. Flag any change you didn't request, however plausible it looks.
2. **Units.** For every quantity touched by the change: what unit is it in at each
   step? Look specifically for kg↔t, MJ↔kWh, per-kg↔per-unit, and percent↔fraction
   flips. If the code has no unit annotations, add a comment stating the unit at
   the boundary of the changed code.
3. **Defaults and identifiers.** Did any function default change meaning
   (allocation method, characterization method, database version, region code,
   reference year)? AI models substitute "similar" identifiers — verify exact
   database/method names against the originals, character for character.
4. **Thresholds and filters.** Any cutoff, `dropna`, filter, or rounding introduced
   or altered? Quantify what it excludes: row counts before and after.
5. **Mappings.** For any classification/correspondence table the AI wrote or edited
   (e.g. product→material, sector→sector): spot-check entries against the
   authoritative source; do not trust a generated mapping wholesale.
6. **Known-answer test.** Run the pipeline on a case where the answer is known
   (a published figure, a hand-calculated example, last release's output). "It
   executed without error" is not verification. If no known-answer case exists,
   create one tiny synthetic case and keep it as a regression test.
7. **Mass/energy balance.** Where applicable, check totals: do inputs still equal
   outputs plus stock change within tolerance? A balance that held before the
   change and fails after it localizes the bug immediately.

## Output

Report per item: what was checked, how, and the result — with the failing case
attached when something breaks. If everything passes, say which known-answer case
was used; a pass without a named test case doesn't count.
