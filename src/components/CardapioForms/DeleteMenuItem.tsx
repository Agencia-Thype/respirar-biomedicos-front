import { Button, Flex, Select } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { MenuItemContext } from "../../contexts/MenuItemContext";

export const DeleteMenuItem = () => {
  const { data: menuItens, deleteMenuItem } = useContext(MenuItemContext);

  const [itemId, setItemId] = useState("");

  const handleDelete = () => {
    deleteMenuItem(itemId);
  };

  return (
    <Flex flexDir={"column"} gap="1rem" p="2rem 0">
      <Select
        bg="title-color"
        borderRadius={"20px"}
        onChange={(e) => setItemId(e.target.value)}
        maxW={"400px"}
        margin={"0 auto"}
        pt="20px"
      >
        <option value="">Selecione o produto</option>
        {menuItens.map((item) => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </Select>
      {itemId !== "" && (
        <Button onClick={handleDelete} colorScheme="red" w="30%" m="0 auto">
          Remover
        </Button>
      )}
    </Flex>
  );
};
