import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

//libraries
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { ConfigurationProvider} from "./context/configContext";
import { AuthContextProvider } from "./context/authContext";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_NETPOINT_API || "";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <BrowserRouter>
      <ConfigurationProvider>

        <AuthContextProvider>
          <App />
          <ToastContainer
                theme="light"
                position="top-right"
                pauseOnHover="false"
              />
        </AuthContextProvider>
      </ConfigurationProvider>
    </BrowserRouter>
  
  </React.StrictMode>,
)
