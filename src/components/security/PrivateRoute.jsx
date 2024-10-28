import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  //   const user = useSelector((state) => state.auth.user);
  const user = useSelector((state) => state.user.userData);

  return user ? <Outlet /> : <Navigate to="/login" />;
}
