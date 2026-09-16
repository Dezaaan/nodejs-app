import { Logger } from "../../infrastructure/createLogger.js";
import { NotFoundError } from "../../shared/errors/NotFoundError.js";
import type { NotesRepository } from "./notes.repository.js";
import type { CreateNoteInput, Note, NotesService } from "./notes.types.js";

type CreateNotesServiceDependencies = {
  notesRepository: NotesRepository;
  logger: Logger;
};

export const createNotesService = ({
  notesRepository,
  logger,
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

    const createdNote = await notesRepository.create(note);

    logger.info("Note created", {
      noteId: createdNote.id,
    });

    return createdNote;
  };

  return {
    getNotes,
    getNoteById,
    createNote,
  };
};
