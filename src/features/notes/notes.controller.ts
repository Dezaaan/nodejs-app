import type { Request, Response } from "express";

import {
  CreateNoteInput,
  NoteIdParams,
  UpdateNoteInput,
} from "./notes.schema.js";
import type { NextFunction } from "express-serve-static-core";
import { mapNoteToResponseDto } from "./notes.mapper.js";
import { NotesService } from "./notes.service.js";
import { NotesQueryOptions } from "./notes.types.js";
import {
  getValidatedBody,
  getValidatedParams,
  getValidatedQuery,
} from "../../shared/validation/validatedRequest.js";

type ControllerHandler = (
  request: Request,
  response: Response,
  next: NextFunction,
) => Promise<void>;

export type NotesController = {
  getNotes: ControllerHandler;
  getNoteById: ControllerHandler;
  createNote: ControllerHandler;
  updateNote: ControllerHandler;
  deleteNote: ControllerHandler;
};

type CreateNotesControllerDependencies = {
  notesService: NotesService;
};

export const createNotesController = ({
  notesService,
}: CreateNotesControllerDependencies): NotesController => {
  const getNotes = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const query = getValidatedQuery<NotesQueryOptions>(request);

    const result = await notesService.getNotes(query);

    response.status(200).json(result);
  };

  const getNoteById = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const { id } = getValidatedParams<NoteIdParams>(request);
    const note = await notesService.getNoteById(id);

    response.status(200).json(mapNoteToResponseDto(note));
  };

  const createNote = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const body = getValidatedBody<CreateNoteInput>(request);

    const note = await notesService.createNote(body);

    response.status(201).json(mapNoteToResponseDto(note));
  };

  const updateNote = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const { id } = getValidatedParams<NoteIdParams>(request);
    const body = getValidatedBody<UpdateNoteInput>(request);

    const note = await notesService.updateNote(id, body);

    response.status(200).json(mapNoteToResponseDto(note));
  };

  const deleteNote = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const { id } = getValidatedParams<NoteIdParams>(request);
    await notesService.deleteNote(id);

    response.status(204).send();
  };

  return {
    createNote,
    deleteNote,
    getNoteById,
    getNotes,
    updateNote,
  };
};
