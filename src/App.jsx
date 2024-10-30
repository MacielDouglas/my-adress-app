import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/security/PrivateRoute";
import Header from "./components/Header";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);
  console.log(user);
  if (user.userData) {
    console.log(user);
  }
  return (
    <BrowserRouter>
      {user.userData && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import { gql, useLazyQuery } from "@apollo/client";
// import { useState } from "react";

// // Definição da query GraphQL
// const GET_USER = gql`
//   query user($action: String!, $userId: ID!) {
//     user(action: $action, id: $userId) {
//       message
//       success
//       user {
//         name
//         id
//         group
//         isAdmin
//         isSS
//         profilePicture
//         comments {
//           cardId
//           text
//         }
//       }
//     }
//   }
// `;

// function App() {
//   // Estado para armazenar o valor do input
//   const [inputValue, setInputValue] = useState("");

//   // Utilizando useLazyQuery para buscar quando o usuário enviar o ID
//   const [getUser, { loading, data, error }] = useLazyQuery(GET_USER);

//   console.log(data?.user.user);

//   // Função para lidar com a submissão do formulário
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Faz a busca quando o formulário for enviado
//     if (inputValue) {
//       getUser({ variables: { action: "get", userId: inputValue } });
//     }
//   };

//   // Tratamento de erros e loading
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       <h1>Buscar Usuário</h1>

//       {/* Formulário para digitar o ID */}
//       <form onSubmit={handleSubmit}>
//         <label>
//           Digite o ID do Usuário:
//           <input
//             type="text"
//             value={inputValue}
//             className="bg-yellow-400"
//             onChange={(e) => setInputValue(e.target.value)} // Atualiza o estado do input
//           />
//         </label>
//         <button className="bg-indigo-200" type="submit">
//           Buscar
//         </button>
//       </form>

//       {/* Renderizando os dados do usuário se a busca tiver sucesso */}
//       {data && data?.user.user && (
//         <div>
//           <h2>Informações do Usuário:</h2>
//           <p>Nome: {data?.user.user.name}</p>
//           <p>Grupo: {data?.user.user.group}</p>
//           <p>Admin: {data?.user.user.isAdmin ? "Sim" : "Não"}</p>
//           <p>SS: {data?.user.user.isSS ? "Sim" : "Não"}</p>
//           <p>
//             <img
//               src={data?.user.user.profilePicture}
//               alt="Profile"
//               width="100"
//             />
//           </p>
//           {/* <p>Meus Cartões: {data?.user.user.myCards.join(", ")}</p> */}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
