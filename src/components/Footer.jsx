import { FaRoute, FaRegUser, FaRegRectangleList } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-primary text-white py-4 px-6  flex justify-between">
      <Link
        to="/"
        className="flex flex-col gap-1 justify-center items-center text-xs"
      >
        <IoHomeOutline className="text-2xl" />
        home
      </Link>
      <Link
        to="/address"
        className="flex flex-col gap-1 justify-center items-center text-xs"
      >
        <FaRoute className="text-2xl" />
        direcciones
      </Link>
      <Link
        to="/cards"
        className="flex flex-col gap-1 justify-center items-center text-xs"
      >
        <FaRegRectangleList className="text-2xl" />
        tarjetas
      </Link>
      <Link
        to="/user"
        className="flex flex-col gap-1 justify-center items-center text-xs"
      >
        <FaRegUser className="text-2xl" />
        usuario
      </Link>
    </footer>
  );
}

export default Footer;
