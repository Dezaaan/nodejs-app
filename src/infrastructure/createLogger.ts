export type LogMetadata = Record<string, unknown>;

export type Logger = {
  info(message: string, metadata?: LogMetadata): void;
  warn(message: string, metadata?: LogMetadata): void;
  error(message: string, metadata?: LogMetadata): void;
};

type LogLevel = "info" | "warn" | "error";

const log = (
  level: LogLevel,
  message: string,
  metadata?: LogMetadata,
): void => {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...metadata,
  };

  const serialized = JSON.stringify(entry);

  switch (level) {
    case "error":
      console.error(serialized);
      break;

    case "warn":
      console.warn(serialized);
      break;

    default:
      console.log(serialized);
  }
};

export const createLogger = (): Logger => ({
  info: (message, metadata) => {
    log("info", message, metadata);
  },

  warn: (message, metadata) => {
    log("warn", message, metadata);
  },

  error: (message, metadata) => {
    log("error", message, metadata);
  },
});
