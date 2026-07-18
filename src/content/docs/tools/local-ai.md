---
title: Local AI & hardware
description: Run models on hardware you control; local inference servers, memory-to-model-size guidance, and a data-governance decision shortcut.
---

Run open-weight models (Llama, Qwen, Gemma, Mistral, DeepSeek families) on hardware
you control: the option that keeps NDA'd inventories and proprietary process data in
the building. Software first, then what to run it on.

## Local / self-hosted inference

- **[Ollama](https://ollama.com)**: one-command local model server with a curated library. *Use when:* you want a local model running in five minutes. Free. **Local.** *(checked 2026-07)*
- **[LM Studio](https://lmstudio.ai)**: desktop GUI for discovering, downloading, and chatting with local models (incl. Apple-silicon MLX builds). *Use when:* you prefer a GUI, or you're on a Mac. Free for personal/academic use. **Local.** *(checked 2026-07)*
- **[llama.cpp](https://github.com/ggml-org/llama.cpp)**: the inference engine underneath much of the ecosystem. *Use when:* you need maximum control or minimal footprint (it's what the two tools above build on). Free, open source. **Local.** *(checked 2026-07)*
- **[vLLM](https://github.com/vllm-project/vllm)**: high-throughput GPU serving with an OpenAI-compatible API. *Use when:* serving one model to a whole group from a shared GPU box. *Not for:* laptops. Free, open source. **Local.** *(checked 2026-07)*

Models to run with these live on the [datasets & models page](../../tools/data-and-models/#pretrained-models).

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

## Decision shortcut

> Public or already-published data → hosted API. Confidential but shareable within
> the institution → shared workstation/server with a local model. Under NDA or
> personal data → local only, and check the data-management plan either way. See the
> [data-handling notes in Best practices](../../best-practices/).
