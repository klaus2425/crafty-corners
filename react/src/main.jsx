import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './router.jsx';
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { ContextProvider } from './context/ContextProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
)
