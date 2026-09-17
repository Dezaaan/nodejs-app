import type { Database } from "../../infrastructure/database/database.types.js";
import type { NotesRepository } from "./notes.repository.js";
import type { Note } from "./notes.types.js";

type NoteRow = {
  id: string;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
};

type CreatePostgresNotesRepositoryDependencies = {
  database: Database;
};

const mapNoteRow = (row: NoteRow): Note => ({
  id: row.id,
  title: row.title,
  content: row.content,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export const createPostgresNotesRepository = ({
  database,
}: CreatePostgresNotesRepositoryDependencies): NotesRepository => {
  const findAll = async (): Promise<Note[]> => {
    const result = await database.query<NoteRow>(
      `
        SELECT
          id,
          title,
          content,
          created_at,
          updated_at
        FROM notes
        ORDER BY created_at DESC
      `,
    );

    return result.rows.map(mapNoteRow);
  };

  const findById = async (id: string): Promise<Note | null> => {
    const result = await database.query<NoteRow>(
      `
        SELECT
          id,
          title,
          content,
          created_at,
          updated_at
        FROM notes
        WHERE id = $1
      `,
      [id],
    );

    const row = result.rows[0];

    return row ? mapNoteRow(row) : null;
  };

  const create = async (note: Note): Promise<Note> => {
    const result = await database.query<NoteRow>(
      `
        INSERT INTO notes (
          id,
          title,
          content,
          created_at,
          updated_at
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING
          id,
          title,
          content,
          created_at,
          updated_at
      `,
      [note.id, note.title, note.content, note.createdAt, note.updatedAt],
    );

    return mapNoteRow(result.rows[0]!);
  };

  return {
    findAll,
    findById,
    create,
  };
};
