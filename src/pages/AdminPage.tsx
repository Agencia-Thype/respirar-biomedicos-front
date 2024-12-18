import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { MenuItemContext } from "../contexts/MenuItemContext";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { AdminMenuItensCard } from "../components/AdminMenuItemCard";
import useAdminAuth from "../components/useAdminAuth";

export const AdminPage = () => {
  useAdminAuth();

  const [selected, setSelected] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();

  const { data: cardapio, isFetching: isFetchingCardapio } =
    useContext(MenuItemContext);
  const { data: categories, isFetching: isFetchingCategories } =
    useContext(CategoriesContext);

  const handleButtonClick = (id: any) => {
    setSelected((prev) => (prev === id ? null : id));
  };

  if (isFetchingCardapio || isFetchingCategories) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spinner/>
      </div>
    );
  }
  
  return (
    <Container maxW="100%" p="0">
      <Heading mt="3rem" fontSize="34px" padding="0 10%">
        Bem Vindo
      </Heading>

      <Flex
        justify={{ base: "flex-start", md: "center" }}
        align="center"
        mt="2rem"
        gap="3rem"
        padding="0 10%"
      >
        <Heading
          onClick={() => navigate("/admin/createItem")}
          cursor="pointer"
          fontSize="22px"
        >
          Adicionar Produto
        </Heading>
        <Heading
          onClick={() => navigate("/orders")}
          cursor="pointer"
          fontSize="22px"
        >
          Pedidos
        </Heading>
        <Heading
          onClick={() => navigate("/delivery")}
          cursor="pointer"
          fontSize="22px"
        >
          Entregas
        </Heading>
      </Flex>

      <Flex w="100%" flexDirection="column" padding="5% 10%">
        <Heading
          textAlign="center"
          size={{ base: "2xl", md: "3xl", lg: "4xl" }}
        >
          Produtos
        </Heading>

        <Flex
          width="100%"
          justifyContent="space-between"
          flexDirection="column"
          gap="3rem"
        >
          {isMobile && (
            <Flex align="center" justify="center" w="100%">
              <Button mt="1rem" onClick={onOpen}>
                <GiHamburgerMenu />
                <Text ml={2}>Produtos</Text>
              </Button>
            </Flex>
          )}

          <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent maxWidth="200px">
              <DrawerCloseButton />
              <DrawerHeader>Produtos</DrawerHeader>
              <DrawerBody>
                <Flex flexDir="column" align="center">
                  {categories?.map((category) => (
                    <Button
                      key={category.id}
                      bg={selected === category.id ? "logo-color" : "#E4D8C4"}
                      color={
                        selected === category.id ? "black-color" : "gray.800"
                      }
                      rounded="50px"
                      h="50px"
                      w="90%"
                      transition="0.3s"
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

          <Flex width="100%" gap="5rem">
            <Flex
              flexDir="column"
              align="flex-start"
              position="sticky"
              top="4rem"
              display={{ base: "none", md: "flex" }}
              mt="80px"
            >
              {categories?.map((category) => (
                <Button
                  key={category.id}
                  bg={selected === category.id ? "logo-color" : "#116CA0"}
                  color={selected === category.id ? "black-color" : "#FFFFFF"}
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

            <Container maxW="5xl">
              <Flex flexDir="column" align="flex-start" width="100%">
                {selected ? (
                  <SimpleGrid minChildWidth="250px" spacing="2rem" width="100%">
                    {cardapio
                      .filter((item) => item.categoryId === selected)
                      .map((item) => (
                        <AdminMenuItensCard key={item.id} item={item} />
                      ))}
                  </SimpleGrid>
                ) : (
                  categories?.map((category) => (
                    <Fragment key={category.id}>
                      <Heading m="1.125rem 0 1.5rem 0">{category.name}</Heading>
                      <Flex
                        width="100%"
                        overflowX="scroll"
                        gap="2rem"
                        paddingBottom="2rem"
                        sx={{
                          "::-webkit-scrollbar": { height: "6px" },
                          "::-webkit-scrollbar-thumb": {
                            backgroundColor: "#116CA0",
                            borderRadius: "20px",
                          },
                        }}
                      >
                        {cardapio
                          .filter((item) => item.categoryId === category.id)
                          .map((item) => (
                            <Box key={item.id} w="100%">
                              <AdminMenuItensCard item={item} />
                            </Box>
                          ))}
                      </Flex>
                    </Fragment>
                  ))
                )}
              </Flex>
            </Container>
          </Flex>
        </Flex>
      </Flex>

      <Footer />
    </Container>
  );
};
