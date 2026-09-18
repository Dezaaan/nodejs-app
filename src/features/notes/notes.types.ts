import { z } from "zod";
import {
  createNoteSchema,
  noteIdParamsSchema,
  NotesQuery,
} from "./notes.schema.js";
import type {
  NextFunction,
  ParamsDictionary,
  Request,
  Response,
} from "express-serve-static-core";
import {
  PaginatedResult,
  PaginationOptions,
} from "../../shared/pagination/pagination.types.js";

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
  getNotes(options: PaginationOptions): Promise<PaginatedResult<Note>>;
  updateNote: (id: string, input: UpdateNoteInput) => Promise<Note>;
};

export type NotesRepository = {
  create(note: Note): Promise<Note>;
  deleteById: (id: string) => Promise<boolean>;
  findPaginated(options: NotesQueryOptions): Promise<{
    items: Note[];
    totalItems: number;
  }>;
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

export type NoteResponseDto = Pick<Note, "id" | "title" | "content"> & {
  createdAt: string;
  updatedAt: string;
};

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type NoteIdParams = z.infer<typeof noteIdParamsSchema>;
export type UpdateNoteInput = Pick<Note, "title" | "content">;
export type UpdateNoteData = Omit<Note, "createdAt">;

export type NotesSortField = "createdAt" | "updatedAt" | "title";

export type SortOrder = "asc" | "desc";

export type NotesQueryOptions = {
  page: number;
  pageSize: number;

  search?: string;
  title?: string;

  sortBy: NotesSortField;
  sortOrder: SortOrder;
};
