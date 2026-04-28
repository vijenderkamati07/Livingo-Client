import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./leaflet-fix.js";
import './index.css'
import Home from './UI/User/Home.jsx'
import Layout from './Layout/MainLayout.jsx'
import HomeDetail from './UI/User/HomeDetail.jsx'
import Favourite from './UI/User/Favourite.jsx'
import Bookings from './UI/User/Bookings.jsx'
import HomeList from './UI/User/HomeList.jsx'
import EditHome from './UI/Host/EditHome.jsx'
import Login from './UI/Auth/Login.jsx'
import Signup from './UI/Auth/Signup.jsx'
import HostHomeList from './UI/Host/HostHomeList.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext.jsx'
import { ToastContainer } from "react-toastify";
import LostPage from './UI/LostPage.jsx';
import Profile from './UI/User/Profile.jsx';
import HostDashboard from './UI/Host/HostDashboard.jsx';
import HostProfile from "./UI/Host/hostProfile.jsx"


const router=createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"/listed-homes",
        element:<HomeList/>
      },
      {
        path:"/favourite",
        element:<Favourite/>
      },
      {
        path:"/bookings",
        element:<Bookings/>
      },
      {
        path:"/home/:homeId",
        element:<HomeDetail/>
      },
      {
        path:"/host/add-home",
        element:<EditHome/>
      },
      {
        path: "/host/edit/:homeId",
        element: <EditHome />
      },
      {
        path: "/host/host-homes",
        element: <HostHomeList />
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/signup",
        element:<Signup/>
      },
      {
        path:"/user/profile",
        element:<Profile/>
      },
      {
        path:"/host/dashboard",
        element:<HostDashboard/>
      },
      {
        path:"/host/profile",
        element:<HostProfile/>
      },
      { 
        path: "*",
        element: <LostPage /> }
    ]
  }
]
)

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
