import { createContext, useState } from "react";
import { IProvider } from "../interfaces";
import {
  AddressContextData,
  ICreateAddress,
  IReturnCreateAddress,
  IUpdateAdress,
} from "../interfaces/addresses.interfaces";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { Axios, AxiosError } from "axios";

export const AddressesContext = createContext({} as AddressContextData);

export const AddressesProvider = ({ children }: IProvider) => {
  const [handleAddress, setHandleAddress] = useState<boolean>(false);
  const { mutate: createAddress } = useMutation(
    async ({ data, id }: ICreateAddress): Promise<IReturnCreateAddress> => {
      const token = localStorage.getItem("@DownTown:Token");

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const newData = {
        ...data,
        userId: id,
      };

      return await api
        .post("/addresses", newData)
        .then((response) => {
          return response.data;
        })
        .catch((error: AxiosError) => {
          toast.error(`${error.message}`);
        });
    },
    {
      onSuccess: (response) => {
        toast.success("Endereço adicionado com sucesso");
        setHandleAddress(!handleAddress);
      },
    }
  );
  const { mutate: updateAddress } = useMutation(
    async ({ data, id }: IUpdateAdress): Promise<IReturnCreateAddress> => {
      const token = localStorage.getItem("@DownTown:Token");

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return await api
        .patch(`/addresses/${id}`, data)
        .then((response) => {
          return response.data;
        })
        .catch((error: AxiosError) => {
          toast.error(`${error.message}`);
        });
    },
    {
      onSuccess: (response) => {
        toast.success("Endereço adicionado com sucesso");
        setHandleAddress(!handleAddress);
      },
    }
  );

  return (
    <AddressesContext.Provider
      value={{ createAddress, handleAddress, updateAddress }}
    >
      {children}
    </AddressesContext.Provider>
  );
};
