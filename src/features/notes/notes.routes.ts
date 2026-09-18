import { Router } from "express";
import { asyncHandler } from "../../shared/http/asyncHandler.js";
import { NotesController } from "./notes.controller.js";
import { validateRequest } from "../../shared/validation/validateRequest.js";
import {
  notesQuerySchema,
  noteIdParamsSchema,
  createNoteSchema,
  updateNoteSchema,
} from "./notes.schema.js";

type CreateNotesRoutesDependencies = {
  notesController: NotesController;
};

export const createNotesRoutes = ({
  notesController,
}: CreateNotesRoutesDependencies): Router => {
  const router = Router();

  router.get(
    "/",
    validateRequest({
      query: notesQuerySchema,
    }),
    asyncHandler(notesController.getNotes),
  );

  router.get(
    "/:id",
    validateRequest({
      params: noteIdParamsSchema,
    }),
    asyncHandler(notesController.getNoteById),
  );

  router.post(
    "/",
    validateRequest({
      body: createNoteSchema,
    }),
    asyncHandler(notesController.createNote),
  );

  router.patch(
    "/:id",
    validateRequest({
      params: noteIdParamsSchema,
      body: updateNoteSchema,
    }),
    asyncHandler(notesController.updateNote),
  );

  router.delete(
    "/:id",
    validateRequest({
      params: noteIdParamsSchema,
    }),
    asyncHandler(notesController.deleteNote),
  );

  return router;
};
