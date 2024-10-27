import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './RootLayout'
import Login from './components/Login'
import Register from './components/Register'
import VideoCall from './components/health/VideoCall'
import Otp from './components/Otp'
import ImageToText from './components/health/ImageToText'
import Home from './components/Water/WaterHome'
import Landing from './components/Water/Landing'
import Issues from './components/Water/Issues'
import Report from './components/Water/Report'
import Profile from './components/Water/Profile'
import HospitalPage from './components/health/HospitalPage'
import Homehealth from './components/health/Home'

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
        },
        {
          path: "/homewater",
          element: <Home />
        },
        {
          path:"/issues",
          element:<Issues/>
        },
        {
          path:"/report",
          element:<Report/>
        },
        {
          path:"/profile",
          element:<Profile/>
        },
        {
          path:"/health/hospitalpage",
          element:<HospitalPage/>
        },{
          path:"/healthhome",
          element:<Homehealth/>
        },{
          path:"/video",
          element:<VideoCall/>
        },{
          path:"/landing",
          element:<Landing/>
        },{
          path:"/imagetotext",
          element:<ImageToText/>
        }
      ]
    }
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App


