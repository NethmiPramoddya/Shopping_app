import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoCartOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdHome } from "react-icons/io";
import { IoStorefrontOutline } from "react-icons/io5";

export default function Header() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const token = localStorage.getItem("token")
  return (
    <header className='w-full h-[100px] bg-accent flex justify-center items-center relative'>
      {
        isOpen && 
            <div className='fixed z-[100] top-0 right-0 w-[100vw] h-[100vh] bg-[#00000050]'>
              <div className='w-[350px] h-full bg-white flex flex-col'>
                <div className='w-full h-[100px] bg-accent flex pl-[45px] flex-row items-center gap-[20px]'>
                  <RxHamburgerMenu  className='md:hidden text-white text-4xl' onClick={()=>{setIsOpen(false)}}/>
                  <img src="/glamor-high-resolution-logo-transparent.png" onClick={()=>{navigate("/")}} alt="logo" className='w-32 h-auto object-cover cursor-pointer' />
                </div>

                <div className=' w-full h-full flex flex-col p-[45px] items-start'>
                  <button className='text-accent text-2xl flex flex-row items-center' onClick={()=>{setIsOpen(false)
                    navigate("/")
                  }}>
                    <IoMdHome className='text-accent text-2xl mr-2'/>
                    Home
                  </button>

                  <button className='text-accent text-2xl flex flex-row items-center' onClick={()=>{setIsOpen(false)
                    navigate("/products")
                  }}>
                    <IoStorefrontOutline className='text-accent text-2xl mr-2'/>
                    Products
                  </button>

                  <button className='text-accent text-2xl flex flex-row items-center' onClick={()=>{setIsOpen(false)
                    navigate("/cart")
                  }}>
                    <IoCartOutline className='text-accent text-2xl mr-2'/>
                    Cart
                  </button>

                  <button className='text-accent text-2xl flex flex-row items-center' onClick={()=>{setIsOpen(false)
                    navigate("/")
                  }}>
                    <IoStorefrontOutline className='text-accent text-2xl mr-2'/>
                    Products
                  </button>

                  <button className='text-accent text-2xl flex flex-row items-center' onClick={()=>{setIsOpen(false)
                    navigate("/")
                  }}>
                    <IoStorefrontOutline className='text-accent text-2xl mr-2'/>
                    Products
                  </button>


                </div>
              </div>
            </div>
      }
      <img src="/glamor-high-resolution-logo-transparent.png" onClick={()=>{navigate("/")}} alt="logo" className='w-32 h-auto object-cover absolute md:left-[40px] cursor-pointer' />
      <RxHamburgerMenu  className='md:hidden text-white absolute left-[20px] text-4xl' onClick={()=>{setIsOpen(true)}}/>
    <div className=' hidden w-full md:flex items-baseline-last justify-center'>
        <Link to="/" className='text-white text-xl ml-4 '>Home</Link>
        <Link to='/products' className='text-white text-xl ml-4 '>Products</Link>
        <Link to='/reviews' className='text-white text-xl ml-4 '>Reviews</Link>
        <Link to='/about-us' className='text-white text-xl ml-4 '>About Us</Link>
        <Link to='/contact' className='text-white text-xl ml-4 '>Contact Us</Link>
        <Link to='/cart' className='absolute right-[250px]'><IoCartOutline className='text-white text-3xl ml-4' /></Link>

        {
          token!==null && <button onClick={()=>{
            localStorage.removeItem("token")
            navigate("/login")
          }} className='absolute right-[80px] text-white px-4  text-xl ml-4 cursor-pointer'>Logout</button>
        }

      </div>
    </header>
  )
}
