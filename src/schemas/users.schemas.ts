import { z } from "zod";
import {
  createAddressSchema,
  deliveryAddressSchema,
} from "./addresses.schemas";
import { UserDetailOrderSchema } from "./orders.schemas";


export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
});

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  phoneNumber: z.string(),
});

export const createFullUserSchema = createUserSchema.extend({
  addresses: z.array(createAddressSchema),
});

export const ResponseCreateUserSchema = userSchema.extend({
  addresses: z.array(deliveryAddressSchema),
});

export const listUserDetailsSchema = ResponseCreateUserSchema.extend({
  orders: z.array(UserDetailOrderSchema),
});
