import { z } from "zod";
import { createNoteSchema, noteIdParamsSchema } from "./notes.schema.js";
import type {
  NextFunction,
  ParamsDictionary,
  Request,
  Response,
} from "express-serve-static-core";

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
    request: Request<ParamsDictionary, unknown, CreateNoteInput>,
    response: Response,
    next: NextFunction,
  ): Promise<void>;
};

export type NotesService = {
  getNotes(): Promise<Note[]>;
  getNoteById(id: string): Promise<Note>;
  createNote(input: CreateNoteInput): Promise<Note>;
};

export type NotesFeature = {
  service: NotesService;
  controller: NotesController;
};

export type CreateNoteRequest = Request<
  ParamsDictionary,
  unknown,
  CreateNoteInput
>;

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

//TODO this needs to be updated
export type NoteRow = Pick<Note, "id" | "title" | "content"> & {
  created_at: Date;
  updated_at: Date;
};

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type NoteIdParams = z.infer<typeof noteIdParamsSchema>;
