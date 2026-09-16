import { AppConfig } from "../config/config.js";

export type Database = {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
};

export type Logger = {
  log: (message: string) => void;
  error: (message: string) => void;
};

export type Infrastructure = {
  database: Database;
  logger: Logger;
};

export const createInfrastructure = (config: AppConfig): Infrastructure => {
  const database = createDatabase(config.database);
  const logger = createLogger(config.logger);

  return {
    database,
    logger,
  };
};

function createDatabase(database: {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}): Database {
  return {
    connect: async () => {
      // TODO: implement database connection
      console.log("[LOG]", database);
    },
    disconnect: async () => {
      // TODO: implement database disconnection
      console.log("[LOG]", database);
    },
  };
}

function createLogger(logger: {
  level: "debug" | "info" | "warn" | "error";
}): Logger {
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
}
