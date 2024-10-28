import SessionCountdown from "./security/SessionCountdown";
import { useSelector } from "react-redux";

function Header() {
  const user = useSelector((state) => state.user);

  //   console.log(user.userData.name);
  return (
    <div>
      Header <SessionCountdown />
    </div>
  );
}

export default Header;
