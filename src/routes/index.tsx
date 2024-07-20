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

export const Routers = () => {
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
      <Route path="/rent" element={<RentPage/>} />
    </Routes>
  );
};
