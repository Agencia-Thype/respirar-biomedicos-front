import { createContext, useState } from "react";
import { IProvider } from "../interfaces";
import {
  ICreateOrderWithFunction,
  IOrderContextData,
  IOrdersData,
  IResponseStatusOrder,
  IReturnCreateOrder,
  IStatusOrder,
} from "../interfaces/orders.interfaces";
import { api } from "../services/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const OrderContext = createContext<IOrderContextData>(
  {} as IOrderContextData
);

export const OrderProvider = ({ children }: IProvider) => {
  const [ordersQuantity, setOrdersQuantity] = useState(0);
  const [statusChange, setStatusChange] = useState(false);

  const navigate = useNavigate();

  const isAdmin = localStorage.getItem("@DownTown:Admin");

  const listOrders = async (): Promise<IOrdersData> => {
    const token = localStorage.getItem("@DownTown:Token");

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await api.get("/orders");
    
    return response.data;
  };

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: listOrders,
    enabled: isAdmin === "true",
  });

  const { mutate: createOrder } = useMutation(
    async ({
      newOrder,
      incrementOrderNumber,
    }: ICreateOrderWithFunction): Promise<IReturnCreateOrder> => {
      const token = localStorage.getItem("@DownTown:Token");

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return await api.post(`/orders`, newOrder).then((response) => {
        incrementOrderNumber();
        console.log(response.data)
        return response.data;
      });
    },
    {
      onSuccess: (response) => {
        toast.success("Pedido Efetuado com sucesso");
        localStorage.setItem("cart", "[]");
        navigate("/user");
        return response;
      },
      onError: (error: any) => {
        // console.log(error);
        toast.error("Algo não deu certo");
      },
    }
  );

  const { mutate: statusOrder } = useMutation(
    async ({ data }: IStatusOrder): Promise<IResponseStatusOrder> => {
      const token = localStorage.getItem("@DownTown:Token");

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return await api
        .patch("/orders/statusOrder", data)
        .then((response) => response.data);
    },
    {
      onSuccess: (response) => {
        toast.success("Status Atualizado");
        setStatusChange(!statusChange);
        refetch();
      },
      onError: (error: AxiosError) => {
        toast.error("Algo não deu certo");
        // console.log(error);
      },
    }
  );

  const { mutate: deleteOrder } = useMutation(
    async (id: string) => {
      const token = localStorage.getItem("@DownTown:Token");

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return await api.delete(`/orders/${id}`).then((response) => {
        return response.data;
      });
    },
    {
      onSuccess: (_) => {
        toast.success("Pedido excluido");
        refetch();
      },
    }
  );
  return (
    <OrderContext.Provider
      value={{
        createOrder,
        setOrdersQuantity,
        ordersQuantity,
        data,
        statusOrder,
        deleteOrder,
        isFetching,
        statusChange,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
