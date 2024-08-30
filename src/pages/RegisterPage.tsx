import { Flex, Container, Heading } from "@chakra-ui/react";
import { RegisterForm } from "../components/RegisterForm";
import { Header } from "../components/Header";
import { ProductSearchProps } from "../interfaces/menuItem.interfaces";

export const RegisterPager: React.FC<ProductSearchProps>  = ({setFilteredCardapio, handleSearch}) => {
  return (
    <Flex flexDir="column" w="100%">
      <Flex w="100%">
        <Header handleSearch={handleSearch}  setFilteredCardapio={setFilteredCardapio}/>
      </Flex>
      <Container maxW="8xl" w={{ base: "100%", md: "80%" }} mt="1rem" px={{ base: "1rem", md: "2rem" }}>
        <Heading textAlign="center" mb="1rem">Cadastro</Heading>
        <RegisterForm />
      </Container>
    </Flex>
  );
};
