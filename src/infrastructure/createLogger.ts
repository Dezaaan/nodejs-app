export type Logger = {
  info(message: string, meta?: unknown): void;
  error(message: string, meta?: unknown): void;
  warn(message: string, meta?: unknown): void;
};

export const createLogger = (): Logger => ({
  info: (message, meta) => {
    console.log(message, meta ?? "");
  },

  error: (message, meta) => {
    console.error(message, meta ?? "");
  },

  warn: (message, meta) => {
    console.warn(message, meta ?? "");
  },
});
