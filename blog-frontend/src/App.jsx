import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";

import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Post from "./components/post/Post";
import PostRouter from "./components/post-router/post-router";
import Posts from "./components/posts/Posts";
import { useContext } from "react";
import { AuthContext } from "./context/auth.context";
import PostsByCategory from "./components/postsByCategory/PostsByCategory";
import { FourOFour } from "./components/404/404";
import SearchPosts from "./components/searchPosts/Posts";

function App() {
  const { token } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<Topbar />}>
        <Route index element={<Posts />} />
        <Route path="posts/*" element={<PostRouter />} />
        <Route path="404" element={<FourOFour />} />
        <Route path="search/:title" element={<SearchPosts />} />
        <Route path="categories/:category" element={<PostsByCategory />} />
        {token && <Route path="write" element={<Write />} />}
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
