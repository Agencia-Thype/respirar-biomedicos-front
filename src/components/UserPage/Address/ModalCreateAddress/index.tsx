import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { ICepAPI } from "../../../../interfaces/addresses.interfaces";
import { AddressesContext } from "../../../../contexts/AddressesContext";

export interface IModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalCreateAddress = ({ id, isOpen, onClose }: IModalProps) => {
  const { createAddress } = useContext(AddressesContext);

  const [cepValue, setCepValue] = useState<ICepAPI>();
  const [addressComplement, setAddressComplemnt] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [addressPreference, setAddressPreference] = useState(false);

  const handleCEP = async (cep: string) => {
    try {
      if (cep.length === 8) {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        setCepValue(response.data);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    const data = {
      street: `${cepValue?.logradouro}, ${addressNumber}`,
      city: cepValue?.localidade!,
      state: cepValue?.uf!,
      zip: cepValue?.cep!,
      complement: addressComplement ? addressComplement : "",
      preferred: addressPreference,
    };

    createAddress({ data, id });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Novo Endereço</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            as="form"
            flexDir={{ base: "column" }}
            onSubmit={handleSubmit(onSubmit)}
            justify="space-evenly"
            align={"flex-start"}
            gap="1rem"
          >
            <Flex gap="1rem">
              <VStack spacing={6}>
                <FormControl>
                  <FormLabel color={"black"}>CEP</FormLabel>
                  <Input
                    bg="title-color"
                    borderRadius={"20px"}
                    type="text"
                    maxLength={8}
                    onChange={(e) => handleCEP(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color={"black"}>Complemento</FormLabel>
                  <Input
                    bg="title-color"
                    borderRadius={"20px"}
                    type="text"
                    onChange={(e) => setAddressComplemnt(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color={"black"}>Numero</FormLabel>
                  <Input
                    bg="title-color"
                    borderRadius={"20px"}
                    type="text"
                    onChange={(e) => setAddressNumber(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <Checkbox
                    color="black"
                    size="lg"
                    onChange={(e) => setAddressPreference(e.target.checked)}
                  >
                    Endereço Preferido
                  </Checkbox>
                </FormControl>
              </VStack>
              <VStack spacing={6}>
                <FormControl>
                  <FormLabel color={"black"}>Endereço</FormLabel>
                  <Input
                    bg="title-color"
                    borderRadius={"20px"}
                    type="text"
                    value={cepValue?.logradouro}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color={"black"}>Cidade</FormLabel>
                  <Input
                    bg="title-color"
                    borderRadius={"20px"}
                    type="text"
                    value={cepValue?.localidade}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color={"black"}>Estado</FormLabel>
                  <Input
                    bg="title-color"
                    borderRadius={"20px"}
                    type="text"
                    value={cepValue?.uf}
                  />
                </FormControl>
              </VStack>
            </Flex>
            <Flex w="100%" align={"center"} justify={"center"} gap="1rem">
              <Button colorScheme="yellow" type="submit">
                Cadastrar
              </Button>
              <Button
                colorScheme="red"
                variant={"outline"}
                mr={3}
                onClick={onClose}
              >
                Cancelar
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
