import { useState } from "react";
import { IMenuItemInterfaceData } from "../../interfaces/menuItem.interfaces";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BsCartPlusFill } from "react-icons/bs";
import { ModalConfirm } from "./ModalConfirm";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";

interface IMenuItemCardProps {
  item: IMenuItemInterfaceData;
}

export const MenuItensCard = ({ item }: IMenuItemCardProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <>
      <Flex align={"center"} justify={"center"} bg={"#e4cb67b1"} borderRadius={"10px"}>
        <Flex
          bg="#E4D8C4" 
          borderRadius={"10px"}
          align={"center"}
          flexDir={"column"}
          w="100%"
          maxW="390px"
          h={"300px"}
          position="relative"
        >
          <Image
            src={item.imageURL}
            bg={"#ffff"}
            borderTopRadius="10px"
            borderBottomRadius="0px"
            mb="1rem"
            w="100%"
            h="50%"
            objectFit="contain"
          />
          <Box w="100%" textAlign="center">
            <Heading
              fontWeight={"400"}
              fontSize="1rem"
              size={"md"}
              color="#131212"
            >
              {item.name}
            </Heading>
            <Flex flexDir={"column"} mt="1rem">
              <Heading
                fontWeight={"bold"}
                fontSize="0.7rem"
                color="#1E1E1E"
                fontFamily={"montserrat, sans-serif"}
              ></Heading>
              <Text fontSize="0.8rem" fontFamily={"roboto"} mb="0.5rem">
                {item.description}
              </Text>
            </Flex>
            <Text
              fontSize="1rem"
              fontWeight={"bold"}
              align={"center"}
              color="#1E1E1E"
              position="absolute"
              bottom="1.5rem"
              w="100%"
              h={"10%"}
            >{`R$${item.price.toFixed(2)}`}</Text>
          </Box>

          <Flex
            bg="#B48555"
            p="0.5rem"
            w="100%"
            h={"10%"}
            mt="1rem"
            borderTopRadius="0px"
            borderBottomRadius="10px"
            cursor={"pointer"}
            align={"center"}
            justify={"center"}
            onClick={onOpen}
            position="absolute"
            bottom="0rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
            transition={"0.3s"}
            _hover={{ bg: "#F6B519"}}
          >
            <BsCartPlusFill color="white" size={30} />
          </Flex>
        </Flex>
      </Flex>

      <ModalConfirm isOpen={isOpen} onClose={onClose} item={item} />
    </>
  );
};
