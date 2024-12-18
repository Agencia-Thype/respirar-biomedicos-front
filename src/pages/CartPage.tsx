import { Container, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { Cart } from "../components/Cart";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header"; // Certifique-se de que o Header está sendo importado corretamente
import { ProductSearchProps } from "../interfaces/menuItem.interfaces";

export const CartPage = () => {
  const token = localStorage.getItem("@DownTown:Token");
  const navigate = useNavigate();

  if (!token) {
    return (
      <Flex
        flexDir="column"
        gap="1rem"
        align="center"
        justify="center"
        mt="5rem"
        p="1rem"
      >
        <Heading>Você precisa estar logado =(</Heading>
        <Link
          onClick={() => navigate("/login")}
          color="primary-color"
          fontSize="lg"
        >
          Clique aqui para logar
        </Link>
      </Flex>
    );
  }

  return (
    <Flex flexDir="column" w="100%">
      <Container maxW={{ base: "8xl", md: "6xl", "2xl": "8xl" }} p="1rem">
        <Flex flexDir="column" gap="2rem" pb="1rem">
          <Flex justifyContent="center" w="100%" mt="1rem">
            <Heading>Carrinho</Heading>
          </Flex>
          <Cart />
        </Flex>
      </Container>
    </Flex>
  );
};
