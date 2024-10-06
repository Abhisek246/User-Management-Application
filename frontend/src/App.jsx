import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Details from './components/Details'
import AddUser from './components/AddUser'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/details' element={<Details/>}/>
        <Route path='/user' element={<AddUser/>}/>
      </Routes>
    </>
  )
}

export default App