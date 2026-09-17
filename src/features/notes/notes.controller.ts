import type { Request, Response } from "express";
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
  ): Promise<void> => {
    const notes = await notesService.getNotes();

    response.status(200).json(notes);
  };

  const getNoteById = async (
    request: Request<NoteIdParams>,
    response: Response,
  ): Promise<void> => {
    const { id } = noteIdParamsSchema.parse(request.params);

    const note = await notesService.getNoteById(id);

    response.status(200).json(note);
  };

  const createNote = async (
    request: Request<Record<string, never>, unknown, CreateNoteInput>,
    response: Response,
  ): Promise<void> => {
    const input = createNoteSchema.parse(request.body);

    const note = await notesService.createNote(input);

    response.status(201).json(note);
  };

  return {
    getNotes,
    getNoteById,
    createNote,
  };
};
