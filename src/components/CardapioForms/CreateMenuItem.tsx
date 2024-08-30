import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { IMenuItemCreate, IMenuItemInterfaceData, IMenuItemMutation } from "../../interfaces/menuItem.interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import { MenuItemContext } from "../../contexts/MenuItemContext";
import { createMenuItemSchema } from "../../schemas/menuItem.schemas";
import { ICategoryDataRequest } from "../../interfaces/categories.intefaces";
import { api } from "../../services/api";
import { createPortal } from "react-dom";
import { BsDashCircleFill, BsNodeMinus, BsNodeMinusFill, BsNodePlus, BsNodePlusFill, BsPlusCircleFill } from "react-icons/bs";

interface ModalCreateProps {
  toggleCreateModal: () => void  
}

export const CreateMenuItem = ({ toggleCreateModal }: ModalCreateProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { data: categories, isFetching } = useContext(CategoriesContext);
  const { createMenuItem, menuItemDeatilData } = useContext(MenuItemContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMenuItemCreate>({ resolver: zodResolver(createMenuItemSchema) });
  const [price, setPrice] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newCategoryName, setNewCategoryName] = useState("");

  const {
    register: registerCategory,
    handleSubmit: handleSubmitCategory,
    formState: { errors: categoryErrors },
  } = useForm<ICategoryDataRequest>();

  const onSubmit: SubmitHandler<IMenuItemCreate> = (data, event) => {
    if (event) {
      event.preventDefault(); // Evitar comportamento de envio padrão
  }
    let priceWithoutCurrency = data.price.replace("R$", "").trim();
    let formatedCurrency = priceWithoutCurrency.replace(",", ".");
    const newData: IMenuItemMutation = {
      ...data,
      price: +formatedCurrency,
    };
    console.log(newData)
    createMenuItem(newData)
    toggleCreateModal()
  };

  const format = (price: string) => {
    let priceWithoutCurrency = price.replace("R$", "").trim();
    let priceWithCurrency = `R$ ${priceWithoutCurrency}`;
    setPrice(priceWithCurrency);
  };

  const handleAddCategory: SubmitHandler<ICategoryDataRequest> = async (data) => {
    try {
      const token = localStorage.getItem("@DownTown:Token")
      // api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      const response = await api.post('/category/', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
      console.log(response)
      onClose()
    } catch (error) {
      console.log(error)
    }
    // Lógica para adicionar a nova categoria
    // Exemplo: createCategory({ name: newCategoryName });
    onClose();
  };
  


const [productImageInputs, setProductImageInputs] = useState<string[]>([""]);

    const addProductImageInput = () => {
        setProductImageInputs([...productImageInputs, ""]);
    };

    const removeProductImageInput = (index: number) => {
        const updatedProductImage = [...productImageInputs];
        updatedProductImage.splice(index, 1);
        setProductImageInputs(updatedProductImage);
    };



  return createPortal (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      top={0}
      backgroundColor={"rgba(0, 0, 0, 0.85)"}
      w={"100vw"}
      h={"100vh"}
      position={"fixed"}
      zIndex={999}
    >
      <Flex
        as="form"
        flexDir={"column"}
        w={"360px"}
        // h={"900px"}
        // margin={"0 auto"}
        // mt="2rem"
        gap="1rem"
        p={"5% 3%"}
        onSubmit={handleSubmit(onSubmit)}
        ref={ref}
        backgroundColor={"rgba(255, 255, 255, 1)"}
        borderRadius={"16px"}
      >
        <FormControl isInvalid={!!errors.name}>
          <FormLabel color={"primary-color"}>Nome</FormLabel>
          <Input
            placeholder="Digite o nome do produto"
            {...register("name")}
            bg="title-color"
            borderRadius={"12px"}
          />
          {!!errors.name && (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          )}
        </FormControl>    


        {productImageInputs.map((value, index) => (
                            <Flex className="labelEntities" key={index}>
                                <Flex  className="divEntities" gap={"10px"}>
                                    <Flex flexDir={"column"}>
                                      <FormLabel color={"primary-color"} htmlFor={`Imagem-${index}`}>{`Imagem - ${index + 1}`}</FormLabel>
                                      <Input id={`Imagem-${index}`} bg="title-color" borderRadius={"12px"} placeholder="Digite o link da imagem" type="text" {...register(`imageURL.${index}`)} value={value} onChange={(e) => {
                                            const updatedProductImage = [...productImageInputs];
                                            updatedProductImage[index] = e.target.value;
                                            setProductImageInputs(updatedProductImage);
                                        }}/>
                                    </Flex>
                                    
                                    <Flex className="entitiesBtn" gap={"6px"}>
                                        <button                                           
                                            type="button"
                                            onClick={() => removeProductImageInput(index)}
                                        >
                                            <BsDashCircleFill color="#3182CE" size={25}/>
                                        </button>
                                        <button type="button" onClick={addProductImageInput}>
                                        <BsPlusCircleFill size={25} color="#3182CE"/>
                                            
                                        </button>
                                    </Flex>
                                </Flex>
                            </Flex>
                        ))}


        <FormControl isInvalid={!!errors.price}>
          <FormLabel color={"primary-color"}>Preço</FormLabel>
          <Input
            bg="title-color"
            borderRadius={"12px"}
            placeholder="Digite o preço do produto"
            {...register("price")}
            onChange={(e) => format(e.target.value)}
            value={price}
            type="text"
          />
          {!!errors.price && (
            <FormErrorMessage>{errors.price.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.resume}>
          <FormLabel color={"primary-color"}>Resumo</FormLabel>
          <Textarea
            bg="title-color"
            borderRadius={"12px"}
            placeholder="Digite o preço do produto"
            {...register("resume")}
            // onChange={(e) => format(e.target.value)}
            // value={price}
            // type="text"
          />
          {!!errors.resume && (
            <FormErrorMessage>{errors.resume.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.description}>
          <FormLabel color={"primary-color"}>Descrição</FormLabel>
          <Textarea
            bg="title-color"
            borderRadius={"12px"}
            placeholder="Digite a descrição do produto"
            {...register("description")}
          />
          {errors.description && (
            <FormErrorMessage>{errors.description.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.categoryId}>
          <FormLabel color={"primary-color"}>Categoria</FormLabel>
          <Flex gap={"12px"}>
            <Select
              {...register("categoryId")}
              bg="title-color"
              borderRadius={"12px"}
            >
              <option>Selecione a categoria</option>
              {isFetching ? (
                <Spinner />
              ) : (
                categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              )}
            </Select>
            <Button onClick={onOpen}>
              + 
            </Button>
          </Flex>
        </FormControl>

        <FormControl isInvalid={!!errors.sale}>
          <FormLabel htmlFor="sale" color={"primary-color"}>Promoção</FormLabel>
          <Checkbox
            bg="title-color"
            borderRadius={"12px"}
            type="checkbox"
            {...register("sale")}
          />
          {errors.sale && (
            <FormErrorMessage>{errors.sale.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.featuredProduct}>
          <FormLabel htmlFor="featuredProduct" color={"primary-color"}>Produtos em Destaque</FormLabel>
          <Checkbox
            bg="title-color"
            borderRadius={"12px"}
            type="checkbox"
            {...register("featuredProduct")}
          />
          {errors.featuredProduct && (
            <FormErrorMessage>{errors.featuredProduct.message}</FormErrorMessage>
          )}
        </FormControl>


        <Button bg="logo-color" color={"#FFFFFF"} border={"12px"} type="submit">
          Adicionar
        </Button>
        <Button colorScheme="red" mt={4} onClick={toggleCreateModal}>
          Cancelar
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar categoria</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl as="form" onSubmit={handleSubmitCategory(handleAddCategory)}>
              <FormLabel>Nome da Categoria</FormLabel>
              <Input
                placeholder="Digite o nome da categoria"
                {...registerCategory("name")}
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              {!!categoryErrors.name && (
                <FormErrorMessage>{categoryErrors.name.message}</FormErrorMessage>
              )}
              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Adicionar
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Cancelar
                </Button>
              </ModalFooter>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>,
        document.body
  );
};
