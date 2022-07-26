import { createContext, useEffect, useState } from "react";

export const PostsContext = createContext({
  posts: [],
  setPosts: () => {},
});

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data.posts));
  }, []);

  const values = { posts, setPosts };
  return (
    <PostsContext.Provider value={values}>{children}</PostsContext.Provider>
  );
};
