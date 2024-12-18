import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  Stack,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { MenuItem } from "./MenuItem";
import { useLocation, useNavigate } from "react-router-dom";
import { BsCartFill, BsPersonFill, BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";
import { IMenuItemData } from "../../MenuItemCard/ModalConfirm";
import jwt_decode from "jwt-decode";
import ProductSearch from "../Research";
import { IMenuItemCardInterfaceData, IMenuItemInterfaceData, ProductListProps, ProductSearchProps } from "../../../interfaces/menuItem.interfaces";

interface NavLinksProps {
  isOpen: boolean;
  onToggle: () => void;
  setFilteredCardapio: (data: IMenuItemCardInterfaceData[]) => void;
  handleSearch: ()=> void
}

export const NavLinks = ({ isOpen, onToggle, setFilteredCardapio, handleSearch }: NavLinksProps) => {
  let location = useLocation();
  const navigate = useNavigate();

  const [activeLink, setActiveLink] = useState(location.pathname);
  const [auth, setAuth] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("@DownTown:Token") || "";

  const cart: IMenuItemData[] = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode<any>(token);

      const { isAdmin } = decodedToken;

      if (!isAdmin) {
        setAuth(false);
      } else {
        setAuth(true);
      }
    }
  }, [token]);

  const handleClick = (path: string) => {
    setActiveLink(path);
    navigate(path);
  };

  const handleMenu = () => {
    setActiveLink("");
    setActiveLink("admin");
  };

  const handleLogout = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("@DownTown:Token");
    localStorage.removeItem("@DownTown:Admin");
    setAuth(false);
    navigate("/");
  };

  // const handleSearch = () => {
  //   if (searchQuery.trim()) {
  //     navigate(`/cardapio?query=${encodeURIComponent(searchQuery.trim())}`);
  //   }
  // };

  return (
    <Flex
      display={{ base: isOpen ? "block" : "none", md: "flex" }}
      
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={5}
        align={{ base: "center", md: "flex-start" }}
        justify={{ base: "flex-start" }}
        direction={{ base: "column", md: "row" }}
        pt={{ base: "8", lg: "0" }}
        paddingRight={[5]}
        position={{base:"fixed", md: "static"}}
        background={"#116CA0"}
        // width={{base:"100%",}}
        // height={{base:"100vh"}}
        // left={{base:"0"}}
        // top={{base:"0"}}
        zIndex={{base:"55"}}
      >
        <MenuItem
          onToggle={onToggle}
          isOpen={isOpen}
          to={auth ? "/admin" : "/"}
          activeLink={activeLink}
          handleClick={handleClick}
        >
          Home
        </MenuItem>

        <MenuItem
          onToggle={onToggle}
          isOpen={isOpen}
          to="/produtos"
          activeLink={activeLink}
          handleClick={handleClick}
        >
          Produtos
        </MenuItem>
        <MenuItem
          onToggle={onToggle}
          isOpen={isOpen}
          to="/rent"
          activeLink={activeLink}
          handleClick={handleClick}
        >
          Locação
        </MenuItem>

        <MenuItem
          onToggle={onToggle}
          isOpen={isOpen}
          to="/sale"
          activeLink={activeLink}
          handleClick={handleClick}
        >
          Promoções
        </MenuItem>

        <MenuItem
          onToggle={onToggle}
          isOpen={isOpen}
          to="/contacts"
          activeLink={activeLink}
          handleClick={handleClick}
        >
          Empresa
        </MenuItem>
        <ProductSearch handleSearch={handleSearch} setFilteredCardapio={setFilteredCardapio} />
        {/* <InputGroup maxW="300px">
          <Input
            placeholder="Buscar produtos"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            color="white" // Define a cor do texto para branco
          />
          <InputRightElement>
            <IconButton
              aria-label="Search"
              icon={<BsSearch />}
              onClick={handleSearch}
              variant="ghost"
              color="white" // Define a cor do ícone para branco
              _hover={{ bg: "gray.700" }} // Hover com fundo mais escuro
            />
          </InputRightElement>
        </InputGroup> */}

        <Menu>
          <MenuButton
            fontFamily={"Montserrat"}
            fontSize={"20px"}
            _hover={{ textDecor: "none", color: "white" }} // Define a cor de hover para branco
            fontWeight={activeLink === "admin" ? "bold" : "400"}
            color={activeLink === "admin" ? "white" : "white"} // Define a cor padrão para branco
            onClick={handleMenu}
          >
            <BsPersonFill size={25} />
          </MenuButton>
          <MenuList zIndex={"10"}>
            {token && auth ? (
              <>
                <MenuItemOption onClick={() => navigate("/admin")}>
                  Minha Conta
                </MenuItemOption>
                <MenuItemOption onClick={() => navigate("/orders")}>
                  Pedidos
                </MenuItemOption>
                <MenuItemOption onClick={() => navigate("/delivery")}>
                  Entregas
                </MenuItemOption>
                <MenuItemOption onClick={handleLogout}>Logout</MenuItemOption>
              </>
            ) : token && !auth ? (
              <>
                <MenuItemOption onClick={() => navigate("/user")}>
                  Minha Conta
                </MenuItemOption>
                <MenuItemOption onClick={() => navigate("/user")}>
                  Meus Pedidos
                </MenuItemOption>
                <MenuItemOption onClick={() => navigate("/user")}>
                  Atualizar Endereço
                </MenuItemOption>
                <MenuItemOption onClick={() => navigate("/user")}>
                  Atualizar Informações
                </MenuItemOption>
                <MenuItemOption onClick={handleLogout}>Logout</MenuItemOption>
              </>
            ) : (
              <>
                <MenuItemOption onClick={() => navigate("/login")}>
                  Login
                </MenuItemOption>
                <MenuItemOption onClick={() => navigate("/register")}>
                  Cadastre-se
                </MenuItemOption>
              </>
            )}
          </MenuList>
        </Menu>
        <MenuItem
          onToggle={onToggle}
          isOpen={isOpen}
          to="/carrinho"
          activeLink={activeLink}
          handleClick={handleClick}
        >
          <Flex
            justify={"center"}
            align={"center"}
            gap="0.5rem"
            display={{ base: "none", md: "flex" }}
          >
            <Box pos={"relative"}>
              <BsCartFill color="white" /> {/* Define a cor do ícone do carrinho */}
              <Flex
                h="20px"
                w="20px"
                rounded={"50%"}
                bg={"red"}
                fontSize={"12px"}
                justify={"center"}
                align={"center"}
                fontWeight={"bold"}
                p="0.5rem"
                pos={"absolute"}
                top="-3"
                left="3"
                color="white" // Define a cor do texto do contador do carrinho para branco
                
              >
                {cart.length}
              </Flex>
            </Box>
          </Flex>
        </MenuItem>
      </Stack>
    </Flex>
  );
};
