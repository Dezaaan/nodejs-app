import { AppConfig } from "../config/config.js";
import { createNotesFeature } from "../features/notes/notes.feature.js";
import { Logger } from "../infrastructure/createLogger.js";
import { Database } from "../infrastructure/database/database.types.js";

export type AppContainer = {
  config: AppConfig;
  infrastructure: {
    logger: Logger;
    database: Database;
  };
  features: {
    notes: ReturnType<typeof createNotesFeature>;
  };
};
