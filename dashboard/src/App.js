import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Addstudent from "./pages/addstudent";
import Demo from './pages/Demo';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />}></Route>
          <Route path='/addstudent' element={<Addstudent />}></Route>
          <Route path='/Demo' element={<Demo />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
