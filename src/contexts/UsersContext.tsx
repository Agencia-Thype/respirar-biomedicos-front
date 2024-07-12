import { createContext, useState } from "react";
import { IProvider } from "../interfaces";
import { useMutation } from "@tanstack/react-query";
import {
  ICreateUserMutation,
  IListUserDetails,
  IResponseCreateUser,
  IUserContextData,
} from "../interfaces/users.interfaces";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export const UsersContext = createContext<IUserContextData>(
  {} as IUserContextData
);

export const UsersProvider = ({ children }: IProvider) => {
  const [userDetails, setUserDetails] = useState<IListUserDetails>(
    {} as IListUserDetails
  );
  const [userProfile, setUserProfile] = useState<IListUserDetails>(
    {} as IListUserDetails
  );
  const navigate = useNavigate();
  const { mutate: createUser } = useMutation(
    async ({ data }: ICreateUserMutation): Promise<IResponseCreateUser> => {
      return await api.post(`/users`, data).then((response) => {
        return response.data;
      });
    },
    {
      onSuccess: (response) => {
        toast.success("Usuario Cadastrado");
        navigate("/login");
      },
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    }
  );

  const { mutate: listUserDetail } = useMutation(
    async (id: string): Promise<IListUserDetails> => {
      const token = localStorage.getItem("@DownTown:Token");

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return await api.get(`/users/${id}`).then((response) => {
        return response.data;
      });
    },
    {
      onSuccess: (response) => {
        setUserDetails(response);
      },
      onError: (error: AxiosError) => {
        // console.log(error);
      },
    }
  );
  const { mutate: listUserProfile } = useMutation(
    async (): Promise<IListUserDetails> => {
      const token = localStorage.getItem("@DownTown:Token");

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return await api.get(`/users/profile`).then((response) => {
        return response.data;
      });
    },
    {
      onSuccess: (response) => {
        setUserProfile(response);
      },
      onError: (error: AxiosError) => {
        // console.log(error);
      },
    }
  );
  return (
    <UsersContext.Provider
      value={{
        createUser,
        listUserDetail,
        userDetails,
        listUserProfile,
        userProfile,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
