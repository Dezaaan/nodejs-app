import type { NextFunction, Request, Response } from "express";
import type {
  CreateNoteInput,
  NoteIdParams,
  NotesController,
  NotesService,
} from "./notes.types.js";
import { createNoteSchema, noteIdParamsSchema } from "./notes.schema.js";

type CreateNotesControllerDependencies = {
  notesService: NotesService;
};

export const createNotesController = ({
  notesService,
}: CreateNotesControllerDependencies): NotesController => {
  const getNotes = async (
    _request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const notes = await notesService.getNotes();

      response.status(200).json(notes);
    } catch (error) {
      next(error);
    }
  };

  const getNoteById = async (
    request: Request<NoteIdParams>,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = noteIdParamsSchema.parse(request.params);
      const note = await notesService.getNoteById(id);

      if (!note) {
        response.status(404).json({
          message: "Note not found",
        });

        return;
      }

      response.status(200).json(note);
    } catch (error) {
      next(error);
    }
  };

  const createNote = async (
    request: Request<Record<string, never>, unknown, CreateNoteInput>,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const input = createNoteSchema.parse(request.body);
      const note = await notesService.createNote(input);

      response.status(201).json(note);
    } catch (error) {
      next(error);
    }
  };

  return {
    getNotes,
    getNoteById,
    createNote,
  };
};
