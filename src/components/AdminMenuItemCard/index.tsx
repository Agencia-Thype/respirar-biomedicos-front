import { useState } from "react";
import { IMenuItemCardInterfaceData, IMenuItemInterfaceData } from "../../interfaces/menuItem.interfaces";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
// import { EditMenuItem } from "../CardapioForms/EditMenuItem";
import { DeleteMenuItem } from "../CardapioForms/DeleteMenuItem";
import { baseURL } from "../../services/api";
import { useNavigate } from "react-router-dom";

interface IMenuItemCardProps {
  item: IMenuItemCardInterfaceData;
}

export const AdminMenuItensCard = ({ item }: IMenuItemCardProps) => {
  // const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  // const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  const [isEditOpenModal, setIsEditOpenModal] = useState(false)
  const toggleEditModal = () => setIsEditOpenModal(!isEditOpenModal)

  const [isDeleteOpenModal, setIsDeleteOpenModal] = useState(false)
  const toggleDeleteModal = () => setIsDeleteOpenModal(!isDeleteOpenModal)
  const navigate = useNavigate();
  return (
    <>
      <Flex width={'290.5px'}
            height={'415px'} 
            align={"center"} 
            justify={"center"} 
            bg={"#E9F1F5"} 
            borderRadius={"32px"} 
            border={"1px solid #116CA0"} 
            overflow={"hidden"}>            
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
              src={`${baseURL}${item.images[0].filePath.replace("\\", "/")}`}
              bg={"#ffff"}
              borderTopRadius="32px"
              borderBottomRadius="0px"              
              w="100%"
              h={'151px'}
              objectFit="contain"
            />
          </Flex>
          <Flex flexDir={"column"} w="100%" textAlign="center" gap={"1.5rem"} mt={"10px"} padding={"2% 6%"}>
            <Heading
              fontWeight={"bold"}
              fontSize={'16px'}
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
              height="95px"
              fontSize="0.8rem"
              fontFamily="Inter"
              overflow="hidden"
              display="-webkit-box"
              sx={{
                WebkitLineClamp: 5, 
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
              onClick={toggleDeleteModal}
            >
              Excluir              
            </Flex>
            <Flex
              bg="#116CA0"              
              w="100px"
              h="36px"              
              borderRadius="32px"              
              cursor={"pointer"}
              align={"center"}
              justify={"center"}
              color={"#FFFFFF"}              
              alignItems="center"
              justifyContent="center"              
              _hover={{ bg: "#F6B519"}}
              onClick={() => {
                // console.log(item);  // Verifique se o item está vindo corretamente aqui
                navigate("/admin/editItem", { state: { item } });
              }}
            >
              Editar
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      {/* {isEditOpenModal && <EditMenuItem toggleEditModal={toggleEditModal} item={item} />} */}
      {isDeleteOpenModal && <DeleteMenuItem toggleDeleteModal={toggleDeleteModal}item={item} />}
    </>
  );
};
