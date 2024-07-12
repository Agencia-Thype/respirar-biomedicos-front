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
} from "@chakra-ui/react";
import React, { Fragment, useContext, useState } from "react";
import { MenuItemContext } from "../contexts/MenuItemContext";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { MenuItensCard } from "../components/MenuItemCard";
import { GiHamburgerMenu } from "react-icons/gi";

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
    <Flex flexDir="column" w="100%" gap="1rem" mt="1rem">
      <Heading textAlign={"center"} size={{ base: "2xl", md: "3xl", lg: "4xl" }}>Cardápio</Heading>
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
            <Flex justify={"center"} gap={{ base: "1rem", md: "3rem" }} flexDir={"column"}>
              {categories?.map((category) => (
                <Button
                  key={category.id}
                  bg={selected === category.id ? "logo-color" : "#E4D8C4"}
                  color={selected === category.id ? "black-color" : "gray.800"}
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
      <Flex>
        <Flex
          flexDir="column"
          align="center"
          position="sticky"
          top="4rem"
          ml={{ base: 0, md: "1rem" }}
          display={{ base: "none", md: "flex" }}
          mt={"80px"}
        >
          {categories?.map((category) => (
            <Button
              key={category.id}
              bg={selected === category.id ? "logo-color" : "#E4D8C4"}
              color={selected === category.id ? "black-color" : "gray.800"}
              rounded="50px"
              h="25px"
              w="220px"
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
          w={{ base: "100%", md: "80%" }}
          px={{ base: "1rem", md: "0" }}
          
        >
          <Flex flexDir="column" justifyContent="center" alignItems="flex-start" >
            {selected ? (
              <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing="1rem">
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
                  <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing="1rem" w={{ base: "70%", md: "100%" }}>
                    {cardapio
                      .filter((item) => item.categoryId === category.id)
                      .map((item) => (
                        <Fragment key={item.id}>
                          <Box w="100%">
                            <MenuItensCard item={item} />
                          </Box>
                        </Fragment>
                      ))}
                  </SimpleGrid>
                </Fragment>
              ))
            )}
          </Flex>
        </Container>
      </Flex>
    </Flex>
  );
};
