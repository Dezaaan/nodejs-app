import { Router } from "express";
import { asyncHandler } from "../../shared/http/asyncHandler.js";
import { NotesController } from "./notes.controller.js";

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
  router.patch("/:id", asyncHandler(notesController.updateNote));
  router.post("/", asyncHandler(notesController.createNote));

  return router;
};
