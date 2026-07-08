import { defineConfig } from "vitest/config";

// lcov is what Codecov ingests; text prints a summary in CI logs.
export default defineConfig({
  test: {
    coverage: { reporter: ["text", "lcov"] },
  },
});
