import React from 'react'
import { useParams } from 'react-router-dom';

import { ICategoryData } from '../interfaces/categories.intefaces';
import { Header } from '../components/Header';
import { Flex, Heading, Image, Text } from '@chakra-ui/react';
export interface Produto {
    id: string;
    name: string;
    price: number;
    description: string;
    categoryId: string;
    imageURL: string;
    category: ICategoryData
  }

  export interface ProductDetailPageProps {
    produtos: Produto[];
  }
  
  const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ produtos }) => {
    const { productId } = useParams<{ productId: string }>();
    console.log("Params:", useParams());
    console.log("Product ID from params:", productId);
  
    if (!productId) {
      return <div>Product not found</div>;
    }
  
    const product = produtos.find((p) => p.id === productId);
  
    if (!product) {
      return <div>Product not found</div>;
    }
  
    return (
      <div>
        <Header/>
        <Flex width={"100%"} flexDirection={"column"}>
          <Flex width={"100%"}>
            <Flex width={"50%"}>
              <Image src={product.imageURL} alt={product.name}/>
            </Flex>
            <Flex flexDirection={"column"} width={"50%"}>
              <Heading>{product.name}</Heading>              
              <Text>R$ {product.price}</Text>
            </Flex>
          </Flex>

        </Flex>
        <h1></h1>
        <p>{product.description}</p>
        
        <p></p>
        <p>Category: {product.category.name}</p>
      </div>
    );
  };
  
  export default ProductDetailPage;