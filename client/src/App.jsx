import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import CreateBlog from "./components/Blog/CreateBlog";
import SingleBlog from "./components/Blog/SingleBlog";
import EditBlog from "./components/Blog/EditBlog";
axios.defaults.baseURL = "http://127.0.0.1:8080/v1";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />

      <Route path="/blog/create" element={<CreateBlog />} />
      <Route path="/blog/edit/:blog_id" element={<EditBlog />} />
      <Route path="/blog/:blog_id" element={<SingleBlog />} />
    </Routes>
  );
};

export default App;
