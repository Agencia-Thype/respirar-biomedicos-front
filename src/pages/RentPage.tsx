import {
  AspectRatio,
  Button,
  Container,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Footer } from "../components/Footer";
import { ProductSearchProps } from "../interfaces/menuItem.interfaces";

export const RentPage = () => {
  return (
    <Container padding={"0"} maxW={"100vw"}>
      <Flex
        padding={{ base: "5% 3%", md: "5% 10%" }} // Padding ajustado para diferentes tamanhos de tela
        width={"100%"}
        bg={"#E9F1F5"}
        flexDir={"column"}
        gap="5rem"
      >
        <Heading fontFamily={"Inter"} textAlign={"center"} color={"#116CA0"}>
          Locação
        </Heading>
        <Flex
          width={"100%"}
          height={"100%"}
          gap="5rem"
          flexDirection={{ base: "column", md: "row" }} // Responsivo: coluna no celular, linha em telas maiores
        >
          <Flex
            width={{ base: "100%", md: "50%" }}
            flexDir={"column"}
            gap="3rem"
          >
            <Heading fontFamily={"Inter"} color={"#116CA0"}>
              Como alugar
            </Heading>
            <Text fontFamily={"Inter"} textAlign={"justify"} color={"#116CA0"}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor at
              incidunt nam modi commodi quis. Blanditiis inventore tempore,
              tempora sapiente minus ipsum non quam ea. Ipsam laudantium ab quod
              ea!
            </Text>
            <Button w={"240px"} bg={"#116CA0"} color={"#FFFFFF"}>
              Saiba Mais
            </Button>
          </Flex>
          <Flex width={{ base: "100%", md: "50%" }}>
            <AspectRatio width="100%" ratio={16 / 9} border="2px solid #116CA0">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/u8LWkxHSQf4?si=r4M2nmM4Zy0uCbMb"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </AspectRatio>
          </Flex>
        </Flex>
      </Flex>
      <Footer />
    </Container>
  );
};
