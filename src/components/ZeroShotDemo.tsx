import { useRef, useState } from "react";

type Result = { label: string; score: number };
type Classifier = (img: string, labels: string[]) => Promise<Result[]>;

const DEFAULT_LABELS = "intact appliance, corroded metal part, circuit board, plastic housing";

// Loaded lazily on first use so the page ships no model code up front.
let classifierPromise: Promise<Classifier> | null = null;
function getClassifier(onProgress: (msg: string) => void): Promise<Classifier> {
  classifierPromise ??= import("@huggingface/transformers").then(async ({ pipeline }) => {
    const pipe = await pipeline("zero-shot-image-classification", "Xenova/clip-vit-base-patch32", {
      progress_callback: (p: { status: string; file?: string; progress?: number }) => {
        if (p.status === "progress" && p.file?.endsWith(".onnx"))
          onProgress(`downloading model… ${Math.round(p.progress ?? 0)}%`);
      },
    });
    return (async (img: string, labels: string[]) =>
      (await pipe(img, labels)) as Result[]) as Classifier;
  });
  return classifierPromise;
}

/**
 * Zero-shot image classification (CLIP), running entirely in the browser via
 * transformers.js. The photo never leaves the machine — the point of the demo.
 */
export default function ZeroShotDemo() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [labels, setLabels] = useState(DEFAULT_LABELS);
  const [status, setStatus] = useState<string | null>(null);
  const [results, setResults] = useState<Result[] | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function onFile(file: File | undefined) {
    if (!file) return;
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(URL.createObjectURL(file));
    setResults(null);
  }

  async function classify() {
    if (!imageUrl) return;
    setStatus("loading model (≈150 MB on first use, then cached)…");
    try {
      const classifier = await getClassifier(setStatus);
      setStatus("classifying…");
      const candidates = labels
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean);
      setResults(await classifier(imageUrl, candidates));
      setStatus(null);
    } catch (err) {
      setStatus(`failed to load or run the model: ${err instanceof Error ? err.message : err}`);
    }
  }

  return (
    <div className="zsd not-content">
      <div className="zsd-controls">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={(e) => onFile(e.target.files?.[0])}
        />
        <label className="zsd-labels">
          Candidate labels (edit freely — that's the "zero-shot")
          <input type="text" value={labels} onChange={(e) => setLabels(e.target.value)} />
        </label>
        <button type="button" onClick={classify} disabled={!imageUrl || status !== null}>
          Classify — in this browser, nothing is uploaded
        </button>
      </div>
      {imageUrl && <img src={imageUrl} alt="Your photo, processed locally" className="zsd-img" />}
      {status && (
        <p className="zsd-status" role="status">
          {status}
        </p>
      )}
      {results && (
        <ul className="zsd-results">
          {results.map((r) => (
            <li key={r.label}>
              <span className="zsd-result-label">{r.label}</span>
              <span className="zsd-bar" style={{ width: `${Math.round(r.score * 100)}%` }} />
              <span className="zsd-score">{(r.score * 100).toFixed(1)}%</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
