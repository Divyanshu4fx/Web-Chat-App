import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/authContext.jsx'
import { SocketContexProvider } from './context/scoketContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContexProvider>
          <App />
        </SocketContexProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
