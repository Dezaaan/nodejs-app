import { Database } from "../../infrastructure/createDatabase.js";
import { Logger } from "../../infrastructure/createLogger.js";
import { createNotesController } from "./notes.controller.js";
import { createInMemoryNotesRepository } from "./notes.repository.memory.js";
import { createNotesService } from "./notes.service.js";

type CreateNotesFeatureDependencies = {
  database: Database;
  logger?: Logger;
};

export const createNotesFeature = (
  _dependencies: CreateNotesFeatureDependencies,
) => {
  console.log("[LOG]", _dependencies.database);
  const repository = createInMemoryNotesRepository();

  const service = createNotesService({
    notesRepository: repository,
  });

  const controller = createNotesController({
    notesService: service,
  });

  return {
    service,
    controller,
  };
};
