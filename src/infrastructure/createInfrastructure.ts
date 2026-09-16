import { AppConfig } from "../config/config.js";
import { createLogger } from "./createLogger.js";
import { createDatabase } from "./database/database.js";

export type Infrastructure = ReturnType<typeof createInfrastructure>;

export const createInfrastructure = (config: AppConfig) => {
  const database = createDatabase(config.database);
  const logger = createLogger();

  return {
    database,
    logger,
  };
};
