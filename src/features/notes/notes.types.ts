import { z } from "zod";
import { createNoteSchema, noteIdParamsSchema } from "./notes.schema.js";
import type { NextFunction, Request, Response } from "express";

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
    request: Request<Record<string, never>, unknown, CreateNoteInput>,
    response: Response,
    next: NextFunction,
  ): Promise<void>;
};

export type NotesService = {
  getNotes(): Promise<Note[]>;
  getNoteById(id: string): Promise<Note | null>;
  createNote(input: CreateNoteInput): Promise<Note>;
};

export type NotesFeature = {
  service: NotesService;
  controller: NotesController;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type NoteIdParams = z.infer<typeof noteIdParamsSchema>;
