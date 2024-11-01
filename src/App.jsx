import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/security/PrivateRoute";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import Footer from "./components/Footer";

function App() {
  const user = useSelector((state) => state.user);

  return (
    <BrowserRouter className="pt-16 pb-16">
      {user.userData && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
      {user.userData && <Footer />}
    </BrowserRouter>
  );
}

export default App;
