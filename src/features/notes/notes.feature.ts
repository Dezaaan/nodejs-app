import { Database, Logger } from "../../infrastructure/createInfrastructure.js";
import { createNotesController, NotesController } from "./notes.controller.js";
import { createInMemoryNotesRepository } from "./notes.repository.memory.js";
import { createNotesService, NotesService } from "./notes.service.js";

export type NotesFeature = {
  service: NotesService;
  controller: NotesController;
};

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
