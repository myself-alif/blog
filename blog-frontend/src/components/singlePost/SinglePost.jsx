import { Link } from "react-router-dom";
import "./singlePost.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { PostsContext } from "../../context/posts.context";

export default function SinglePost({ post }) {
  const { token } = useContext(AuthContext);
  const { setPosts } = useContext(PostsContext);
  let navigate = useNavigate();
  const { title, image, body, author, time } = post;

  const deletePost = () => {
    fetch(`http://127.0.0.1:8000/api/posts/delete/${title}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts);
        navigate(data.url);
      });
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src={`http://127.0.0.1:8000/post_images/${image}`}
          alt=""
        />
        <h1 className="singlePostTitle">
          {title}
          {token && (
            <div className="singlePostEdit">
              <i className="singlePostIcon far fa-edit"></i>
              <i
                onClick={deletePost}
                className="singlePostIcon far fa-trash-alt"
              ></i>
            </div>
          )}
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to="/posts?username=Safak">
                {author}
              </Link>
            </b>
          </span>
          <span>{time}</span>
        </div>
        <p className="singlePostDesc">{body}</p>
      </div>
    </div>
  );
}
