import { AxiosError } from "axios";
import { UseMutateFunction } from "@tanstack/react-query";
import {
  baseMenuItemSchema,
  createMenuItemRequestSchema,
  createMenuItemSchema,
  menuItemCardDataSchema,
  menuItemCardSchema,
  menuItemDataSchema,
} from "../schemas/menuItem.schemas";
import { z } from "zod";
import { ICategoryData } from "./categories.intefaces";

export interface IMenuItemContext {
  data: IMenuItemCardInterfaceData[];
  isFetching: boolean;
  listItemDetail: UseMutateFunction<
    {
      id: string;
      name: string;
      price: number;
      resume: string;
      description: string;
      categoryId: string;
      sale: boolean;
      featuredProduct: boolean;
      images: {
        filePath: string;
    }[];
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

export type IMenuItemCardInterfaceData = z.infer<typeof menuItemCardSchema> & {
  categoryId: ICategoryData;
};

export type IMenuItemData = z.infer<typeof menuItemCardDataSchema>;

export type IMenuItemCreate = z.infer<typeof createMenuItemSchema>;
export type IMenuItemMutation = z.infer<typeof createMenuItemRequestSchema>;

export type IMenuItemUpdate = Partial<IMenuItemCreate>;
export type IMenuItemUpdateMutation = {
  newData: IMenuItemUpdate;
  itemId: string;
};
export interface Produto {
  id: string;
  name: string;
  price: number;
  description: string;
  categoryId: string;
  images: File[];
  category: ICategoryData;
  featuredProduct: boolean;
  sale: boolean;
  resume: string
}

export interface ProductDetailPageProps {
  produtos: Produto[];
  setFilteredCardapio: (data: IMenuItemCardInterfaceData[]) => void;
  handleSearch: ()=> void
}


export interface ProductListProps {
  cardapio: IMenuItemCardInterfaceData[];
  filteredCardapio: IMenuItemCardInterfaceData[];
  selected: string | null;
  categories?: ICategoryData[];
  isSearching: boolean;
  handleSearch: ()=> void
}

export interface ProductSearchProps {
  setFilteredCardapio: (data: IMenuItemCardInterfaceData[]) => void;
  handleSearch: ()=> void
}

export interface ProductListSearchProps {
  filteredCardapio: IMenuItemCardInterfaceData[]
  setFilteredCardapio: (data: IMenuItemCardInterfaceData[]) => void;
  handleSearch: ()=> void;
  isSearching: boolean
}