import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { IUserAddressData } from "../../../../interfaces/addresses.interfaces";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { ModalEditAddress } from "../ModalEditAddress";

export const UserAddressCard = ({ address }: IUserAddressData) => {
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  return (
    <>
      <Flex
        flexDir={"column"}
        gap="0.3rem"
        bg="#ffffffcd"
        p="1.5rem"
        borderRadius={"10px"}
        border={address.preferred ? "4px solid #F6B51C" : ""}
      >
        {address.preferred && (
          <Flex
            borderBottom={"2px solid black"}
            m="0 0 1rem 0"
            pb="0.5rem"
            justifyContent={"center"}
          >
            <Text as="b">Principal</Text>
          </Flex>
        )}

        <Text>
          <Text as="b">Endereço: </Text>
          {address.street}
        </Text>
        <Text>
          {address.city},{address.state} - {address.zip}
        </Text>
        <Text>
          <Text as="b">Complemento: </Text>
          {address.complement}
        </Text>

        <Flex
          align={"flex-end"}
          justify={"flex-end"}
          borderTop={"2px solid black"}
          w="100%"
          mt="1rem"
        >
          <Flex gap="1rem" p="0.8rem 0 0 0">
            <AiFillEdit onClick={onOpenEdit} cursor={"pointer"} size="23" />
            <AiFillDelete cursor={"pointer"} size="23" />
          </Flex>
        </Flex>
      </Flex>
      <ModalEditAddress
        addressData={address}
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
      />
    </>
  );
};
