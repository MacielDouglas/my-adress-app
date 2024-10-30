import React from "react";
import SessionCountdown from "../components/security/SessionCountdown";
import { useSelector } from "react-redux";

export default function Home() {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div
      className={`w-screen h-screen ${
        theme === "dark" ? "bg-escura_dark text-white" : "bg-clara "
      }`}
    >
      Home
      <SessionCountdown />
    </div>
  );
}
