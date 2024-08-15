import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ICategoryData } from '../interfaces/categories.intefaces';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer'; // Importa o Footer
import { Flex, Heading, Image, Text, Button, Box, SimpleGrid, Center } from '@chakra-ui/react';

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
    <Flex flexDirection="column" minHeight="100vh">
      <Header />
      <Flex flexDirection="column" width="100%" padding="20px" flex="1">
        <Center>
          <Flex width="80%" padding="20px" flexDirection={{ base: "column", md: "row" }}>
            <Flex width={{ base: "100%", md: "40%" }} padding="20px" flexDirection="row" justifyContent="flex-end">
              <SimpleGrid columns={1} spacing={4} marginRight="20px">
                {/* Substitua essas URLs pelas URLs reais das miniaturas */}
                <Image src={product.imageURL} alt="Thumbnail 1" boxSize="80px" objectFit="cover" border="1px solid #ccc" />
                <Image src={product.imageURL} alt="Thumbnail 2" boxSize="80px" objectFit="cover" border="1px solid #ccc" />
                <Image src={product.imageURL} alt="Thumbnail 3" boxSize="80px" objectFit="cover" border="1px solid #ccc" />
                <Image src={product.imageURL} alt="Thumbnail 4" boxSize="80px" objectFit="cover" border="1px solid #ccc" />
              </SimpleGrid>
              <Box border="1px solid #ccc" padding="10px" borderRadius="md" width="100%" maxWidth="400px" maxHeight="400px">
                <Image src={product.imageURL} alt={product.name} boxSize="100%" objectFit="cover" />
              </Box>
            </Flex>
            <Flex flexDirection="column" width={{ base: "100%", md: "60%" }} padding="20px" alignItems="flex-start" textAlign="left">
              <Heading mb="4">{product.name}</Heading>
              <Text fontSize="xl" fontWeight="bold" mb="4">R$ {product.price}</Text> {/* Tamanho do preço reduzido */}
              <Text mb="4">Resumo do produto aqui...</Text> {/* Alinhamento à esquerda */}
              <Button mt="4" width="40%" colorScheme="blue" size="sm" onClick={handleClick}>
                Adicionar ao Carrinho
              </Button>
            </Flex>
          </Flex>
        </Center>
        <Center width="100%">
          <Box width="80%" padding="20px">
            <Heading size="md" mb="4" textAlign="center">Descrição</Heading>
            <Text textAlign="center">{product.description}</Text>
          </Box>
        </Center>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default ProductDetailPage;
