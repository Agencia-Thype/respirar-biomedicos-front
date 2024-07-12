import { z } from "zod";

export const baseCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const categorySchemaData = z.object({
  name: z.string()
})
