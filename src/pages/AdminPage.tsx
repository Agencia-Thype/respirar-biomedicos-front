import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { CreateMenuItem } from "../components/CardapioForms/CreateMenuItem";
import { EditMenuItem } from "../components/CardapioForms/EditMenuItem";
import { DeleteMenuItem } from "../components/CardapioForms/DeleteMenuItem";
import useAdminAuth from "../components/useAdminAuth";
import { useNavigate } from "react-router-dom";

export const AdminPage = () => {
  useAdminAuth();
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);

  const navigate = useNavigate();

  const handleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };
  const handleClick = (index: number) => {
    setSelectedMenu((prevState) => (prevState === index ? null : index));
  };
  return (
    <Container maxW={"8xl"} mt="1rem" pb="2rem">
      <Heading fontSize={"34px"}>Bem Vindo</Heading>
      <Flex
        justify={{ base: "flex-start", md: "center" }}
        align={"center"}
        mt="2rem"
        overflowX={"auto"}
        gap={{ base: "3rem" }}
      >
        <Heading
          onClick={handleSubMenu}
          cursor={"pointer"}
          fontFamily={"Montserrat"}
          fontSize={"22px"}
          borderBottom={showSubMenu ? "solid 1px white" : "none"}
        >
          Atualizar Cardápio
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
      {showSubMenu && (
        <Flex
          overflowX={"auto"}
          justify={{ base: "flex-start", md: "center" }}
          align={"center"}
          gap="3rem"
          mt="3rem"
        >
          <Text
            color={selectedMenu === 0 ? "white" : "gray"}
            fontSize={"22px"}
            fontFamily={"Montserrat"}
            borderBottom={selectedMenu === 0 ? "2px solid white" : ""}
            onClick={() => handleClick(0)}
            _hover={{ color: "white", cursor: "pointer" }}
          >
            Adicionar
          </Text>
          <Text
            fontSize={"22px"}
            fontFamily={"Montserrat"}
            color={selectedMenu === 1 ? "white" : "gray"}
            borderBottom={selectedMenu === 1 ? "2px solid white" : ""}
            onClick={() => handleClick(1)}
            _hover={{ color: "white", cursor: "pointer" }}
          >
            Editar
          </Text>
          <Text
            fontSize={"22px"}
            fontFamily={"Montserrat"}
            color={selectedMenu === 2 ? "white" : "gray"}
            borderBottom={selectedMenu === 2 ? "2px solid white" : ""}
            onClick={() => handleClick(2)}
            _hover={{ color: "white", cursor: "pointer" }}
          >
            Deletar
          </Text>
        </Flex>
      )}
      {selectedMenu === 0 ? (
        <CreateMenuItem />
      ) : selectedMenu === 1 ? (
        <EditMenuItem />
      ) : selectedMenu === 2 ? (
        <DeleteMenuItem />
      ) : null}
    </Container>
  );
};
