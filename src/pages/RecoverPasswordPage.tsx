import { Flex, Container, Heading, Link, Text } from "@chakra-ui/react";
import { LoginForm } from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { ProductSearchProps } from "../interfaces/menuItem.interfaces";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import { RecoverPasswordForm } from "../components/RecoverPasswordForm";

export const RecoverPasswordPage = () => {
  return (
    <Flex flexDir="column" w="100%">
      <Flex w="100%">

      </Flex>
      <Flex justifyContent="center" w="100%">
        <Container maxW="lg" mt="1rem">
          <Heading textAlign="center">Recuperar a Senha</Heading>
          <RecoverPasswordForm />
        </Container>
      </Flex>
    </Flex>
  );
};
