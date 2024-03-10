import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './router';
import { RouterProvider } from 'react-router-dom';
import { ContextProvider } from './context/ContextProvider';
import { ThemeContext } from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <ThemeContext.Provider>
        <RouterProvider router={router} />
      </ThemeContext.Provider>
    </ContextProvider>
  </React.StrictMode>
)
