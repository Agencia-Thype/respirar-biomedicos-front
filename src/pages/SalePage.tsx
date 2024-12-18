import { Container } from "@chakra-ui/react";
import { SliderSale } from "../components/slider/sliderSale";
import { Footer } from "../components/Footer";
import { ProductSearchProps } from "../interfaces/menuItem.interfaces";

export const SalePage = () => {
  return (
    <Container padding={"0"} maxW={"100vw"}>
      <SliderSale />
      <Footer />
    </Container>
  );
};
