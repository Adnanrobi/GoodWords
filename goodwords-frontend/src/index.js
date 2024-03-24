import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/client";
import { RegistrationProvider } from "./contexts/RegistrationContext";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <ApolloProvider client={client}>
    <RegistrationProvider>
      {" "}
      <App />
    </RegistrationProvider>
  </ApolloProvider>
);
