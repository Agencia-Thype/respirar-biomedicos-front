import { Route, Routes } from "react-router-dom";
import { CardapioPage } from "../pages/CardapioPage";
import { CartPage } from "../pages/CartPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPager } from "../pages/RegisterPage";
import { AdminPage } from "../pages/AdminPage";
import { OrdersPage } from "../pages/OrdersPage";
import { DeliveryPage } from "../pages/DeliveryPage";
import { UserPage } from "../pages/UserPage";
import { ContactPage } from "../pages/ContactPage";
import { RentPage } from "../pages/RentPage";
import { api } from "../services/api";
import { useEffect, useState } from "react";
import  ProductDetailPage  from "../pages/ProductDetailPage";
import {Produto} from "../pages/ProductDetailPage"


export const Routers: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await api.get<Produto[]>('/menuItem');
        
        setProdutos(response.data);
      } catch (error) {
        console.error('Error fetching produtos:', error);
      }
    };

    fetchProdutos();
    
  }, []);
  

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cardapio" element={<CardapioPage />} />
      <Route path="/carrinho" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPager />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/delivery" element={<DeliveryPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/contacts" element={<ContactPage />} />
      <Route path="/rent" element={<RentPage />} />
      {produtos.map((produto) => (
        <Route
          key={produto.id}
          path={`/produto/:productId`}
          element={<ProductDetailPage produtos={produtos} />}
        />
      ))}
    </Routes>
  );
};