import React from 'react'
import ReactDOM from 'react-dom/client'
import EstateApp from './EstateApp'
import 'alertifyjs/build/css/alertify.css';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EstateApp />
  </React.StrictMode>,
)
