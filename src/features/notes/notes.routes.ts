import { Router } from "express";
import type { NotesController } from "./notes.types.js";
import { asyncHandler } from "../../shared/http/asyncHandler.js";

type CreateNotesRoutesDependencies = {
  notesController: NotesController;
};

export const createNotesRoutes = ({
  notesController,
}: CreateNotesRoutesDependencies): Router => {
  const router = Router();

  router.delete("/:id", asyncHandler(notesController.deleteNote));
  router.get("/", asyncHandler(notesController.getNotes));
  router.get("/:id", asyncHandler(notesController.getNoteById));
  router.post("/", asyncHandler(notesController.createNote));
  router.put("/:id", asyncHandler(notesController.updateNote));

  return router;
};
