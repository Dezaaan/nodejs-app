import type { Infrastructure } from "../infrastructure/createInfrastructure.js";
import { createNotesFeature } from "./notes/notes.feature.js";

export const createFeatures = (infrastructure: Infrastructure) => {
  const notes = createNotesFeature({
    database: infrastructure.database,
    logger: infrastructure.logger,
  });

  return {
    notes,
  };
};
