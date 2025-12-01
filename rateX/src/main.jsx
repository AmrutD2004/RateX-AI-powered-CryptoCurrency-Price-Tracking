import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'


const apiKey = import.meta.env.VITE_CLIENT_ID
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId = {apiKey}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
