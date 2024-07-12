import { createContext } from "react";
import { IProvider } from "../interfaces/index";
import { ILoginContextData, ILoginData } from "../interfaces/login.interfaces";
import { api } from "../services/api";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const LoginContext = createContext<ILoginContextData>(
  {} as ILoginContextData
);

export const LoginProvider = ({ children }: IProvider) => {
  const navigate = useNavigate();
  const login = async (data: ILoginData) => {
    await api
      .post("/login", data)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("@DownTown:Token", token);
        localStorage.setItem("@DownTown:Admin", response.data.isAdmin);

        toast.success("Login realizado com sucesso");

        if (response.data.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      })
      .catch((error) => toast.error("Email ou senha inválidos"));
  };
  return (
    <LoginContext.Provider value={{ login }}>{children}</LoginContext.Provider>
  );
};
