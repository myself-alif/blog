import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  loginUrl: "",
  setLoginUrl: () => {},
  token: "",
  setToken: () => {},
  avatar: "",
  setAvatar: () => {},
});

export const AuthProvider = ({ children }) => {
  const [loginUrl, setLoginUrl] = useState("");
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [avatar, setAvatar] = useState(sessionStorage.getItem("avatar"));

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/auth/getLoginURL")
      .then((response) => response.json())
      .then((data) => setLoginUrl(data.url));
  }, []);

  const value = { loginUrl, token, setToken, avatar, setAvatar };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
