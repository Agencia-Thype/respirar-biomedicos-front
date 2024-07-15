import { Container, Flex, Heading, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Flex bg="#116CA0" p="2.5rem 0">
      <Container
        maxW={"7xl"}
        display={"flex"}
        flexDir={{ base: "column", md: "row" }}
        alignItems={{ base: "center", md: "flex-start" }}
        gap="2rem"
      >
        <Flex
          flexDir={"column"}
          alignItems={{ base: "flex-start" }}
          gap="1rem"
          w="100%"
        >
          <Heading as="h3" fontSize={"22px"} fontFamily={"Montserrat"}>
            Endereço
          </Heading>
          <Text textAlign={"left"} fontFamily={"Montserrat"} color="#BFB6AC">
            Rua 244, 375 Sala 02 Meia Praia - Itapema -SC 
          </Text>
        </Flex>
        <Flex
          flexDir={"column"}
          alignItems={{ base: "flex-start" }}
          gap="1rem"
          w="100%"
        >
          <Heading
            as="h3"
            fontSize={"22px"}
            fontFamily={"Montserrat"}
            textAlign="left"
          >
            Horario de Funcionamento
          </Heading>
          <Text fontFamily={"Montserrat"} color="#BFB6AC">
            Segunda a sexta: 9h às 18h
          </Text>
          <Text fontFamily={"Montserrat"} color="#BFB6AC">
            Sábado: 9h às 13h
          </Text>
          <Text fontFamily={"Montserrat"} color="#BFB6AC">
            Domingo: Fechado
          </Text>
        </Flex>
        <Flex
          flexDir={"column"}
          alignItems={{ base: "flex-start" }}
          gap="1rem"
          w="100%"
        >
          <Heading as="h3" fontSize={"22px"} fontFamily={"Montserrat"}>
            Contatos
          </Heading>
          <Text fontFamily={"Montserrat"} color="#BFB6AC">
            Telefone: (47) 98833 1224
          </Text>
          <Text fontFamily={"Montserrat"} color="#BFB6AC">
            E-mail: respirarbiomedicos@gmail.com
          </Text>
        </Flex>
      </Container>
    </Flex>
  );
};
