import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { playwright } from "@vitest/browser-playwright";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    browser: {
      provider: playwright(),
      headless: true,
      enabled: true,
      // at least one instance is required
      instances: [{ browser: "chromium" }]
    },
  },
});
