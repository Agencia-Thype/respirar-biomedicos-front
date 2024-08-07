import { Button, Flex, Heading, Image, Select, Text } from "@chakra-ui/react";
import { IMenuItemData } from "../../MenuItemCard/ModalConfirm";
import { useContext, useState } from "react";
import { OrderContext } from "../../../contexts/OrdersContext";
import { Header } from "../../Header";

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
    const updatedItem = { ...item, MenuItemCart: { ...item.MenuItemCart, quantity: newQuantity } };
    updatedItem.MenuItemCart.total = newQuantity * item.MenuItem.price;

    const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]").map((cartItem: IMenuItemData) =>
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
    <Flex flexDir="column" w="100%" bg="background-color">
      <Flex w="100%">
        <Header />
      </Flex>
      <Flex
        bg="#D9D9D9"
        p="1rem"
        gap="1rem"
        borderRadius="20px"
        flexDir={{ base: "column", md: "row" }}
        align="center"
        justify={{ base: "center", md: "flex-start" }}
      >
        <Image
          w={{ base: "100%", md: "20%" }}
          maxW={{ base: "100%" }}
          h="auto"
          maxHeight={{ base: "100px", md: "100%" }}
          objectFit="cover"
          src={item?.MenuItem.imageURL}
          borderRadius="20px"
        />
        <Flex flexDir="column" gap="0.5rem" w={{ base: "auto", md: "100%" }}>
          <Heading fontSize="24px" color="black">
            {item?.MenuItem.name}
          </Heading>
          <Text fontFamily="Poppins" fontSize="16px">
            {item?.MenuItem.description}
          </Text>
          <Text fontFamily="Poppins" fontSize="16px" as="b">
            Observações: {item?.MenuItemCart.instructions}
          </Text>

          <Flex align="center" justify={{ base: "center", md: "flex-end" }}>
            <Text mr="0.5rem">Quantidade:</Text>
            <Button
              bg="transparent"
              fontSize="16px"
              fontFamily="Inter"
              fontWeight="bold"
              _hover={{ color: "green" }}
              onClick={handleRemoveClickQuantity}
              isDisabled={quantity <= 1}
              color={quantity > 1 ? "black" : "grey"}
            >
              -
            </Button>

            <Select
              w="auto"
              value={quantity}
              onChange={(e) => {
                const newQuantity = Number(e.target.value);
                setQuantity(newQuantity);
                updateCart(newQuantity);
              }}
              size="md"
              variant="outline"
              borderWidth="1px"
              borderColor="gray.400"
              borderRadius="8px"
              mr="0.5rem"
            >
              {[...Array(10).keys()].map((quantity) => (
                <option key={quantity} value={quantity + 1}>
                  {quantity + 1}
                </option>
              ))}
            </Select>
            <Button
              bg="transparent"
              fontSize="16px"
              fontFamily="Inter"
              fontWeight="bold"
              color={quantity < 10 ? "black" : "grey"}
              _hover={{ color: "green" }}
              onClick={handleAddClick}
              isDisabled={quantity >= 10}
            >
              +
            </Button>
          </Flex>
          <Flex align="center" justify="center" gap="1rem">
            <Button
              bg="transparent"
              fontSize="12px"
              fontFamily="Inter"
              fontWeight="bold"
              color="black"
              _hover={{ color: "green" }}
            >
              Editar
            </Button>
            <Button
              bg="transparent"
              fontSize="12px"
              fontFamily="Inter"
              fontWeight="bold"
              _hover={{ color: "red" }}
              onClick={handleRemoveClick}
            >
              Excluir
            </Button>
          </Flex>
        </Flex>
        <Flex align="center" justify="center">
          <Text fontSize="24px" fontWeight="bold">
            {item.MenuItemCart.total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
