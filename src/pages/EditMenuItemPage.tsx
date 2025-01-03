import {
  Heading,
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
  Spinner,
} from "@chakra-ui/react";

import { Header } from "../components/Header";
import {
  IMenuItemCardInterfaceData,
  IMenuItemInterfaceData,
  ProductListSearchProps,
} from "../interfaces/menuItem.interfaces";
import { useNavigate, useParams } from "react-router-dom";
import { MenuItemContext } from "../contexts/MenuItemContext";
import { useContext, useEffect, useState } from "react";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { api, baseURL } from "../services/api";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateMenuItemSchema } from "../schemas/menuItem.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoMdClose } from "react-icons/io";
import { useQuery, useQueryClient } from "@tanstack/react-query";
interface IUpdateMenuItemFormProps {
  item: IMenuItemInterfaceData;
}

interface IImageURL {
  fileName?: string;
  filePath?: string;
  fileType?: string;
  id?: string;
  menuItemId?: string;
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
  oldImages?: IImageURL[]; // Agora opcional
}

// Alternativa usando Partial
export type IUpdateMenuItemPatch = Partial<IUpdateMenuItem>;

export const EditMenuItemPage = () => {
  const { updateMenuItem, listItemDetail } = useContext(MenuItemContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();

  const [isloading, setIsloading] = useState(true);
  const [fileImages, setFileImages] = useState<File[]>([]);
  const [urlImages, setUrlImages] = useState<IImageURL[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);

  const { data: categories } = useContext(CategoriesContext);

  // Carregamento do produto
  const fetchData = async () => {
    if (!productId) return null;
    return await listItemDetail(productId);
  };
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IUpdateMenuItemPatch>({
    resolver: zodResolver(updateMenuItemSchema),
  });

  // Função para lidar com a alteração das imagens
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const newImages = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );
    const oversizedImages = newImages.filter(
      (file) => file.size > 1 * 1024 * 1024
    );

    if (oversizedImages.length > 0) {
      setImageError("Cada imagem deve ter no máximo 1 MB.");
      return;
    }

    const totalImages = fileImages.length + urlImages.length + newImages.length;
    if (totalImages > 5) {
      setImageError("Você pode adicionar no máximo 5 imagens.");
      return;
    }
    setFileImages((prev) => [...prev, ...newImages]);
    setImageError(null);
  };

  // Funções para remover imagens
  const removeFileImage = (index: number) => {
    setFileImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeUrlImage = (index: number) => {
    setUrlImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Função de envio do formulário
  const onSubmit: SubmitHandler<IUpdateMenuItemPatch> = async (data) => {
    const updatedData: IUpdateMenuItemPatch = {
      ...data,
      price: parseFloat(data.price!.toString()),
      oldImages: urlImages,
      images: fileImages,
    };
    if (productId) {
      updateMenuItem({ id: productId, data: updatedData });
    }
  };
  useEffect(() => {
    fetchData().then((item) => {
      if (item) {
        setUrlImages(item.images);
        reset({
          name: item.name || "",
          price: item.price ? parseFloat(item.price.toString()) : undefined,
          resume: item.resume || "",
          description: item.description || "",
          categoryId: item.categoryId || "",
          sale: item.sale || false,
          featuredProduct: item.featuredProduct || false,
        });
        setIsloading(false);
      } else {
        navigate("/amin");
      }
    });
  }, []);

  if (isloading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }
  return (
    <Flex flexDir="column" w="100%">
      <Flex w={"100%"} flexDirection={"column"} padding={"5% 10%"} gap={"3rem"}>
        <Heading
          textAlign={"center"}
          size={{ base: "2xl", md: "3xl", lg: "4xl" }}
          fontSize={"34px"}
        >
          Editar Produto
        </Heading>
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
                <FormErrorMessage>
                  {errors.description.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!imageError}>
              <FormLabel>
                Imagens do Produto (Máx: 5) - (Tam Máx: 1 Mb)
              </FormLabel>
              <Input
                type="file"
                multiple
                onChange={handleImageChange}
                accept="image/*"
              />

              {imageError && <Text color="red.500">{imageError}</Text>}
            </FormControl>

            <Box display="flex" flexWrap="wrap" gap={4}>
              {fileImages.map((file, index) => (
                <Box key={`fileImages${index}`} position="relative">
                  <Image
                    src={URL.createObjectURL(file)}
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
                    onClick={() => removeFileImage(index)}
                  />
                </Box>
              ))}
              {urlImages.map((image, index) => (
                <Box key={`urlImages${index}`} position="relative">
                  <Image
                    src={`${baseURL}${image.filePath?.replace("\\", "/")}`}
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
                    onClick={() => removeUrlImage(index)}
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
      </Flex>
    </Flex>
  );
};
