import React from 'react'
import ReactDOM from 'react-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import { UploadProvider } from './context/Provider'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <UploadProvider>
      <Toaster />
      <App />
    </UploadProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
