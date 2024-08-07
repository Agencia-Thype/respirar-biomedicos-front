import {
  Button,
  Container,
  Flex,
  Heading,
  Spinner,
  useBreakpointValue,
  useDisclosure,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  SimpleGrid,
  Box,
  Image,
} from "@chakra-ui/react";
import React, { Fragment, useContext, useState } from "react";
import { MenuItemContext } from "../contexts/MenuItemContext";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { MenuItensCard } from "../components/MenuItemCard";
import { GiHamburgerMenu } from "react-icons/gi";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const CardapioPage = () => {
  const { data: cardapio, isFetching: isFetchingCardapio } =
    useContext(MenuItemContext);
  const { data: categories, isFetching: isFetchingCategories } =
    useContext(CategoriesContext);
  const [selected, setSelected] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleButtonClick = (button: string) => {
    if (button === selected) {
      setSelected(null);
    } else {
      setSelected(button);
    }
  };

  if (isFetchingCardapio || isFetchingCategories) {
    return <Spinner />;
  }

  return (
    <Flex flexDir="column" w="100%">
      <Header />
      <Flex
        width={"100%"}
        // height={"100vh"}
        padding={{ base: "1% 5%", md: "1% 8%", lg: "1% 10%" }}
        backgroundImage="url('../src/assets/blue-grunge-background.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        position="relative"
        zIndex={1}
        _after={{
          content: '""',
          backgroundColor: "#E9F1F5",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.7,
          zIndex: -1,
        }}
        flexDirection={{ base: "column", md: "row", lg: "row" }}
      >
        <Flex
          width={"100%"}
          padding={"3% 0"}
          flexDirection={"column"}
          gap={"3rem"}
        >
          <Heading fontSize={{ base: "36px", md: "48px", lg: "72px" }}>
            Respire bem!
          </Heading>
          <Container margin={"0"} padding={"0"} color={"#116CA0"}>
            <Box as="h2" fontSize="36px">
              Viva bem!
            </Box>
            <Text fontSize="20px">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error
              reiciendis temporibus ut sequi ipsam asperiores eos aut, facere
              eligendi odio numquam odit eius tempora ea veritatis recusandae
              quasi porro quam!
            </Text>
          </Container>
          <Button
            w={"240px"}
            h={"60px"}
            background={"#116CA0"}
            color={"#E9F1F5"}
          >
            Saiba Mais
          </Button>
        </Flex>
        <Flex width={"50%"} justifyContent={"center"}>
          <Image
            src={"../src/assets/Group 12.png"}
            h="100%"
            // h="50%"
            objectFit="contain"
          />
        </Flex>
      </Flex>
      <Heading
        mt={"5%"}
        textAlign={"center"}
        size={{ base: "2xl", md: "3xl", lg: "4xl" }}
      >
        Produtos
      </Heading>
      <Flex
        width={"100%"}
        padding={"0 10%"}
        justifyContent={"space-between"}
        flexDirection={"column"}
        gap={"3rem"}
      >
        <Flex align="center" flexDir="column" justify="center" w="100%">
          {isMobile && (
            <Button mt="1rem" onClick={onOpen}>
              <GiHamburgerMenu />
              <Text ml={2}>Produtos</Text>
            </Button>
          )}
        </Flex>
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Produtos</DrawerHeader>
            <DrawerBody>
              <Flex justify={"center"} flexDir={"column"}>
                {categories?.map((category) => (
                  <Button
                    key={category.id}
                    bg={selected === category.id ? "logo-color" : "#E9F1F5"}
                    color={
                      selected === category.id ? "black-color" : "gray.800"
                    }
                    rounded={"50px"}
                    h="50px"
                    w="90%"
                    transition={"0.3s"}
                    _hover={{ bg: "logo-color", color: "black-color" }}
                    onClick={() => handleButtonClick(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Flex width={"100%"} gap={"5rem"}>
          <Flex
            flexDir="column"
            align="center"
            position="sticky"
            top="4rem"
            ml={{ base: 0, md: "1rem" }}
            display={{ base: "none", md: "flex" }}
            mt={"80px"}
            alignItems={"flex-start"}
          >
            {categories?.map((category) => (
              <Button
                key={category.id}
                bg={selected === category.id ? "logo-color" : "#116CA0"}
                color={selected === category.id ? "#fffff" : "black-color"}
                rounded="50px"
                h="45px"
                w="280px"
                transition="0.3s"
                _hover={{ bg: "logo-color", color: "black-color" }}
                onClick={() => handleButtonClick(category.id)}
                mb="1rem"
              >
                {category.name}
              </Button>
            ))}
          </Flex>
          <Container
            
            maxW={"5xl"}

            w={{ base: "100%", md: "65%", lg: "60%"}}
           
            
          >
            <Flex width={"100%"} flexDir="column" justifyContent="center" alignItems="flex-start" >

              {selected ? (
                <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing="10rem">
                  {cardapio
                    .filter((item) => item.categoryId === selected)
                    .map((item) => (
                      <Fragment key={item.id}>
                        <MenuItensCard item={item} />
                      </Fragment>
                    ))}
                </SimpleGrid>
              ) : (
                categories?.map((category) => (
                  <Fragment key={category.id}>
                    <Heading m="1.125rem 0 1.5rem 0">{category.name}</Heading>
                    <Flex
                      overflowX={"scroll"}
                      gap={"2rem"}
                      paddingBottom={"2rem"}
                      sx={{
                        "::-webkit-scrollbar": {
                          height: "6px",
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
                      {cardapio
                        .filter((item) => item.categoryId === category.id)
                        .map((item) => (
                          <Fragment key={item.id}>
                            <Box w="100%">
                              <MenuItensCard item={item} />
                            </Box>
                          </Fragment>
                        ))}
                    </Flex>
                  </Fragment>
                ))
              )}
            </Flex>
          </Container>
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
};
