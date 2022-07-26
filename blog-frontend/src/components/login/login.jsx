import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

const Login = () => {
  const { setAvatar, setToken } = useContext(AuthContext);
  const { search } = useLocation();

  fetch(`http://127.0.0.1:8000/api/auth/loginCallback${search}`)
    .then((response) => response.json())
    .then((data) => {
      sessionStorage.setItem("token", data.token);
      setToken(sessionStorage.getItem("token"));

      sessionStorage.setItem("avatar", data.avatar);
      setAvatar(sessionStorage.getItem("avatar"));
      window.location.replace(data.url);
    });
};

export default Login;
