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
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import {
  ICepAPI,
  IReturnCreateAddress,
} from "../../../../interfaces/addresses.interfaces";
import { AddressesContext } from "../../../../contexts/AddressesContext";

export interface IModalProps {
  addressData: IReturnCreateAddress;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalEditAddress = ({
  addressData,
  isOpen,
  onClose,
}: IModalProps) => {
  const { updateAddress } = useContext(AddressesContext);

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

  function filterEmptyStrings(obj: { [key: string]: any }): {
    [key: string]: any;
  } {
    const filtered: { [key: string]: any } = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== "" || obj[key] !== undefined) {
        filtered[key] = obj[key];
      }
    });
    return filtered;
  }

  const onSubmit = () => {
    const NewData = {
      street: `${
        cepValue?.logradouro
          ? cepValue?.logradouro
          : format("street", addressData.street)
      }, ${
        addressNumber ? addressNumber : format("number", addressData.street)
      }`,
      city: `${cepValue?.localidade ? cepValue?.localidade : addressData.city}`,
      state: `${cepValue?.uf ? cepValue?.uf : addressData.state}`,
      zip: cepValue?.cep ? cepValue.cep : format("zip", addressData.zip),
      complement: addressComplement
        ? addressComplement
        : addressData.complement,
      preferred: addressPreference ? addressPreference : addressData.preferred,
    };
    const data = filterEmptyStrings(NewData);
    const id = addressData.id;

    updateAddress({ data, id });
  };

  const format = (type: string, data: string) => {
    if (type === "zip") {
      data = data.slice(0, 5) + data.slice(6);
      return data;
    } else if (type === "street") {
      data = data.split(",")[0];
      return data;
    } else if (type === "number") {
      data = data.split(",")[1];
      return data;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
      <ModalOverlay />
      <ModalContent bg="white"> {/* Fundo branco */}
        <ModalHeader color="primary-color">Atualizar Endereço</ModalHeader>
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
                  <FormLabel color={"primary-color"}>CEP</FormLabel>
                  <Input
                    bg="input-background"
                    borderRadius={"20px"}
                    type="text"
                    maxLength={8}
                    onChange={(e) => handleCEP(e.target.value)}
                    defaultValue={format("zip", addressData.zip)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color={"primary-color"}>Complemento</FormLabel>
                  <Input
                    bg="input-background"
                    borderRadius={"20px"}
                    type="text"
                    onChange={(e) => setAddressComplemnt(e.target.value)}
                    defaultValue={addressData.complement}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color={"primary-color"}>Número</FormLabel>
                  <Input
                    bg="input-background"
                    borderRadius={"20px"}
                    type="text"
                    onChange={(e) => setAddressNumber(e.target.value)}
                    defaultValue={format("number", addressData.street)}
                  />
                </FormControl>
                <FormControl>
                  <Checkbox
                    color="primary-color"
                    size="lg"
                    onChange={(e) => setAddressPreference(e.target.checked)}
                  >
                    Endereço Preferido
                  </Checkbox>
                </FormControl>
              </VStack>
              <VStack spacing={6}>
                <FormControl>
                  <FormLabel color={"primary-color"}>Endereço</FormLabel>
                  <Input
                    bg="input-background"
                    borderRadius={"20px"}
                    type="text"
                    isDisabled
                    value={
                      cepValue
                        ? cepValue?.logradouro
                        : format("street", addressData.street)
                    }
                    defaultValue={format("street", addressData.street)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color={"primary-color"}>Cidade</FormLabel>
                  <Input
                    bg="input-background"
                    borderRadius={"20px"}
                    type="text"
                    value={cepValue?.localidade}
                    isDisabled
                    defaultValue={addressData.city}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color={"primary-color"}>Estado</FormLabel>
                  <Input
                    bg="input-background"
                    borderRadius={"20px"}
                    type="text"
                    value={cepValue?.uf}
                    isDisabled
                    defaultValue={addressData.state}
                  />
                </FormControl>
              </VStack>
            </Flex>
            <Flex w="100%" align={"center"} justify={"center"} gap="1rem">
              <Button bg="logo-color" color="white" type="submit">
                Atualizar
              </Button>
              <Button
                bg="transparent"
                borderColor="logo-color"
                color="logo-color"
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
