import "./App.scss";

import Title from "./components/Title/title";

import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Content from "./components/Content/Content";
import Register from "./components/Content/Register/Register";
import Login from "./components/Content/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import SinglePost from "./components/SinglePost/SinglePost";

function App() {
  return (
    <div className="App">
      <Title></Title>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:name" element={<Content />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/post/:id" element={<SinglePost />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
