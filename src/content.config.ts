import { defineCollection, z } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { file } from "astro/loaders";
import { parse } from "yaml";
import { IE_TAGS, ML_TAGS, TYPE_TAGS } from "./data/tags";

const ieTag = z.enum(Object.keys(IE_TAGS) as [string, ...string[]]);
const mlTag = z.enum(Object.keys(ML_TAGS) as [string, ...string[]]);
const typeTag = z.enum(Object.keys(TYPE_TAGS) as [string, ...string[]]);

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  literature: defineCollection({
    loader: file("src/data/literature.yaml", { parser: (t) => parse(t) }),
    schema: z.object({
      title: z.string(),
      authors: z.string(), // short form ("Sterkens, W., et al."); full list lives at the DOI
      year: z.number().int().min(1950).max(2027),
      link: z.string().url(), // DOI link preferred, arXiv otherwise
      blurb: z.string().min(10).max(300), // one line: why read this
      ie: z.array(ieTag).default([]), // empty = not IE-specific (e.g. ML landmarks)
      ml: z.array(mlTag).default([]),
      type: z.array(typeTag).min(1),
      added: z.string().regex(/^\d{4}-\d{2}$/),
    }),
  }),
  applications: defineCollection({
    loader: file("src/data/applications.yaml", { parser: (t) => parse(t) }),
    schema: z.object({
      name: z.string(),
      ie: z.array(ieTag).min(1),
      ml: z.array(mlTag).min(1),
      summary: z.string().max(400),
      maturity: z.string().max(200), // honest prose, no rubric codes
      papers: z.array(z.string()).default([]), // ids into literature.yaml
      demo: z.string().optional(), // URL or site-relative link
    }),
  }),
};
