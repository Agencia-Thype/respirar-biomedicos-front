import React, { useState, useContext } from "react";
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
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createMenuItemSchema } from "../../schemas/menuItem.schemas";
import { MenuItemContext } from "../../contexts/MenuItemContext";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import { IMenuItemCreate } from "../../interfaces/menuItem.interfaces";

interface ICreateMenuItem {
    name: string;
    price: number;
    resume: string;
    description: string;
    categoryId: string;
    sale: boolean;
    featuredProduct: boolean;
    images: File[]
  }
export const CreateMenuItemForm = () => {
  const { data: categories, isFetching } = useContext(CategoriesContext);
  const { createMenuItem } = useContext(MenuItemContext);

  const [price, setPrice] = useState<string>("");
  const [productImages, setProductImages] = useState<File[]>([]); // Para lidar com arquivos
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateMenuItem>({
    resolver: zodResolver(createMenuItemSchema),
  });
  console.log(errors);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    if (e.target.files) {
      // Certifique-se de que productImages seja sempre um array de arquivos
      const selectedFiles = Array.from(e.target.files);
      // const selectedFiles: File[] = Array.from(e.target.files);
      // console.log("linha 51 " + selectedFiles)
      // Create a new File object
      const file1 = new File(["content of file 1"], "file1.txt", { type: "text/plain" });
      const file2 = new File(["content of file 2"], "file2.txt", { type: "text/plain" });

      // Create an array of files
      // const selectedFiles: File[] = [file1, file2];
      const files = [...e.target.files]
      
      console.log(typeof(files))
      setProductImages(selectedFiles);  // Agora você substitui os arquivos em vez de adicionar ao array
    }
  };
  const onSubmit: SubmitHandler<ICreateMenuItem> = async (data) => {
    console.log("Formulário Enviado");
    
    const imagesArray = Array.isArray(productImages) ? productImages : [];
    
    const formData = new FormData();
    
    // Adicionar arquivos ao FormData
    imagesArray.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });
  
    // Adicionar os outros dados
    formData.append("name", data.name);
    formData.append("price", data.price.toString().replace(",", "."));  // Certifique-se de que o preço seja um número válido
    formData.append("resume", data.resume);
    formData.append("description", data.description);
    formData.append("categoryId", data.categoryId);
    formData.append("sale", data.sale ? "true" : "false");
    formData.append("featuredProduct", data.featuredProduct ? "true" : "false");
  
    console.log(formData);
    
    // try {
    //   // Enviar os dados via Axios ou outro cliente HTTP
    // } catch (error) {
    //   console.error("Erro ao criar item de menu", error);
    // }
  };
  
  

  return (
    <Flex as="form" flexDir={"column"} onSubmit={handleSubmit(onSubmit)} gap={"2rem"} encType="multipart/form-data">
      <VStack spacing={6} w="100%">
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Nome</FormLabel>
          <Input {...register("name")} placeholder="Digite o nome do produto" />
          {!!errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!errors.price}>
          <FormLabel>Preço</FormLabel>
          <Input
            {...register("price")}
            placeholder="Digite o preço do produto"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="text"
          />
          {!!errors.price && <FormErrorMessage>{errors.price.message}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!errors.resume}>
          <FormLabel>Resumo</FormLabel>
          <Textarea {...register("resume")} placeholder="Digite o resumo do produto" />
          {!!errors.resume && <FormErrorMessage>{errors.resume.message}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!errors.description}>
          <FormLabel>Descrição</FormLabel>
          <Textarea {...register("description")} placeholder="Digite a descrição do produto" />
          {!!errors.description && <FormErrorMessage>{errors.description.message}</FormErrorMessage>}
        </FormControl>

        <FormControl>
          <FormLabel>Imagens do Produto</FormLabel>
          <Input
            type="file"
            multiple 
            onChange={handleImageChange}
            accept="image/*"
          />
          
          {/* {!!errors.resume && <FormErrorMessage>{errors.resume.message}</FormErrorMessage>} */}
        </FormControl>

        <FormControl>
          <FormLabel>Categoria</FormLabel>
          <Select {...register("categoryId")}>
            <option value="">Selecione uma categoria</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <Checkbox {...register("sale")}>Em Promoção</Checkbox>
        </FormControl>

        <FormControl>
          <Checkbox {...register("featuredProduct")}>Produto em Destaque</Checkbox>
        </FormControl>

        <Button type="submit" colorScheme="blue">
          Cadastrar Produto
        </Button>
      </VStack>
    </Flex>
  );
};
