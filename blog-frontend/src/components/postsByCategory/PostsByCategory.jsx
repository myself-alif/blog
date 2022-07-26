import Post from "../post/Post";
import "./postsByCategory.css";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

export default function PostsByCategory() {
  const { category } = useParams();

  const [postsByCategory, setPostsByCategory] = useState([]);

  useEffect(() => {
    if (category) {
      fetch(`http://127.0.0.1:8000/api/categories/${category}`)
        .then((response) => response.json())
        .then((data) => setPostsByCategory(data.posts));
    }
  }, []);

  return (
    <div className="posts">
      {postsByCategory.map((post) => (
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
