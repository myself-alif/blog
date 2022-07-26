import Post from "../post/Post";
import "./posts.css";
import { useContext } from "react";
import { SearchContext } from "../../context/search";

export default function SearchPosts() {
  const { searchPosts } = useContext(SearchContext);

  return (
    <div className="posts">
      {searchPosts.map((post) => (
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
