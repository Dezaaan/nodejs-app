import { Router } from "express";
import type { AppContainer } from "../app/container.types.js";
import { createNotesRoutes } from "../features/notes/notes.routes.js";

export const createRoutes = (container: AppContainer): Router => {
  const router = Router();

  router.use(
    "/notes",
    createNotesRoutes({
      notesController: container.features.notes.controller,
    }),
  );

  return router;
};
