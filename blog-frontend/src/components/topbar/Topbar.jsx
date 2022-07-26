import { Link, Outlet } from "react-router-dom";
import "./topbar.css";

import { Fragment, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Search } from "../search/search";
import { SearchContext } from "../../context/search";

export default function Topbar() {
  const { isSearchActive, setSearchActive } = useContext(SearchContext);
  const { avatar, token, loginUrl } = useContext(AuthContext);

  const searchBoxTrigger = () => {
    setSearchActive(!isSearchActive);
  };
  const logout = () => {
    fetch("http://127.0.0.1:8000/api/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.clear();
        window.location.replace(data.url);
      });
  };

  return (
    <Fragment>
      <div className="top">
        <div className="topLeft">
          <i className="topIcon fab fa-facebook-square"></i>
          <i className="topIcon fab fa-instagram-square"></i>
          <i className="topIcon fab fa-pinterest-square"></i>
          <i className="topIcon fab fa-twitter-square"></i>
        </div>
        <div className="topCenter">
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/">
                HOME
              </Link>
            </li>
            <li className="topListItem">ABOUT</li>
            <li className="topListItem">CONTACT</li>
            {token && (
              <li className="topListItem">
                <Link className="link" to="/write">
                  WRITE
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="topRight">
          <Link className="link" to="/settings">
            {avatar ? (
              <img className="topImg" src={avatar} alt="" />
            ) : (
              <img
                className="topImg"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                alt=""
              />
            )}
          </Link>

          <ul className="topList">
            <li className="topListItem">
              {token ? (
                <a className="link" onClick={logout}>
                  LOGOUT
                </a>
              ) : (
                <a className="link" href={loginUrl}>
                  LOGIN
                </a>
              )}
            </li>
          </ul>

          {isSearchActive ? (
            <Search />
          ) : (
            <i
              onClick={searchBoxTrigger}
              className="topSearchIcon fas fa-search"
            ></i>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
}
