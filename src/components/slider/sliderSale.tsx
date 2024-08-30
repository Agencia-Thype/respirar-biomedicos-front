import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { MenuItemContext } from "../../contexts/MenuItemContext"; // Ajuste o caminho conforme necessário
import React from "react";
import { api } from "../../services/api";
import { Produto } from "../../interfaces/menuItem.interfaces";

export const useMenuItemContext = () => {
  const context = React.useContext(MenuItemContext);
  if (context === undefined) {
    throw new Error("useMenuItemContext must be used within a MenuItemProvider");
  }
  return context;
};

export const SliderSale = () => {

  const [menuItems, setMenuItems] = useState<Produto[]>([]);

  useEffect(() => {
    // Função assíncrona para buscar os produtos destacados
    const fetchSaleProducts = async () => {
      try {
        const response = await api.get("/menuItem/");
        const filteredProducts = response.data.filter((product: Produto) => product.sale === false);

        // Atualiza o estado com os produtos destacados
        setMenuItems(filteredProducts);
      } catch (error) {
        console.error("Erro ao buscar produtos destacados:", error);
      }
    };

    // Chama a função
    fetchSaleProducts();
  }, []); // O array vazio [] faz com que o efeito execute apenas uma vez, quando o componente monta

  console.log(menuItems)










  const navigate = useNavigate();
  // const { data: menuItems, isFetching } = useMenuItemContext(); // Use o contexto
  const [currentIndex, setCurrentIndex] = useState(0);
  // const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  // const delay = 7000;

  // const resetTimeout = () => {
  //   if (timeoutRef.current) {
  //     clearTimeout(timeoutRef.current);
  //   }
  // };

  // useEffect(() => {
  //   resetTimeout();
  //   timeoutRef.current = setTimeout(
  //     () => setCurrentIndex((prevIndex) => (prevIndex === menuItems.length - 1 ? 0 : prevIndex + 1)),
  //     delay
  //   );

  //   return () => {
  //     resetTimeout();
  //   };
  // }, [currentIndex, menuItems]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === menuItems.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? menuItems.length - 1 : prevIndex - 1));
  };

  // if (isFetching) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Box padding={"0 10%"} overflow={"hidden"} position="relative">
      

      <Flex
        height={"80vh"}
        className="carousel"
        transition="transform 0.5s ease-in-out"
        transform={`translateX(${-currentIndex * 100}%)`}
      >
        {menuItems.map((item) => (
          <Flex
            key={item.id} // Use a chave única dos itens
            className="item"
            minWidth="100%"
            height="100%"
            alignItems="center"
            justifyContent="flex-start"
            position="relative"
            // backgroundImage={`url(${item.imageURL})`} 
            backgroundSize="cover"
            backgroundPosition="center"
          >
            <Flex
              direction="row"
              width="100%"
              height="100%"
              padding={"4% 0"}
            >
              <Flex width={"50%"} justifyContent={"center"} alignItems={"center"}>                
                <Flex  height={"500px"} overflow={"hidden"}>
                  <Image height={"100%"} src={item.imageURL[0]}/>
                </Flex>
              </Flex>
              <Flex
                direction="column"
                alignItems="flex-start"
                justifyContent="center"
                backgroundColor="white"
                width="50%"
                height="100%"
                padding="4%"
                textShadow="0 5px 10px #0004"
              >
                <Heading fontSize="3em" fontWeight="bold" color="#2248e1">{item.name}</Heading>
                <Text color="#000000" mt="4">{item.resume}</Text>
                <Flex mt="12" gap="4">
                  <Button onClick={() => navigate(`/produto/${item.id}`)}>Saiba Mais</Button>
                  {/* <Button variant="outline">SUBSCRIBE</Button> */}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>

      <Flex
        className="arrows"
        position="absolute"
        bottom="20px"
        left="50%"
        transform="translateX(-50%)"
        zIndex="100"
        width="300px"
        maxWidth="30%"
        gap="10px"
      >
        <Button onClick={handlePrev} background={"#E9F1F5"} borderRadius={"50%"}>{"<"}</Button>
        <Button onClick={handleNext} background={"#E9F1F5"} borderRadius={"50%"}>{">"}</Button>
      </Flex>
    </Box>
  );
};
