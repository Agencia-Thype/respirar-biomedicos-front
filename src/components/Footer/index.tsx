import { Container, Flex, Heading, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Flex bg="#116CA0" p="5% 10%">
      <Flex
        // maxW={"7xl"}
        display={"flex"}
        flexDir={{ base: "column", md: "row" }}
        alignItems={{ base: "center", md: "flex-start" }}
        gap="2rem"
        m="0"
        p="0"
        width={"100%"}
        justifyContent={"space-between"}
      >
        <Flex
          flexDir={"column"}
          alignItems={{ base: "flex-start" }}
          gap="1rem"
          w="100%"
        >
          <Heading color="#FFFFFF" as="h3" fontSize={"22px"} fontFamily={"Montserrat"}>
            Endereço
          </Heading>
          <Text textAlign={"left"} fontFamily={"Montserrat"} color="#FFFFFF">
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
            color="#FFFFFF"
          >
            Horario de Funcionamento
          </Heading>
          <Text fontFamily={"Montserrat"} color="#FFFFFF">
            Segunda a sexta: 9h às 18h
          </Text>
          <Text fontFamily={"Montserrat"} color="#FFFFFF">
            Sábado: 9h às 13h
          </Text>
          <Text fontFamily={"Montserrat"} color="#FFFFFF">
            Domingo: Fechado
          </Text>
        </Flex>
        <Flex
          flexDir={"column"}
          alignItems={{ base: "flex-start" }}
          gap="1rem"
          w="100%"
        >
          <Heading as="h3" fontSize={"22px"} fontFamily={"Montserrat"} color="#FFFFFF">
            Contatos
          </Heading>
          <Text fontFamily={"Montserrat"} color="#FFFFFF">
            Telefone: (47) 98833 1224
          </Text>
          <Text fontFamily={"Montserrat"} color="#FFFFFF">
            E-mail: respirarbiomedicos@gmail.com
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
