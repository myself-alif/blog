import { useState } from "react";
import { useContext } from "react";
import { SearchContext } from "../../context/search";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  let navigate = useNavigate();
  const { isSearchActive, setSearchActive, searchPosts, setSearchPosts } =
    useContext(SearchContext);

  const [searchInputValue, setSearchInputValue] = useState("");
  const searchResult = (e) => {
    e.preventDefault();
    if (!searchInputValue) {
      setSearchActive(!isSearchActive);
    } else {
      fetch(`http://127.0.0.1:8000/api/search/${searchInputValue}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.posts.length == 0) {
            navigate("/404");
          } else {
            setSearchPosts(data.posts);
            navigate(data.url);
          }
        });
    }
  };

  const handleSearchInput = (e) => {
    setSearchInputValue(e.target.value);
  };

  return (
    <form onSubmit={searchResult}>
      <div className="input-group">
        <div className="form-outline">
          <input
            onChange={handleSearchInput}
            value={searchInputValue}
            name="title"
            type="search"
            id="form1"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          <i className="fas fa-search"></i>
        </button>
      </div>
    </form>
  );
};
