import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { UsersContext } from "../contexts/UsersContext";
import { UserAddresses } from "../components/UserPage/Address";
import { AddressesContext } from "../contexts/AddressesContext";
import { LastOrderCard } from "../components/UserPage/LastOrders/LastOrderCard";
import { CurrentOrdersCard } from "../components/UserPage/CurrentOrdersCard";
import { OrderContext } from "../contexts/OrdersContext";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";

export const UserPage = () => {
  const { listUserProfile, userProfile } = useContext(UsersContext);
  const { handleAddress } = useContext(AddressesContext);
  const { statusChange } = useContext(OrderContext);

  const token = localStorage.getItem("@DownTown:Token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      listUserProfile();
    }
  }, [handleAddress, statusChange, token, navigate, listUserProfile]);

  return (
    <Flex flexDir="column" w="100%">
      <Flex w="100%">
        <Header />
      </Flex>
      <Container maxW={"8xl"}>
        <Heading mt="2rem">
          Bem vindo(a),{" "}
          <Text letterSpacing={"3px"} fontSize={"35px"} as="b" color="logo-color">
            {userProfile?.name}
          </Text>
        </Heading>
        <Flex flexDir={{ base: "column", lg: "row" }} gap="1rem">
          {userProfile.addresses && (
            <UserAddresses addresses={userProfile.addresses} />
          )}
          <Flex
            w="100%"
            align={"center"}
            justify={"flex-start"}
            flexDir={"column"}
            gap="1rem"
          >
            <Heading fontFamily={"Montserrat"}>Últimos Pedidos</Heading>
            <Flex flexDir={"column"} gap="1rem">
              {userProfile?.orders
                ?.slice(-3)
                .filter((order) => order.confirmDelivery)
                .map((order) => {
                  if (order.finishedOrder) {
                    return <LastOrderCard key={order.id} order={order} />;
                  }
                  return null;
                })}
            </Flex>
          </Flex>
        </Flex>
        <Flex
          justify={"center"}
          flexDir={"column"}
          align={{ base: "center", lg: "flex-start" }}
          gap="1rem"
          mt="2rem"
        >
          <Heading textAlign={"center"} fontFamily={"Montserrat"}>
            Acompanhar Pedidos
          </Heading>
          <Flex flexDir={"column"} gap="1rem" w="100%">
            {userProfile?.orders
              ?.filter((order) => !order.confirmDelivery)
              .map((order) => {
                return <CurrentOrdersCard key={order.id} order={order} />;
              })}
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};
