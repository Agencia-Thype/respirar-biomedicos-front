import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ICategoryData } from "../interfaces/categories.intefaces";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import {
  Flex,
  Heading,
  Image,
  Text,
  Button,
  Box,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import {
  IMenuItemCardInterfaceData,
  IMenuItemInterfaceData,
  ProductDetailPageProps,
} from "../interfaces/menuItem.interfaces";
import { ModalConfirm } from "../components/MenuItemCard/ModalConfirm";
import { baseURL } from "../services/api";
import { MenuItemContext } from "../contexts/MenuItemContext";

const ProductDetailPage = () => {
  const { data = [] } = useContext(MenuItemContext);
  const { productId } = useParams<{ productId: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Estado para controlar a imagem selecionada

  if (!productId) {
    return <div>Product not found</div>;
  }

  const product = data.find(
    (p) => p.id === productId
  ) as unknown as IMenuItemCardInterfaceData;

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCartClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index); // Atualiza o estado com o índice da imagem clicada
  };

  type Props = {
    text: string;
  };

  function TextWithLineBreaks({ text }: Props) {
    return (
      <div>
        {text.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
    );
  }
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Flex flexDirection="column" width="100%" padding="20px" flex="1">
        <Center>
          <Flex
            width="80%"
            padding="20px"
            flexDirection={{ base: "column", md: "row" }}
          >
            <Flex
              width={{ base: "100%", md: "40%" }}
              padding="20px"
              flexDirection="row"
              justifyContent="flex-end"
            >
              <SimpleGrid columns={1} spacing={4} marginRight="20px">
                {product.images.map((image, index) => (
                  <Image
                    key={index}
                    src={`${baseURL}${image.filePath.replace("\\", "/")}`}
                    alt={`Thumbnail ${index + 1}`}
                    boxSize="80px"
                    objectFit="cover"
                    border="1px solid #ccc"
                    cursor="pointer"
                    onClick={() => handleImageClick(index)} // Adiciona o evento de clique
                  />
                ))}
              </SimpleGrid>
              <Box
                border="1px solid #ccc"
                padding="10px"
                borderRadius="md"
                width="100%"
                maxWidth="400px"
                maxHeight="400px"
              >
                <Image
                  src={`${baseURL}${product.images[
                    selectedImageIndex
                  ].filePath.replace("\\", "/")}`} // Renderiza a imagem com base no estado selecionado
                  alt={product.name}
                  boxSize="100%"
                  objectFit="cover"
                />
              </Box>
            </Flex>
            <Flex
              flexDirection="column"
              width={{ base: "100%", md: "60%" }}
              padding="20px"
              alignItems="flex-start"
              textAlign="left"
            >
              <Heading mb="4">{product.name}</Heading>
              <Text fontSize="xl" fontWeight="bold" mb="4">
                R$ {product.price}
              </Text>
              <Text mb="4" textAlign="justify">
                {product.resume}
              </Text>
              <Button
                mt="4"
                colorScheme="blue"
                size="sm"
                onClick={handleAddToCartClick}
              >
                Adicionar ao Carrinho
              </Button>
            </Flex>
          </Flex>
        </Center>
        <Center width="100%">
          <Box width="80%" padding="20px">
            <Heading size="md" mb="4" textAlign="center">
              Descrição
            </Heading>
            <Text textAlign="justify">
              <TextWithLineBreaks text={product.description} />
            </Text>
          </Box>
        </Center>
      </Flex>
      <Footer />
      {/* Modal de confirmação */}
      <ModalConfirm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        item={product}
      />
    </Flex>
  );
};

export default ProductDetailPage;
