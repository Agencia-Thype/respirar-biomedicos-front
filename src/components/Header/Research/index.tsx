import React, { useState } from "react";
import { Input, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ProductSearchProps, Produto } from "../../../interfaces/menuItem.interfaces";
import { api } from "../../../services/api";
import { BsSearch } from "react-icons/bs";

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
      console.log(error);
    }
  };

  const handleChange = (value: string) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <Flex gap={"3%"}>
      <Input
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Buscar produtos..."
      />
      <Button onClick={handleSearch}>
        <BsSearch size={25} />
      </Button>
    </Flex>
  );
};

export default ProductSearch;
