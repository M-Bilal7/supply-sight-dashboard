// src/App.tsx
import React from "react";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    <ApolloProvider client={client}>
      <ProductsPage />
    </ApolloProvider>
  );
}

export default App;
