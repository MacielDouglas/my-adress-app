import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/index.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// uri: "http://localhost:8000/graphql",
const httpLink = new HttpLink({
  uri: "https://minha-api-nine.vercel.app/graphql", // Seu endpoint GraphQL
  credentials: "include", // Envia cookies, incluindo 'access_token'
});

// Instância do Apollo Client
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <ToastContainer />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ApolloProvider>
);
