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
