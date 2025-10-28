import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoCartOutline, IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdHome } from "react-icons/io";
import { IoStorefrontOutline, IoInformationCircleOutline, IoCallOutline, IoStarOutline } from "react-icons/io5";
import { getCart } from '../utils/cart';

export default function Header() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const token = localStorage.getItem("token")

  // Function to calculate total cart items
  const calculateCartCount = () => {
    const cart = getCart()
    const total = cart.reduce((sum, item) => sum + item.quantity, 0)
    setCartCount(total)
  }

  // Update cart count on component mount and when localStorage changes
  useEffect(() => {
    calculateCartCount()

    // Listen for storage changes (when cart is updated from other tabs/components)
    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        calculateCartCount()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    // Also listen for custom cart update events
    const handleCartUpdate = () => {
      calculateCartCount()
    }

    window.addEventListener('cartUpdated', handleCartUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('cartUpdated', handleCartUpdate)
    }
  }, [])
  
  return (
    <header className='w-full h-20 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 shadow-lg border-b border-gray-700 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between'>
        
        {/* Logo */}
        <div className='flex items-center'>
          <img 
            src="/glamor-high-resolution-logo-transparent.png" 
            onClick={() => navigate("/")} 
            alt="Glamore Logo" 
            className='h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity duration-300' 
          />
        </div>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center space-x-8'>
          <Link 
            to="/" 
            className='text-gray-200 hover:text-rose-400 font-medium transition-colors duration-300 relative group'
          >
            Home
            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-400 to-pink-400 group-hover:w-full transition-all duration-300'></span>
          </Link>
          <Link 
            to='/products' 
            className='text-gray-200 hover:text-rose-400 font-medium transition-colors duration-300 relative group'
          >
            Products
            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-400 to-pink-400 group-hover:w-full transition-all duration-300'></span>
          </Link>
          <Link 
            to='/reviews' 
            className='text-gray-200 hover:text-rose-400 font-medium transition-colors duration-300 relative group'
          >
            Reviews
            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-400 to-pink-400 group-hover:w-full transition-all duration-300'></span>
          </Link>
          <Link 
            to='/about-us' 
            className='text-gray-200 hover:text-rose-400 font-medium transition-colors duration-300 relative group'
          >
            About Us
            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-400 to-pink-400 group-hover:w-full transition-all duration-300'></span>
          </Link>
          <Link 
            to='/contact' 
            className='text-gray-200 hover:text-rose-400 font-medium transition-colors duration-300 relative group'
          >
            Contact
            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-400 to-pink-400 group-hover:w-full transition-all duration-300'></span>
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className='flex items-center space-x-4'>
          {/* Cart */}
          <Link 
            to='/cart' 
            className='relative p-2 text-gray-300 hover:text-rose-400 transition-colors duration-300 group'
          >
            <IoCartOutline className='h-6 w-6' />
            {cartCount > 0 && (
              <span className='absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center transition-all duration-300 shadow-lg animate-pulse'>
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>

          {/* Auth Button */}
          {token ? (
            <button 
              onClick={() => {
                localStorage.removeItem("token")
                navigate("/login")
              }} 
              className='hidden md:block px-4 py-2 text-sm font-medium text-gray-300 hover:text-rose-400 transition-colors duration-300'
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/login" 
              className='hidden md:block px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-medium rounded-full hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105'
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className='md:hidden p-2 text-gray-300 hover:text-rose-400 transition-colors duration-300'
          >
            <RxHamburgerMenu className='h-6 w-6' />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className='fixed inset-0 z-50 md:hidden'>
          <div className='fixed inset-0 bg-black bg-opacity-50' onClick={() => setIsOpen(false)} />
          <div className='fixed right-0 top-0 h-full w-80 bg-gradient-to-b from-slate-800 to-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-gray-700'>
            {/* Mobile Menu Header */}
            <div className='flex items-center justify-between p-6 border-b border-gray-700'>
              <img 
                src="/glamor-high-resolution-logo-transparent.png" 
                alt="Glamore Logo" 
                className='h-8 w-auto' 
              />
              <button
                onClick={() => setIsOpen(false)}
                className='p-2 text-gray-400 hover:text-white transition-colors duration-300'
              >
                <IoClose className='h-6 w-6' />
              </button>
            </div>

            {/* Mobile Menu Items */}
            <nav className='px-6 py-8 space-y-6'>
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className='flex items-center text-gray-300 hover:text-rose-400 font-medium transition-colors duration-300'
              >
                <IoMdHome className='h-5 w-5 mr-3' />
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setIsOpen(false)}
                className='flex items-center text-gray-300 hover:text-rose-400 font-medium transition-colors duration-300'
              >
                <IoStorefrontOutline className='h-5 w-5 mr-3' />
                Products
              </Link>
              <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                className='flex items-center justify-between text-gray-300 hover:text-rose-400 font-medium transition-colors duration-300'
              >
                <div className='flex items-center'>
                  <IoCartOutline className='h-5 w-5 mr-3' />
                  Cart
                </div>
                {cartCount > 0 && (
                  <span className='h-5 w-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg'>
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>
              <Link
                to="/reviews"
                onClick={() => setIsOpen(false)}
                className='flex items-center text-gray-300 hover:text-rose-400 font-medium transition-colors duration-300'
              >
                <IoStarOutline className='h-5 w-5 mr-3' />
                Reviews
              </Link>
              <Link
                to="/about-us"
                onClick={() => setIsOpen(false)}
                className='flex items-center text-gray-300 hover:text-rose-400 font-medium transition-colors duration-300'
              >
                <IoInformationCircleOutline className='h-5 w-5 mr-3' />
                About Us
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className='flex items-center text-gray-300 hover:text-rose-400 font-medium transition-colors duration-300'
              >
                <IoCallOutline className='h-5 w-5 mr-3' />
                Contact
              </Link>

              {/* Mobile Auth */}
              <div className='pt-6 border-t border-gray-700'>
                {token ? (
                  <button 
                    onClick={() => {
                      localStorage.removeItem("token")
                      navigate("/login")
                      setIsOpen(false)
                    }} 
                    className='w-full px-4 py-3 text-left text-gray-300 hover:text-rose-400 font-medium transition-colors duration-300'
                  >
                    Logout
                  </button>
                ) : (
                  <Link 
                    to="/login" 
                    onClick={() => setIsOpen(false)}
                    className='block w-full px-4 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-center font-medium rounded-full hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg'
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
