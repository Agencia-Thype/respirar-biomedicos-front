import { Button, Flex, Image, Text } from "@chakra-ui/react";
import {
  IUserDetailOrders,
  IUserDetailsOrderProps,
} from "../../../../interfaces/orders.interfaces";
import { IMenuItemData } from "../../../../interfaces/menuItem.interfaces";
import { useContext } from "react";
import { OrderContext } from "../../../../contexts/OrdersContext";
import { baseURL } from "../../../../services/api";

interface IMenuItemDataProps {
  MenuItemCart: {
    menuItemId: string;
    quantity: number;
    total: number;
    // instructions: string;
  };
  MenuItem: IMenuItemData;
}

export const LastOrderCard = ({ order }: IUserDetailsOrderProps) => {
  const { setOrdersQuantity } = useContext(OrderContext);
  const formatDate = (date: Date) => {
    const newDate = new Date(date);
    const day = newDate.getDay();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const addToCart = (item: IUserDetailOrders) => {
    const cart: IMenuItemDataProps[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    item.orderItems.forEach((orderItem) => {
      const menuItem: IMenuItemDataProps = {
        MenuItemCart: {
          // instructions: orderItem.instructions,
          menuItemId: orderItem.menuItemId,
          quantity: orderItem.quantity,
          total: orderItem.total,
        },
        MenuItem: orderItem.menuItem,
      };

      cart.push(menuItem);
      setOrdersQuantity(orderItem.quantity + 1)
    });


    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <Flex
      bg="rgba(255, 255, 255, 0.80)"
      p="1rem"
      borderRadius={"30px"}
      minWidth={"300px"}
      maxW={"500px"}
    >
      {order?.orderItems?.map((item) => {
        console.log(item.menuItem.images)
        return (
          <Flex
            flexDir={{ base: "column", lg: "row" }}
            gap="1rem"
            align={{ base: "center" }}
          >
            <Image
              src={`${baseURL}${item.menuItem?.images?.[0]?.filePath}`}
              w={{ base: "80%", lg: "40%" }}
              borderRadius={"10px"}
              objectFit={"cover"}
            />
            <Flex flexDir={"column"} gap="1rem">
              <Text>
                <Text as="b">Data:</Text> {formatDate(order.createdAt)}
              </Text>
              <Text>
                <Text as="b">Pedido:</Text> {item.quantity}x{" "}
                {item.menuItem.name}
              </Text>
              <Button
                fontSize={"13px"}
                borderRadius={"20px"}
                bg="logo-color"
                onClick={() => addToCart(order)}
              >
                Adicionar ao Carrinho
              </Button>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};
