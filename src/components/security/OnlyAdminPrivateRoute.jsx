import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function OnlyAdminPrivateRoute() {
  const user = useSelector((state) => state.user.userData);

  return user && user.isAdmin ? <Outlet /> : <Navigate to="/login" />;
}
