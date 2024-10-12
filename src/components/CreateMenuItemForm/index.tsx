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
    Text,
    Image,
    IconButton,
    Box,
} from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
// import { CloseIcon } from "@chakra-ui/icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createMenuItemSchema } from "../../schemas/menuItem.schemas";
import { MenuItemContext } from "../../contexts/MenuItemContext";
import { CategoriesContext } from "../../contexts/CategoriesContext";

interface ICreateMenuItem {
    name: string;
    price: number;
    resume: string;
    description: string;
    categoryId: string;
    sale: boolean;
    featuredProduct: boolean;
    images: File[];
}

export const CreateMenuItemForm = () => {
    const { data: categories, isFetching } = useContext(CategoriesContext);
    const { createMenuItem } = useContext(MenuItemContext);

    const [productImages, setProductImages] = useState<File[]>([]);
    const [imageError, setImageError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ICreateMenuItem>({
        resolver: zodResolver(createMenuItemSchema),
    });

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
            setValue("images", updatedImages);
            setImageError(null);
        }
    };

    const removeImage = (index: number) => {
        const updatedImages = productImages.filter((_, i) => i !== index);
        setProductImages(updatedImages);
        setValue("images", updatedImages);
    };

    const onSubmit: SubmitHandler<ICreateMenuItem> = async (data) => {
        if (productImages.length === 0) {
            setImageError("Você deve adicionar pelo menos uma imagem.");
            return;
        }

        const fetchedImages: [File, ...File[]] = productImages as [
            File,
            ...File[]
        ];

        const fetchedData = {
            ...data,
            images: fetchedImages,
        };

        createMenuItem(fetchedData);
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
                        <FormErrorMessage>
                            {errors.name.message}
                        </FormErrorMessage>
                    )}
                </FormControl>

                <FormControl isInvalid={!!errors.price}>
                    <FormLabel>Preço</FormLabel>
                    <Input
                        {...register("price")}
                        placeholder="Digite o preço do produto"
                        type="text"
                    />
                    {!!errors.price && (
                        <FormErrorMessage>
                            {errors.price.message}
                        </FormErrorMessage>
                    )}
                </FormControl>

                <FormControl isInvalid={!!errors.resume}>
                    <FormLabel>Resumo</FormLabel>
                    <Textarea
                        {...register("resume")}
                        placeholder="Digite o resumo do produto"
                    />
                    {!!errors.resume && (
                        <FormErrorMessage>
                            {errors.resume.message}
                        </FormErrorMessage>
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
                    <FormLabel>Imagens do Produto (Máx: 5)</FormLabel>
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
                                src={URL.createObjectURL(image)}
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
                    <Checkbox {...register("featuredProduct")}>
                        Produto em Destaque
                    </Checkbox>
                </FormControl>

                <Button type="submit" colorScheme="blue">
                    Cadastrar Produto
                </Button>
            </VStack>
        </Flex>
    );
};
