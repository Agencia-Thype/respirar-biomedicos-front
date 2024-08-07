import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Text,
  Heading,
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
    userDetails?.addresses?.find((address) => address.preferred)?.id || ""
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
  }, [listUserDetail]);

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
    const newCart = cart.filter((cartItem) => cartItem.MenuItem.id !== item.MenuItem.id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    handleTotalValue(newCart);
  };

  const handleFinishCheckout = () => {
    const orderItems = cart.map((cartItem) => cartItem.MenuItemCart);

    if (!selectedAddress) {
      setSelectedAddress(
        userDetails?.addresses?.find((address) => address.preferred)?.id || ""
      );
    }

    const newOrder: ICreateOrder = {
      userId: userId!,
      deliveryAddress: selectedAddress || userDetails?.addresses?.find((address) => address.preferred)?.id!,
      paymentMethod,
      orderItems,
      orderNumber,
      confirmDelivery: false,
    };

    createOrder({ newOrder, incrementOrderNumber });
  };

  const handleChange = (value: string) => {
    setPaymentMethod(value);
  };

  return (
    <Flex
      flexDir={{ base: "column", md: "row" }}
      gap="1rem"
      align="center"
      justify="center"
      p="1rem"
    >
      <Flex flexDir={{ base: "column", md: "row" }} gap="1rem" w="100%">
        <Text fontSize="20px" textAlign="center" w="80%" color="primary-color">
          Endereço de entrega:
        </Text>
        <Select
          bg="primary-color"
          value={selectedAddress}
          onChange={(event) => setSelectedAddress(event.target.value)}
        >
          <option value="">Selecione o Endereço</option>
          {userDetails?.addresses?.map((address) => (
            <option value={address.id} key={address.id}>
              {address.street} - {address.city}, {address.state}
            </option>
          ))}
        </Select>
      </Flex>
      <Flex flexDir="column" gap="1rem" w="100%">
        {cart.map((item) => (
          <CartCard
            key={item.MenuItem.id}
            item={item}
            onRemove={handleRemoveItem}
            handleTotalValue={handleTotalValue}
          />
        ))}
      </Flex>
      <Flex
        justify="center"
        align="center"
        flexDir="column"
        gap="1rem"
        w="100%"
        p="1rem"
      >
        <FormControl as="fieldset">
          <FormLabel color="primary-color" as="legend">
            Selecione o método de pagamento:
          </FormLabel>
          <Select
            bg="primary-color"
            value={paymentMethod}
            onChange={(e) => handleChange(e.target.value)}
          >
            <option value="default">Selecione o método de pagamento</option>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Cartão de Débito">Cartão de Débito</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="PIX">PIX</option>
          </Select>
        </FormControl>
        <Heading fontFamily="Inter" fontSize="28px">
          Total:{" "}
          {totalValue.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Heading>
        <Button
          isDisabled={paymentMethod === "default"}
          onClick={handleFinishCheckout}
          colorScheme="green"
        >
          Finalizar Compra
        </Button>
      </Flex>
    </Flex>
  );
};
