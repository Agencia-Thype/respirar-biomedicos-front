import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  Text,
  Image,
  IconButton,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateMenuItemSchema } from "../../schemas/menuItem.schemas";
import { MenuItemContext } from "../../contexts/MenuItemContext";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import { ICategoryDataRequest } from "../../interfaces/categories.intefaces";
import { IMenuItemInterfaceData, IMenuItemUpdate } from "../../interfaces/menuItem.interfaces";
import { useLocation, useNavigate } from "react-router-dom";
import { api, baseURL } from "../../services/api";
import { boolean } from "zod";

interface IUpdateMenuItemFormProps {
  item: IMenuItemInterfaceData;
}
interface IUpdateMenuItem {
  name?: string; // Agora opcional
  price?: number; // Agora opcional
  resume?: string; // Agora opcional
  description?: string; // Agora opcional
  categoryId?: string; // Agora opcional
  sale?: boolean; // Agora opcional
  featuredProduct?: boolean; // Agora opcional
  images?: File[]; // Agora opcional
}

// Alternativa usando Partial
type IUpdateMenuItemPatch = Partial<IUpdateMenuItem>
export const EditMenuItemForm = () => {
    const location = useLocation();
    const item = location.state?.item;  // Verifique se location.state está definido
  
    // console.log(item.images);
  const { data: categories, isFetching } = useContext(CategoriesContext);
  // const { updateMenuItem } = useContext(MenuItemContext);
  const updateMenuItem = async (id:string, data:IUpdateMenuItemPatch) => {
    console.log(id)
    console.log(data)
    try {
      const token = localStorage.getItem("@DownTown:Token");
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await api.patch(`/menuItem/${id}/`, data,{
        headers: {
          'Content-Type': 'application/json', // Certifique-se de que está configurado
        },
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }

  const [productImages, setProductImages] = useState<File[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IMenuItemInterfaceData>({
    resolver: zodResolver(updateMenuItemSchema),
    defaultValues: {
      name: item.name,
      price: parseFloat(item.price.toString()),
      resume: item.resume,
      description: item.description,
      categoryId: item.categoryId,
      sale: item.sale,
      featuredProduct: item.featuredProduct,
    },
  });

  useEffect(() => {
    setProductImages(item.images || []);
  }, [item.images]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const selectedFiles = Array.from(e.target.files);
        const totalImages = productImages.length + selectedFiles.length;

        if (totalImages > 5) {
            setImageError("Você pode adicionar no máximo 5 imagens.");
            return;
        }

        const updatedImages = [...productImages, ...selectedFiles];
        setProductImages(updatedImages);
        setValue("images", updatedImages as File[]);
        setImageError(null);
    }
};

  const removeImage = (index: number) => {
    const updatedImages = productImages.filter((_, i) => i !== index);
    setProductImages(updatedImages);
    setValue("images", updatedImages);
  };

//   console.log(productImages)
  const onSubmit: SubmitHandler<IUpdateMenuItemPatch> = async (data) => {
    const updatedData = {
        ...data,
        price: parseFloat(data.price!.toString()),
        images: productImages as File[],
    };
    updateMenuItem(item.id, updatedData);
  };
  return (
    <Flex
      as="form"
      flexDir={"column"}
      onSubmit={handleSubmit(onSubmit)}
      gap={"2rem"}
      encType="multipart/form-data"
    >
      <VStack spacing={6} w="100%">
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Nome</FormLabel>
          <Input
            {...register("name")}
            placeholder="Digite o nome do produto"
          />
          {!!errors.name && (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.price}>
          <FormLabel>Preço</FormLabel>
          <Input
            {...register("price", { valueAsNumber: true })}
            placeholder="Digite o preço do produto"
            type="number"
            step="0.01"
          />
          {!!errors.price && (
            <FormErrorMessage>{errors.price.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.resume}>
          <FormLabel>Resumo (Tam Máx: 800 caracteres)</FormLabel>
          <Textarea
            {...register("resume")}
            placeholder="Digite o resumo do produto"
          />
          {!!errors.resume && (
            <FormErrorMessage>{errors.resume.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.description}>
          <FormLabel>Descrição</FormLabel>
          <Textarea
            {...register("description")}
            placeholder="Digite a descrição do produto"
          />
          {!!errors.description && (
            <FormErrorMessage>{errors.description.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!imageError}>
          <FormLabel>Imagens do Produto (Máx: 5) - (Tam Máx: 1 Mb)</FormLabel>
          <Input
            type="file"
            multiple
            onChange={handleImageChange}
            accept="image/*"
          />
          {imageError && <Text color="red.500">{imageError}</Text>}
        </FormControl>

        <Box display="flex" flexWrap="wrap" gap={4}>
                {productImages.map((image, index) => (
                    <Box key={index} position="relative">
                        <Image
                            src={image instanceof File ? URL.createObjectURL(image) : `${baseURL}/${image}`}
                            alt={`Imagem ${index + 1}`}
                            boxSize="100px"
                            objectFit="cover"
                            borderRadius="md"
                        />
                        <IconButton
                            aria-label="Remover imagem"
                            icon={<IoMdClose />}
                            size="xs"
                            position="absolute"
                            top="0"
                            right="0"
                            onClick={() => removeImage(index)}
                        />
                    </Box>
                ))}
            </Box>


        <FormControl>
          <FormLabel>Categoria</FormLabel>
          <Flex gap={"1rem"}>
            <Select {...register("categoryId")}>
              <option value="">Selecione uma categoria</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
            <Button onClick={onOpen}>+</Button>
          </Flex>
        </FormControl>

        <FormControl>
          <Checkbox 
            {...register("sale")}
            onChange={(e) => setValue("sale", e.target.checked)}
          >
            Em Promoção
          </Checkbox>
        </FormControl>

        <FormControl>
          <Checkbox 
            {...register("featuredProduct")}
            onChange={(e) => setValue("featuredProduct", e.target.checked)}
          >
            Produto em Destaque
          </Checkbox>
        </FormControl>

        <Button type="submit" colorScheme="blue">
          Atualizar Produto
        </Button>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar categoria</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl as="form">
              <FormLabel>Nome da Categoria</FormLabel>
              <Input placeholder="Digite o nome da categoria" />
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
    </Flex>
  );
};
