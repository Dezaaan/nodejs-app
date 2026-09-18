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
  updateNote(
    request: Request<ParamsDictionary, unknown, CreateNoteInput>,
    response: Response,
    next: NextFunction,
  ): Promise<void>;
  deleteNote(
    request: Request<ParamsDictionary, unknown, CreateNoteInput>,
    response: Response,
    next: NextFunction,
  ): Promise<void>;
};

export type NotesService = {
  createNote(input: CreateNoteInput): Promise<Note>;
  deleteNote: (id: string) => Promise<void>;
  getNoteById(id: string): Promise<Note>;
  getNotes(): Promise<Note[]>;
  updateNote: (id: string, input: UpdateNoteInput) => Promise<Note>;
};

export type NotesRepository = {
  create(note: Note): Promise<Note>;
  deleteById: (id: string) => Promise<boolean>;
  findAll(): Promise<Note[]>;
  findById(id: string): Promise<Note | null>;
  update: (note: UpdateNoteData) => Promise<Note | null>;
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

export type NoteRow = Pick<Note, "id" | "title" | "content"> & {
  created_at: Date;
  updated_at: Date;
};

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type NoteIdParams = z.infer<typeof noteIdParamsSchema>;
export type UpdateNoteInput = Pick<Note, "title" | "content">;
export type UpdateNoteData = Omit<Note, "createdAt">;
