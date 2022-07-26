import { useState } from "react";
import "./write.css";
import { PostsContext } from "../../context/posts.context";
import { useContext } from "react";

const values = {
  image: "",
  title: "",
  postBody: "",
  category: "",
};

export default function Write() {
  const { setPosts } = useContext(PostsContext);
  const [errors, setErrors] = useState({});
  if (errors) {
    var {
      title: titleErrors,
      postBody: postBodyErrors,
      category: categoryErrors,
      image: imageErrors,
    } = errors;
  }

  const [formFields, setFormFields] = useState(values);
  const { image, title, postBody, category } = formFields;

  const getFormInput = (e) => {
    const { name, value } = e.target;
    if (name == "image") {
      setFormFields({
        ...formFields,
        [name]: e.target.files[0],
      });
    } else {
      setFormFields({
        ...formFields,
        [name]: value,
      });
    }
  };

  const sendInputData = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("postBody", postBody);
    formData.append("image", image);
    formData.append("category", category);

    fetch("http://127.0.0.1:8000/api/posts/insert", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        document.querySelector(".image").value = null;
        setErrors(data.errors);
        setFormFields({
          title: "",
          postBody: "",
          category: "",
        });
        setPosts(data.posts);
      });
  };

  return (
    <div className="write mt-5">
      <div className="container" style={{ maxWidth: "600px" }}>
        <form onSubmit={sendInputData}>
          <div className="mb-3">
            <input
              type="text"
              name="title"
              value={title}
              onChange={getFormInput}
              placeholder="Title"
              className="form-control"
            />
            {titleErrors && (
              <div className="form-text text-danger">
                {titleErrors.map((titleError) => titleError)}
              </div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Category"
              onChange={getFormInput}
              name="category"
              value={category}
            />
            {categoryErrors && (
              <div className="form-text text-danger">
                {categoryErrors.map((categoryError) => categoryError)}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Choose Image
            </label>
            <input
              onChange={getFormInput}
              name="image"
              className="form-control image"
              type="file"
              id="formFile"
            />
            {imageErrors && (
              <div className="form-text text-danger">
                {imageErrors.map((imageError) => imageError)}
              </div>
            )}
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Write Your Post"
              rows="6"
              onChange={getFormInput}
              name="postBody"
              value={postBody}
            ></textarea>
            {postBodyErrors && (
              <div className="form-text text-danger">
                {postBodyErrors.map((postBodyError) => postBodyError)}
              </div>
            )}
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-success">
              POST
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
