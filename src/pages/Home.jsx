import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme.theme);

  const { name, group, id, isAdmin, isSS, profilePicture } = user.userData;

  return (
    <div
      className={`w-full h-screen pt-16 ${
        theme === "dark" ? "bg-escura_dark text-white" : "bg-clara "
      }`}
    >
      <h1>
        Bienvenido, <span className="text-laranja">{name}</span>.
      </h1>
    </div>
  );
}
