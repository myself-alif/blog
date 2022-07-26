import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/auth.context";
import { BrowserRouter } from "react-router-dom";
import { PostsProvider } from "./context/posts.context";
import { SearchProvider } from "./context/search";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <AuthProvider>
    <PostsProvider>
      <BrowserRouter>
        <SearchProvider>
          <App />
        </SearchProvider>
      </BrowserRouter>
    </PostsProvider>
  </AuthProvider>,
  document.getElementById("root")
);
