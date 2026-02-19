import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Quiz from './pages/Quiz1.tsx'
import Result from './pages/Result.tsx'
import Quiz2 from './pages/Quiz2.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path='/quiz' element={<Quiz/>} />  
    <Route path = '/result' element={<Result/>} /> 
    <Route path = '/quiz2' element={<Quiz2/>}/>
    <Route path= "/" element={<App/>}/>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
