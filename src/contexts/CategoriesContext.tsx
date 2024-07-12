import { createContext, useState } from "react";
import { categoriesContextData, ICategoryData, ICategoryDataRequest } from "../interfaces/categories.intefaces";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { IProvider } from "../interfaces";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const CategoriesContext = createContext<categoriesContextData>(
  {} as categoriesContextData
);

export const CategoriesProvider = ({ children }: IProvider) => {
  const listCategories = async (): Promise<ICategoryData[] | undefined> => {
    try {
      const response = await api.get("/category");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // const { mutate: createCategory } = useMutation(
  //   async (data: ICategoryDataRequest): Promise<ICategoryData> => {
  //     const token = localStorage.getItem("@DownTown:Token");
  //     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //     const response = await api.post("/menuItem", data);
  //     return response.data;
  //   },
  //   {
  //     onSuccess: (response: ICategoryData) => {
  //       toast.success("Item criado com sucesso");
  //       refetch(); // Refetch categories to include the new item
  //     },
  //     onError: (error: AxiosError) => {
  //       if (error.response?.status === 400) {
  //         toast.error(`${error.message}`);
  //       }
  //     },
  //   }
  // );

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: listCategories,
  });

  const handleRefetch = async () => {
    await refetch();
  };

  return (
    <CategoriesContext.Provider value={{ data, isFetching, refetch: handleRefetch }}>
      {children}
    </CategoriesContext.Provider>
  );
};
