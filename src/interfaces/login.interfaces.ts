import { z } from "zod";
import { loginSchema } from "../schemas/login.schemas";

export interface ILoginContextData {
  login: (data: ILoginData) => Promise<void>
}

export type ILoginData = z.infer<typeof loginSchema>;
