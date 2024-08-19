import { Route, Routes, useNavigate } from "react-router-dom";
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
import {IMenuItemInterfaceData, Produto} from "../interfaces/menuItem.interfaces"
import { SalePage } from "../pages/SalePage";
import ProductSearch from "../components/Header/Research";


export const Routers: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const [filteredCardapio, setFilteredCardapio] = useState<IMenuItemInterfaceData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  // console.log(filteredCardapio)
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
  
  const handleSearch = () => {
    navigate("/cardapio")
    setIsSearching(true);
  };
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cardapio" element={<CardapioPage handleSearch={handleSearch} isSearching={isSearching} filteredCardapio={filteredCardapio} setFilteredCardapio={setFilteredCardapio} />} />
      <Route path="/carrinho" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPager />} />
      <Route path="/admin" element={<AdminPage  handleSearch={handleSearch} isSearching={isSearching} filteredCardapio={filteredCardapio} setFilteredCardapio={setFilteredCardapio} />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/delivery" element={<DeliveryPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/contacts" element={<ContactPage handleSearch={handleSearch} setFilteredCardapio={setFilteredCardapio}/>} />
      <Route path="/rent" element={<RentPage handleSearch={handleSearch} setFilteredCardapio={setFilteredCardapio}/>} />
      <Route path="/sale" element={<SalePage handleSearch={handleSearch} setFilteredCardapio={setFilteredCardapio} />} />
    
      {produtos.map((produto) => (
        <Route
          key={produto.id}
          path={`/produto/:productId`}
          element={<ProductDetailPage handleSearch={handleSearch}  setFilteredCardapio={setFilteredCardapio} produtos={produtos} />}
        />
      ))}
    </Routes>
  );
};