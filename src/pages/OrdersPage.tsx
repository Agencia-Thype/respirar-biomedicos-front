import { Container, Flex, Image, Spinner } from "@chakra-ui/react";
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
import { Link } from "react-router-dom";
import { Fragment, useContext, useEffect, useState } from "react";
import { OrderContext } from "../contexts/OrdersContext";
import { IOrdersData } from "../interfaces/orders.interfaces";
import { useNavigate } from "react-router-dom";
import useAdminAuth from "../components/useAdminAuth";
import { Header } from "../components/Header";
import { ProductSearchProps } from "../interfaces/menuItem.interfaces";

export const OrdersPage: React.FC<ProductSearchProps> = ({setFilteredCardapio, handleSearch}) => {
  useAdminAuth();
  const { data, statusOrder, isFetching } = useContext(OrderContext);

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

  const handleButtons = (type: string, orderId: string) => {
    if (type === "confirm") {
      const data = {
        orderId,
        orderConfirm: true,
      };
      statusOrder({ data });
    } else {
      const data = {
        orderId,
        finishedOrder: true,
      };
      statusOrder({ data });
    }
  };

  return (
    <Box>
      <Header handleSearch={handleSearch}  setFilteredCardapio={setFilteredCardapio}/>
      <Container padding={"0 10%"} maxW={"100%"}>
        <VStack spacing={4} alignItems="stretch">
          <Box overflow={"auto"}>
            <Button onClick={() => navigate("/admin")} m="1rem 0">
              Voltar
            </Button>
            {orders?.length === 0 ? (
              <Image src="" w="30%" m="0 auto" />
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
                      Pedido
                    </Th>
                    <Th textAlign={"center"} fontFamily={"Montserrat"}>
                      Telefone do Usuário
                    </Th>
                    <Th textAlign={"center"} fontFamily={"Montserrat"}>
                      Ações
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {isFetching ? (
                    <Spinner />
                  ) : (
                    orders?.map((order) => (
                      <Fragment key={order.id}>
                        {!order.finishedOrder && (
                          <Tr>
                            <Td textAlign={"center"}>{order.orderNumber}</Td>
                            <Td textAlign={"center"}>
                              {formatDate(order.createdAt)}
                            </Td>
                            <Td textAlign={"center"}>
                              {formatDate(order.updatedAt)}
                            </Td>
                            <Td textAlign={"center"}>
                              {order.orderItems.map(
                                (item) =>
                                  `${item.quantity}x ${item.menuItem.name}`
                              )}
                            </Td>
                            <Td textAlign={"center"}>
                              <Link
                                to={`https://api.whatsapp.com/send?phone=${order.user.phoneNumber}`}
                               
                              >
                                {order.user.phoneNumber}
                              </Link>
                            </Td>
                            <Td textAlign={"center"}>
                              {order.orderConfirm ? (
                                <Button
                                  onClick={() =>
                                    handleButtons("finish", order.id)
                                  }
                                  colorScheme="teal"
                                  variant="outline"
                                  size="sm"
                                >
                                  Finalizar Pedido
                                </Button>
                              ) : (
                                <Button
                                  onClick={() =>
                                    handleButtons("confirm", order.id)
                                  }
                                  colorScheme="teal"
                                  variant="outline"
                                  size="sm"
                                >
                                  Confirmar Pedido
                                </Button>
                              )}
                            </Td>
                          </Tr>
                        )}
                      </Fragment>
                    ))
                  )}
                </Tbody>
              </Table>
            )}
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};
