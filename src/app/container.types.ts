import { AppConfig } from "../config/config.js";
import { createNotesFeature } from "../features/notes/notes.feature.js";
import { Logger } from "../infrastructure/createLogger.js";

export type AppContainer = {
  config: AppConfig;

  infrastructure: {
    logger: Logger;
  };
  features: {
    notes: ReturnType<typeof createNotesFeature>;
  };
};
