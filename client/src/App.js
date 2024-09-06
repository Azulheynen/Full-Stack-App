import Layout from "./components/Layout";
import "./App.css";
import Public from "./components/Public";
import Login from "./components/Login";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
