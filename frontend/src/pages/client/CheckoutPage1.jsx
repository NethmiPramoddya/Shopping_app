import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios'
import { formatLkrPrice } from '../../utils/currency'

export default function CheckoutPage1() {
  const location = useLocation()
  const navigate = useNavigate()
  const [cart, setCart] = useState(location.state?.items || [])

  const [user, setUser] = useState(null)
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")


  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token == null) {
      toast.error("Please login to checkout")
      navigate('/login')
      return
    } else {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }).then(
        (res) => {
          setUser(res.data)
          setName(res.data.firstName + " " + res.data.lastName)
          console.log(res.data)
        }
      ).catch(
        (err) => {
          console.error(err)
          toast.error("failed to fetch user")
          navigate("/login")
        }
      )
    }
  }, [navigate])

  if (location.state?.items == null) {
    toast.error("pls select items to checkout")
    navigate('/products')
  }

  function getTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity * item.price
    })
    return total;
  }

  function proceedToPayment() {
    console.log("Proceeding to payment...");
    // Validate customer information
    if (!name || !address || !phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Prepare order data for payment (NO ORDER CREATION YET)
    const orderData = {
      items: cart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        productId: item.productId
      })),
      total: getTotal(),
      customerInfo: {
        name: name,
        email: user?.email || '',
        phone: phone,
        address: address
      }
    };

    // Store pending order data
    localStorage.setItem('pendingOrder', JSON.stringify(orderData));

    // Navigate to payment page (Order will be created AFTER successful payment)
    console.log("Navigating to /payment with orderData:", orderData);
    navigate('/payment', { state: { orderData } });
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50 py-12 px-6'>
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4">Checkout</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4">Complete your luxurious shopping experience</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="xl:col-span-2">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/50">
              <h2 className="font-serif text-2xl font-bold text-gray-800 mb-6">Your Items</h2>
              
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🛍️</div>
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <p className="text-gray-400">Add some beautiful products to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={item.productId} className='bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 relative'>
                      <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img 
                            src={item.image} 
                            className='w-20 h-20 object-cover rounded-xl shadow-md' 
                            alt={item.name}
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-grow text-center md:text-left">
                          <h3 className="font-serif text-lg font-bold text-gray-800 mb-1">{item.name}</h3>
                          <p className="text-rose-600 font-semibold">
                            {formatLkrPrice(item.price)}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button 
                            className='w-8 h-8 flex justify-center items-center text-white rounded-full bg-gradient-to-r from-slate-900 to-gray-900 hover:from-slate-800 hover:to-gray-800 transition-all duration-300 shadow-md'
                            onClick={() => {
                              const newCart = [...cart]
                              newCart[index].quantity -= 1;
                              if (newCart[index].quantity <= 0) {
                                newCart.splice(index, 1)
                              }
                              setCart(newCart)
                            }}
                          >
                            -
                          </button>
                          <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium min-w-[80px] text-center">
                            Qty: {item.quantity}
                          </span>
                          <button 
                            className='w-8 h-8 flex justify-center items-center text-white rounded-full bg-gradient-to-r from-slate-900 to-gray-900 hover:from-slate-800 hover:to-gray-800 transition-all duration-300 shadow-md'
                            onClick={() => {
                              const newCart = [...cart]
                              newCart[index].quantity += 1;
                              setCart(newCart)
                            }}
                          >
                            +
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-center md:text-right">
                          <p className="font-serif text-xl font-bold text-gray-800">
                            {formatLkrPrice(item.quantity * item.price)}
                          </p>
                        </div>

                        {/* Delete Button */}
                        <button 
                          className='absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-red-100 hover:bg-red-500 text-red-500 hover:text-white rounded-full transition-all duration-300 shadow-sm hover:shadow-md'
                          onClick={() => {
                            const newCart = [...cart]
                            newCart.splice(index, 1)
                            setCart(newCart)
                          }}
                        >
                          <FaTrashAlt className="text-sm" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="xl:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/50 sticky top-8">
              <h2 className="font-serif text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              {/* Order Total */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatLkrPrice(getTotal())}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between items-center py-3 text-xl font-bold bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl px-4">
                  <span className="text-gray-800">Total</span>
                  <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                    {formatLkrPrice(getTotal())}
                  </span>
                </div>
              </div>

              {/* Shipping Information Form */}
              <div className="space-y-4 mb-8">
                <h3 className="font-serif text-lg font-bold text-gray-800 mb-4">Shipping Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      className='w-full h-12 border-2 border-gray-200 focus:border-rose-300 rounded-xl px-4 text-gray-700 placeholder-gray-400 bg-white/80 backdrop-blur-sm transition-colors duration-300'
                      onChange={(e) => { setName(e.target.value) }} 
                      value={name} 
                      placeholder='Enter your full name' 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                    <input 
                      type="text" 
                      className='w-full h-12 border-2 border-gray-200 focus:border-rose-300 rounded-xl px-4 text-gray-700 placeholder-gray-400 bg-white/80 backdrop-blur-sm transition-colors duration-300'
                      onChange={(e) => { setAddress(e.target.value) }} 
                      value={address} 
                      placeholder='Enter your delivery address' 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input 
                      type="text" 
                      className='w-full h-12 border-2 border-gray-200 focus:border-rose-300 rounded-xl px-4 text-gray-700 placeholder-gray-400 bg-white/80 backdrop-blur-sm transition-colors duration-300'
                      onChange={(e) => { setPhone(e.target.value) }} 
                      value={phone} 
                      placeholder='Enter your phone number' 
                    />
                  </div>
                </div>
              </div>

              {/* Proceed to Payment Button */}
              <button 
                className="w-full font-semibold py-4 px-8 rounded-full hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white border border-gray-700 hover:border-gray-600"
                onClick={proceedToPayment}
              >
                💳 Proceed to Payment
              </button>

              {/* Security Badge */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
