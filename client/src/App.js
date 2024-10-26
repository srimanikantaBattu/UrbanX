import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './RootLayout'
import Login from './components/Login'
import Register from './components/Register'
import Otp from './components/Otp'
import Home from './components/Water/WaterHome'
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
        }
      ]
    }
  ])

  return (
    <IssuesProvider> {/* Wrap the application with IssuesProvider */}
      <Router>
        <div>
          {/* Render Navbar at the top */}
          <Navbar />

          {/* Wrap Route components inside Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/report" element={<Report />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/alexa' element={<Alexa />}></Route>
            <Route path='/video' element={<VideoCall />}></Route>
            <Route path='/image' element={<ImageToText />}></Route>
          </Routes>
        </div>
      </Router>
    </IssuesProvider>
  );
};

export default App


