import { Button, Flex, Heading, Image, Select, Text } from "@chakra-ui/react";
import { IMenuItemData } from "../../MenuItemCard/ModalConfirm";
import { useContext, useState } from "react";
import { OrderContext } from "../../../contexts/OrdersContext";

interface ICartCardProp {
  item: IMenuItemData;
  onRemove: (item: IMenuItemData) => void;
  handleTotalValue: (cart: IMenuItemData[]) => void;
}

export const CartCard = ({
  item,
  onRemove,
  handleTotalValue,
}: ICartCardProp) => {
  const { ordersQuantity, setOrdersQuantity } = useContext(OrderContext);
  const [quantity, setQuantity] = useState(item.MenuItemCart.quantity);

  const handleAddClick = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
      updateCart(quantity + 1);
    }
  };

  const handleRemoveClickQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updateCart(quantity - 1);
    }
  };

  const updateCart = (newQuantity: number) => {
    const updatedItem = { ...item };
    updatedItem.MenuItemCart.quantity = newQuantity;
    updatedItem.MenuItemCart.total =
      updatedItem.MenuItemCart.quantity * updatedItem.MenuItem.price;
    const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]").map(
      (cartItem: IMenuItemData) => {
        if (cartItem.MenuItem.id === item.MenuItem.id) {
          return updatedItem;
        } else {
          return cartItem;
        }
      }
    );

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    handleTotalValue(updatedCart);
  };

  const handleRemoveClick = () => {
    onRemove(item);
    setOrdersQuantity(ordersQuantity - 1);
  };

  return (
    <Flex
      bg="#D9D9D9"
      p="1rem"
      gap="1rem"
      borderRadius={"20px"}
      flexDir={{ base: "column", md: "row" }}
      align={"center"}
      justify={{ base: "center", md: "flex-start" }}
    >
      <Image
        w={{ base: "100%", md: "20%" }}
        maxW={{ base: "100%" }}
        h="auto"
        maxHeight={{ base: "100px", md: "100%" }}
        objectFit="cover"
        src={item?.MenuItem.imageURL}
        borderRadius={"20px"}
      />
      <Flex flexDir={"column"} gap="0.5rem" w={{ base: "auto", md: "100%" }}>
        <Heading fontSize={"24px"} color="black">
          {item?.MenuItem.name}
        </Heading>
        <Text fontFamily={"Poppins"} fontSize={"16px"}>
          {item?.MenuItem.description}
        </Text>
        <Text fontFamily={"Poppins"} fontSize={"16px"} as="b">
          Observações: {item?.MenuItemCart.instructions}
        </Text>

        <Flex align={"center"} justify={{ base: "center", md: "flex-end" }}>
          <Text>Quantidade:</Text>
          <Button
            bg="transparent"
            fontSize={"16px"}
            fontFamily={"Inter"}
            fontWeight={"bold"}
            _hover={{ color: "green" }}
            onClick={handleRemoveClickQuantity}
            isDisabled={quantity === 0}
            color={quantity > 2 ? "black" : "grey"}
          >
            -
          </Button>

          <Select
            w="auto"
            value={quantity}
            onChange={(e) => {
              setQuantity(Number(e.target.value));
              updateCart(Number(e.target.value));
            }}
            size="md"
            variant="outline"
            borderWidth="1px"
            borderColor="gray.400"
            borderRadius="8px"
          >
            {[...Array(10).keys()].map((quantity) => (
              <option key={quantity} value={quantity + 1}>
                {quantity + 1}
              </option>
            ))}
          </Select>
          <Button
            bg="transparent"
            fontSize={"16px"}
            fontFamily={"Inter"}
            fontWeight={"bold"}
            color={quantity < 10 ? "black" : "grey"}
            _hover={{ color: "green" }}
            onClick={handleAddClick}
            disabled={quantity === 9}
          >
            +
          </Button>
        </Flex>
        <Flex align={"center"} justify={"center"}>
          <Button
            bg="transparent"
            fontSize={"12px"}
            fontFamily={"Inter"}
            fontWeight={"bold"}
            color="black"
            _hover={{ color: "green" }}
          >
            Editar
          </Button>
          <Button
            bg="transparent"
            fontSize={"12px"}
            fontFamily={"Inter"}
            fontWeight={"bold"}
            _hover={{ color: "red" }}
            onClick={handleRemoveClick}
          >
            Excluir
          </Button>
        </Flex>
      </Flex>
      <Flex align={"center"} justify={"center"}>
        <Text fontSize={"24px"} fontWeight={"bold"}>
          {item.MenuItemCart.total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>
      </Flex>
    </Flex>
  );
};
