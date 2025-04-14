import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ["test/unit/**/index.ts"],
    setupFiles: ["test/index.ts"],
    environment: 'node'
  },
});
