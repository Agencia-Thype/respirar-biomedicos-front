import React, { useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ProductSearchProps, Produto } from "../../../interfaces/menuItem.interfaces";
import { api } from "../../../services/api";

const ProductSearch: React.FC<ProductSearchProps> = ({ setFilteredCardapio, handleSearch }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const fetchData = async (value: string) => {
    try {
      const response = await api.get("/menuItem/");
      const result = response.data.filter((product: Produto) => {
        return value && product && product.name && product.name.toLowerCase().includes(value.toLowerCase());
      });

      setFilteredCardapio(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (value: string) => {
    setInput(value);
    fetchData(value);
  };

  // const handleSearch = () => {
  //   if (input.trim()) {
  //     navigate("/cardapio");
  //   } else {
  //     // Se a busca estiver vazia, opcionalmente você pode querer limpar o estado de filtragem
  //     setFilteredCardapio([]);
  //   }
  // };

  return (
    <div>
      <Input
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Buscar produtos..."
      />
      <Button onClick={handleSearch}>Buscar</Button>
    </div>
  );
};

export default ProductSearch;
