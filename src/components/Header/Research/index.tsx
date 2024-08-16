import React, { useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ProductSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/cardapio?query=${encodeURIComponent(query.trim())}`); // Redireciona para a página de cardápio com a query de busca
    }
  };

  return (
    <div>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar produtos..."
      />
      <Button onClick={handleSearch}>Buscar</Button>
    </div>
  );
};

export default ProductSearch;
