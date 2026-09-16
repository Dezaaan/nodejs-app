import { Database } from "../../infrastructure/createDatabase.js";
import { Logger } from "../../infrastructure/createLogger.js";
import { createNotesController } from "./notes.controller.js";
import { createInMemoryNotesRepository } from "./notes.repository.memory.js";
import { createNotesService } from "./notes.service.js";

type CreateNotesFeatureDependencies = {
  database: Database;
  logger: Logger;
};

export const createNotesFeature = ({
  database,
  logger,
}: CreateNotesFeatureDependencies) => {
  console.log("[LOG]", database);
  const repository = createInMemoryNotesRepository();

  const service = createNotesService({
    notesRepository: repository,
    logger: logger,
  });

  const controller = createNotesController({
    notesService: service,
  });

  return {
    service,
    controller,
  };
};
