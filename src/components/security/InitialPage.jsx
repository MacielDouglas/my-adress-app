import { useSelector } from "react-redux";
import { FaCopy } from "react-icons/fa6";

export default function InitialPage() {
  const theme = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.user);
  const { name } = user.userData;

  const copiarTexto = () => {
    const texto = document.getElementById("texto").textContent;

    navigator.clipboard
      .writeText(texto)
      .then(() => {
        alert("texto copiado!");
      })
      .catch((err) => {
        console.error("Erro ao copiar texto", err);
      });
  };
  return (
    <div
      className={`w-screen h-screen pt-16 p-10 flex flex-col lg:items-center justify-center gap-5 text-lg ${
        theme === "dark" ? "bg-escura_dark text-white" : "bg-clara "
      }`}
    >
      <div
        className={`p-10 sm:p-20 shadow-lg ${
          theme === "dark" ? "bg-zinc-950 text-white" : "bg-orange-50 "
        }`}
      >
        <h1 className="text-xl font-semibold sm:text-3xl mt-5 mb-10 uppercase">
          Muchas gracias,{" "}
          <span className="text-laranja font-bold">{name.slice(0, -5)}</span>,
          por registrarte.
        </h1>
        <p>Todavía no estás en ningún grupo.</p>
        <p>Por favor envié este código: </p>
        <div className="my-10 text-center md:text-start">
          <span
            id="texto"
            className="bg-gradient-to-b from-laranja to-orange-600  text-black py-1 px-3 text-3xl font-semibold tracking-widest"
          >
            {name.slice(-5)}
          </span>{" "}
          <button
            onClick={copiarTexto}
            className={` text-3xl ${
              theme === "dark" ? " text-laranja" : "text-black "
            }`}
          >
            <FaCopy />
          </button>{" "}
        </div>
        <p>a un adminstrador para poder pertencer a un grupo.</p>
        <p>Saludos.</p>
        <p>Administración.</p>
      </div>
    </div>
  );
}
