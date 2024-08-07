import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ICreateUser } from "../../interfaces/users.interfaces";
import { createUserSchema } from "../../schemas/users.schemas";
import { useContext, useState } from "react";
import axios from "axios";
import { ICepAPI } from "../../interfaces/addresses.interfaces";
import { UsersContext } from "../../contexts/UsersContext";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header";

export const RegisterForm = () => {
  const { createUser } = useContext(UsersContext);

  const [cepValue, setCepValue] = useState<ICepAPI>();
  const [addressComplement, setAddressComplemnt] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [addressPreference, setAddressPreference] = useState(true);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ICreateUser>({ resolver: zodResolver(createUserSchema) });

  const onSubmit = (newUser: ICreateUser) => {
    const data = {
      ...newUser,
      isAdmin: false,
      addresses: [
        {
          street: `${cepValue?.logradouro}, ${addressNumber}`,
          city: cepValue?.localidade!,
          state: cepValue?.uf!,
          zip: cepValue?.cep!,
          complement: addressComplement ? addressComplement : "",
          preferred: addressPreference,
        },
      ],
    };
    createUser({ data });
  };

  const handleCEP = async (cep: string) => {
    try {
      if (cep.length === 8) {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        setCepValue(response.data);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <>
      <Flex
        as="form"
        flexDir={{ base: "column", lg: "row" }}
        onSubmit={handleSubmit(onSubmit)}
        justify="space-evenly"
        align={"flex-start"}
      >
        <VStack spacing={6} w="100%">
          <FormControl isInvalid={!!errors.name}>
            <FormLabel color={"primary-color"}>Nome</FormLabel>
            <Input
              bg="input-background"
              borderRadius={"20px"}
              placeholder="Digite seu nome"
              {...register("name")}
            />
            {!!errors.name && (
              <FormErrorMessage>{errors.name.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel color={"primary-color"}>E-mail</FormLabel>
            <Input
              placeholder="Digite seu melhor email"
              {...register("email")}
              bg="input-background"
              borderRadius={"20px"}
            />
            {!!errors.email ? (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            ) : (
              <FormHelperText color="primary-color">
                Ex: mail@email.com
              </FormHelperText>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel color={"primary-color"}>Senha</FormLabel>
            <Input
              type="password"
              placeholder="Digite sua senha"
              {...register("password")}
              bg="input-background"
              borderRadius={"20px"}
            />
            {!!errors.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.phoneNumber}>
            <FormLabel color={"primary-color"}>Telefone</FormLabel>
            <Input
              placeholder="Digite seu celular"
              {...register("phoneNumber")}
              bg="input-background"
              borderRadius={"20px"}
            />
            {!!errors.phoneNumber && (
              <FormErrorMessage>{errors.phoneNumber.message}</FormErrorMessage>
            )}
          </FormControl>
        </VStack>
        <VStack spacing={6} w="100%" p="0 1rem">
          <FormControl>
            <FormLabel color={"primary-color"}>CEP</FormLabel>
            <Input
              bg="input-background"
              borderRadius={"20px"}
              type="text"
              maxLength={8}
              onChange={(e) => handleCEP(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel color={"primary-color"}>Complemento</FormLabel>
            <Input
              bg="input-background"
              borderRadius={"20px"}
              type="text"
              onChange={(e) => setAddressComplemnt(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel color={"primary-color"}>Numero</FormLabel>
            <Input
              bg="input-background"
              borderRadius={"20px"}
              type="text"
              onChange={(e) => setAddressNumber(e.target.value)}
            />
          </FormControl>
        </VStack>
        <VStack spacing={6} w="100%">
          <FormControl>
            <FormLabel color={"primary-color"}>Endereço</FormLabel>
            <Input
              bg="input-background"
              borderRadius={"20px"}
              type="text"
              value={cepValue?.logradouro}
            />
          </FormControl>
          <FormControl>
            <FormLabel color={"primary-color"}>Cidade</FormLabel>
            <Input
              bg="input-background"
              borderRadius={"20px"}
              type="text"
              value={cepValue?.localidade}
            />
          </FormControl>
          <FormControl>
            <FormLabel color={"primary-color"}>Estado</FormLabel>
            <Input
              bg="input-background"
              borderRadius={"20px"}
              type="text"
              value={cepValue?.uf}
            />
          </FormControl>
          <FormControl>
            <Checkbox
              defaultChecked
              color="primary-color"
              size="lg"
              onChange={(e) => setAddressPreference(e.target.checked)}
            >
              Endereço Preferido
            </Checkbox>
          </FormControl>
          <Button bg="button-background" color="white" w="100%" type="submit">
            Cadastrar
          </Button>
        </VStack>
      </Flex>
      <Flex
        mt="3rem"
        align={"center"}
        justify={"center"}
        flexDir={"column"}
        gap="0.1rem"
        cursor={"pointer"}
        onClick={() => navigate("/login")}
      >
        <Text fontSize={"18px"} color="primary-color">
          Se já possui cadastro
        </Text>
        <Text fontSize={"18px"} color="primary-color">
          Clique aqui para logar
        </Text>
      </Flex>
    </>
  );
};
