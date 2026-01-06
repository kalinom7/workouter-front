import Home from './views/Home/Home' 
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './views/Login/Login'
import TestView from './views/Test/TestView'

function App() {
 

  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/test" element={<TestView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
