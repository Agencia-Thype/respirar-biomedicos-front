import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdDeliveryDining } from "react-icons/md";
import { Footer } from "../components/Footer";
import burger from "../assets/burger.png";
import { useNavigate } from "react-router-dom";
import { Slider } from "../components/slider";

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Container>

        <Slider/>
      </Container>


      <Flex bg="#E1D4C0" mt="2rem" p="2rem 0">
        <Container maxW={"5xl"}>
          <Heading textAlign={"center"} fontSize={"40px"} color={"#000000"}>
            O que temos para você
          </Heading>
          <Flex
            flexDir={{ base: "column", md: "row" }}
            mt="2rem"
            justify={"space-around"}
            alignItems={"flex-start"}
            gap="1rem"
          >
            <Flex flexDir={"column"} align={"center"} gap="0.5rem" w="100%">
              <IoFastFoodSharp size="70" color={"#43342A"} />
              <Heading color={"#43342A"}>Hamburguers</Heading>
              <Text color={"#43342A"}>
                Suculento hambúrguer artesanal e Árabe
              </Text>
            </Flex>
            <Flex flexDir={"column"} align={"center"} gap="0.5rem" w="100%">
              <MdDeliveryDining size="80" color={"#43342A"} />
              <Heading color={"#43342A"}>Delivery</Heading>
              <Text color={"#43342A"} textAlign={"center"}>
                Saboreie nossas deliciosas ofertas e pratos exclusivos de
                hambúrgueres direto para sua casa através do nosso aplicativo.
              </Text>
            </Flex>
          </Flex>
        </Container>
      </Flex>
      <Footer />
    </Box>
  );
};
