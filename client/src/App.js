import "./App.scss";

import Title from "./components/Title/title";

import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Content from "./components/Content/Content";
import Register from "./components/Content/Register/Register";
import Login from "./components/Content/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <div className="App">
      <Title></Title>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/content"
          element={
            <ProtectedRoute>
              <Content></Content>
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
