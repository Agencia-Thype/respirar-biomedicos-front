import { z } from "zod";
import {
  cepAPIResponseSchema,
  deliveryAddressSchema,
  updateAddressSchema,
} from "../schemas/addresses.schemas";
import { createAddressSchema } from "../schemas/addresses.schemas";
import { UseMutateFunction } from "@tanstack/react-query";

export interface AddressContextData {
  createAddress: UseMutateFunction<
    IReturnCreateAddress,
    unknown,
    ICreateAddress,
    unknown
  >;
  updateAddress: UseMutateFunction<
    IReturnCreateAddress,
    unknown,
    IUpdateAdress,
    unknown
  >;
  handleAddress: boolean
}

export type ICepAPI = z.infer<typeof cepAPIResponseSchema>;

export interface IUserAddress {
  addresses: z.infer<typeof deliveryAddressSchema>[];
}

export interface IUserAddressData {
  address: z.infer<typeof deliveryAddressSchema>;
}

export interface ICreateAddress {
  id: string;
  data: z.infer<typeof createAddressSchema>;
}

export type IReturnCreateAddress = z.infer<typeof deliveryAddressSchema>;

export interface IUpdateAdress {
  id: string
  data: z.infer<typeof updateAddressSchema>
}
