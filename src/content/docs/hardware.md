---
title: Hardware recommendations
description: Where to run AI models; local, federated, and self-hosted setups for sensitive IE data.
---

Where to actually run AI models, from a laptop to a shared GPU box, with attention to
**federated** and **locally-hosted** setups for data that can't leave the building.

## Why this matters for IE

A lot of IE data is sensitive: unpublished LCA inventories, proprietary process data,
data shared under NDA from industry partners. Sending it to a hosted API can breach an
agreement or a data-management plan. Local and federated options let you use AI on that
data without it leaving a machine you control.

:::caution[Scaffold]
Replace the stubs below with configurations the group has tested, including rough cost
and the model sizes each tier can actually run.
:::

## Run locally (single machine)

For running open-weight models on your own hardware: no data leaves the device.

| Tier | Example hardware | Roughly what it runs | Notes |
|------|------------------|----------------------|-------|
| Laptop | _TODO(wg)_ | Small quantized models | Good for drafting, not heavy analysis. |
| Workstation | _TODO(wg)_ | Mid-size open models | _TODO(wg): VRAM guidance._ |
| Server / GPU box | _TODO(wg)_ | Large open models | _TODO(wg): shared-use notes._ |

- **Software to serve models locally:** _TODO(wg): e.g. Ollama, LM Studio, llama.cpp,
  vLLM (with a one-line "use when" for each)._ Cross-reference the [Tools](../tools/) page.

## Federated / shared institutional resources

For compute you don't own outright: university clusters, federated compute across
partners, or a shared group server.

- **University HPC / GPU cluster:** _TODO(wg): how to request access at CML/Leiden,
  which partitions have GPUs, how to load model-serving software._
- **Federated learning setups:** _TODO(wg): when it's worth training/using a model across
  institutions without pooling raw data. Link a worked example if the group has one._
- **Shared group server:** _TODO(wg): specs and booking process, if one exists._

## Cloud / hosted APIs

Fine for non-sensitive data, and the least setup of any option. Watch the data-governance line.

- _TODO(wg): note which providers are acceptable under CML/Leiden data policy, and for
  which data classifications._
- See [Best practices](../best-practices/) for the data-handling checklist before you
  paste anything into a hosted service.

## Decision shortcut

> _TODO(wg): a short "if your data is X, use Y" flowchart or table. Keep it to a screen._
