import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
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
    Text,
    Textarea,
    useDisclosure,
    VStack,
  } from "@chakra-ui/react";
  import { SubmitHandler, useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { ICreateUser } from "../../interfaces/users.interfaces";
  import { createUserSchema } from "../../schemas/users.schemas";
  import { useContext, useState } from "react";
  import axios from "axios";
  import { ICepAPI } from "../../interfaces/addresses.interfaces";
  import { UsersContext } from "../../contexts/UsersContext";
  import { useNavigate } from "react-router-dom";
  import { Header } from "../Header";
import { MenuItemContext } from "../../contexts/MenuItemContext";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import { ICategoryDataRequest } from "../../interfaces/categories.intefaces";
import { api } from "../../services/api";
import { BsDashCircleFill, BsPlusCircleFill } from "react-icons/bs";
import { IMenuItemCreate, IMenuItemMutation } from "../../interfaces/menuItem.interfaces";
import { createMenuItemSchema } from "../../schemas/menuItem.schemas";
  
  export const CreateMenuItemForm = () => {    

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
        // toggleCreateModal()
      };


    const format = (price: string) => {
        let priceWithoutCurrency = price.replace("R$", "").trim();
        let priceWithCurrency = `R$ ${priceWithoutCurrency}`;
        setPrice(priceWithCurrency);
      };
    
    const handleAddCategory: SubmitHandler<ICategoryDataRequest> = async (data) => {
        try {
            const token = localStorage.getItem("@DownTown:Token")
            
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
  
 ;
  
    return (
      <>
        <Flex
          as="form"
          flexDir={"column"}
          onSubmit={handleSubmit(onSubmit)}
          justify="space-evenly"
          align={"center"}
          gap={"5rem"}
        >
            <Flex w={"100%"}>
                <VStack spacing={6} w="100%">
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
                
                </VStack>

                <VStack spacing={6} w="100%" p="0 1rem">
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
                    
                </VStack>

                <VStack spacing={6} w="100%">
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
                </VStack>
            </Flex>
            <Button bg="logo-color" color={"#FFFFFF"} border={"12px"} type="submit" maxW={"40%"}>
                Cadastrar Produto
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
                    // value={newCategoryName}
                    // onChange={(e) => setNewCategoryName(e.target.value)}
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
        
      </>
    );
  };
  