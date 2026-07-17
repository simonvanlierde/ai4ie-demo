---
title: Tools & hardware
description: Software, services, libraries, and hardware for AI-assisted IE work.
---

Software, services, libraries, and the hardware to run them on, for AI-assisted IE
work. Tools change fast, so every entry carries the date it was last checked. If you
spot a stale line, fixing it is a one-line pull request.

**Entry format:** name + link, one line on what it does, *good for / not for*,
free/paid, and whether data leaves your machine (it matters for confidential
industry data and anything under an NDA or data-management plan).

## Assistants and chat interfaces

- **[Claude](https://claude.ai)**: general assistant; strong at long-document analysis, writing, and code. *Good for:* working through a paper or dataset description, drafting, code explanation. *Not for:* facts without verification; check citations before using them (see [Best practices](/ai4ie-demo/best-practices/)). Free tier + paid. **Data leaves your machine.** *(checked 2026-07)*
- **[ChatGPT](https://chatgpt.com)**: general assistant with the largest ecosystem (data analysis, custom GPTs). *Good for:* exploratory data analysis on non-sensitive CSVs, brainstorming. *Not for:* anything confidential on the free tier. Free tier + paid. **Data leaves your machine.** *(checked 2026-07)*
- **[Le Chat (Mistral)](https://chat.mistral.ai)**: assistant from an EU provider, with EU hosting options. *Good for:* when EU data residency is a requirement. *Not for:* matching the frontier models on hard reasoning. Free tier + paid. **Data leaves your machine.** *(checked 2026-07)*
- **Everything else**: the assistant landscape shifts monthly; for a current view, [LMArena](https://lmarena.ai) ranks models by blind community votes and [Artificial Analysis](https://artificialanalysis.ai) tracks quality, price, and speed across providers. *(checked 2026-07)*
- **Local chat front-ends** (Open WebUI, LM Studio's chat, Ollama's app): chat UI over models running on your own hardware; see [local inference](#local--self-hosted-inference) below. **Data stays on your machine.** *(checked 2026-07)*

## Coding assistants

- **[Claude Code](https://docs.claude.com/en/docs/claude-code)**: agentic coding in the terminal/IDE: reads the repo, edits files, runs tests. *Good for:* multi-file changes, test-driven work, research code cleanup. *Not for:* unreviewed use; read the diffs (see the [coding checklist](/ai4ie-demo/best-practices/#ai-assisted-coding)). Paid. **Code leaves your machine.** *(checked 2026-07)*
- **[GitHub Copilot](https://github.com/features/copilot)**: inline completions and chat in the editor; free for verified academics via GitHub Education. *Good for:* boilerplate, tests, docstrings while you type. *Not for:* large refactors. Free (edu) / paid. **Code leaves your machine.** *(checked 2026-07)*
- **[Aider](https://aider.chat)**: open-source terminal pair-programmer that can run against local models. *Good for:* AI-assisted coding on code you can't send to a cloud service (point it at an Ollama/vLLM endpoint). *Not for:* the polish of the commercial tools. Free (bring your own model/API). **Can stay fully local.** *(checked 2026-07)*

## Local / self-hosted inference

Run open-weight models (Llama, Qwen, Gemma, Mistral, DeepSeek families) on hardware you control: the option that keeps NDA'd inventories and proprietary process data in the building. Pair with the [hardware guidance](#hardware) below.

- **[Ollama](https://ollama.com)**: one-command local model server with a curated library. *Use when:* you want a local model running in five minutes. Free. **Local.** *(checked 2026-07)*
- **[LM Studio](https://lmstudio.ai)**: desktop GUI for discovering, downloading, and chatting with local models (incl. Apple-silicon MLX builds). *Use when:* you prefer a GUI, or you're on a Mac. Free for personal/academic use. **Local.** *(checked 2026-07)*
- **[llama.cpp](https://github.com/ggml-org/llama.cpp)**: the inference engine underneath much of the ecosystem. *Use when:* you need maximum control or minimal footprint (it's what the two tools above build on). Free, open source. **Local.** *(checked 2026-07)*
- **[vLLM](https://github.com/vllm-project/vllm)**: high-throughput GPU serving with an OpenAI-compatible API. *Use when:* serving one model to a whole group from a shared GPU box. *Not for:* laptops. Free, open source. **Local.** *(checked 2026-07)*

## Research and literature

- **[Zotero](https://www.zotero.org)**: open-source reference manager; the group's default. With [Better BibTeX](https://retorque.re/zotero-better-bibtex/) for stable citation keys; AI integrations exist as plugins. *Good for:* holding the references you have actually verified; AI-suggested citations go in only after checking. Free. **Local-first** (sync optional). *(checked 2026-07)*
- **[Semantic Scholar](https://www.semanticscholar.org)**: free scholarly search with citation graph and a good API. *Good for:* checking whether a paper an AI cited actually exists. Free. *(checked 2026-07)*
- **[Connected Papers](https://www.connectedpapers.com)**: visual citation-graph exploration from a seed paper. *Good for:* getting into an unfamiliar literature quickly. Free tier + paid. *(checked 2026-07)*
- **[Elicit](https://elicit.com)**: LLM-assisted literature search and structured data extraction from papers. *Good for:* first-pass screening and extraction tables. *Not for:* trusting extractions unverified; spot-check against the PDFs. Free tier + paid. **Data leaves your machine.** *(checked 2026-07)*
- **[NotebookLM](https://notebooklm.google.com)**: grounded Q&A over documents you upload; answers cite the sources. *Good for:* interrogating a pile of reports or EPDs. *Not for:* confidential documents. Free. **Data leaves your machine.** *(checked 2026-07)*

## Data and modeling libraries

Python packages relevant to AI + IE work:

- **[Brightway](https://docs.brightway.dev)**: open LCA framework; the computational backbone for scripted, reproducible LCA. *(checked 2026-07)*
- **[Activity Browser](https://github.com/LCA-ActivityBrowser/activity-browser)**: GUI on top of Brightway, developed at CML. *Good for:* Brightway workflows without writing code. *(checked 2026-07)*
- **[premise](https://github.com/polca/premise)**: prospective LCA databases coupling ecoinvent with IAM scenarios. *(checked 2026-07)*
- **[ODYM](https://github.com/IndEcol/ODYM)**: dynamic MFA framework. *(checked 2026-07)*
- **[pymrio](https://github.com/IndEcol/pymrio)**: environmentally-extended multi-regional input–output analysis. *(checked 2026-07)*
- **[scikit-learn](https://scikit-learn.org)**: classical ML. *Start here:* a linear baseline before any deep model is one of the [ML-reproducibility recommendations](/ai4ie-demo/best-practices/#machine-learning-reproducibility). *(checked 2026-07)*
- **[PyTorch](https://pytorch.org)**: the default deep-learning framework in research; most CV/NLP models on the [map](/ai4ie-demo/applications-map/) ship as PyTorch weights. *(checked 2026-07)*

## Datasets

Open IE data first, then the general sources where ML datasets live.

**IE data:**

- **[Industrial Ecology Freiburg data commons](https://www.database.industrialecology.uni-freiburg.de)**: open IE datasets (stocks, flows, lifetimes) collected by Stefan Pauliuk's group; the closest thing the field has to a shared data home. *(checked 2026-07)*
- **[EXIOBASE](https://www.exiobase.eu)**: global environmentally-extended MRIO database; free with registration. *(checked 2026-07)*
- **[UNEP IRP Global Material Flows Database](https://www.materialflows.net)**: country-level material extraction, trade, and consumption. Free. *(checked 2026-07)*
- **[ecoinvent](https://ecoinvent.org)**: the standard LCI database. Paid license; check what your institution already has. *(checked 2026-07)*
- **[RELab](https://doi.org/10.5281/zenodo.19703316)**: open product-disassembly data collection platform, developed at CML. *(checked 2026-07)*

**General ML dataset sources:**

- **[Hugging Face Datasets](https://huggingface.co/datasets)**: the default host for ML datasets; one `load_dataset()` call away in Python. *(checked 2026-07)*
- **[OpenML](https://www.openml.org)**: curated, uniformly formatted datasets with tasks and benchmark results attached; strong sklearn/mlr integration. *(checked 2026-07)*
- **[Kaggle](https://www.kaggle.com/datasets)**: broad dataset collection plus competitions; quality varies, licenses matter. *(checked 2026-07)*
- **[Zenodo](https://zenodo.org)**: DOI-issuing research repository; where to *publish* your own datasets as much as find others'. *(checked 2026-07)*
- **[UCI ML Repository](https://archive.ics.uci.edu)**: the classic benchmark collection; small, clean, good for baselines. *(checked 2026-07)*

## Pretrained models

Where to find models you can download and run (locally or otherwise):

- **[Hugging Face Hub](https://huggingface.co/models)**: the central registry for pretrained models (LLMs, CV, audio); filter by task, license, and size. Most models on the [applications map](/ai4ie-demo/applications-map/) live here. *(checked 2026-07)*
- **[Ollama library](https://ollama.com/library)**: curated open-weight LLMs packaged for one-command local use. *(checked 2026-07)*
- **[Kaggle Models](https://www.kaggle.com/models)**: model registry tied to Kaggle's datasets and notebooks. *(checked 2026-07)*
- **[timm](https://huggingface.co/timm)**: the standard collection of pretrained vision backbones for PyTorch. *(checked 2026-07)*

Check the license before building on a model: "open weights" ranges from Apache-2.0 to research-only.

## Hardware

Where to run models, from a laptop to a shared GPU box. The constraint that matters
is **memory** (GPU VRAM, or unified memory on Apple silicon): it sets which models
fit at all. Rules of thumb below assume 4-bit quantized weights (the practical
default for local use) and modest context; halve the model size for 8-bit,
quarter it for full precision. *(checked 2026-07)*

| Memory | Runs (4-bit) | Typical hardware |
|---|---|---|
| 8 GB | ~7–8B models | entry laptop GPU, base MacBook Air |
| 16 GB | ~13–14B | mid laptop GPU, MacBook Pro |
| 24–32 GB | ~30B | RTX 4090/5090 workstation, MacBook M-Max |
| 48–96 GB | ~70B | 2× consumer GPUs, RTX 6000-class, Mac Studio |

- **Laptop.** Modern Apple silicon (16 GB+) or a laptop RTX GPU runs 7–14B models usably via Ollama/LM Studio. *Good for:* drafting, summarization, code completion on confidential material. *Not for:* the quality you're used to from frontier hosted models; expect a clear step down.
- **Workstation.** One consumer GPU (24–32 GB VRAM, roughly €2,000–3,500 for the card at 2026 prices) runs ~30B models fast and 70B slowly. *Good for:* a research group's shared "sensitive data" box running Ollama or vLLM.
- **Server / cluster.** For serving a group or fine-tuning: multi-GPU boxes or university HPC. *TODO(wg): how to request GPU access at Leiden (ALICE cluster), which partitions have GPUs, and whether a CML shared box exists.*
- **Cloud APIs.** For non-sensitive data, hosted APIs are the least setup and the best quality per euro. The line to watch is data governance, not cost. *TODO(wg): which providers are acceptable under CML/Leiden data policy, and for which data classifications.*

### Decision shortcut

> Public or already-published data → hosted API. Confidential but shareable within
> the institution → shared workstation/server with a local model. Under NDA or
> personal data → local only, and check the data-management plan either way. See the
> [data-handling notes in Best practices](/ai4ie-demo/best-practices/).
