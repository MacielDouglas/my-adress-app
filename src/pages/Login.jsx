import { useLazyQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import { LOGIN_USER } from "../graphql/queries/user.query";
import SessionCountdown from "../components/SessionCountdown";

function Login() {
  const user = useSelector((state) => state.user.userData);

  console.log(user);
  const dispatch = useDispatch();
  const [loginUser, { loading, error, data }] = useLazyQuery(LOGIN_USER, {
    onCompleted: (data) => {
      console.log(data);
      if (data.user.success) {
        dispatch(setUser(data.user.user));
      } else {
        console.log("Login failed:", data.user.message);
      }
    },
  });

  const handleLogin = (email, password) => {
    loginUser({ variables: { action: "login", email, password } });
  };

  return (
    <div>
      <button onClick={() => handleLogin("maissl@mail.com", "teste123")}>
        Login
      </button>
      <SessionCountdown />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>{data.user.message}</p>}
      {user && <p>{user.name}</p>}
    </div>
  );
}

export default Login;
