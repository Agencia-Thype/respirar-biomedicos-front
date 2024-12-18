import { AxiosError } from "axios";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  UseMutateFunction,
} from "@tanstack/react-query";
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
import { IUpdateMenuItemPatch } from "../pages/EditMenuItemPage";

export interface IMenuItemContext {
  data: IMenuItemCardInterfaceData[] | undefined;
  isFetching: boolean;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  produtos: Produto[];
  filteredCardapio: IMenuItemCardInterfaceData[];
  setFilteredCardapio: React.Dispatch<
    React.SetStateAction<IMenuItemCardInterfaceData[]>
  >;
  isSearching: boolean;
  setProdutos: React.Dispatch<React.SetStateAction<Produto[]>>;
  handleSearch: () => void;
  listItemDetail: (
    itemId: string | undefined
  ) => Promise<IMenuItemCardInterfaceData>;

  createMenuItem: UseMutateFunction<
    IMenuItemInterfaceData,
    any,
    IMenuItemMutation,
    unknown
  >;
  updateMenuItem: UseMutateFunction<
    Boolean,
    AxiosError<unknown, any>,
    {
      id: string;
      data: IUpdateMenuItemPatch;
    },
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
  resume: string;
}

export interface ProductDetailPageProps {
  setFilteredCardapio: (data: IMenuItemCardInterfaceData[]) => void;
  handleSearch: () => void;
}

export interface ProductListProps {
  cardapio: IMenuItemCardInterfaceData[];
  selected: string | null;
  categories?: ICategoryData[];
}

export interface ProductSearchProps {
  setFilteredCardapio: (data: IMenuItemCardInterfaceData[]) => void;
  handleSearch: () => void;
}

export interface ProductListSearchProps {
  filteredCardapio: IMenuItemCardInterfaceData[];
  setFilteredCardapio: (data: IMenuItemCardInterfaceData[]) => void;
  handleSearch: () => void;
  isSearching: boolean;
}
export interface ProductEditProps {
  item: IMenuItemCardInterfaceData;
}
