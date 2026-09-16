import { AppConfig } from "../config/config.js";
import { createNotesFeature } from "../features/notes/notes.feature.js";

export type AppContainer = {
  config: AppConfig;

  features: {
    notes: ReturnType<typeof createNotesFeature>;
  };
};
