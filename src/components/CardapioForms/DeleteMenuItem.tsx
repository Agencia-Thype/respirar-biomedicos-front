import { Button, Flex, Heading, Select } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { MenuItemContext } from "../../contexts/MenuItemContext";


import { IMenuItemInterfaceData } from '../../interfaces/menuItem.interfaces';
import { createPortal } from "react-dom";

interface ModalDeleteProps {
  toggleDeleteModal: () => void
  item: IMenuItemInterfaceData
}

export const DeleteMenuItem = ({ toggleDeleteModal, item }:ModalDeleteProps) => {
  const { data: menuItens, deleteMenuItem } = useContext(MenuItemContext);

  const [itemId, setItemId] = useState("");

  const ref = useRef<HTMLDivElement>(null)
  // const { id, name } = item;

  
  const handleDelete = () => {
    // console.log(item.id)
    deleteMenuItem(item.id);
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
        if(!ref.current) {
            return
        }

        if(!event.target) {
            return
        }

        if(!ref.current.contains(event.target as HTMLElement)) {
          toggleDeleteModal()
        }
    }
    window.addEventListener("mousedown", handleClick)

    return () => {
        window.removeEventListener("mousedown", handleClick)
    }
}, [toggleDeleteModal])

  return createPortal (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      top={0}
      backgroundColor={"rgba(0, 0, 0, 0.85)"}
      w={"100vw"}
      h={"100vh"}
      position={"fixed"}
      zIndex={999}
    >
      <Flex
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        borderRadius={"10px"}
        border={"4px solid #116CA0"}
        w={"690px"}
        h={"450px"}
        bg={"#FFFFFF"}
        gap="5rem"
        p="2% 4%"
        ref={ref}
      >
          <Heading fontSize={"24px"}>Tem certeza que deseja excluir este produto?</Heading>
          <Flex width={"100%"} gap={"20px"} justifyContent={"center"}>
            <Button onClick={toggleDeleteModal} p={"2% 5%"} borderRadius={"6px"} color={"#FFFFFF"} bg="#116CA0" w="130px" h={"75px"}>
              Cancelar
            </Button>
            <Button onClick={handleDelete} p={"2% 5%"} borderRadius={"6px"} color={"#FFFFFF"} bg="red" w="130px" h={"75px"}>
              Remover
            </Button>
          </Flex>
      </Flex>
    </Flex>,
        document.body
  );
};
