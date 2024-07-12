import { Container, Heading, Link, Text } from "@chakra-ui/react";
import { LoginForm } from "../components/LoginForm";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <Container maxW={"lg"} mt="1rem">
      <Heading textAlign={"center"}>Login</Heading>
      <LoginForm />
      <Text
        fontSize={"18px"}
        color="primary-color"
        textAlign={"center"}
        mt="1rem"
      >
        Se não tiver cadastro
      </Text>
      <Text
        fontSize={"18px"}
        cursor={"pointer"}
        onClick={() => navigate("/register")}
        color="primary-color"
        textAlign={"center"}
      >
        Clique aqui
      </Text>
    </Container>
  );
};
