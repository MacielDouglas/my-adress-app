import { useLazyQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "../store/userSlice";
import { LOGIN_USER } from "../graphql/queries/user.query";
import { useNavigate } from "react-router-dom";
import { toggleTheme } from "../store/themeSlice";
import { FaSun, FaMoon } from "react-icons/fa";
import { toast } from "react-toastify";

function Login() {
  const user = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { loading, error, data }] = useLazyQuery(LOGIN_USER, {
    onCompleted: (data) => {
      console.log(data.user.user);
      if (data?.user?.success) {
        dispatch(setUser({ user: data.user.user }));
        toast.success("¡Inicio de sesión exitoso!");
      } else {
        console.log("error de inicio de sesion:", data.user.message);
        toast.error(`Error de inicio de sesion: ${data.user.message}`);
      }
    },
    onError: (error) => {
      toast.error(`Error en la solicitud de ingreso: ${error.message}`);
    },
  });

  useEffect(() => {
    if (user.isAuthenticated) {
      navigate("/");
    }
  }, [user.isAuthenticated, navigate]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleLogin = () => {
    loginUser({ variables: { action: "login", email, password } });
  };

  return (
    <div
      className="h-screen bg-cover bg-center "
      style={{ backgroundImage: `url('./ciudad_2.svg')` }}
    >
      <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-[50%]  ">
        <div
          className={`w-96 rounded-xl flex p-10 justify-center flex-col items-center shadow-2xl ${
            theme === "dark" ? "bg-escura_dark text-white" : "bg-clara "
          }`}
        >
          <img
            className="h-20 mb-10"
            src="./Icon_page.svg"
            alt="Imagem do ícone da página direcciones."
          />
          <h1 className="text-2xl font-semibold mb-10">
            Bienvenido a{" "}
            <span className="text-bold text-laranja">Direcciones</span>
          </h1>
          <p className="text-text_dark_secundary">
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
            className="my-10 bg-red-700 w-full py-4 text-white rounded text-2xl disabled:bg-red-300 hover:bg-red-500"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
          <button
            onClick={() => dispatch(toggleTheme())} // Alterna o tema
          >
            <p>
              <span className="text-2xl">Theme:</span>
              {theme === "light" ? <FaSun /> : <FaMoon />}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
