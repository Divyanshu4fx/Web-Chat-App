import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home.jsx'
import Login from './pages/login.jsx'
import SignUp from './pages/signup.jsx'
import UploadImge from './pages/uploadImge.jsx'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/authContext.jsx'
function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <div className='p-40 flex h-screen item-center justify-center'>
      <UploadImge/>
        {/* <Routes>
          <Route path='/' element={authUser ? <Home /> : <Navigate to="/login" />} />
          <Route path='/login' element={authUser ? <Navigate to="/" /> : <Login />} />
          <Route path='/signup' element={authUser ? <Navigate to="/" /> : <SignUp />} />
        </Routes>
        <Toaster /> */}
      </div>
    </>
  )
}

export default App
