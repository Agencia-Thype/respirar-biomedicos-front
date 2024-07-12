import { Container, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { Cart } from "../components/Cart";
import { useNavigate } from "react-router-dom";

export const CartPage = () => {
  const token = localStorage.getItem("@DownTown:Token");
  const navigate = useNavigate();

  if (!token) {
    return (
      <Flex
        flexDir={"column"}
        gap="1rem"
        align={"center"}
        justify={"center"}
        mt="5rem"
      >
        <Heading>Você precisa estar logado =(</Heading>
        <Link onClick={() => navigate("/login")} color="primary-color">
          Clique aqui para logar
        </Link>
        
      </Flex>
    );
  }
  return (
    <Container maxW={{ base: "8xl", md: "6xl", "2xl": "8xl" }}>
      <Flex flexDir={"column"} gap="2rem" pb="1rem">
        <Heading mt="3rem">Carrinho</Heading>
        <Cart />
      </Flex>
    </Container>
  );
};
