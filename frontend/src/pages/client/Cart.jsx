import React, { useState, useEffect } from 'react'
import { addToCart, getCart, getTotal } from '../../utils/cart'
import { FaTrashAlt, FaMinus, FaPlus, FaShoppingBag, FaHeart } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { formatLkrPrice } from '../../utils/currency';

export default function Cart() {
    const [cart, setCart] = useState(() => {
        try {
            return getCart()
        } catch (error) {
            console.error("Error loading cart:", error)
            return []
        }
    })

    const navigate = useNavigate()

    // Listen for cart updates and refresh the cart state
    useEffect(() => {
        const handleCartUpdate = () => {
            setCart(getCart())
        }

        window.addEventListener('cartUpdated', handleCartUpdate)

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate)
        }
    }, [])
    
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50">
      {/* Header Section */}
      <section className="py-16 px-6 bg-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-10 right-10 opacity-10">
          <HiSparkles className="text-rose-400 text-8xl" />
        </div>
        <div className="absolute bottom-10 left-10 opacity-10">
          <HiSparkles className="text-pink-400 text-6xl" />
        </div>

        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-6 py-2 mb-6 bg-rose-50 rounded-full border border-rose-200">
            <FaShoppingBag className="text-rose-500 mr-2" />
            <span className="text-rose-700 text-sm font-medium tracking-wider uppercase">Shopping Cart</span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-wide">
            Your Glamore' Cart
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            {cart.length === 0 ? 'Your cart is waiting for some luxury' : `${cart.length} beautiful item${cart.length !== 1 ? 's' : ''} ready for checkout`}
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaShoppingBag className="text-rose-400 text-3xl" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Discover our luxurious collection of premium cosmetics and start your beauty journey.
              </p>
              <button 
                onClick={() => navigate('/products')}
                className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white font-semibold px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-gray-600"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cart.map((item) => (
                  <div key={item.productId} className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-md">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                          />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="font-serif text-xl md:text-2xl font-bold text-gray-800 mb-2">
                          {item.name}
                        </h3>
                        <p className="text-lg text-gray-600 mb-4">
                          {formatLkrPrice(item.price)} each
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                          <button 
                            onClick={() => addToCart(item, -1)}
                            className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gradient-to-br hover:from-rose-100 hover:to-pink-100 hover:text-rose-600 transition-all duration-300 shadow-md hover:shadow-lg"
                          >
                            <FaMinus className="text-sm" />
                          </button>
                          
                          <div className="px-4 py-2 bg-gradient-to-r from-rose-50 to-pink-50 rounded-full border border-rose-200">
                            <span className="font-semibold text-gray-800">Qty: {item.quantity}</span>
                          </div>
                          
                          <button 
                            onClick={() => addToCart(item, 1)}
                            className="w-10 h-10 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center text-rose-600 hover:bg-gradient-to-br hover:from-rose-200 hover:to-pink-200 transition-all duration-300 shadow-md hover:shadow-lg"
                          >
                            <FaPlus className="text-sm" />
                          </button>
                        </div>
                      </div>

                      {/* Price and Remove */}
                      <div className="text-center md:text-right">
                        <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text mb-4">
                          {formatLkrPrice(item.quantity * item.price)}
                        </div>
                        
                        <button 
                          onClick={() => addToCart(item, -item.quantity)}
                          className="w-12 h-12 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center text-red-500 hover:bg-gradient-to-br hover:from-red-100 hover:to-red-200 hover:text-red-600 transition-all duration-300 shadow-md hover:shadow-lg group"
                        >
                          <FaTrashAlt className="text-sm group-hover:scale-110 transition-transform duration-200" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50 sticky top-24">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-rose-50 to-pink-50 rounded-full border border-rose-200 mb-4">
                      <HiSparkles className="text-rose-500 mr-2" />
                      <span className="text-rose-700 text-sm font-medium uppercase tracking-wider">Order Summary</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center text-gray-600">
                      <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                      <span>{formatLkrPrice(getTotal())}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                      <span>Shipping</span>
                      <span className="text-green-600 font-semibold">Free</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-800">Total</span>
                        <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text">
                          {formatLkrPrice(getTotal())}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button 
                      onClick={() => navigate('/checkout', {state:{items:cart}})}
                      className="w-full bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white font-semibold py-4 rounded-full hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-gray-600 flex items-center justify-center gap-2"
                    >
                      <FaShoppingBag className="text-lg" />
                      Proceed to Checkout
                    </button>
                    
                    <button 
                      onClick={() => navigate('/products')}
                      className="w-full border-2 border-rose-300 text-rose-600 font-semibold py-4 rounded-full hover:bg-rose-50 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FaHeart className="text-lg" />
                      Continue Shopping
                    </button>
                  </div>

                  {/* Luxury Features */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full"></div>
                        <span>Free shipping on all orders</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full"></div>
                        <span>30-day return guarantee</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full"></div>
                        <span>Luxury gift wrapping included</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
