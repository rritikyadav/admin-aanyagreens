import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '/src/App.jsx'
import LogIn from '/src/login.jsx'
import { createHashRouter, RouterProvider } from 'react-router-dom';


const routes = createHashRouter([

  {path: "/", element: <LogIn />},

  { path: "/Dashboard", element: <App />}
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
