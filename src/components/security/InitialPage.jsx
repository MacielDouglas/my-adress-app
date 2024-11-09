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
    // <div className="h-screen bg-cover bg-center pt-16 bg-gradient-to-b from-color_04d to-stone-500">

    <div
      className="h-screen bg-cover bg-center "
      style={{ backgroundImage: `url('./ciudad_2.svg')` }}
    >
      <div className="w-full h-full flex items-center justify-center bg-stone-950 bg-opacity-[50%]  ">
        <div className="w-full h-full flex items-center justify-center ">
          <div className="min-h-[500px] min-w-80 mx-5 p-10 rounded-xl shadow-lg bg-stone-50">
            <h1 className="text-xl font-semibold sm:text-3xl mt-5 mb-10 uppercase">
              Muchas gracias{" "}
              <span className="text-orange-600 font-bold">
                {name.slice(0, -5)}
              </span>
              , por registrarte.
            </h1>
            <p>Todavía no estás en ningún grupo.</p>
            <p>Por favor envié este código: </p>
            <div className="my-10 text-center md:text-start text-orange-500 text-4xl">
              <span
                id="texto"
                className="py-1 px-3  font-semibold tracking-widest"
              >
                {name.slice(-5)}
              </span>{" "}
              <button onClick={copiarTexto}>
                <FaCopy />
              </button>{" "}
            </div>
            <p className="mb-5">
              para un adminstrador para poder pertencer a un grupo.
            </p>
            <p className="mb-5">Saludos.</p>
            <p>Administración.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
