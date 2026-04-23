import { useState } from 'react'
import './App.css'
import Home from './components/Home/Home'
import { createBrowserRouter, createHashRouter, RouterProvider, useLocation } from 'react-router'
import Layout from './components/Layout/Layout'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import NotFound from './components/NotFound/NotFound'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import ResetPassword from './components/ResetPassword/ResetPassword'
import VerifyResetCode from './components/VerifyResetCode/VerifyResetCode'
import UserContextProvider from './Context/UesrContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProtectedRoutePassword from './components/ProtectedRoutePassword/ProtectedRoutePassword'
import Products from './components/Products/Products'
import Product from './components/Product/Product'
import BrandDe from './components/BrandDe/BrandDe'
import Category from './components/Category/Category'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import NetworkMonitor from './components/NetworkMonitor/NetworkMonitor'
import CheckOut from './components/CheckOut/CheckOut'
import AllOrders from './components/AllOrders/AllOrders'


function App() {
  const query = new QueryClient({
    defaultOptions: {
      queries: {
        // 1. وقت "صلاحية" البيانات (Stale Time)
        // بدل ما كل شوية يعمل fetch، خليه يحفظ الداتا 5 دقائق طول ما اليوزر بيتنقل
        staleTime: 5000,

        // 2. عدد محاولات إعادة الطلب عند الفشل (Retry)
        // الافتراضي 3، وده كتير وبيطول اللودينج لو النت مقطوع. خليه 1 أو 2 بس.
        retry: 2,

        // 3. تحديث البيانات عند العودة للتبويب (Window Focus)
        // مهمة جداً في الـ E-commerce عشان لو السعر اتغير واليوزر كان فاتح تبويب تاني
        refetchOnWindowFocus: true,

        // 4. تحديث البيانات عند رجوع النت (Reconnect)
        // زي ما ناقشنا، خليها true وعالج الصور بالـ State زي ما وضحنا فوق
        refetchOnReconnect: 'always',

        // 5. مسح الكاش القديم (GC Time / Cache Time)
        // البيانات اللي اليوزر مش بيستخدمها، تتمسح من الذاكرة بعد 10 دقائق مثلاً
        gcTime: 10 * 60 * 1000,
      },
    },
  })
  let router = createHashRouter([
    {
      path: '', element: <Layout />, errorElement:
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-red-600">عذراً، حدث خطأ في السيرفر</h2>
          <p className="text-gray-500">جاري المحاولة مرة أخرى أو تأكد من اتصال الإنترنت</p>
          <button onClick={() => window.location.reload()} className="btn bg-green-500 text-white mt-4">
            تحديث الصفحة
          </button>
        </div>, children: [
          { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
          // { path: '/:pageNums', element: <ProtectedRoute><Home /></ProtectedRoute> },
          { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
          { path: '/cart/checkout', element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
          { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
          { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
          { path: 'login', element: <ProtectedRoutePassword><Login /></ProtectedRoutePassword> },
          { path: 'signup', element: <ProtectedRoutePassword><Signup /></ProtectedRoutePassword> },
          { path: 'forgotpassword', element: <ProtectedRoutePassword><ForgotPassword /></ProtectedRoutePassword> },
          { path: 'resetpassword', element: <ProtectedRoutePassword><ResetPassword /></ProtectedRoutePassword> },
          { path: 'verifyresetcode', element: <ProtectedRoutePassword><VerifyResetCode /></ProtectedRoutePassword> },
          { path: 'product/:id', element: <ProtectedRoute><Product /></ProtectedRoute> },
          { path: 'products/:pageNum', element: <ProtectedRoute><Products /></ProtectedRoute>, errorElement: <NotFound /> },
          { path: 'brandproducts/:name', element: <ProtectedRoute><BrandDe /></ProtectedRoute> },
          { path: 'category/:name', element: <ProtectedRoute><Category /></ProtectedRoute> },
          { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
          { path: '*', element: <NotFound /> }
        ]
    }
  ])

  return (
    <>
      <QueryClientProvider client={query}>
        <NetworkMonitor />
        < CartContextProvider>
          <UserContextProvider>
            <ReactQueryDevtools />
            <RouterProvider router={router}></RouterProvider>
            <Toaster />
          </UserContextProvider>
        </CartContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
