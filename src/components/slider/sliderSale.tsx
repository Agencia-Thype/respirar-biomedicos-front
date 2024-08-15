import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { MenuItemContext } from "../../contexts/MenuItemContext"; // Ajuste o caminho conforme necessário
import React from "react";

export const useMenuItemContext = () => {
  const context = React.useContext(MenuItemContext);
  if (context === undefined) {
    throw new Error("useMenuItemContext must be used within a MenuItemProvider");
  }
  return context;
};

export const SliderSale = () => {
  const navigate = useNavigate();
  const { data: menuItems, isFetching } = useMenuItemContext(); // Use o contexto
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const delay = 7000;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setCurrentIndex((prevIndex) => (prevIndex === menuItems.length - 1 ? 0 : prevIndex + 1)),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex, menuItems]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === menuItems.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? menuItems.length - 1 : prevIndex - 1));
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <Box height={"100vh"} overflow={"hidden"} position="relative">
      

      <Flex
        h={"100vh"}
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
            backgroundImage={`url(${item.imageURL})`} 
            backgroundSize="cover"
            backgroundPosition="center"
          >
            <Flex
              direction="row"
              width="100%"
              height="100%"
            >
              <Box
                width="50%"
                height="100%"
                backgroundImage={`url(${item.imageURL})`}
                backgroundSize="cover"
                backgroundPosition="center"
              />
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
                <Text color="#000000" mt="4">{item.description}</Text>
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
