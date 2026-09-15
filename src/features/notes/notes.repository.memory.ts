import { NotesRepository } from "./notes.repository.js";
import { Note } from "./notes.types.js";

export const createInMemoryNotesRepository = (): NotesRepository => {
  const notes: Note[] = [
    {
      content: "test",
      createdAt: new Date(),
      id: "1",
      title: "test",
      updatedAt: new Date(),
    },
  ];

  const findAll = async (): Promise<Note[]> => {
    return notes.map((note) => ({ ...note }));
  };

  const findById = async (id: string): Promise<Note | null> => {
    const note = notes.find((note) => note.id === id);

    return note ? { ...note } : null;
  };

  const create = async (note: Note): Promise<Note> => {
    notes.push({ ...note });

    return { ...note };
  };

  return {
    findAll,
    findById,
    create,
  };
};
