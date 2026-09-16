import { Router } from "express";
import { NotesController } from "./notes.types.js";
import { asyncHandler } from "../../shared/http/asyncHandler.js";

type CreateNotesRoutesDependencies = {
  notesController: NotesController;
};

export const createNotesRoutes = ({
  notesController,
}: CreateNotesRoutesDependencies): Router => {
  const router = Router();

  router.get("/", asyncHandler(notesController.getNotes));

  router.get("/:id", asyncHandler(notesController.getNoteById));

  router.post("/", asyncHandler(notesController.createNote));

  return router;
};
