import { z } from "zod";
import {
  ResponseCreateUserSchema,
  createFullUserSchema,
  createUserSchema,
  listUserDetailsSchema,
} from "../schemas/users.schemas";
import { UseMutateFunction } from "@tanstack/react-query";

export interface IUserContextData {
  createUser: UseMutateFunction<
    IResponseCreateUser,
    any,
    ICreateUserMutation,
    unknown
  >;
  listUserDetail: UseMutateFunction<IListUserDetails, any, string, unknown>;
  listUserProfile: UseMutateFunction<IListUserDetails, any, void, unknown>;
  userDetails: IListUserDetails;
  userProfile: IListUserDetails;
}

export type ICreateUser = z.infer<typeof createUserSchema>;

export type ICreateUserData = z.infer<typeof createFullUserSchema>;

export interface ICreateUserMutation {
  data: ICreateUserData;
}

export type IResponseCreateUser = z.infer<typeof ResponseCreateUserSchema>;

export type IListUserDetails = z.infer<typeof listUserDetailsSchema>;
