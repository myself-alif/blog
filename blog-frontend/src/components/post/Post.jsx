import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ img, title, postBody, category, created_at }) {
  return (
    <div className="post">
      <img
        className="postImg"
        src={`http://127.0.0.1:8000/post_images/${img}`}
        alt=""
      />
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">
            <Link className="link" to="/posts?cat=Music">
              {category}
            </Link>
          </span>
        </div>
        <span className="postTitle">
          <Link to={`/posts/${title}`} className="link">
            {title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{created_at}</span>
      </div>
      <p className="postDesc">{postBody}</p>
    </div>
  );
}
