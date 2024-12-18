import { Flex } from "@chakra-ui/react";
import { Routers } from "./routes";
import { Header } from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { MenuItemContext } from "./contexts/MenuItemContext";

function App() {
  const { handleSearch, setFilteredCardapio } = useContext(MenuItemContext);
  return (
    <>
      <Flex w="100%">
        <Header
          handleSearch={handleSearch}
          setFilteredCardapio={setFilteredCardapio}
        />
      </Flex>
      <Routers />
      <ToastContainer />
    </>
  );
}

export default App;
