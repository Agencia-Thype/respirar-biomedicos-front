import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "O minimo é 6 caracteres" }),
});

export const forgotPassSchema = z.object({
  email: z.string().email({ message: "Email inválido" })
});

export const recoverPassSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "O minimo é 6 caracteres" }),
  code: z.string(),
});