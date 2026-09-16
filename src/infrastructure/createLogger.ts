export type Logger = {
  log: (message: string) => void;
  error: (message: string) => void;
};

export const createLogger = (logger: {
  level: "debug" | "info" | "warn" | "error";
}): Logger => {
  return {
    log: (message: string) => {
      // TODO: implement logging
      console.log("[LOG]", message);
    },
    error: (message: string) => {
      // TODO: implement error logging
      console.log("[LOG]", message);
      console.log("[LOG]", logger);
    },
  };
};
