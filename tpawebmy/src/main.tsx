import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import UserContext from './Context/UserContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserContext>
        <App />
    </UserContext>
  </React.StrictMode>
)