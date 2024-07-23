import React from 'react'
import { useParams } from 'react-router-dom';

import { ICategoryData } from '../interfaces/categories.intefaces';
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
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <img src={product.imageURL} alt={product.name} />
        <p>Price: ${product.price}</p>
        <p>Category: {product.category.name}</p>
      </div>
    );
  };
  
  export default ProductDetailPage;