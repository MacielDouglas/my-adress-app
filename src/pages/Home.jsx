import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import menuOptions from "../constants/menuOptions";

export default function Home() {
  const user = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme.theme);

  const { name, group, id, isAdmin, isSS, profilePicture, cards } =
    user.userData;

  return (
    <div className="w-full h-full pt-28 bg-Background">
      <div className="p-10 flex gap-5 items-center  justify-center">
        <img
          src={profilePicture}
          className="w-10 h-10 rounded-full"
          alt="imagen del usuario."
        />
        <h1 className="text-2xl font-semibold font-marcellus">
          Bienvenido, <span className="font-bold">{name.slice(0, -5)}</span>.
        </h1>
      </div>
      <div className="flex flex-col items-center gap-5 px-5">
        <p>Para comenzar, elija una de las siguinetes opciones: </p>
        <div className="flex flex-col gap-2 ">
          {Object.entries(menuOptions).map(([key, item]) => (
            <Link
              to={item.path}
              key={key}
              className="bg-secondary p-5 rounded-md h-40 flex flex-col justify-center"
            >
              <p className="">{item.info}</p>
              <div className="flex items-center justify-between ">
                <p className="font-marcellus text-3xl">{item.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
