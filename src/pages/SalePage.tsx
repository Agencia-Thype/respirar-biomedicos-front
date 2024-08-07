import {
  AspectRatio,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  Image,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import image from "../assets/image/lifestyle-people.jpg";
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillFacebook,
} from "react-icons/ai";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Header } from "../components/Header";
import { Slider } from "../components/slider/sliderHome";
import { SliderSale } from "../components/slider/sliderSale";

export const SalePage = () => {
  return (
    <Container padding={"0"} maxW={"100vw"}>
      <Header />
      <SliderSale />
      <Flex
        padding={"5% 10%"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", lg: "row" }}
        gap="1rem"
        pb="2rem"
      >
        <Flex maxW={"calc(100%/3)"} flexDir={"column"} gap="1rem">
          <Flex flexDir={"column"} gap="0.5rem">
            <Heading fontFamily={"Inter"} color={"#116CA0"}>
              Endereço
            </Heading>
            <Text color={"#116CA0"}>
              Rua 244, 375 Sala 02 Meia Praia - Itapema -SC 
            </Text>
          </Flex>
          <Flex flexDir={"column"} gap="1rem">
            <Heading fontFamily={"Inter"} color={"#116CA0"}>
              Telefone
            </Heading>
            <Text color={"#116CA0"}>(47) 8833-1224</Text>
          </Flex>
          <Flex flexDir={"column"} gap="1rem">
            <Heading fontFamily={"Inter"} color={"#116CA0"}>
              Whatsapp
            </Heading>
            <Text color={"#116CA0"}>(47) 98833 1224</Text>
          </Flex>
          <Flex flexDir={"column"} gap="1rem">
            <Heading fontFamily={"Inter"} color={"#116CA0"}>
              Email
            </Heading>
            <Text color={"#116CA0"}>respirarbiomedicos@gmail.com</Text>
          </Flex>
        </Flex>
        <Flex maxW={"calc(100%/3)"} flexDir={"column"} gap="0.5rem">
          <Heading fontFamily={"Inter"} color={"#116CA0"}>
            Horario de Funcionamento:
          </Heading>
          <Text color={"#116CA0"}>Segunda a Quinta: 18h00 às 23h00</Text>
          <Text color={"#116CA0"}>Sexta e Sábado: 18h00 às 00h00</Text>
          <Text color={"#116CA0"}>Domingo: 18h00 às 22h30</Text>
        </Flex>
        <Flex maxW={"calc(100%/3)"} flexDir={"column"} gap="1rem">
          <Heading fontFamily={"Inter"} color={"#116CA0"}>
            Redes Sociais
          </Heading>
          <Text color={"#116CA0"}>
            Siga-nos em nossas redes sociais para ficar por dentro das
            novidades, promoções e eventos especiais!
          </Text>
          <Flex justify={"space-evenly"} w="80%">
            <Icon
              as={AiFillInstagram}
              fontSize="45"
              cursor="pointer"
              transition={"0.3s"}
              color="#c13584"
              _hover={{ transform: "scale(1.2)" }}
            />
            <Icon
              as={AiOutlineTwitter}
              fontSize="45"
              cursor="pointer"
              transition={"0.3s"}
              color="#1da1f2"
              _hover={{ transform: "scale(1.2)" }}
            />
            <Icon
              as={AiFillFacebook}
              fontSize="45"
              cursor="pointer"
              transition={"0.3s"}
              color="#3b5998"
              _hover={{ transform: "scale(1.2)" }}
            />
          </Flex>
        </Flex>
        {/* <Flex flexDir={"column"} gap="2rem" w={{ base: "100%", lg: "30%" }}>
                </Flex> */}
      </Flex>
    </Container>
  );
};
