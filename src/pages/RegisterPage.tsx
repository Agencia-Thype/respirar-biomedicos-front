import { Flex, Container, Heading } from "@chakra-ui/react";
import { RegisterForm } from "../components/RegisterForm";

export const RegisterPager = () => {
  return (
    <Flex flexDir="column" w="100%">
      <Container
        maxW="8xl"
        w={{ base: "100%", md: "80%" }}
        mt="1rem"
        px={{ base: "1rem", md: "2rem" }}
      >
        <Heading textAlign="center" mb="1rem">
          Cadastro
        </Heading>
        <RegisterForm />
      </Container>
    </Flex>
  );
};
