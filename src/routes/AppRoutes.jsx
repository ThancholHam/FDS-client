//rafce

import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import History from '../pages/History'
import CheackOut from '../pages/CheackOut'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Layout from '../layouts/Layout'
import LayoutAdmin from '../layouts/LayoutAdmin'
import Dashboard from '../pages/admin/Dashboard'
import Category from '../pages/admin/Category'
import Product from '../pages/admin/Product'
import Manage from '../pages/admin/Manage'
import LayoutUser from '../layouts/LayoutUser'
import HomeUser from '../pages/user/HomeUser'
import ProtectRouteUser from './ProtectRouteUser'
import ProtectRouteAdmin from './ProtectRouteAdmin'
import EditProduct from '../pages/admin/EditProduct'
import Payment from '../pages/user/Payment'
import EditProfile from '../pages/EditProfile'
import PaidSuccess from '../components/PaidSuccess'


const router = createBrowserRouter([

  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'shop', element: <Shop /> },
      { path: 'cart', element: <Cart /> },
      { path: 'history', element: <History /> },
      { path: 'checkout', element: <CheackOut /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'editprofile', element: <EditProfile /> },
    ]
  },
  {
    path: '/admin',
    element: <ProtectRouteAdmin eLement={<LayoutAdmin />}  />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'category', element: <Category /> },
      { path: 'product', element: <Product /> },
      { path: 'product/:id', element: <EditProduct /> },
      { path: 'manage', element: <Manage /> },
    ]
  },
  {
    path: '/user',
    // element: <LayoutUser />,
    element: <ProtectRouteUser eLement={<LayoutUser />} />,
    children: [
      { index: true, element: <HomeUser /> },
      { path: 'payment', element: <Payment /> },
      { path: 'paymentcomplete', element: <PaidSuccess /> },

    ]
  }

])

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default AppRoutes