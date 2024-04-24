import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './router';
import { RouterProvider } from 'react-router-dom';
import { ContextProvider } from './context/ContextProvider';
import { ThemeProvider } from './context/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, // 1 minute in milliseconds
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ContextProvider>
    </QueryClientProvider>
  // </React.StrictMode>
)
