import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './router';
import { RouterProvider } from 'react-router-dom';
import { ContextProvider } from './context/ContextProvider';
import { ThemeProvider } from './context/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ContextProvider>
  </React.StrictMode>
)
