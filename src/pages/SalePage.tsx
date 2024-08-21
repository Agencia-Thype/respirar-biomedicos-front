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
import { Footer } from "../components/Footer";
import { ProductSearchProps } from "../interfaces/menuItem.interfaces";

export const SalePage: React.FC<ProductSearchProps> = ({setFilteredCardapio, handleSearch}) => {
  return (
    <Container padding={"0"} maxW={"100vw"}>
      <Header handleSearch={handleSearch}  setFilteredCardapio={setFilteredCardapio}/>
      <SliderSale />
      {/* <Flex
        padding={"5% 10%"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", lg: "row" }}
        gap="1rem"
        pb="2rem"
      >
      </Flex> */}
      <Footer/>
    </Container>
  );
};
