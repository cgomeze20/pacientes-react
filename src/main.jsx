import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProvider } from './context/AppProvider'
import './index.css'
import { Rutas } from './router/rutas'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <Rutas/>
    </AppProvider>
  </React.StrictMode>
)
