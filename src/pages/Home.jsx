import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import menuOptions from "../constants/menuOptions";
import { BsArrowUpRightSquareFill } from "react-icons/bs";

export default function Home() {
  const user = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme.theme);

  const { name, group, id, isAdmin, isSS, profilePicture, cards } =
    user.userData;

  return (
    <div className="w-full h-full bg-Background pb-32 text-primary">
      <div className="p-6 flex gap-4 items-center justify-center">
        <img
          src={profilePicture}
          className="w-12 h-12 rounded-full shadow-sm"
          alt="imagen del usuario."
        />
        <h1 className="text-2xl font-semibold font-marcellus text-gray-800">
          Bienvenido, <span className="font-bold">{name.slice(0, -5)}</span>.
        </h1>
      </div>

      <div className="flex flex-col items-center gap-6 px-4">
        <p className="text-gray-600 text-center">
          Para comenzar, elija una de las siguientes opciones:
        </p>

        <div className="flex flex-col gap-4 w-full max-w-md">
          {Object.entries(menuOptions).map(([key, item]) => (
            <Link
              to={item.path}
              key={key}
              className="bg-secondary p-4 rounded-lg shadow-sm h-24 flex flex-col justify-center hover:shadow-md transition-shadow"
            >
              <p className="text-gray-500 text-sm mb-1">{item.info}</p>
              <div className="flex items-center justify-between text-2xl">
                <p className="font-marcellus text-gray-800">{item.label}</p>
                <BsArrowUpRightSquareFill className="text-gray-600" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
