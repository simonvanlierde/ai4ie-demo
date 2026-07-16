// Shared tag vocabulary: used by the literature list, the applications map,
// and the schema validation in content.config.ts. Add new tags here first;
// the collections test enforces that data files only use tags defined here.
export const IE_TAGS = {
  lca: "LCA & footprinting",
  mfa: "MFA & stocks and flows",
  io: "Input–output analysis",
  eol: "Waste, EoL & circularity",
  "urban-mining": "Urban mining & secondary resources",
  forecasting: "Forecasting & scenarios",
} as const;

export const ML_TAGS = {
  llm: "LLMs & agents",
  "nlp-extraction": "NLP & information extraction",
  cv: "Computer vision",
  segmentation: "Detection & segmentation",
  depth: "Depth & 3D geometry",
  "remote-sensing": "Remote sensing",
  "tabular-ml": "Tabular ML & regression",
  "time-series": "Time series",
  generative: "Generative models",
  foundation: "Foundation models & transformers",
} as const;

export const TYPE_TAGS = {
  "landmark-ml": "ML landmark",
  meta: "Research practice",
  review: "Review",
  method: "Method",
  dataset: "Dataset",
} as const;

export type IeTag = keyof typeof IE_TAGS;
export type MlTag = keyof typeof ML_TAGS;
export type TypeTag = keyof typeof TYPE_TAGS;
