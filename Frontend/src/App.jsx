import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home.jsx'
import Login from './pages/login.jsx'
import SignUp from './pages/signup.jsx'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/authContext.jsx'
import Profile from './pages/Profile.jsx'
import PasswordRest from './pages/password.jsx'
import VerifyEmail from './pages/verifyEmail.jsx'
import VerifyOTP from './pages/verifyOTP.jsx'
import ChangePassword from './pages/changePassword.jsx'
function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <div className='flex justify-center h-screen p-40 items-center'>
        <Routes>
          <Route path='/' element={authUser ? <Home /> : <Navigate to="/login" />} />
          <Route path='/login' element={authUser ? <Navigate to="/" /> : <Login />} />
          <Route path='/signup' element={authUser ? <Navigate to="/" /> : <SignUp />} />
          <Route path='/profile' element={authUser ? <Profile/> : <Login/> } />
          <Route path='/reset' element={authUser ? <PasswordRest/> : <Login/>}/>
          <Route path='/verifyEmail' element={authUser ? <Navigate to="/" /> : <VerifyEmail />}/>
          <Route path='/verifyOTP' element={authUser ? <Navigate to="/" /> : <VerifyOTP />}/>
          <Route path='/changePassword' element={authUser ? <Navigate to="/" /> : <ChangePassword />}/>

        </Routes>
        <Toaster />
      </div>
    </>
  )
}

export default App
