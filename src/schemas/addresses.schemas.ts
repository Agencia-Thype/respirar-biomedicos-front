import { z } from "zod";

export const deliveryAddressSchema = z.object({
  id: z.string(),
  zip: z.string().min(8, { message: "Cep Inválido" }),
  city: z.string(),
  state: z.string(),
  complement: z.string(),
  street: z.string(),
  userId: z.string(),
  preferred: z.boolean(),
});
0;
export const cepAPIResponseSchema = z.object({
  cep: z.string().regex(/^\d{5}-?\d{3}$/),
  logradouro: z.string(),
  complemento: z.string(),
  bairro: z.string(),
  localidade: z.string(),
  uf: z.string().length(2),
  ibge: z.string().length(7),
  gia: z.string().optional(),
  ddd: z.string().length(2),
  siafi: z.string().length(4),
});

export const createAddressSchema = deliveryAddressSchema.omit({
  id: true,
  userId: true,
});

export const updateAddressSchema = deliveryAddressSchema.partial();
