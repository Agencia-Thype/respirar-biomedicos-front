import { AddressesProvider } from "../contexts/AddressesContext";
import { CategoriesProvider } from "../contexts/CategoriesContext";
import { LoginProvider } from "../contexts/LoginContext";
import { MenuItemProvider } from "../contexts/MenuItemContext";
import { OrderProvider } from "../contexts/OrdersContext";
import { UsersProvider } from "../contexts/UsersContext";
import { IProvider } from "../interfaces";

export const Providers = ({ children }: IProvider) => {
  return (
    <>
      <UsersProvider>
        <OrderProvider>
          <MenuItemProvider>
            <CategoriesProvider>
              <AddressesProvider>
                <LoginProvider>{children}</LoginProvider>
              </AddressesProvider>
            </CategoriesProvider>
          </MenuItemProvider>
        </OrderProvider>
      </UsersProvider>
    </>
  );
};
