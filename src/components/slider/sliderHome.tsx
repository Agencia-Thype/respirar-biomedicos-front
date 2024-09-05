import { Box, LinkOverlay, LinkBox, Button, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Thumbnail from "./thumbnail";
import img1 from "../../assets/image/img1.png";
import img2 from "../../assets/image/img2.png";
import img3 from "../../assets/image/img3.png";
import img4 from "../../assets/image/img4.png";
import img5 from "../../assets/image/img5.png";
import img6 from "../../assets/image/img6.png";
import img7 from "../../assets/image/img7.png";
import img8 from "../../assets/image/img8.png";
import img9 from "../../assets/image/img9.jpeg";

const images = [
  { src: img1, label: "C-PAP" },
  { src: img2, label: "Oxigenoterapia" },
  { src: img3, label: "Bi-Pap" },
  { src: img4, label: "Terapia Respiratória" },
  { src: img5, label: "Máscaras" },
  { src: img6, label: "Oximetria" },
  { src: img7, label: "Terapia Respiratória" },
  { src: img8, label: "Acessórios" },
  { src: img9, label: "Locações" },
];

export const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const delay = 7000;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Rotaciona o array de thumbnails para colocar o ativo na frente
  const reorderedImages = [...images.slice(currentIndex), ...images.slice(0, currentIndex)];

  return (
    <Box height={"100vh"} overflow={"hidden"}>
      <Flex
        h={"100vh"}
        className="carousel"
        transition="transform 0.3s ease-in-out"
        transform={`translateX(${-currentIndex * 100}%)`}
      >
        {images.map((image, index) => (
          <Flex
            key={index}
            className="item"
            minWidth="100%"
            height="100%"
            backgroundImage={`url(${image.src})`}
            backgroundSize="cover"
            backgroundPosition="center"
            padding={"5% 10%"}
            justifyContent="flex-start"
            position="relative"
            // paddingLeft={"150px"}
          >
            <Flex
              backgroundColor={"transparent"}
              backgroundImage={
                "linear-gradient(120deg, rgba(255, 252, 252, 0.345), rgba(99, 194, 206, 0.329) )"
              }
              backdropFilter={"blur(20px)"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              className="content"
              color="#fff"
              textShadow="0 5px 10px #64a7b344"
              width={"640px"}
              height={"540px"}
              borderRadius={"40px"}
              padding={"4%"}
            >
              <Heading textAlign={"center"} fontSize="3em" fontWeight="bold" color="#3182CE">
                {image.label.toUpperCase()}
              </Heading>

              <Flex mt="12" gap="4">
                <LinkBox
                  as="article"
                  bg="#92d1e4"
                  color="black"
                  borderRadius="md"
                  padding="8px 16px"
                  _hover={{ bg: "gray.200" }}
                >
                  <LinkOverlay href="/cardapio">Saiba Mais</LinkOverlay>
                </LinkBox>
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>
      <Flex
        className="thumbnail"
        position="relative"
        bottom="280px"
        left="95%"
        transform="translateX(-50%)"
        gap="20px"
        zIndex="100"
      >
        {reorderedImages.map((image, index) => (
          <Thumbnail
            key={index}
            image={image}
            isActive={index === 0} // O primeiro thumbnail é sempre o ativo
          />
        ))}
      </Flex>
      <Flex
        className="arrows"
        position="relative"
        bottom="440px"
        left="15%"
        transform="translateX(-50%)"
        zIndex="50"
        p={"0 10%"}
        maxWidth="30%"
        gap="10px"
      >
        <Button
          onClick={handlePrev}
          background={"#92d1e4"}
          borderRadius={"50%"}
        >
          {"<"}
        </Button>
        <Button
          onClick={handleNext}
          background={"#92d1e4"}
          borderRadius={"50%"}
        >
          {">"}
        </Button>
      </Flex>
    </Box>
  );
};

export default Slider;
