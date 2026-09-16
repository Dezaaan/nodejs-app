import { NotFoundError } from "../../shared/errors/NotFoundError.js";
import type { NotesRepository } from "./notes.repository.js";
import type { CreateNoteInput, Note, NotesService } from "./notes.types.js";

type CreateNotesServiceDependencies = {
  notesRepository: NotesRepository;
};

export const createNotesService = ({
  notesRepository,
}: CreateNotesServiceDependencies): NotesService => {
  const getNotes = async (): Promise<Note[]> => {
    return notesRepository.findAll();
  };

  const getNoteById = async (id: string): Promise<Note> => {
    const note = await notesRepository.findById(id);

    if (!note) {
      throw new NotFoundError("Note not found");
    }

    return note;
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
