import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Addstudent from "./pages/addstudent";
import Demo from "./pages/Demo";
import ViewStudent from "./pages/viewstudent";
import ViewUsers from "./pages/ViewUsers";
import Login from "./pages/login"
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/addstudent" element={<Addstudent />}></Route>
          <Route path="/Demo" element={<Demo />}></Route>
          <Route path="viewstudent" element={<ViewStudent />}></Route>
          <Route path="/viewusers" element={<ViewUsers />}></Route>
          <Route path="/Login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
