import { randomUUID } from "node:crypto";

import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../../app.js";
import { createTestContainer } from "../helpers/createTestContainer.js";

const container = createTestContainer();
const app = createApp(container);

describe("Notes API", () => {
  beforeEach(async () => {
    await container.infrastructure.database.query("DELETE FROM notes");
  });

  afterAll(async () => {
    await container.infrastructure.database.close();
  });

  it("creates a note", async () => {
    const response = await request(app).post("/api/notes").send({
      title: "API note",
      content: "Created through HTTP",
    });

    expect(response.status).toBe(201);

    expect(response.body).toMatchObject({
      title: "API note",
      content: "Created through HTTP",
    });

    expect(response.body.id).toBeDefined();
    expect(response.body.createdAt).toBeDefined();
    expect(response.body.updatedAt).toBeDefined();
  });

  it("returns all notes", async () => {
    await request(app).post("/api/notes").send({
      title: "First note",
      content: "First content",
    });

    await request(app).post("/api/notes").send({
      title: "Second note",
      content: "Second content",
    });

    const response = await request(app).get("/api/notes");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it("returns a note by id", async () => {
    const createResponse = await request(app).post("/api/notes").send({
      title: "Specific note",
      content: "Specific content",
    });

    const id = createResponse.body.id;

    const response = await request(app).get(`/api/notes/${id}`);

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      id,
      title: "Specific note",
      content: "Specific content",
    });
  });

  it("returns 400 for invalid note input", async () => {
    const response = await request(app).post("/api/notes").send({
      title: "",
      content: "",
    });

    expect(response.status).toBe(400);

    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("returns 404 when note does not exist", async () => {
    const response = await request(app).get(`/api/notes/${randomUUID()}`);

    expect(response.status).toBe(404);

    expect(response.body).toEqual({
      error: {
        code: "NOT_FOUND",
        message: "Note not found",
      },
    });
  });

  it("returns 404 for unknown route", async () => {
    const response = await request(app).get("/api/does-not-exist");

    expect(response.status).toBe(404);

    expect(response.body.error.code).toBe("NOT_FOUND");
  });

  it("updates a note", async () => {
    const created = await request(app).post("/api/notes").send({
      title: "Original title",
      content: "Original content",
    });

    const response = await request(app)
      .patch(`/api/notes/${created.body.id}`)
      .send({
        title: "Updated title",
      });

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      id: created.body.id,
      title: "Updated title",
      content: "Original content",
    });
  });

  it("deletes a note", async () => {
    const created = await request(app).post("/api/notes").send({
      title: "Delete me",
      content: "Content",
    });

    const response = await request(app).delete(`/api/notes/${created.body.id}`);

    expect(response.status).toBe(204);

    const getResponse = await request(app).get(`/api/notes/${created.body.id}`);

    expect(getResponse.status).toBe(404);
  });
});
