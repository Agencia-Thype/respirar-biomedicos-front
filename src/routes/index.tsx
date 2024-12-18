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
import ProductDetailPage from "../pages/ProductDetailPage";
import {
  IMenuItemCardInterfaceData,
  IMenuItemInterfaceData,
  Produto,
} from "../interfaces/menuItem.interfaces";
import { SalePage } from "../pages/SalePage";
import ProductSearch from "../components/Header/Research";
import { AddMenuItemPage } from "../pages/AddMenuItemPage";
import { ForgotPasswordPage } from "../pages/ForgotPasswordPage";
import { RecoverPasswordPage } from "../pages/RecoverPasswordPage";
import { EditMenuItemPage } from "../pages/EditMenuItemPage";

export const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/produtos" element={<CardapioPage />} />
      <Route path="/carrinho" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/forgotPassword" element={<ForgotPasswordPage />} />
      <Route path="/login/recoverPassword" element={<RecoverPasswordPage />} />
      <Route path="/register" element={<RegisterPager />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/createItem" element={<AddMenuItemPage />} />
      <Route path="/admin/editItem/:productId" element={<EditMenuItemPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/delivery" element={<DeliveryPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/contacts" element={<ContactPage />} />
      <Route path="/rent" element={<RentPage />} />
      <Route path="/sale" element={<SalePage />} />
      <Route path="/produto/:productId" element={<ProductDetailPage />} />
    </Routes>
  );
};
