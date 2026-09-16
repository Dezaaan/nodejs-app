export type LogMetadata = Record<string, unknown>;

export type Logger = {
  info(message: string, metadata?: LogMetadata): void;
  warn(message: string, metadata?: LogMetadata): void;
  error(message: string, metadata?: LogMetadata): void;
};

export const createLogger = (): Logger => {
  const info = (message: string, metadata?: LogMetadata): void => {
    console.log(message, metadata ?? {});
  };

  const warn = (message: string, metadata?: LogMetadata): void => {
    console.warn(message, metadata ?? {});
  };

  const error = (message: string, metadata?: LogMetadata): void => {
    console.error(message, metadata ?? {});
  };

  return {
    info,
    warn,
    error,
  };
};
