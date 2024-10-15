import { createContext, useState, useContext } from "react";
import {
    IMenuItemContext,
    IMenuItemInterfaceData,
    IMenuItemMutation,
    IMenuItemUpdateMutation,
} from "../interfaces/menuItem.interfaces";
import { IProvider } from "../interfaces";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { CategoriesContext } from "./CategoriesContext";

export const MenuItemContext = createContext<IMenuItemContext>(
    {} as IMenuItemContext
);

export const MenuItemProvider = ({ children }: IProvider) => {
    const { refetch: refetchCategories } = useContext(CategoriesContext);
    const [menuItemDeatilData, setMenuItemDetailData] = useState<
        IMenuItemInterfaceData | undefined
    >();

    const listMenuItem = async () => {
        const response = await api.get("/menuItem");
        return response.data;
    };

    const { data, isFetching, isError, refetch } = useQuery({
        queryKey: ["cardapio"],
        queryFn: listMenuItem,
    });

    const { mutate: listItemDetail } = useMutation(
        async (itemId: string): Promise<IMenuItemInterfaceData> => {
            const token = localStorage.getItem("@DownTown:Token");
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await api.get(`/menuItem/${itemId}/`);
            return response.data;
        },
        {
            onSuccess: (response) => {
                setMenuItemDetailData(response);
            },
            onError: (error: any) => {
                console.error(error);
            },
        }
    );

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
                if (error.response?.status === 400)
                    toast.error(`${error.message}`);
            },
        }
    );

    const { mutate: updateMenuItem } = useMutation(
        async ({
            newData,
            itemId,
        }: IMenuItemUpdateMutation): Promise<IMenuItemInterfaceData> => {
            const token = localStorage.getItem("@DownTown:Token");
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await api.patch(`/menuItem/${itemId}`, newData);
            return response.data;
        },
        {
            onSuccess: (response) => {
                toast.success("Item Atualizado");
                refetch();
            },
            onError: (error: AxiosError) => {
                toast.error("Algo não deu certo");
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
                isFetching,
                menuItemDeatilData,
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
