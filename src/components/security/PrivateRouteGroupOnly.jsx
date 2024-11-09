import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRouteGroupOnly() {
  const user = useSelector((state) => state.user);
  console.log(user.userData.group);

  return user && user.userData.group !== "0" ? (
    <Outlet />
  ) : (
    <Navigate to="/initialPage" />
  );
}
export default PrivateRouteGroupOnly;
