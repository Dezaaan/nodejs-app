import type { Database } from "../../infrastructure/database/database.types.js";
import type {
  Note,
  NoteRow,
  NotesRepository,
  UpdateNoteData,
} from "./notes.types.js";

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

  const update = async (note: UpdateNoteData): Promise<Note | null> => {
    const result = await database.query<NoteRow>(
      `
      UPDATE notes
      SET
        title = $2,
        content = $3,
        updated_at = $4
      WHERE id = $1
      RETURNING
        id,
        title,
        content,
        created_at,
        updated_at
    `,
      [note.id, note.title, note.content, note.updatedAt],
    );

    const row = result.rows[0];

    return row ? mapNoteRow(row) : null;
  };

  const deleteById = async (id: string): Promise<boolean> => {
    const result = await database.query(
      `
      DELETE FROM notes
      WHERE id = $1
    `,
      [id],
    );

    return result.rowCount === 1;
  };

  return {
    create,
    deleteById,
    findAll,
    findById,
    update,
  };
};
