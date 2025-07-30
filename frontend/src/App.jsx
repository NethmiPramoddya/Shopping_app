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

function App() {
  

  return (
    <>
    <BrowserRouter>
      <div className='w-full h-screen'>
        <Toaster position='top-right' />
        <Routes path ="/">
        <Route path='/' element={<Homepage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/test' element={<TestPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/admin/*' element={<AdminPage/>}/>
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
      </BrowserRouter>
    </>
  )
}

export default App
