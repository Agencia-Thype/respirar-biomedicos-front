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
import { Header } from "../components/Header";
import lifestyleImg from "../assets/image/lifestyle-people.jpg"

export const HomePage = () => {
  // const navigate = useNavigate();
  return (
    <Box>
      {/* <Header/> */}
      <Slider/>

      <Flex bg="#E9F1F5" height={"670px"}>
        <Container maxW={"7xl"}>
          {/* <Heading textAlign={"center"} fontSize={"40px"} color={"#000000"}>
            Sobre nós
          </Heading> */}
          <Flex
            flexDir={{ base: "column", md: "row" }}
            mt="2rem"
            justify={"space-around"}
            alignItems={"center"}
            gap="3rem"
            h={"100%"}
          >
            <Flex flexDir={"column"} align={"flex-start"} gap="35px" w="100%">              
              <Heading color={"#116CA0"}>Sobre nós</Heading>
              <Text color={"#116CA0"} textAlign={"justify"}>
              A RESPIRAR PRUDUTOS BIOMEDICOS Ltda. é a resposta à crescente demanda por serviços de venda e aluguel de equipamentos médicos para que o paciente possa continuar seu tratamento em seu ambiente natural, em casa.
              </Text>
              <Button w={"240px"} bg={"#116CA0"} color={"#FFFFFF"}>Saiba Mais</Button>
            </Flex>
            <Flex flexDir={"column"} align={"center"} border="5px solid #116CA0" gap="0.5rem" w="100%" borderRadius={"12px"} overflow={"hidden"}>
              <Image  src={lifestyleImg}/>
            </Flex>
          </Flex>
        </Container>
      </Flex>
      <Footer />
    </Box>
  );
};
