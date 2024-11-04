import { useLazyQuery } from "@apollo/client";
import { toggleTheme } from "../store/themeSlice";
import SessionCountdown from "./security/SessionCountdown";
import { useDispatch, useSelector } from "react-redux";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { TiThMenuOutline, TiTimesOutline } from "react-icons/ti";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { GiExitDoor } from "react-icons/gi";
import { clearUser } from "../store/userSlice";
import { LOGOUT } from "../graphql/queries/user.query";
import { toast } from "react-toastify"; // Importa o react-toastify

function Header() {
  const theme = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const menu = ["Home", "Nueva Dirección", "Mis Tarjetas", "Mi Usuario"];

  // Query de logout no servidor
  const [logoutUser] = useLazyQuery(LOGOUT, {
    onCompleted: (data) => {
      if (data.user.success) {
        dispatch(clearUser()); // Limpa o estado Redux apenas se o logout no servidor for bem-sucedido
        toast.success("¡Cierre de sesión exitoso!"); // Notificação de sucesso
      } else {
        toast.error(`Erro ao fazer logout: ${data.user.message}`); // Notificação de erro
      }
    },
    onError: (error) => {
      toast.error(`Erro na solicitação de logout: ${error.message}`); // Notificação de erro
    },
  });

  // Fecha o menu ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logoutUser({ variables: { action: "logout" } });
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full flex justify-between p-4 ${
        theme === "dark" ? "bg-escura_dark text-white" : "bg-clara"
      }`}
    >
      <SessionCountdown />

      {/* Botão de alternância de tema */}
      <button onClick={() => dispatch(toggleTheme())}>
        <p>{theme === "light" ? <FaSun /> : <FaMoon />}</p>
      </button>

      {/* Botão de Menu Mobile */}
      <button className="md:hidden text-2xl" onClick={handleMenuToggle}>
        {isMenuOpen ? <FaTimes /> : <TiThMenuOutline />}
      </button>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className={`fixed inset-0 bg-black bg-opacity-50 flex justify-end md:hidden`}
        >
          <div className="w-64 bg-white dark:bg-escura_dark dark:text-white h-full flex flex-col p-5">
            <button
              className="md:hidden self-end text-4xl"
              onClick={handleMenuToggle}
            >
              <TiTimesOutline />
            </button>
            {user.userData.group !== "0" && (
              <ul className="flex flex-col space-y-4 mb-5">
                {menu.map((item) => (
                  <li key={item} onClick={handleMenuClose}>
                    <Link to={`/${item.toLowerCase()}`} className="text-xl">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <button
              className="text-2xl text-laranja flex gap-2 items-center mb-5"
              onClick={handleLogout}
            >
              Salir <GiExitDoor />
            </button>

            <SessionCountdown />

            <button
              onClick={() => dispatch(toggleTheme())}
              className="text-2xl mt-5 self-center"
            >
              <p>{theme === "light" ? <FaSun /> : <FaMoon />}</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
