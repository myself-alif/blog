import { createContext, useState } from "react";

export const SearchContext = createContext({
  isSearchActive: false,
  setSearchActive: () => {},
  searchPosts: [],
  setSearchPosts: () => {},
});

export const SearchProvider = ({ children }) => {
  const [isSearchActive, setSearchActive] = useState(false);
  const [searchPosts, setSearchPosts] = useState([]);
  const value = {
    isSearchActive,
    setSearchActive,
    searchPosts,
    setSearchPosts,
  };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
