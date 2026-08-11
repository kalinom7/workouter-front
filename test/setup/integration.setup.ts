import "vitest-browser-react";
import { beforeAll, afterEach, afterAll } from "vitest";
import { worker } from "test/integration/mocks/browser";

beforeAll(() => worker.start({ onUnhandledRequest: "error" }));
afterEach(() => worker.resetHandlers());
afterAll(() => worker.stop());