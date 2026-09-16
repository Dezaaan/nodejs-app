import { AppConfig } from "../config/config.js";
import { createDatabase } from "./createDatabase.js";
import { createLogger } from "./createLogger.js";

export type Infrastructure = ReturnType<typeof createInfrastructure>;

export const createInfrastructure = (config: AppConfig) => {
  const database = createDatabase(config.database);
  const logger = createLogger();

  return {
    database,
    logger,
  };
};
