import { useLazyQuery, useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "../store/userSlice";
import { LOGIN_USER } from "../graphql/queries/user.query";
import { useNavigate } from "react-router-dom";
import { toggleTheme } from "../store/themeSlice";
import { FaSun, FaMoon } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  auth,
  googleProvider,
  signInWithPopup,
} from "../firebase/firebaseConfig";
import { LOGIN_GOOGLE } from "../graphql/mutation/user.mutation";

function Login() {
  const user = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userMutation, { loading: load }] = useMutation(LOGIN_GOOGLE, {
    onCompleted: (data) => {
      if (data?.userMutation?.success) {
        dispatch(setUser({ user: data.userMutation.user }));
        toast.success("¡Inicio de sesión exitoso!");
      } else {
        console.log("error de inicio de sesion:", data.userMutation.message);
        toast.error(`Error de inicio de sesion: ${data.userMutation.message}`);
      }
    },
    onError: (error) => {
      toast.error(`Error en la solicitud de ingreso: ${error.message}`);
    },
  });

  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
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

  const handleLoginGoogle = async () => {
    try {
      const authInstance = await auth; // Ensure auth is fully initialized
      document.cookie = "cookieName=value; SameSite=Lax; Secure"; // 'Secure' é recomendado para produção

      const result = await signInWithPopup(authInstance, googleProvider);
      const idToken = await result.user.getIdToken();

      userMutation({ variables: { action: "google", idToken } });
    } catch (error) {
      console.error("Erro ao autenticar com o Google:", error.message);
    }
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
          {/* 
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
          /> */}
          <button
            onClick={handleLoginGoogle}
            className="my-10 bg-red-700 w-full py-2 text-white rounded text-xl disabled:bg-red-300 hover:bg-red-500"
            disabled={loading || load}
          >
            {loading || load ? "Cargando..." : "Usa tu Cuenta de Google"}
          </button>
          {/* <button onClick={handleLoginGoogle}>Login com google</button> */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="flex  gap-2 items-center text-xl"
          >
            Apariencia:
            {theme === "light" ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
