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
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateCart(newQuantity);
    }
  };

  const handleRemoveClickQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCart(newQuantity);
    }
  };

  const updateCart = (newQuantity: number) => {
    const updatedItem = {
      ...item,
      MenuItemCart: { ...item.MenuItemCart, quantity: newQuantity },
    };
    updatedItem.MenuItemCart.total = newQuantity * item.MenuItem.price;

    const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]").map(
      (cartItem: IMenuItemData) =>
        cartItem.MenuItem.id === item.MenuItem.id ? updatedItem : cartItem
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
      bg="#73a4e315"
      maxW={"100%"}
      maxH={"100%"}
      p="1rem"
      gap="1rem"
      borderRadius="20px"
      flexDir={{ base: "column", md: "row" }}
      align={{ base: "stretch", md: "center" }}
      justify="space-between"
    >
      <Image
        w={{ base: "100%", md: "20%" }}
        maxW="100%"
        h={{ base: "auto", md: "100px" }}
        objectFit="cover"
        src={item?.MenuItem.imageURL[0]}
        borderRadius="20px"
      />
      <Flex flexDir="column" gap="0.5rem" flex="1">
        <Heading
          textAlign={{ base: "center", md: "left" }}
          fontSize="20px"
          fontFamily="Inter"
        >
          {item?.MenuItem.name}
        </Heading>
      </Flex>
      <Flex
        flexDir={{ base: "row", md: "column" }}
        align="center"
        justify="center"
        gap="1rem"
      >
        <Select
          size="sm"
          value={quantity}
          onChange={(e) => {
            const newQuantity = Number(e.target.value);
            setQuantity(newQuantity);
            updateCart(newQuantity);
          }}
        >
          {[...Array(10).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </Select>
        <Text
          textAlign={{ base: "center", md: "left" }}
          fontSize="18px"
          fontFamily="Inter"
        >
          Total:{" "}
          {(item.MenuItem.price * quantity).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>
        <Flex gap="1rem">
          <Button size="sm" colorScheme="red" onClick={handleRemoveClick}>
            Remover
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
