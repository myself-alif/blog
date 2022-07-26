import { Link } from "react-router-dom";
import "./sidebar.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
export default function Sidebar() {
  const { avatar } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data.categories));
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src={avatar} alt="" />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {categories.map((category) => {
            return (
              <li key={category.id} className="sidebarListItem">
                <Link className="link" to={`/categories/${category.name}`}>
                  {category.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}
