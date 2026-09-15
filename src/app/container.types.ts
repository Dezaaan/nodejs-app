import { AppConfig } from "../config/config.js";
import { NotesController } from "../features/notes/notes.controller.js";
import { NotesRepository } from "../features/notes/notes.repository.js";
import { NotesService } from "../features/notes/notes.service.js";

export type AppContainer = {
  config: AppConfig;

  features: {
    notes: {
      repository: NotesRepository;
      service: NotesService;
      controller: NotesController;
    };
  };
};
