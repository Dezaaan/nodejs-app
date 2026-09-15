import type { NextFunction, Request, Response } from "express";
import type { NotesService } from "./notes.service.js";
import type { CreateNoteInput } from "./notes.types.js";

export type NotesController = {
  getNotes(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void>;

  getNoteById(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void>;

  createNote(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void>;
};

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
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const note = await notesService.getNoteById(request.params.id);

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
      const note = await notesService.createNote(request.body);

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
