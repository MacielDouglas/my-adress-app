// import client from "./../main.jsx";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import CryptoJS from "crypto-js";

// Configuração do Apollo Client
const client = new ApolloClient({
  uri: "https://minha-api-nine.vercel.app/graphql",
  cache: new InMemoryCache(),
});

// Função de descriptografia
const decryptData = (encryptedData) => {
  const secretKey = import.meta.env.VITE_FIREBASE_CRYPTOS;
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedText);
  } catch (error) {
    console.error("Erro na descriptografia:", error);
    return null;
  }
};

// Query GraphQL para buscar as credenciais do Firebase
const GET_FIREBASE_CONFIG = gql`
  query Fires {
    firebaseConfig {
      encryptedData
    }
  }
`;

// Função para obter e descriptografar as credenciais do Firebase
async function getDecryptedFirebaseConfig() {
  try {
    const { data } = await client.query({ query: GET_FIREBASE_CONFIG });
    const encryptedData = data.firebaseConfig.encryptedData;
    const decryptedData = decryptData(encryptedData);

    if (!decryptedData) {
      throw new Error("Descriptografia falhou. Verifique a chave secreta.");
    }
    return decryptedData;
  } catch (error) {
    console.error("Erro ao obter a configuração do Firebase:", error);
    return null;
  }
}

// Promessa para inicializar o Firebase
const firebaseConfigPromise = getDecryptedFirebaseConfig();
const appPromise = firebaseConfigPromise.then((firebaseConfig) => {
  if (firebaseConfig) {
    return initializeApp(firebaseConfig);
  }
  throw new Error("Configuração Firebase inválida");
});

const authPromise = appPromise.then((app) => getAuth(app));

// Provedor do Google Auth
const googleProvider = new GoogleAuthProvider();

// Exportação das promessas e funções necessárias
export { authPromise as auth, googleProvider, signInWithPopup };
