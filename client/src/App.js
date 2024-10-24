import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './RootLayout'
import Login from './components/Login'
import Register from './components/Register'
import Otp from './components/Otp'
function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      children: [
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/otp",
          element: <Otp />
        }
      ]
    }
  ])

  return (
    <div className="">
      <RouterProvider router={router}>

      </RouterProvider>
    </div>
  )
}

export default App