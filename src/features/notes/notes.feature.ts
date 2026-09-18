import { Logger } from "../../infrastructure/createLogger.js";
import { Database } from "../../infrastructure/database/database.types.js";
import { createNotesController, NotesController } from "./notes.controller.js";
import { createPostgresNotesRepository } from "./notes.repository.postgres.js";
import { createNotesService, NotesService } from "./notes.service.js";

export type NotesFeature = {
  service: NotesService;
  controller: NotesController;
};

type CreateNotesFeatureDependencies = {
  database: Database;
  logger: Logger;
};

export const createNotesFeature = ({
  database,
  logger,
}: CreateNotesFeatureDependencies) => {
  const repository = createPostgresNotesRepository({
    database,
  });

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
