import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdDeliveryDining } from "react-icons/md";
import { Footer } from "../components/Footer";
import burger from "../assets/burger.png";
import { useNavigate } from "react-router-dom";
import { Slider } from "../components/slider/sliderHome";
import { Header } from "../components/Header";
import lifestyleImg from "../assets/image/lifestyle-people.jpg";
import { ProductCard } from "../components/ProductsCards";
import CPAP from "../assets/image/CPAP.png";

export const HomePage = () => {
  // const navigate = useNavigate();
  return (
    <Box>
      <Header />
      <Slider />

      <Flex padding={"8%"}>
        <Container maxW={"7xl"}>
          <Flex
            flexDir={"column"}
            // mt="2rem"
            justify={"space-around"}
            alignItems={"center"}
            gap="5rem"
            // h={"100%"}
          >
            <Heading color={"#116CA0"} fontSize={"48px"} fontWeight={"800"}>
              Produtos em Destaque
            </Heading>
            <SimpleGrid
              columns={[1, 2, 3]}
              spacing="1rem"
              w={{ base: "70%", md: "100%" }}
              maxH={"670px"}
              overflowY={"scroll"}
              p={"12px"}
              sx={{
                "::-webkit-scrollbar": {
                  width: "8px",
                },
                "::-webkit-scrollbar-track": {
                  background: "none",
                },
                "::-webkit-scrollbar-thumb": {
                  backgroundColor: "#116CA0",
                  borderRadius: "20px",
                  border: "3px solid transparent",
                },
              }}
            >
              <ProductCard
                description="Travesseiro Multi Máscaras Para CPAP - Perfetto"
                img={CPAP}
              />
              <ProductCard
                description="Travesseiro Multi Máscaras Para CPAP - Perfetto"
                img={CPAP}
              />
              <ProductCard
                description="Travesseiro Multi Máscaras Para CPAP - Perfetto"
                img={CPAP}
              />
              <ProductCard
                description="Travesseiro Multi Máscaras Para CPAP - Perfetto"
                img={CPAP}
              />
              <ProductCard
                description="Travesseiro Multi Máscaras Para CPAP - Perfetto"
                img={CPAP}
              />
              <ProductCard
                description="Travesseiro Multi Máscaras Para CPAP - Perfetto"
                img={CPAP}
              />
              <ProductCard
                description="Travesseiro Multi Máscaras Para CPAP - Perfetto"
                img={CPAP}
              />
            </SimpleGrid>
          </Flex>
        </Container>
      </Flex>

      <Flex bg="#E9F1F5" padding={"8%"}>
        <Container maxW={"7xl"}>
          <Flex
            flexDir={{ base: "column", md: "row" }}
            mt="2rem"
            justify={"space-around"}
            alignItems={"center"}
            gap="3rem"
            // h={"100%"}
          >
            <Flex flexDir={"column"} align={"flex-start"} gap="35px" w="100%">
              <Heading color={"#116CA0"}>Sobre nós</Heading>
              <Text color={"#116CA0"} textAlign={"justify"}>
                A RESPIRAR PRUDUTOS BIOMEDICOS Ltda. é a resposta à crescente
                demanda por serviços de venda e aluguel de equipamentos médicos
                para que o paciente possa continuar seu tratamento em seu
                ambiente natural, em casa.
              </Text>
              <LinkBox
                  as="article"
                  bg="#116CA0"
                  color="#FFFFFF"
                  w={"240px"}
                  borderRadius="md"
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  fontSize={"16.8px"}
                  fontWeight="bold"
                  padding="8px 16px"
                  _hover={{ bg: "gray.200" }}
                >
                  <LinkOverlay href="/contacts">SAIBA MAIS</LinkOverlay>
                </LinkBox>
             
            </Flex>
            <Flex
              flexDir={"column"}
              align={"center"}
              border="5px solid #116CA0"
              gap="0.5rem"
              w="100%"
              borderRadius={"12px"}
              overflow={"hidden"}
            >
              <Image src={lifestyleImg} />
            </Flex>
          </Flex>
        </Container>
      </Flex>

      
      <Footer />
    </Box>
  );
};
