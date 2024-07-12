import { Container, Flex, Heading, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Flex bg="#141011" p="2.5rem 0">
      <Container
        maxW={"5xl"}
        display={"flex"}
        flexDir={{ base: "column", md: "row" }}
        alignItems={{ base: "center", md: "flex-start" }}
        gap="2rem"
      >
        <Flex
          flexDir={"column"}
          alignItems={{ base: "center" }}
          gap="1rem"
          w="100%"
        >
          <Heading as="h3" fontSize={"22px"} fontFamily={"Montserrat"}>
            Endereço
          </Heading>
          <Text textAlign={"center"} fontFamily={"Montserrat"} color="#BFB6AC">
            Rua das Palmeiras, 123 Centro Balneário Camboriú, SC
          </Text>
        </Flex>
        <Flex
          flexDir={"column"}
          alignItems={{ base: "center" }}
          gap="1rem"
          w="100%"
        >
          <Heading
            as="h3"
            fontSize={"22px"}
            fontFamily={"Montserrat"}
            textAlign="center"
          >
            Horario de Funcionamento
          </Heading>
          <Text fontFamily={"Montserrat"} color="#BFB6AC">
            Segunda a sexta: 8h às 20h
          </Text>
          <Text fontFamily={"Montserrat"} color="#BFB6AC">
            Sábado: 9h às 13h
          </Text>
          <Text fontFamily={"Montserrat"} color="#BFB6AC">
            Domingo: fechado
          </Text>
        </Flex>
        <Flex
          flexDir={"column"}
          alignItems={{ base: "center" }}
          gap="1rem"
          w="100%"
        >
          <Heading as="h3" fontSize={"22px"} fontFamily={"Montserrat"}>
            Contatos
          </Heading>
          <Text fontFamily={"Montserrat"} color="#BFB6AC">
            Telefone: (11) 1111-1111
          </Text>
          <Text fontFamily={"Montserrat"} color="#BFB6AC">
            Instagram: @DowntownBuguer
          </Text>
        </Flex>
      </Container>
    </Flex>
  );
};
