import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import EmployeeList from './components/EmployeeList'
import AddEmployee from './components/AddEmployee'
import UpdateEmployee from './components/UpdateEmployee'
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route index element={<EmployeeList/>}/>
      <Route path="/" element = {<EmployeeList/>} />
      <Route path="/addEmployee" element = {<AddEmployee/>} />
      <Route path="/editEmployee/:id" element={ <UpdateEmployee/> } />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App
