import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/security/PrivateRoute";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import Footer from "./components/Footer";
import PrivateRouteGroupOnly from "./components/security/PrivateRouteGroupOnly";
import InitialPage from "./components/security/InitialPage";
import Address from "./pages/Address";

function App() {
  const user = useSelector((state) => state.user);

  return (
    <BrowserRouter className="pt-16 pb-16">
      {user.userData && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/initialPage" element={<InitialPage />} />
          <Route element={<PrivateRouteGroupOnly />}>
            <Route path="/" element={<Home />} />
            <Route path="/address" element={<Address />} />
          </Route>
        </Route>
      </Routes>
      {user.userData && user.userData.group !== "0" && <Footer />}
    </BrowserRouter>
  );
}

export default App;
