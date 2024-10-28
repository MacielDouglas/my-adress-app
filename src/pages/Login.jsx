import { useLazyQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "../store/userSlice";
import { LOGIN_USER } from "../graphql/queries/user.query";
import SessionCountdown from "../components/security/SessionCountdown";
import { useNavigate } from "react-router-dom";

function Login() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [loginUser, { loading, error, data }] = useLazyQuery(LOGIN_USER, {
    onCompleted: (data) => {
      console.log(data.user.user);
      if (data?.user?.success) {
        dispatch(setUser({ user: data.user.user })); // Executa apenas uma vez
      } else {
        console.log("Login failed:", data.user.message);
      }
    },
  });

  useEffect(() => {
    if (user.isAuthenticated) {
      // Verificação adicional para evitar loops
      navigate("/");
    }
  }, [user.isAuthenticated, navigate]);

  const handleLogin = () => {
    loginUser({ variables: { action: "login", email, password } });
  };

  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('./ciudad.svg')` }}
    >
      <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-[20%]">
        <div className="bg-white w-96 rounded-xl flex p-10 justify-center flex-col items-center">
          <img
            className="h-20 mb-10"
            src="./Icon_page.svg"
            alt="Imagem do ícone da página direcciones."
          />
          <h1 className="text-2xl font-semibold mb-10">
            Bienvenido a Direcciones
          </h1>
          <p>
            Para comenzar, debe iniciar sesión con una cuenta de{" "}
            <span className="text-red-500 font-semibold">Google</span>.
          </p>

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="my-2 w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="my-2 w-full p-2 border rounded"
          />
          <button
            onClick={handleLogin}
            className="my-10 bg-red-700 w-full py-4 text-white rounded text-2xl disabled:bg-red-300"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </div>
      </div>
      {/* <SessionCountdown />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>{data.user.message}</p>}
      {user && <p>{user.name}</p>} */}
    </div>
  );
}

export default Login;
