import { Container, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { Cart } from "../components/Cart";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";

export const CartPage = () => {
  const token = localStorage.getItem("@DownTown:Token");
  const navigate = useNavigate();

  if (!token) {
    return (
      <Flex flexDir="column" w="100%" bg="background-color">
        <Flex w="100%">
          <Header />
        </Flex>
        <Flex
          flexDir={"column"}
          gap="1rem"
          align={"center"}
          justify={"center"}
          mt="5rem"
          bg="white"
          p="2rem"
          borderRadius="md"
        >
          <Heading color="primary-color">Você precisa estar logado =(</Heading>
          <Link
            onClick={() => navigate("/login")}
            color="primary-color"
            fontWeight="bold"
            textDecoration="underline"
          >
            Clique aqui para logar
          </Link>
        </Flex>
      </Flex>
    );
  }
  return (
    <Container maxW={{ base: "8xl", md: "6xl", "2xl": "8xl" }} bg="background-color" p="4">
      <Flex flexDir={"column"} gap="2rem" pb="1rem">
        <Heading mt="3rem" color="primary-color">Carrinho</Heading>
        <Cart />
      </Flex>
    </Container>
  );
};
