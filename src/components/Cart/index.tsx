import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Radio,
  RadioGroup,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IMenuItemData } from "../MenuItemCard/ModalConfirm";
import { CartCard } from "./CartCard";
import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../contexts/OrdersContext";
import { ICreateOrder } from "../../interfaces/orders.interfaces";
import jwt_decode from "jwt-decode";
import { UsersContext } from "../../contexts/UsersContext";

export const Cart = () => {
  const { createOrder } = useContext(OrderContext);
  const { listUserDetail, userDetails } = useContext(UsersContext);

  const [totalValue, setTotalValue] = useState(0);
  const [cart, setCart] = useState<IMenuItemData[]>([]);
  const [orderNumber, setOrderNumber] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(
    userDetails?.addresses?.find((address) => address.preferred)?.id
  );
  const [userId, setUserId] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("default");

  // Load cart and user data from local storage and server
  useEffect(() => {
    const storedCart: IMenuItemData[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    const storedOrderNumber = localStorage.getItem("orderNumber");
    const storedDate = localStorage.getItem("storedDate");

    setCart(storedCart);
    handleTotalValue(storedCart);

    const currentDate = new Date().toDateString();

    if (storedDate !== currentDate) {
      localStorage.setItem("storedDate", currentDate);
      setOrderNumber(1);
    } else {
      setOrderNumber(storedOrderNumber ? parseInt(storedOrderNumber) : 1);
    }

    const token = localStorage.getItem("@DownTown:Token") || "";

    const tokenDecoded = jwt_decode<any>(token);

    listUserDetail(tokenDecoded.id);
    setUserId(tokenDecoded.id);
  }, []);

  const incrementOrderNumber = () => {
    setOrderNumber((prevOrderNumber) => {
      const newOrderNumber = prevOrderNumber + 1;
      localStorage.setItem("orderNumber", newOrderNumber.toString());
      return newOrderNumber;
    });
  };

  const handleTotalValue = (cart: IMenuItemData[]) => {
    const value = cart.reduce((acc, currentValue) => {
      return acc + currentValue.MenuItemCart.total;
    }, 0);
    setTotalValue(value);
  };

  const handleRemoveItem = (item: IMenuItemData) => {
    const newCart = cart.filter((cartItem) => cartItem !== item);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    handleTotalValue(newCart);
  };

  const handleFinishCheckout = () => {
    const orderItems = cart.map((cartItem) => {
      return cartItem.MenuItemCart;
    });
  
    if (!selectedAddress) {
      setSelectedAddress(
        userDetails?.addresses?.find((address) => address.preferred)?.id
      );
    }
  
    const newOrder: ICreateOrder = {
      userId: userId!,

      deliveryAddress: selectedAddress

        ? selectedAddress
        : userDetails?.addresses?.find((address) => address.preferred)?.id!,
      paymentMethod: paymentMethod,
      orderItems,

      orderNumber: orderNumber,
      confirmDelivery: false, // Adicione esta linha com o valor padrão desejado
    };
  
    console.log(newOrder)

    createOrder({ newOrder, incrementOrderNumber });
  };

  const handleChange = (value: string) => {
    setPaymentMethod(value);
  };

  return (
    <>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        gap="1rem"
        align={"center"}
        justify={"center"}
        maxW={"auto"}
        margin="0 auto"
      >
        <Text
          fontSize={"20px"}
          textAlign={"center"}
          w="80%"
          color="primary-color"
        >
          Endereço de entrega:
        </Text>
        <Select
          bg="primary-color"
          value={
            selectedAddress ||
            userDetails?.addresses?.find((address) => address.preferred)?.id ||
            ""
          }
          onChange={(event) => setSelectedAddress(event.target.value)}
        >
          <option>Selecione o Endereço</option>
          {userDetails?.addresses?.map((address) => {
            return (
              <option value={address?.id} key={address?.id}>
                {address?.street} - {address?.city}, {address.state}
              </option>
            );
          })}
        </Select>
      </Flex>
      <Flex flexDir={"column"} gap="1rem">
        {cart.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <CartCard
                item={item}
                onRemove={handleRemoveItem}
                handleTotalValue={handleTotalValue}
              />
            </React.Fragment>
          );
        })}
      </Flex>
      <Flex
        align={"center"}
        justify={"center"}
        w={{ base: "100%", md: "50%" }}
        margin="0 auto"
      >
        <FormControl as="fieldset">
          <FormLabel color="primary-color" as="legend">
            Selecione o método de pagamento:
          </FormLabel>

          <Select
            bg="primary-color"
            onChange={(e) => handleChange(e.target.value)}
          >
            <option value="default">Selecione o método de pagamento</option>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Cartão de Débito">Cartão de Débito</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="PIX">PIX</option>
          </Select>
        </FormControl>
      </Flex>
      <Flex
        justify={"center"}
        align={"flex-end"}
        w="100%"
        mt="1rem"
        gap="1rem"
        flexDir={"column"}
      >
        <Heading fontFamily={"Inter"} fontSize={"28px"}>
          Total:{" "}
          {totalValue.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Heading>
        <Button
          isDisabled={paymentMethod === "default" ? true : false}
          onClick={handleFinishCheckout}
          colorScheme="green"
        >
          Finalizar Compra
        </Button>
      </Flex>
    </>
  );
};
