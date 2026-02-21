import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Quiz from './pages/Quiz.tsx'
import Result from './pages/Result.tsx'
import StudentForm from './pages/SignUp.tsx'
import Login from './pages/Login.tsx'
import Dashboard from './pages/Dashboard.jsx'
import Flowchart from './pages/Flowchart.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path ='/login' element={<Login/>}/>
    <Route path= '/signup' element={<StudentForm/>} />
    {
      localStorage.getItem("username") ? 
      <>
        <Route path='/quiz' element={<Quiz/>} />  
        <Route path = '/result' element={<Result/>} /> 
        <Route path= "/" element={<App/>}/>
      </>:
      <>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path='/flowchart' element={<Flowchart/>} />
      <Route path='*' element={<Navigate replace to="/login"/>} />
      </>
    }
    
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
