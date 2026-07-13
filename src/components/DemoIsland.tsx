import { useState } from "react";
import { countWords } from "./wordCount";

/**
 * Example interactive "island": a placeholder demo showing the pattern, not a real
 * AI tool. Anything that calls a model needs a backend; host that separately and embed
 * it with an <iframe>. A purely client-side widget (like this) ships as a static island
 * with zero server code. Copy this file to build your own, then drop
 * `<YourDemo client:visible />` into an .mdx page (hydrates only when scrolled into view).
 */
export default function DemoIsland() {
  const [text, setText] = useState("");
  const words = countWords(text);
  return (
    <div className="demo-island not-content">
      <label>
        Placeholder demo: type something
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Replace this island with a real IE demo…"
        />
      </label>
      <output>
        {words} word{words === 1 ? "" : "s"} · {text.length} characters
      </output>
    </div>
  );
}
