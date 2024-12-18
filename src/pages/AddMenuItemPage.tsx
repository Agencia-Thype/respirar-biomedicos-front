import { Flex, Heading } from "@chakra-ui/react";

import { ProductListSearchProps } from "../interfaces/menuItem.interfaces";
import { useNavigate } from "react-router-dom";
import { CreateMenuItemForm } from "../components/CreateMenuItemForm";

export const AddMenuItemPage = () => {
  const navigate = useNavigate();
  return (
    <Flex flexDir="column" w="100%">
      <Heading mt={"3rem"} fontSize={"34px"} padding={"0 10%"}>
        Bem Vindo
      </Heading>

      <Flex
        justify={{ base: "flex-start", md: "center" }}
        align={"center"}
        mt="2rem"
        overflowX={"auto"}
        gap={{ base: "3rem" }}
        padding={"0 10%"}
      >
        <Heading
          // onClick={toggleCreateModal}
          cursor={"pointer"}
          fontFamily={"Montserrat"}
          fontSize={"22px"}
          // borderBottom={showSubMenu ? "solid 1px white" : "none"}
        >
          Adicionar Produto
        </Heading>
        <Heading
          onClick={() => navigate("/orders")}
          cursor={"pointer"}
          fontFamily={"Montserrat"}
          fontSize={"22px"}
        >
          Pedidos
        </Heading>
        <Heading
          onClick={() => navigate("/delivery")}
          cursor={"pointer"}
          fontFamily={"Montserrat"}
          fontSize={"22px"}
        >
          Entregas
        </Heading>
      </Flex>

      <Flex w={"100%"} flexDirection={"column"} padding={"5% 10%"} gap={"3rem"}>
        <Heading
          textAlign={"center"}
          size={{ base: "2xl", md: "3xl", lg: "4xl" }}
        >
          Novo Produto
        </Heading>
        <CreateMenuItemForm />
      </Flex>
    </Flex>
  );
};
