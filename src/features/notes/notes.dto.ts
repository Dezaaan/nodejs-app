import type { Note } from "./notes.types.js";

export type NoteResponseDto = Pick<Note, "id" | "title" | "content"> & {
  createdAt: string;
  updatedAt: string;
};
