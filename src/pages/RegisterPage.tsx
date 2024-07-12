import { Container, Heading } from "@chakra-ui/react";
import { RegisterForm } from "../components/RegisterForm";

export const RegisterPager = () => {
  return (
    <Container maxW={"8xl"} mt="1rem">
      <Heading textAlign={"center"}>Cadastro</Heading>
      <RegisterForm />
    </Container>
  );
};
