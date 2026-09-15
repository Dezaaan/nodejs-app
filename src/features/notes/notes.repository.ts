import type { Note } from "./notes.types.js";

export type NotesRepository = {
  findAll(): Promise<Note[]>;
  findById(id: string): Promise<Note | null>;
  create(note: Note): Promise<Note>;
};
