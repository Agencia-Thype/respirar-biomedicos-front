import { useState } from "react";
import { IMenuItemCardInterfaceData, IMenuItemInterfaceData } from "../../interfaces/menuItem.interfaces";
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,  
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BsCartPlusFill } from "react-icons/bs";
import { ModalConfirm } from "./ModalConfirm";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { baseURL } from "../../services/api";

interface IMenuItemCardProps {
  item: IMenuItemCardInterfaceData;
}

export const MenuItensCard = ({ item }: IMenuItemCardProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };
  
  console.log(item.images[0].filePath)
  return (
    <>
      <Flex
        width={"450px"}  
        height="auto"
        maxWidth="250px"
        align="center"
        justify="center"
        bg="#E9F1F5"
        borderRadius="32px"
        border="1px solid #116CA0"
        overflow="hidden"
        p="4%"
      >
        <Flex
          borderRadius="10px"
          align="center"
          flexDir="column"
          width="100%"
          height="100%"
          position="relative"
        >
          <Flex
            width="100%"
            borderRadius={{ base: '10px', md: '16px', lg: '32px' }}
            overflow="hidden"
          >
            <Image
              src={`${baseURL}${item.images[0].filePath.replace("\\", "/")}`}
              bg="#ffff"
              borderTopRadius="32px"
              borderBottomRadius="0px"
              w="100%"
              h="120px" 
              objectFit="contain"
            />
          </Flex>
          <Flex
            flexDir="column"
            w="100%"
            textAlign="center"
            gap="1.5rem"
            mt="10px"
            p="2% 6%"
          >
            <Heading
              fontWeight="bold"
              fontSize="14px" 
              color="#131212"
              overflow="hidden"
              display="-webkit-box"
              sx={{
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
              }}
            >
              {item.name}
            </Heading>
            <Text
              height="70px" 
              fontSize="0.75rem" 
              fontFamily="Inter"
              overflow="hidden"
              display="-webkit-box"
              sx={{
                WebkitLineClamp: 4, 
                WebkitBoxOrient: "vertical",
              }}
              textAlign="justify"
            >
              {item.description}
            </Text>
            <Text
              textAlign="left"
              fontSize="0.9rem"
              fontWeight="bold"
              align="center"
              color="#1E1E1E"
              w="100%"
            >
              {`R$${item.price.toFixed(2)}`}
            </Text>
          </Flex>
          <Flex width="100%" justifyContent="center" gap="1rem">
            <Flex
              bg="#FFFFFF"
              w="120px"
              h="30px"
              border="1px solid #116CA0"
              borderRadius="32px"
              cursor="pointer"
              align="center"
              justify="center"
              color="#116CA0"
              alignItems="center"
              justifyContent="center"
              _hover={{ bg: "#F6B519"}}
              fontSize={{ base: "15px" }}
            >
              <Link to={`/produto/${item.id}`} >
                Ver produto
              </Link>
            </Flex>
            <Flex
              bg="#116CA0"
              w="120px"
              h="30px"
              borderRadius="32px"
              cursor="pointer"
              align="center"
              justify="center"
              onClick={onOpen}
              color="#FFFFFF"
              alignItems="center"
              justifyContent="center"
              _hover={{ bg: "#F6B519"}}
              fontSize={{ base: "15px" }}
            >
              Comprar
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <ModalConfirm isOpen={isOpen} onClose={onClose} item={item} />
    </>
  );
};
