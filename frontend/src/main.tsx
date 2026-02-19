import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Quiz from './pages/Quiz.tsx'
import Result from './pages/Result.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path='/quiz' element={<Quiz/>} />  
    <Route path = '/result' element={<Result/>} /> 
    <Route path= "/" element={<App/>}/>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
