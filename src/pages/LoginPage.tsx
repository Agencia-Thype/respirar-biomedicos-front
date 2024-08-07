import { Flex, Container, Heading, Link, Text } from "@chakra-ui/react";
import { LoginForm } from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";

export const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <Flex flexDir="column" w="100%">
      <Flex w="100%">
        <Header />
      </Flex>
      <Flex justifyContent="center" w="100%">
        <Container maxW="lg" mt="1rem">
          <Heading textAlign="center">Login</Heading>
          <LoginForm />
          <Text fontSize="18px" color="primary-color" textAlign="center" mt="1rem">
            Se não tiver cadastro
          </Text>
          <Text
            fontSize="18px"
            cursor="pointer"
            onClick={() => navigate("/register")}
            color="primary-color"
            textAlign="center"
          >
            Clique aqui
          </Text>
        </Container>
      </Flex>
    </Flex>
  );
};
