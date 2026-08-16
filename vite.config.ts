import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          environment: "node",
          include: ["test/unit/**/*.test.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: "component",
          include: ["test/component/**/*.test.tsx"],
          setupFiles: "./test/setup/component.setup.ts",
          browser: {
            provider: playwright(),
            headless: true,
            enabled: true,
            instances: [{ browser: "chromium" }],
          },
        },
      },
      {
        extends: true,
        test: {
          name: "integration",
          include: ["test/integration/**/*.test.tsx"],
          setupFiles: "./test/setup/integration.setup.ts",
          browser: {
            provider: playwright(),
            headless: true,
            enabled: true,
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});