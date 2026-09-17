import { vi } from "vitest";
import { Logger } from "../../infrastructure/createLogger.js";

export const createTestLogger = (): Logger => ({
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
});
