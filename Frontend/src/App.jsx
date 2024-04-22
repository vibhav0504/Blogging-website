
import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './Pages/Home'
import About from './Pages/About'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'
import Projects from './Pages/Projects'
import Header from './Component/Header'
import  Footer from './Component/Footer'
import Privateroute from './Component/Privateroute'
const App = () => {
  return (
  
    <BrowserRouter>
    <Header/> 
      <Routes>
        <Route  path="/" element={< Home/>}/>
        <Route  path="/about" element={< About/>}/>
        <Route  path="/sign-in" element={< Signin/>}/>
        <Route  path="/sign-up" element={< Signup/>}/>
        <Route element=<Privateroute/>>
        <Route  path="/dashboard" element={< Dashboard/>}/>
        </Route>
        <Route  path="/project" element={< Projects/>}/>
      </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
