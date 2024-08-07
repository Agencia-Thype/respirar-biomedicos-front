import { Flex, Heading, Icon, useDisclosure } from "@chakra-ui/react";
import { IUserAddress } from "../../../interfaces/addresses.interfaces";
import { UserAddressCard } from "./AddressCard";
import { BsPlusSquare } from "react-icons/bs";
import { ModalCreateAddress } from "./ModalCreateAddress";

export const UserAddresses = ({ addresses }: IUserAddress) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        w="100%"
        align={"center"}
        justify={"flex-start"}
        flexDir={"column"}
        gap="1rem"
        mt="2rem"
      >
        <Heading
          color="primary-color"
          fontSize={"36px"}
          fontFamily={"Montserrat"}
        >
          Endereços
        </Heading>
        <Flex flexDir={"column"} gap="1rem">
          {addresses.map((address) => {
            return <UserAddressCard address={address} key={address.id} />;
          })}
          <Flex
            bg="#116CA0"
            border="2px dotted white"
            w="auto"
            h="50px"
            borderRadius={"10px"}
            align={"center"}
            justify={"center"}
            cursor={"pointer"}
            transition="0.3s"
            _hover={{ bg: "#ffffff", color: "black" }}
            onClick={onOpen}
          >
            <Icon as={BsPlusSquare} color="white" boxSize="8" />
          </Flex>
        </Flex>
      </Flex>
      <ModalCreateAddress
        id={addresses[0].userId}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};
