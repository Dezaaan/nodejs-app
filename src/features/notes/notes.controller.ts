import type { Request, Response } from "express";

import {
  CreateNoteInput,
  createNoteSchema,
  NoteIdParams,
  noteIdParamsSchema,
  NotesQuery,
  notesQuerySchema,
  UpdateNoteInput,
  updateNoteSchema,
} from "./notes.schema.js";
import type { NextFunction, ParamsDictionary } from "express-serve-static-core";
import {
  mapNotesQueryToOptions,
  mapNoteToResponseDto,
} from "./notes.mapper.js";
import { mapPaginatedResult } from "../../shared/mapping/mapPaginatedResult.js";
import { NotesService } from "./notes.service.js";

export type NotesController = {
  getNotes(
    request: Request<ParamsDictionary, unknown, unknown, NotesQuery>,
    response: Response,
    next: NextFunction,
  ): Promise<void>;
  getNoteById(
    request: Request<NoteIdParams>,
    response: Response,
    next: NextFunction,
  ): Promise<void>;
  createNote(
    request: Request<ParamsDictionary, unknown, CreateNoteInput>,
    response: Response,
    next: NextFunction,
  ): Promise<void>;
  updateNote(
    request: Request<NoteIdParams, unknown, UpdateNoteInput>,
    response: Response,
    next: NextFunction,
  ): Promise<void>;
  deleteNote(
    request: Request<NoteIdParams>,
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
    request: Request<ParamsDictionary, unknown, unknown, NotesQuery>,
    response: Response,
  ): Promise<void> => {
    const query = notesQuerySchema.parse(request.query);

    const options = mapNotesQueryToOptions(query);

    const result = await notesService.getNotes(options);

    const responseDto = mapPaginatedResult(result, mapNoteToResponseDto);

    response.status(200).json(responseDto);
  };

  const getNoteById = async (
    request: Request<NoteIdParams>,
    response: Response,
  ): Promise<void> => {
    const { id } = noteIdParamsSchema.parse(request.params);

    const note = await notesService.getNoteById(id);

    response.status(200).json(mapNoteToResponseDto(note));
  };

  const createNote = async (
    request: Request<Record<string, never>, unknown, CreateNoteInput>,
    response: Response,
  ): Promise<void> => {
    const input = createNoteSchema.parse(request.body);

    const note = await notesService.createNote(input);

    response.status(201).json(mapNoteToResponseDto(note));
  };

  const updateNote = async (
    request: Request<NoteIdParams, unknown, UpdateNoteInput>,
    response: Response,
  ): Promise<void> => {
    const { id } = noteIdParamsSchema.parse(request.params);

    const input = updateNoteSchema.parse(request.body);
    const note = await notesService.updateNote(id, input);

    response.status(200).json(mapNoteToResponseDto(note));
  };

  const deleteNote = async (
    request: Request<NoteIdParams>,
    response: Response,
  ): Promise<void> => {
    const { id } = noteIdParamsSchema.parse(request.params);

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
