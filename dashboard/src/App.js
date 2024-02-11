import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Addstudent from "./pages/addstudent";
import Demo from './pages/Demo';
import ViewStudent from './pages/viewstudent';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />}></Route>
          <Route path='/addstudent' element={<Addstudent />}></Route>
          <Route path='/Demo' element={<Demo />}></Route>
          <Route path='viewstudent' element={<ViewStudent/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
