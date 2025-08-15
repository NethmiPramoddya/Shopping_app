import React from 'react'
import { Link } from 'react-router-dom'
import { IoCartOutline } from "react-icons/io5";

export default function Header() {
  return (
    <header>
    <div className='w-full h-[100px] bg-blue-500 flex justify-center items-center relative'>
        <Link to="/" className='text-white text-xl ml-4 '>Home</Link>
        <Link to='/products' className='text-white text-xl ml-4 '>Products</Link>
        <Link to='/reviews' className='text-white text-xl ml-4 '>Reviews</Link>
        <Link to='/about-us' className='text-white text-xl ml-4 '>About Us</Link>
        <Link to='/contact' className='text-white text-xl ml-4 '>Contact Us</Link>
        <Link to='/cart' className='absolute right-[80px]'><IoCartOutline className='text-white text-3xl ml-4' /></Link>

      </div>
    </header>
  )
}
