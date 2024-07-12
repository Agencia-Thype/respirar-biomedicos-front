import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./styles/theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/queryClient";
import { Providers } from "./providers";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Providers>
            <App />
          </Providers>
        </QueryClientProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
