import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ProductCard from './components/productCard'
import SuperProduct from './components/superProduct'
import Homepage from './pages/homepage'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import AdminPage from './pages/adminPage'
import TestPage from './pages/testPage'
import { Toaster } from 'react-hot-toast';
import Test2Page from './pages/test2Page'
import Test3 from './pages/test3'
import ClientPage from './pages/client/clientPage'
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  
  return (
    <>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className='w-full h-screen flex justify-center items-center bg-primary text-secondary'>
        <Toaster position='top-right' />
        <Routes path ="/">
        
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/test' element={<TestPage/>}/>
        <Route path='/test2' element={<Test2Page/>}/>
        <Route path='/test3' element={<Test3/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/admin/*' element={<AdminPage/>}/>
        <Route path='/*' element={<ClientPage/>}/>
        {/* <ProductCard 
            name="Samsung galaxy S24 Ultra"
            price="$1900"
            image ="https://picsum.photos/id/3/200/300"/>
        <ProductCard
            name="Apple MacBook Pro 16 inch"
            price="$2500"
            image ="https://picsum.photos/id/1/200/300"/> */}
            </Routes>
      </div>
         </GoogleOAuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
