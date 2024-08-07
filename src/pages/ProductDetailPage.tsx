import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ICategoryData } from '../interfaces/categories.intefaces';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer'; // Importa o Footer
import { Flex, Heading, Image, Text, Button, useDisclosure } from '@chakra-ui/react';

export interface Produto {
  id: string;
  name: string;
  price: number;
  description: string;
  categoryId: string;
  imageURL: string;
  category: ICategoryData;
}

export interface ProductDetailPageProps {
  produtos: Produto[];
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ produtos }) => {
  const { productId } = useParams<{ productId: string }>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  if (!productId) {
    return <div>Product not found</div>;
  }

  const product = produtos.find((p) => p.id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Header />
      <Flex width={"100%"} flexDirection={"column"} paddingBottom="100px">
        <Flex width={"100%"} padding="20px">
          <Flex width={"50%"} padding="20px">
            <Image src={product.imageURL} alt={product.name} boxSize="100%" objectFit="cover" />
          </Flex>
          <Flex flexDirection={"column"} width={"50%"} padding="20px">
            <Heading mb="4">{product.name}</Heading>
            <Text mb="4">{product.description}</Text>
            <Text mb="4" fontSize="2xl" fontWeight="bold">R$ {product.price}</Text>
            <Button
              mt="4"
              width="40%"
              colorScheme="blue"
              onClick={onOpen}
              size="lg"
            >
              Adicionar ao Carrinho
            </Button>
          </Flex>
        </Flex>
        <Flex width="100%" justifyContent="center">
          
        </Flex>
      </Flex>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
