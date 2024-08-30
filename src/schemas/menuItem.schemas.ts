import { z } from "zod";
import { baseCategorySchema } from "./category.schemas";

export const baseMenuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  resume: z.string(),
  description: z.string(),
  imageURL: z.array(z.string()),
  sale: z.boolean(),
  featuredProduct: z.boolean(),
  categoryId: z.string(),
  category: baseCategorySchema,
  orderItems: z.array(z.unknown()),
});

export const menuItemDataSchema = baseMenuItemSchema.omit({
  orderItems: true,
  category: true,
});

export const menuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const createMenuItemSchema = z.object({
  name: z.string().nonempty({ message: "Campo obrigatório" }),
  price: z.string().nonempty({ message: "Campo obrigatório" }).min(3),
  resume: z.string().nonempty({ message: "Campo obrigatório" }).max(300),
  description: z.string().nonempty({ message: "Campo obrigatório" }),
  sale: z.boolean(),
  featuredProduct: z.boolean(),
  imageURL: z.array(z.string().url("URL da imagem inválida")).max(5, "Você pode adicionar no máximo 5 URLs de imagem"),
  categoryId: z.string().nonempty({ message: "Campo obrigatório" }),
});

export const createMenuItemRequestSchema = createMenuItemSchema.extend({
  price: z.number(),
});

export const updateMenuItemSchema = z
  .object({
    name: z.string().optional(),
    imageURL: z.string().optional(),
    price: z.string().optional(),
    description: z.string().optional(),
    categoryId: z.string().nonempty({ message: "Escolha uma categoria" }),
  })
  .partial();

export const menuItemForOrder = z.object({
  id: z.string(),
  name: z.string(),
});

