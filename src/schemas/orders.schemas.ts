import { z } from "zod";
import {
  OrderForUserDetailSchema,
  orderItemDataSchema,
  orderItemForOrder,
  orderItemSchema,
} from "./orderItems.schemas";

import { deliveryAddressSchema } from "./addresses.schemas";

export const BaseOrderSchema = z.object({
  id: z.string(), //
  orderNumber: z.number(),
  createdAt: z.date(), //
  updatedAt: z.date(), //
  paymentMethod: z.string(), //
  orderConfirm: z.boolean(), //
  finishedOrder: z.boolean(), //
  orderItems: z.array(orderItemSchema),
  userId: z.string(),
  deliveryAddress: deliveryAddressSchema, //
});

export const UserDetailOrderSchema = z.object({
  id: z.string(), //
  orderNumber: z.number(),
  createdAt: z.date(), //
  updatedAt: z.date(), //
  paymentMethod: z.string(), //
  orderConfirm: z.boolean(), //
  finishedOrder: z.boolean(), //
  confirmDelivery: z.boolean(),
  orderItems: z.array(OrderForUserDetailSchema), //
  deliveryAddress: deliveryAddressSchema, //
  userId: z.string(),
});

export const createOrderSchema = BaseOrderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  orderConfirm: true,
  finishedOrder: true,
  deliveryAddress: true,
}).extend({
  userId: z.string(),
  deliveryAddress: z.string(),
  confirmDelivery: z.boolean(), // Adicione confirmDelivery aqui
});

export const returnCreateOrderSchema = BaseOrderSchema.extend({
  userId: z.string(),
});

export const returnOrderDataSchema = BaseOrderSchema.extend({
  orderItems: z.array(UserDetailOrderSchema),
});

export const User = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
});

export const Order = z.object({
  id: z.string(),
  orderNumber: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  paymentMethod: z.string(),
  orderConfirm: z.boolean(),
  confirmDelivery: z.boolean(),
  finishedOrder: z.boolean(),
  orderItems: z.array(orderItemForOrder),
  user: User,
  deliveryAddress: deliveryAddressSchema,
});
