import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { IUserDetailsOrderProps } from "../../../interfaces/orders.interfaces";

export const CurrentOrdersCard = ({ order }: IUserDetailsOrderProps) => {
  const formatHour = (date: Date) => {
    const newDate = new Date(date);
    const hour = newDate.getHours();
    const minutes = newDate.getMinutes();
    return `${hour}:${minutes}`;
  };

  return (
    <Flex
      bg="rgba(255, 255, 255, 0.80)"
      p="1rem"
      borderRadius={"30px"}
      minWidth={"300px"}
      maxW={"500px"}
      flexDir={"column"}
      gap="1rem"
    >
      {order?.orderItems?.map((item) => (
        <Flex
          key={item.menuItemId}
          flexDir={{ base: "column", lg: "row" }}
          gap="1rem"
          align={{ base: "center" }}
        >
          <Image
            src={item.menuItem.imageURL}
            w={{ base: "70%", lg: "30%" }}
            borderRadius={"10px"}
            objectFit={"cover"}
          />
          <Flex flexDir={"column"} gap="0.25rem">
            <Text>
              <Text as="b">Pedido:</Text> {item.quantity}x {item.menuItem.name}
            </Text>
            <Text>
              <Text as="b">Horario do Pedido:</Text> {formatHour(order.createdAt)}
            </Text>
            <Text>
              <Text as="b">Ultima atualização:</Text> {formatHour(order.updatedAt)}
            </Text>
            <Text>
              <Text as="b">Status:</Text>{" "}
              {order.orderConfirm && order.finishedOrder
                ? "Saiu Para Entrega"
                : order.orderConfirm
                ? "Pedido Confirmado"
                : "Aguardando Confirmação"}
            </Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
