import { setupWorker } from "msw/browser";
import { exerciseHandlers } from "./exercise/exerciseHandlers";

const handlers = [...exerciseHandlers];
export const worker = setupWorker(...handlers);