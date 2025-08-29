import React from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";
import App from "./App";
import ErrorBanner from "./components/ErrorBanner";
import "./index.css"; 

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      {/* ErrorBanner sits above everything and shows global Apollo errors */}
      <ErrorBanner />
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
