import React from 'react'
import ReactDOM from 'react-dom'
import { AppProvider } from './AppContext'

import App from './App'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'animate.css'
import './index.css'
// import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// reportWebVitals(console.log)
