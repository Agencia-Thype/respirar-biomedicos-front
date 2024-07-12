import { AxiosError } from "axios";
import { UseMutateFunction } from "@tanstack/react-query";
import {
  baseMenuItemSchema,
  createMenuItemRequestSchema,
  createMenuItemSchema,
  menuItemDataSchema,
} from "../schemas/menuItem.schemas";
import { z } from "zod";
import { ICategoryData } from "./categories.intefaces";

export interface IMenuItemContext {
  data: IMenuItemInterfaceData[];
  isFetching: boolean;
  listItemDetail: UseMutateFunction<
    {
      id: string;
      name: string;
      price: number;
      description: string;
      imageURL: string;
      categoryId: string;
    },
    any,
    string,
    unknown
  >;
  createMenuItem: UseMutateFunction<
    IMenuItemInterfaceData,
    any,
    IMenuItemMutation,
    unknown
  >;
  menuItemDeatilData: IMenuItemData | undefined;
  updateMenuItem: UseMutateFunction<
    IMenuItemInterfaceData,
    AxiosError<unknown, any>,
    IMenuItemUpdateMutation,
    unknown
  >;

  deleteMenuItem: UseMutateFunction<any, unknown, string, unknown>;
}

export type IMenuItemInterfaceData = z.infer<typeof baseMenuItemSchema> & {
  categoryId: ICategoryData;
};

export type IMenuItemData = z.infer<typeof menuItemDataSchema>;

export type IMenuItemCreate = z.infer<typeof createMenuItemSchema>;
export type IMenuItemMutation = z.infer<typeof createMenuItemRequestSchema>;

export type IMenuItemUpdate = Partial<IMenuItemCreate>;
export type IMenuItemUpdateMutation = {
  newData: IMenuItemUpdate;
  itemId: string;
};
