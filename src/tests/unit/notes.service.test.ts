import { NotesRepository } from "../../features/notes/notes.repository.js";
import { createNotesService } from "../../features/notes/notes.service.js";
import { createTestLogger } from "../helpers/createTestLogger.js";
import { describe, expect, it, vi } from "vitest";

const createTestRepository = (): NotesRepository => ({
  findAll: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
});

describe("NotesService", () => {
  it("returns all notes", async () => {
    const repository = createTestRepository();
    const logger = createTestLogger();

    const notes = [
      {
        id: "1",
        title: "First note",
        content: "Content",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    vi.mocked(repository.findAll).mockResolvedValue(notes);

    const service = createNotesService({
      notesRepository: repository,
      logger,
    });

    const result = await service.getNotes();

    expect(result).toEqual(notes);
    expect(repository.findAll).toHaveBeenCalledOnce();
  });
  it("throws NotFoundError when note does not exist", async () => {
    const repository = createTestRepository();
    const logger = createTestLogger();

    vi.mocked(repository.findById).mockResolvedValue(null);

    const service = createNotesService({
      notesRepository: repository,
      logger,
    });

    await expect(service.getNoteById("missing-id")).rejects.toMatchObject({
      code: "NOT_FOUND",
      statusCode: 404,
    });
  });
  it("creates a note", async () => {
    const repository = createTestRepository();
    const logger = createTestLogger();

    vi.mocked(repository.create).mockImplementation(async (note) => note);

    const service = createNotesService({
      notesRepository: repository,
      logger,
    });

    const result = await service.createNote({
      title: "New note",
      content: "New content",
    });

    expect(result.title).toBe("New note");
    expect(result.content).toBe("New content");

    expect(result.id).toBeDefined();
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.updatedAt).toBeInstanceOf(Date);

    expect(repository.create).toHaveBeenCalledOnce();

    expect(logger.info).toHaveBeenCalledWith("Note created", {
      noteId: result.id,
    });
  });
});
