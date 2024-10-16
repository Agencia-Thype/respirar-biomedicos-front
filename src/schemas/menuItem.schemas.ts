import { z } from "zod";
import { baseCategorySchema } from "./category.schemas";

export const baseMenuItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    resume: z.string(),
    description: z.string(),
    images: z
        .array(z.instanceof(File)) // Espera um array de arquivos do tipo File
        .min(1, "Pelo menos uma imagem é necessária"),
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
    name: z.string().min(1, "Nome é obrigatório"),
    price: z
        .string()
        .min(1, "Preço é obrigatório")
        .regex(/^\d+(\.\d{1,2})?$/, "Preço deve ser um número válido"),
    resume: z.string().min(1, "Resumo é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatória"),
    categoryId: z.string().min(1, "Categoria é obrigatória"),
    sale: z.boolean(),
    featuredProduct: z.boolean(),
    images: z
        .array(z.instanceof(File))
        .nonempty("Pelo menos uma imagem é necessária"),
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
