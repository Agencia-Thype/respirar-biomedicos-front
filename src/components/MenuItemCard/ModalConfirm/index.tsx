import {
  Button,
  Flex,
  FormLabel,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { IMenuItemInterfaceData } from "../../../interfaces/menuItem.interfaces";
import { useContext, useState } from "react";
import { OrderContext } from "../../../contexts/OrdersContext";

interface IModalConfirm {
  isOpen: boolean;
  onClose: () => void;
  item: IMenuItemInterfaceData;
}

export interface IMenuItemData {
  MenuItemCart: {
    menuItemId: string;
    quantity: number;
    total: number;
    instructions: string;
  };
  MenuItem: IMenuItemInterfaceData;
}

export const ModalConfirm = ({ isOpen, onClose, item }: IModalConfirm) => {
  const { ordersQuantity, setOrdersQuantity } = useContext(OrderContext);
  const [obs, setObs] = useState("");
  const [quantity, setQuantity] = useState(1);

  const addToCart = (item: IMenuItemInterfaceData) => {
    const cart: IMenuItemData[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    let totalValue = 0;
    totalValue = item.price * quantity;

    const menuItem: IMenuItemData = {
      MenuItemCart: {
        menuItemId: item.id,
        quantity: quantity,
        total: totalValue,
        instructions: obs,
      },
      MenuItem: item,
    };

    cart.push(menuItem);
    setOrdersQuantity(ordersQuantity + 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    onClose();
  };

  const options = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <Modal  isOpen={isOpen} onClose={onClose} size={{ base: "", md: "2xl" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmar Pedido</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap="1rem" flexDir={{ base: "column", lg: "row" }}>
            <Image
              w={{ base: "100%", lg: "30%" }}
              src={item.imageURL}
              borderRadius={"10"}
              objectFit={"cover"}
            />
            <Flex flexDir={"column"} align={"center"} w="100%" gap="1.5rem">
              <Heading textAlign={"center"} color="black">
                {item.name}
              </Heading>
              <Text alignSelf={"flex-start"}>{item.description}</Text>
              <Flex
                flexDir={"column"}
                alignSelf={"flex-start"}
                w="100%"
                gap="1rem"
              >
                <Flex gap="1rem" align={"center"}>
                  {/* <FormLabel>Observações</FormLabel> */}
                  <Flex align={"center"}>
                    <FormLabel>Quantidade</FormLabel>
                    <Select
                      w="80px"
                      onChange={(e) => setQuantity(+e.target.value)}
                    >
                      {options.map((option: number) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                </Flex>
                {/* <Textarea
                  w="100%"
                  placeholder={"Ex: Sem cebola"}
                  onChange={(e) => setObs(e.target.value)}
                /> */}
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button size="md" variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            size="md"
            bg="#5f4848"
            color="white"
            _hover={{}}
            mr={2}
            onClick={() => addToCart(item)}
          >
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
