import { useLazyQuery } from "@apollo/client";
import { toggleTheme } from "../store/themeSlice";
import SessionCountdown from "./security/SessionCountdown";
import { useDispatch, useSelector } from "react-redux";
import { FaSun, FaMoon, FaTimes } from "react-icons/fa";
import { TiThMenuOutline, TiTimesOutline } from "react-icons/ti";
import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { GiExitDoor } from "react-icons/gi";
import { clearUser } from "../store/userSlice";
import { LOGOUT } from "../graphql/queries/user.query";
import { toast } from "react-toastify";

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

  const handleClickOutside = useCallback((event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    logoutUser({ variables: { action: "logout" } });
  }, [logoutUser]);

  return (
    // <header className="fixed top-0 left-0 w-full flex items-center justify-between bg-gradient-to-b from-stone-50 to-stone-100 p-4">
    <header
      className={` bg-primary text-white fixed top-0 left-0 w-full flex items-center justify-between p-4 ${
        theme === "dark" ? "bg-escura_dark text-white" : "bg-color_01"
      }`}
    >
      {user.userData.group === "0" ? (
        <div className="flex items-center justify-between w-full p-2 text-2xl ">
          <img
            src="/direccion_white.svg"
            alt="ícone de página "
            className="w-8"
          />
          <div className="flex flex-col gap-1 items-end">
            {/* <button onClick={() => dispatch(toggleTheme())}>
              {theme === "light" ? <FaSun /> : <FaMoon />}
            </button> */}
            {/* <div className="flex flex-col gap-2"> */}
            <button
              className="text-orange-600 flex gap-2 items-center font-semibold"
              onClick={handleLogout}
            >
              Salir <GiExitDoor />
            </button>
            <SessionCountdown text={"text-xs"} />
            {/* </div> */}
          </div>
        </div>
      ) : (
        <div className="flex justify-between w-full p-2">
          <Link to="/">
            <img
              src="/direccion_white.svg"
              alt="ícone de página"
              className="w-8"
            />
          </Link>
          <div className="hidden md:flex gap-5">
            <ul className="flex gap-5 lowercase">
              {menu.map((item) => (
                <li key={item} onClick={handleMenuToggle}>
                  <Link to={`/${item.toLowerCase()}`} className="text-xl">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              className="text-2xl text-orange-500 flex gap-2 items-center mb-5"
              onClick={handleLogout}
            >
              Salir <GiExitDoor />
            </button>
          </div>
          <button className="md:hidden text-2xl" onClick={handleMenuToggle}>
            {isMenuOpen ? <FaTimes /> : <TiThMenuOutline />}
          </button>
          {isMenuOpen && (
            <div
              ref={menuRef}
              className={`fixed inset-0 bg-black bg-opacity-50 flex justify-end md:hidden`}
            >
              <div className="w-64 bg-primary h-full flex flex-col p-5">
                <button
                  className="md:hidden self-end text-4xl"
                  onClick={handleMenuToggle}
                >
                  <TiTimesOutline />
                </button>
                <ul className="flex flex-col space-y-4 mb-5">
                  {menu.map((item) => (
                    <li key={item} onClick={handleMenuToggle}>
                      <Link to={`/${item.toLowerCase()}`} className="text-xl">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
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
                  {theme === "light" ? <FaSun /> : <FaMoon />}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
