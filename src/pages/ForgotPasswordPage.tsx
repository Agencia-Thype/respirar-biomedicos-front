import { Flex, Container, Heading, Link, Text } from "@chakra-ui/react";
import { LoginForm } from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { ProductSearchProps } from "../interfaces/menuItem.interfaces";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";

export const ForgotPasswordPage: React.FC<ProductSearchProps>  = ({setFilteredCardapio, handleSearch}) => {
  const navigate = useNavigate();
  return (
    <Flex flexDir="column" w="100%">
      <Flex w="100%">
        <Header handleSearch={handleSearch} setFilteredCardapio={setFilteredCardapio}/>
      </Flex>
      <Flex justifyContent="center" w="100%">
        <Container maxW="lg" mt="1rem">
          <Heading textAlign="center">Esqueci a Senha</Heading>
          <ForgotPasswordForm />
          <Flex w={"100%"} justifyContent={"center"} mt={"1rem"} gap={"3rem"}>
            <Text 
              fontSize="18px"
              cursor="pointer"
              color="primary-color" 
              textAlign="center" 
              onClick={() => navigate("/login")}
            >
              Login
            </Text>
            {/* <Text
              fontSize="18px"
              cursor="pointer"
              onClick={() => navigate("/register")}
              color="primary-color"
              textAlign="center"
            >
              Cadastre-se
            </Text> */}
          </Flex>
        </Container>
      </Flex>
    </Flex>
  );
};
