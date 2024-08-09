import { Box, Button, Container, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, SimpleGrid, Spinner, Text, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { Fragment, useContext, useState } from "react";
import { CreateMenuItem } from "../components/CardapioForms/CreateMenuItem";
import { EditMenuItem } from "../components/CardapioForms/EditMenuItem";
import { DeleteMenuItem } from "../components/CardapioForms/DeleteMenuItem";
import useAdminAuth from "../components/useAdminAuth";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { MenuItemContext } from "../contexts/MenuItemContext";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { AdminMenuItensCard } from "../components/AdminMenuItemCard";
import { IMenuItemInterfaceData } from "../interfaces/menuItem.interfaces";



export const AdminPage = () => {
  useAdminAuth();
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);

  const [isCreateOpenModal, setIsCreateOpenModal] = useState(false)
  const toggleCreateModal = () => setIsCreateOpenModal(!isCreateOpenModal)

  const navigate = useNavigate();

  const handleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };
  const handleClick = (index: number) => {
    setSelectedMenu((prevState) => (prevState === index ? null : index));
  };

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
    <Container maxW={"100%"} p={"0"}>
      <Header/>
      <Heading mt={"3rem"} fontSize={"34px"} padding={"0 10%"}>Bem Vindo</Heading>
      <Flex
        justify={{ base: "flex-start", md: "center" }}
        align={"center"}
        mt="2rem"
        overflowX={"auto"}
        gap={{ base: "3rem" }}
        padding={"0 10%"}
      >
        <Heading
          onClick={toggleCreateModal}
          cursor={"pointer"}
          fontFamily={"Montserrat"}
          fontSize={"22px"}
          borderBottom={showSubMenu ? "solid 1px white" : "none"}
        >
          Adicionar Produto
        </Heading>
        <Heading
          onClick={() => navigate("/orders")}
          cursor={"pointer"}
          fontFamily={"Montserrat"}
          fontSize={"22px"}
        >
          Pedidos
        </Heading>
        <Heading
          onClick={() => navigate("/delivery")}
          cursor={"pointer"}
          fontFamily={"Montserrat"}
          fontSize={"22px"}
        >
          Entregas
        </Heading>
      </Flex>
      <Flex
        w={"100%"}
        flexDirection={"column"}
        padding={"5% 10%"}
      >
        <Heading
          textAlign={"center"}
          size={{ base: "2xl", md: "3xl", lg: "4xl" }}
        >
          Produtos
        </Heading>
        <Flex  
          width={"100%"}
          justifyContent={"space-between"}
          flexDirection={"column"}
          gap={"3rem"}>
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
                        <AdminMenuItensCard item={item} />
                      </Fragment>
                    ))}
                </SimpleGrid>
              ) : (
                categories?.map((category) => (
                  <Fragment key={category.id}>
                    <Heading m="1.125rem 0 1.5rem 0">{category.name}</Heading>
                    <Flex
                    
                      // width={"100%"}
                      overflowX={"scroll"}
                      gap={"2rem"}
                      paddingBottom={"2rem"}
                      sx={{
                        '::-webkit-scrollbar': {
                          height: '6px',
                          
                        },
                        '::-webkit-scrollbar-track': {
                          
                          background: 'none',
                        },
                        '::-webkit-scrollbar-thumb': {
                          
                          backgroundColor: '#116CA0',
                          borderRadius: '20px',
                          border: '3px solid transparent',
                        },
                      }}
                      
                    >
                      {cardapio
                        .filter((item) => item.categoryId === category.id)
                        .map((item) => (
                          <Fragment key={item.id}>
                            <Box w="100%">
                              <AdminMenuItensCard item={item} />
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
      {isCreateOpenModal && <CreateMenuItem toggleCreateModal={toggleCreateModal} />}
      {/* {showSubMenu && (
        <Flex
          overflowX={"auto"}
          justify={{ base: "flex-start", md: "center" }}
          align={"center"}
          gap="3rem"
          mt="3rem"
        >
          <Text
            color={selectedMenu === 0 ? "white" : "gray"}
            fontSize={"22px"}
            fontFamily={"Montserrat"}
            borderBottom={selectedMenu === 0 ? "2px solid white" : ""}
            onClick={() => handleClick(0)}
            _hover={{ color: "white", cursor: "pointer" }}
          >
            Adicionar
          </Text>
          <Text
            fontSize={"22px"}
            fontFamily={"Montserrat"}
            color={selectedMenu === 1 ? "white" : "gray"}
            borderBottom={selectedMenu === 1 ? "2px solid white" : ""}
            onClick={() => handleClick(1)}
            _hover={{ color: "white", cursor: "pointer" }}
          >
            Editar
          </Text>
          <Text
            fontSize={"22px"}
            fontFamily={"Montserrat"}
            color={selectedMenu === 2 ? "white" : "gray"}
            borderBottom={selectedMenu === 2 ? "2px solid white" : ""}
            onClick={() => handleClick(2)}
            _hover={{ color: "white", cursor: "pointer" }}
          >
            Deletar
          </Text>
        </Flex>
      )}
      {selectedMenu === 0 ? (
        <CreateMenuItem />
      ) : selectedMenu === 1 ? (
        <EditMenuItem />
      ) : selectedMenu === 2 ? (
        <DeleteMenuItem />
      ) : null} */}

      </Flex>
      <Footer/>
    </Container>
  );
};
