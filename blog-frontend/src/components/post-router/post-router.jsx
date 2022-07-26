import { Routes, Route } from "react-router-dom";
import Single from "../../pages/single/Single";

import Posts from "../posts/Posts";

const PostRouter = () => {
  return (
    <Routes>
      <Route index element={<Posts />} />
      <Route path=":postTitle" element={<Single />} />
    </Routes>
  );
};

export default PostRouter;
