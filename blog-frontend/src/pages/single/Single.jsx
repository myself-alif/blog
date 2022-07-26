import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import "./single.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Single() {
  const [post, setPost] = useState([]);
  const { postTitle } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/posts/${postTitle}`)
      .then((response) => response.json())
      .then((data) => setPost(data.post));
  }, []);

  return (
    <div className="single">
      <SinglePost post={post} />
      <Sidebar />
    </div>
  );
}
