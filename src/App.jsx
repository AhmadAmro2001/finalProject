
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import LayOut from './components/LayOut/LayOut'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import NotFound from './components/NotFound/NotFound'
import Categories from './components/Categories/Categories'
import Cart from './components/Cart/Cart'
import Brands from './components/Brands/Brands'
import CounterContextProvider from './Context/CounterContext'
import UserTokenContextProvider from './Context/UserTokenContext'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Product from './components/Product/Product'
import  { Toaster } from 'react-hot-toast';
import CheckOut from './components/CheckOut/CheckOut'
import Order from './components/Order/Order'
import { useContext, useEffect } from 'react'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import VerifyPassword from './components/VerifyPassword/VerifyPassword'
import UpdatePassword from './components/UpdatePassword/UpdatePassword'
import WishList from './components/wishList/wishList'
import WishListContextProvider from './Context/WishListContext'
import { CartContext } from './Context/CartContext'
import ProtectedRoutesAuth from './components/ProtectedRoutesAuth/ProtectedRoutesAuth'


function App() {

  let{getCart ,setCartItemNo} = useContext(CartContext)
useEffect(()=>{
  getCartInfo()
},[])

  async function getCartInfo() {
    let cartItems = await getCart()
    console.log(cartItems)
    if(cartItems){
        setCartItemNo(cartItems.numOfCartItems)
        
    }
    
}


  let query = new QueryClient()

  let routers = createBrowserRouter([{
    path: "", element: <LayOut />, children: [
      { index: true, element: <Register /> },
      { path: "home", element: <ProtectedRoutes><Home /></ProtectedRoutes> },
      { path: "login", element: <ProtectedRoutesAuth><Login /></ProtectedRoutesAuth> },
      { path: "register", element: <ProtectedRoutesAuth><Register /></ProtectedRoutesAuth> },
      { path: "forget", element: <ProtectedRoutesAuth><ForgetPassword /></ProtectedRoutesAuth> },
      { path: "verify", element: <ProtectedRoutesAuth><VerifyPassword /></ProtectedRoutesAuth> },
      { path: "update", element: <ProtectedRoutesAuth><UpdatePassword /></ProtectedRoutesAuth> },
      { path: "categories", element: <ProtectedRoutes><Categories /></ProtectedRoutes> },
      { path: "cart", element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
      { path: "wishList", element: <ProtectedRoutes><WishList /></ProtectedRoutes> },
      { path: "product", element: <ProtectedRoutes><Product /></ProtectedRoutes> },
      { path: "brands", element: <ProtectedRoutes><Brands /></ProtectedRoutes> },
      { path: "checkout/:cartId", element: <ProtectedRoutes><CheckOut /></ProtectedRoutes> },
      { path: "allorders", element: <ProtectedRoutes><Order /></ProtectedRoutes> },
      { path: "productDetails/:id/:categoryId", element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes> },
      { path: "productDetails/:id", element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes> },
      { path: "*", element: <NotFound /> },
    ]
  }])

  return (
    <>
      <QueryClientProvider client={query}>

        <UserTokenContextProvider>
          <CounterContextProvider>
            <WishListContextProvider>
              < RouterProvider router={routers}></RouterProvider>
            </WishListContextProvider>
              
            
            <Toaster />
          </CounterContextProvider>
        </UserTokenContextProvider>

      </QueryClientProvider>



    </>
  )
}

export default App
