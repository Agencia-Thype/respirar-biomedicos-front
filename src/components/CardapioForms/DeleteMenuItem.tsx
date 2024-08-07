import { Button, Flex, Select } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { MenuItemContext } from "../../contexts/MenuItemContext";


import { IMenuItemInterfaceData } from '../../interfaces/menuItem.interfaces';

interface ModalDeleteProps {
  toggleDeleteModal: () => void
  item: IMenuItemInterfaceData
}

export const DeleteMenuItem = ({ toggleDeleteModal, item }:ModalDeleteProps) => {
  const { data: menuItens, deleteMenuItem } = useContext(MenuItemContext);

  const [itemId, setItemId] = useState("");

  // const { id, name } = item;

  
  const handleDelete = () => {
    console.log(item.id)
    // deleteMenuItem(item.id);
  };

  return (
    <Flex flexDir={"column"} gap="1rem" p="2rem 0">
        <Button onClick={handleDelete} colorScheme="red" w="30%" m="0 auto">
          Remover
        </Button>
      
     
     
    </Flex>
  );
};
