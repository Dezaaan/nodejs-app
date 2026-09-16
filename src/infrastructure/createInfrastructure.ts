import { AppConfig } from "../config/config.js";
import { createDatabase, Database } from "./createDatabase.js";
import { createLogger, Logger } from "./createLogger.js";

export type Infrastructure = {
  database: Database;
  logger: Logger;
};

export const createInfrastructure = (config: AppConfig): Infrastructure => {
  const database = createDatabase(config.database);
  const logger = createLogger();

  return {
    database,
    logger,
  };
};
