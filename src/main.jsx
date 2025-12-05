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
        path:"/homes",
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
      }
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
