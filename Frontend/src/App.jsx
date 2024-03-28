import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home.jsx'
import Login from './pages/login.jsx'
import SignUp from './pages/signup.jsx'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/authContext.jsx'
import Profile from './pages/Profile.jsx'
import PasswordRest from './pages/password.jsx'
function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <div className='p-40 flex h-screen item-center justify-center'>
        <Routes>
          <Route path='/' element={authUser ? <Home /> : <Navigate to="/login" />} />
          <Route path='/login' element={authUser ? <Navigate to="/" /> : <Login />} />
          <Route path='/signup' element={authUser ? <Navigate to="/" /> : <SignUp />} />
          <Route path='/profile' element={authUser ? <Profile/> : <Login/> } />
          <Route path='/reset' element={authUser ? <PasswordRest/> : <Login/>}/>
        </Routes>
        <Toaster />
      </div>
    </>
  )
}

export default App
