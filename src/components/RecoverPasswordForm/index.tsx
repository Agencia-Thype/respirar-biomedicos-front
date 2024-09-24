import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    VStack,
  } from "@chakra-ui/react";
  import { useForm } from "react-hook-form";
  
  import { zodResolver } from "@hookform/resolvers/zod";
  import { forgotPassSchema, loginSchema, recoverPassSchema } from "../../schemas/login.schemas";
  import { useContext } from "react";
  import { LoginContext } from "../../contexts/LoginContext";
import { api } from "../../services/api";
import { error } from "console";
import { useNavigate } from "react-router-dom";
  
  interface IRecoverData {
    email: string
    password: string
    code: string
  }
  
  export const RecoverPasswordForm = () => {
    // const { login } = useContext(LoginContext);
    const navigate = useNavigate()
    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm<IRecoverData>({ resolver: zodResolver(recoverPassSchema) });
  
    const onSubmit = async (data: IRecoverData) => {
        console.log(data)
        // try {
        //     const token = localStorage.getItem("@DownTown:Token");
        //     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        //     const response = await api.post("/newPassword/recover", data)
        //     console.log(response.data)
        //     navigate("/")
        //     return response.data
        // } catch (error) {            
        //     console.log(error);
        // }
    };
  
    return (
      <Flex
        as="form"
        flexDir={"column"}
        mt="1rem"
        onSubmit={handleSubmit(onSubmit)}
      >
        <VStack spacing={6}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel color={"primary-color"}>E-mail</FormLabel>
            <Input
              bg="title-color"
              borderRadius={"20px"}
              placeholder="Insira seu email"
              {...register("email")}
            />
            {!!errors.email ? (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            ) : (
              <FormHelperText color="white">
                Ex: exemplo@email.com.br
              </FormHelperText>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel color={"primary-color"}>Senha</FormLabel>
            <Input
              borderRadius={"20px"}
              bg="title-color"
              placeholder="Insira sua senha"
              type="password"
              {...register("password")}
            />
            {!!errors.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.code}>
            <FormLabel color={"primary-color"}>Código</FormLabel>
            <Input
              borderRadius={"20px"}
              bg="title-color"
              placeholder="Insira sua senha"
              type="password"
              {...register("password")}
            />
            {!!errors.code && (
              <FormErrorMessage>{errors.code.message}</FormErrorMessage>
            )}
          </FormControl>
          
  
          <Button borderRadius={"20px"} w="100%" type="submit" bg="logo-color" color={"#FFFFFF"}>
            Enviar
          </Button>
        </VStack>
      </Flex>
    );
  };
  