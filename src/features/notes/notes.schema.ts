import { z } from "zod";

export const createNoteSchema = z
  .object({
    title: z.string().trim().min(1).max(200),
    content: z.string().trim().min(1),
  })
  .strict();

export const updateNoteSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export const noteIdParamsSchema = z.object({
  id: z.uuid(),
});

export const notesQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().trim().min(1).optional(),
  title: z.string().trim().min(1).optional(),
  sortBy: z.enum(["createdAt", "updatedAt", "title"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type NotesQuery = z.infer<typeof notesQuerySchema>;
