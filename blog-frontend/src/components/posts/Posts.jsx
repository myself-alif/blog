import Post from "../post/Post";
import "./posts.css";
import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../../context/posts.context";
import { useParams } from "react-router-dom";

export default function Posts() {
  const { posts } = useContext(PostsContext);
  const { category } = useParams();
  const [postsByCategory, setPostsByCategory] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/categories/${category}`)
      .then((response) => response.json())
      .then((data) => setPostsByCategory(data.posts));
  }, []);

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post
          key={post.id}
          img={post.image}
          title={post.title}
          category={post.category}
          created_at={post.created_at}
          postBody={post.postBody}
        />
      ))}
    </div>
  );
}
