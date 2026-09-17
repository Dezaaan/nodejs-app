import { Logger } from "../../infrastructure/createLogger.js";
import { Database } from "../../infrastructure/database/database.types.js";
import { createNotesController } from "./notes.controller.js";
import { createPostgresNotesRepository } from "./notes.repository.postgres.js";
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
