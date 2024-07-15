/// <reference types="node" />
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
import burger from "../assets/burger.png";
import { useNavigate } from "react-router-dom";

import img1 from '../../assets/image/img1.png';
import img2 from '../../assets/image/img2.png';
import img3 from '../../assets/image/img3.png';
import img4 from '../../assets/image/img4.png';
import img5 from '../../assets/image/img5.png';
import img6 from '../../assets/image/img6.png';
import img7 from '../../assets/image/img7.png';
import img8 from '../../assets/image/img8.png';
import img9 from '../../assets/image/img9.jpeg';
import { useEffect, useRef, useState } from "react";
import Thumbnail from "../../Thumbnail";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

export const Slider = () => {
  const navigate = useNavigate();

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
      () => setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1)),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <Box height={"100vh"} overflow={"hidden"}>
      <Flex
        h={"100vh"}
        className="carousel"
        transition="transform 0.5s ease-in-out"
        transform={`translateX(${-currentIndex * 100}%)`}
      >
        {images.map((src, index) => (
          <Flex
            key={index}
            className="item"
            minWidth="100%"
            height="100%"
            backgroundImage={`url(${src})`}
            backgroundSize="cover"
            backgroundPosition="center"
            alignItems="center"
            justifyContent="flex-start"
            position="relative"
            paddingLeft={"150px"}
          >
            <Flex flexDirection={"column"} alignItems={"flex-start"} className="content" color="#fff" textShadow="0 5px 10px #0004" width={"40%"} height={"100%"} paddingTop={"10%"}>
              <Heading fontSize="5em" fontWeight="bold">DESIGN SLIDER</Heading>
              <Heading fontSize="5em" fontWeight="bold" color="#f1683a">ANIMAL</Heading>
              <Text mt="4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae odio impedit saepe magni nam nobis, ab quaerat perspiciatis. Quis at ipsum modi ratione impedit sed ad porro, quae delectus sint!</Text>
              <Flex mt="12" gap="4">
                <Button>SEE MORE</Button>
                {/* <Button variant="outline">SUBSCRIBE</Button> */}
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>
      <Flex className="thumbnail" position="relative" bottom="280px" left="95%" transform="translateX(-50%)" gap="20px" zIndex="100">
        {images.map((src, index) => (
          <Thumbnail  key={index} src={src} isActive={index === currentIndex} />
        ))}
      </Flex>
      <Flex className="arrows" position="relative" bottom="440px" left="15%" transform="translateX(-50%)" zIndex="100" width="300px" maxWidth="30%" gap="10px" >
        <Button onClick={handlePrev} background={"#E9F1F5"} borderRadius={"50%"}>{"<"}</Button>
        <Button onClick={handleNext} background={"#E9F1F5"} borderRadius={"50%"}>{">"}</Button>
      </Flex>

    </Box>
  );
};
