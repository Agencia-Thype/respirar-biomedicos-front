import { createContext, useState, useContext } from "react";
import {
  IMenuItemCardInterfaceData,
  IMenuItemContext,
  IMenuItemInterfaceData,
  IMenuItemMutation,
  IMenuItemUpdateMutation,
  Produto,
} from "../interfaces/menuItem.interfaces";
import { IProvider } from "../interfaces";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { CategoriesContext } from "./CategoriesContext";
import { useNavigate } from "react-router-dom";
import { IUpdateMenuItemPatch } from "../pages/EditMenuItemPage";

export const MenuItemContext = createContext<IMenuItemContext>(
  {} as IMenuItemContext
);

export const MenuItemProvider = ({ children }: IProvider) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const [filteredCardapio, setFilteredCardapio] = useState<
    IMenuItemCardInterfaceData[]
  >([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/Produtos");
    setIsSearching(true);
  };
  const { refetch: refetchCategories } = useContext(CategoriesContext);

  const listMenuItem = async () => {
    const response = await api.get("/menuItem");
    return response.data;
  };

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ["cardapio"],
    queryFn: listMenuItem,
  });

  const listItemDetail = async (
    itemId: string | undefined
  ): Promise<IMenuItemCardInterfaceData> => {
    const token = localStorage.getItem("@DownTown:Token");

    if (!token) {
      throw new Error("Token não encontrado");
    }
    if (!itemId) {
      throw new Error("Nem product Id");
    }
    const response = await api.get(
      `/menuItem/${itemId}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };

  const { mutate: createMenuItem } = useMutation(
    async (data: any): Promise<IMenuItemInterfaceData> => {
      const token = localStorage.getItem("@DownTown:Token");
      const images = data.images;

      delete data.images;

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const formData = new FormData();

      images.forEach((image: File) => {
        formData.append("images", image);
      });

      formData.append("data", JSON.stringify(data));

      const response = await api.post("/menuItem", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
    {
      onSuccess: (response: IMenuItemInterfaceData) => {
        toast.success("Item criado com sucesso");
        refetch();
        refetchCategories();
      },
      onError: (error: AxiosError) => {
        if (error.response?.status === 400) toast.error(`${error.message}`);
      },
    }
  );

  const { mutate: updateMenuItem } = useMutation(
    async ({
      id,
      data,
    }: {
      id: string ;
      data: IUpdateMenuItemPatch;
    }): Promise<boolean> => {
      try {
        const { images, ...restData } = data;

        // Verifica se o token existe no localStorage
        const token = localStorage.getItem("@DownTown:Token");
        if (!token) {
          throw new Error("Token de autenticação não encontrado.");
        }

        // Configura o cabeçalho de autorização
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Prepara o formData
        const formData = new FormData();

        if (images && images.length > 0) {
          images.forEach((image) => {
            formData.append(
              "images",
              image instanceof File ? image : JSON.stringify(image)
            );
          });
        }

        formData.append("data", JSON.stringify(restData));

        console.log("Conteúdo do FormData:");
        formData.forEach((value, key) => {
          console.log(`${key}:`, value);
        });
        // Faz a requisição PATCH
        const response = await api.patch(`/menuItem/${id}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(response.data);
        return true;
      } catch (error) {
        console.error("Erro ao atualizar item:", error);
        throw error; // Deixa o onError tratar isso
      }
    },
    {
      onSuccess: () => {
        refetch();
        toast.success("Item atualizado com sucesso!");
        navigate("/admin");
      },
      onError: (error: AxiosError) => {
        console.error("Erro:", error);
        toast.error("Erro ao atualizar o item.");
      },
    }
  );

  const { mutate: deleteMenuItem } = useMutation(
    async (itemId: string) => {
      const token = localStorage.getItem("@DownTown:Token");
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await api.delete(`/menuItem/${itemId}`);
      return response.data;
    },
    {
      onSuccess: (response) => {
        toast.success("Item Deletado");
        refetch();
      },
      onError: (error: AxiosError) => {
        toast.error("Item está sendo usado em um pedido");
      },
    }
  );

  return (
    <MenuItemContext.Provider
      value={{
        data,
        produtos,
        filteredCardapio,
        setFilteredCardapio,
        isSearching,
        setProdutos,
        handleSearch,
        isFetching,
        refetch,
        createMenuItem,
        listItemDetail,
        updateMenuItem,
        deleteMenuItem,
      }}
    >
      {children}
    </MenuItemContext.Provider>
  );
};
