import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Unauthorized from './pages/Unauthorized'
import ProtectedRoutes from './routes/ProtectedRoutes'
import { useAuth } from './context/AuthContext.jsx'


const App = () => {
  const { user } = useAuth()
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={
          user?.isAuthenticated ? <Navigate to='/dashboard'></Navigate> : <SignIn></SignIn>
        }>                   
        </Route>

        <Route path='/signup' element={
          user?.isAuthenticated ? <Navigate to='/dashboard'></Navigate> : <SignUp></SignUp>
        }>
        </Route>

      <Route path='/dashboard' element={
        <ProtectedRoutes>
          <Dashboard></Dashboard>
        </ProtectedRoutes>
      }>  
      </Route>

      <Route path='/about' element={
        <ProtectedRoutes>
          <About></About>
        </ProtectedRoutes>
      }>
      </Route>

      <Route path='/unauthorized' element={<Unauthorized></Unauthorized>}></Route>

      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="*" element={<Unauthorized/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App