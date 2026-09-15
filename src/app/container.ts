import type { AppConfig } from "../config/config.js";
import { createNotesController } from "../features/notes/notes.controller.js";
import { createInMemoryNotesRepository } from "../features/notes/notes.repository.memory.js";
import { createNotesService } from "../features/notes/notes.service.js";
import type { AppContainer } from "./container.types.js";

export const createContainer = (config: AppConfig): AppContainer => {
  const notesRepository = createInMemoryNotesRepository();

  const notesService = createNotesService({
    notesRepository,
  });

  const notesController = createNotesController({
    notesService,
  });

  return {
    config,

    features: {
      notes: {
        repository: notesRepository,
        service: notesService,
        controller: notesController,
      },
    },
  };
};
