import { Fragment, useContext, useEffect, useState } from "react";
import { OrderContext } from "../contexts/OrdersContext";
import { Container, Flex, Image } from "@chakra-ui/react";
import {
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { IOrdersData } from "../interfaces/orders.interfaces";
import { useNavigate } from "react-router-dom";
import useAdminAuth from "../components/useAdminAuth";
import { Header } from "../components/Header";

export const DeliveryPage = () => {
  useAdminAuth();
  const { data, deleteOrder, statusOrder, statusChange } =
    useContext(OrderContext);

  const [orders, setOrders] = useState<IOrdersData>();

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleDelete = (id: string) => {
    deleteOrder(id);
  };

  const handleConfirmDelivery = (orderId: string) => {
    const data = {
      orderId,
      confirmDelivery: true,
    };
    statusOrder({ data });
  };
   

  return (
    <Box>
    <Header/>
    
    <Container maxW={"8xl"} bg={"red"}>
      <VStack spacing={4} alignItems="stretch">
        <Box overflow={"auto"}>
          <Button m="1rem 0" onClick={() => navigate("/admin")}>
            Voltar
          </Button>
           {orders?.length === 0 ? (
            <Image
              src="https://cdn.discordapp.com/attachments/682800725855961174/1103086877013188629/Igor_Garcia_Create_a_funny_image_of_a_burger_with_sad_face_wait_19d577bb-3f46-4126-ac35-a190237db01d.png"
              w="30%"
              m="0 auto"
            />
          ) : (
            <Table variant="simple" bg="white" borderRadius={"10px"}>
              <Thead>
                <Tr>
                  <Th textAlign={"center"} fontFamily={"Montserrat"}>
                    Nº do Pedido
                  </Th>
                  <Th textAlign={"center"} fontFamily={"Montserrat"}>
                    Horário do Pedido
                  </Th>
                  <Th textAlign={"center"} fontFamily={"Montserrat"}>
                    Última Atualização
                  </Th>
                  <Th textAlign={"center"} fontFamily={"Montserrat"}>
                    Endereço de Entrega
                  </Th>
                  <Th textAlign={"center"} fontFamily={"Montserrat"}>
                    Ações
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders
                  ?.filter((order) => !order.confirmDelivery)
                  .map((order) => (
                    <Fragment key={order.id}>
                      {order.finishedOrder && (
                        <Tr>
                          <Td textAlign={"center"}>{order.orderNumber}</Td>
                          <Td textAlign={"center"}>
                            {formatDate(order.createdAt)}
                          </Td>
                          <Td textAlign={"center"}>
                            {formatDate(order.updatedAt)}
                          </Td>
                          <Td textAlign={"center"}>
                            {order.deliveryAddress.street},{" "}
                            {order.deliveryAddress.complement}
                          </Td>
                          <Td textAlign={"center"} display={"flex"} gap="1rem">
                            <Button
                              onClick={() => handleConfirmDelivery(order.id)}
                              colorScheme="green"
                              variant="outline"
                              size="sm"
                            >
                              Confirmar
                            </Button>
                            <Button
                              onClick={() => handleDelete(order.id)}
                              colorScheme="red"
                              variant="outline"
                              size="sm"
                            >
                              Cancelar
                            </Button>
                          </Td>
                        </Tr>
                      )}
                    </Fragment>
                  ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </VStack>
    </Container>
    </Box>
  );
};
