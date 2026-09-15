import type { NotesRepository } from "./notes.repository.js";
import type { CreateNoteInput, Note } from "./notes.types.js";

export type NotesService = {
  getNotes(): Promise<Note[]>;
  getNoteById(id: string): Promise<Note | null>;
  createNote(input: CreateNoteInput): Promise<Note>;
};

type CreateNotesServiceDependencies = {
  notesRepository: NotesRepository;
};

export const createNotesService = ({
  notesRepository,
}: CreateNotesServiceDependencies): NotesService => {
  const getNotes = async (): Promise<Note[]> => {
    return notesRepository.findAll();
  };

  const getNoteById = async (id: string): Promise<Note | null> => {
    return notesRepository.findById(id);
  };

  const createNote = async (input: CreateNoteInput): Promise<Note> => {
    const now = new Date();

    const note: Note = {
      id: crypto.randomUUID(),
      title: input.title,
      content: input.content,
      createdAt: now,
      updatedAt: now,
    };

    return notesRepository.create(note);
  };

  return {
    getNotes,
    getNoteById,
    createNote,
  };
};
