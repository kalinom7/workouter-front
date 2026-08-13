import "vitest-browser-react";
import '@/index.css';
import { beforeAll, afterEach, afterAll } from "vitest";
import { worker } from '../integration/mocks/browser';

beforeAll(() => worker.start({ onUnhandledRequest: "error" }));
afterEach(() => worker.resetHandlers());
afterAll(() => worker.stop());