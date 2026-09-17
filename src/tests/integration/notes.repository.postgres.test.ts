import "dotenv/config";

import { randomUUID } from "node:crypto";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { createPostgresNotesRepository } from "../../features/notes/notes.repository.postgres.js";
import { Note } from "../../features/notes/notes.types.js";
import { createTestDatabase } from "../helpers/createTestDatabase.js";

const database = createTestDatabase();

const repository = createPostgresNotesRepository({
  database,
});

describe("PostgresNotesRepository", () => {
  beforeEach(async () => {
    await database.query("DELETE FROM notes");
  });

  afterAll(async () => {
    await database.close();
  });

  it("creates a note", async () => {
    const now = new Date();

    const note: Note = {
      id: randomUUID(),
      title: "Integration test",
      content: "PostgreSQL content",
      createdAt: now,
      updatedAt: now,
    };

    const result = await repository.create(note);

    expect(result.id).toBe(note.id);
    expect(result.title).toBe(note.title);
    expect(result.content).toBe(note.content);
  });

  it("finds all notes", async () => {
    const now = new Date();

    await repository.create({
      id: randomUUID(),
      title: "Note one",
      content: "Content one",
      createdAt: now,
      updatedAt: now,
    });

    await repository.create({
      id: randomUUID(),
      title: "Note two",
      content: "Content two",
      createdAt: now,
      updatedAt: now,
    });

    const notes = await repository.findAll();

    expect(notes).toHaveLength(2);
  });

  it("finds a note by id", async () => {
    const now = new Date();

    const note: Note = {
      id: randomUUID(),
      title: "Find me",
      content: "Content",
      createdAt: now,
      updatedAt: now,
    };

    await repository.create(note);

    const result = await repository.findById(note.id);

    expect(result).not.toBeNull();
    expect(result?.id).toBe(note.id);
    expect(result?.title).toBe("Find me");
  });

  it("returns null when note does not exist", async () => {
    const result = await repository.findById(randomUUID());

    expect(result).toBeNull();
  });
});
