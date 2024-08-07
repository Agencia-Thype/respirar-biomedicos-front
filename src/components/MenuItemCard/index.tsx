import { useState } from "react";
import { IMenuItemInterfaceData } from "../../interfaces/menuItem.interfaces";
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
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
      <Flex width={'290.5px' }
          height={'415px' }  align={"center"} justify={"center"} bg={"#E9F1F5"} borderRadius={"32px"} border={"1px solid #116CA0"} overflow={"hidden"}>
            
        <Flex
          borderRadius={"10px"}
          align={"center"}
          flexDir={"column"}          
          width="100%"
          height={"100%"}
          position="relative"
        >
          <Flex width={"100%"} borderRadius={{ base: '10px', md: '16px', lg: '32px' }} overflow={"hidden"}>            
            <Image
              src={item.imageURL}
              bg={"#ffff"}
              borderTopRadius="32px"
              borderBottomRadius="0px"              
              w="100%"
              h={'151px' }
              objectFit="contain"
            />
          </Flex>
          
          <Flex flexDir={"column"} w="100%" textAlign="center" gap={"1.5rem"} mt={"10px"} padding={"2% 6%"}>
            <Heading
              fontWeight={"bold"}
              fontSize={'16px' }
              // size={"md"}
              color="#131212"
              overflow="hidden"
              display="-webkit-box"
              sx={{
                WebkitLineClamp: 1, // Ajuste o número de linhas conforme necessário
                WebkitBoxOrient: "vertical",
              }}
            >
              {item.name}
            </Heading>
            <Text
              height="95px"
              fontSize="0.8rem"
              fontFamily="Inter"
              overflow="hidden"
              display="-webkit-box"
              sx={{
                WebkitLineClamp: 5, // Ajuste o número de linhas conforme necessário
                WebkitBoxOrient: "vertical",
              }}
              textAlign="justify"
            >
              {item.description}
            </Text>            
            <Text
              textAlign={"left"}
              fontSize="1rem"
              fontWeight={"bold"}
              align={"center"}
              color="#1E1E1E"                           
              w="100%"             
            >{`R$${item.price.toFixed(2)}`}</Text>
          </Flex>

          <Flex width={"100%"} justifyContent={"center"} gap={"1rem"}>
            <Flex
            bg="#FFFFFF"              
            w="100px"
            h="36px"
            border={"1px solid #116CA0"}
            borderRadius="32px"              
            cursor={"pointer"}
            align={"center"}
            justify={"center"}            
            color={"#116CA0"}              
            alignItems="center"
            justifyContent="center"              
            _hover={{ bg: "#F6B519"}}
            >
              <Link to={`/produto/${item.id}`}>
                Ver produto
              </Link>
            </Flex>
            <Flex
              bg="#116CA0"              
              w="100px"
              h="36px"              
              borderRadius="32px"              
              cursor={"pointer"}
              align={"center"}
              justify={"center"}
              onClick={onOpen}
              color={"#FFFFFF"}              
              alignItems="center"
              justifyContent="center"              
              _hover={{ bg: "#F6B519"}}
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
