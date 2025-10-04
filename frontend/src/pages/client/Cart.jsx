import React, { useState } from 'react'
import { addToCart, getCart, getTotal } from '../../utils/cart'
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

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
    
  return (
    <div className='w-full h-screen flex flex-col py-[40px] p-[10px] items-center'>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        cart.map(
            (item)=>{
                return(
                    <div key={item.productId} className=' w-full max-w-[100vw] md:w-[800px] h-[200px] md:h-[100px] m-[10px] flex flex-row shadow-2xl relative items-center'>
                        <div className='md:w-[100px] w-[200px] justify-center items-center flex flex-col '>
                        <img src={item.image} className='w-[100px] h-[100px] object-cover' />
                        <div className="h-full flex-col justify-center md:hidden flex">
                            <span className="font-bold text-center md:text-left">{item.name}</span>
                            <span className=" font-semibold text-gray-600 text-center md:text-left">{item.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                        </div>
                        </div>
                        <div className="w-[320px] h-full flex-col justify-center hidden md:flex md:pl-10">
                            <span className="font-bold text-center md:text-left">{item.name}</span>
                            <span className=" font-semibold text-gray-600 text-center md:text-left">{item.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                        </div>
                        <div className="w-[190px] h-full flex flex-row text-4xl md:text-md justify-center items-center pl-10 pr-[10px]">
                            <button className='flex justify-center p-3 w-[20px] h-[30px] items-center text-white rounded-xl bg-accent cursor-pointer hover:bg-blue-600' onClick={() => {
                                let updatedCart;
                                if (item.quantity > 1) {
                                    updatedCart = addToCart(item, -1);
                                } else {
                                    // Remove item from cart if quantity is 1 or less
                                    updatedCart = addToCart(item, -item.quantity);
                                }
                                setCart(updatedCart || getCart());
                            }}>-</button>
                            <span className="text-sm mx-[10px] text-gray-500">Quantity: {item.quantity}</span>
                            <button className='flex justify-center items-center p-3 w-[20px] h-[30px] text-white rounded-xl bg-accent cursor-pointer hover:bg-blue-600' onClick={()=>{
                                addToCart(item, 1)
                                setCart(getCart())
                            }}>+</button>
                        </div>
                        <div className="w-[190px] h-full text-2xl md:text-md flex justify-end items-center pr-[10px]">
                            <span className=" font-semibold text-gray-600">{(item.quantity*item.price).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                        </div>
                        <div className='w-[30px] h-[30px] absolute top-[0px] right-[0px] md:top-[35px] md:right-[-40px] flex items-center justify-center bg-red-700 text-white rounded-full border-[2px] border-red-700 hover:bg-white hover:text-red-700 cursor-pointer ml-2' onClick={()=>{
                            addToCart(item, -item.quantity)
                            setCart(getCart())
                        }}><FaTrashAlt /></div>
                    </div>
                )
            }
        )
      )}
      <div className='w-full md:w-[800px] h-[100px] m-[10px] p-[10px] flex flex-row shadow-2xl items-center justify-end relative'>
         <span className=" font-semibold text-2xl">Total:{getTotal().toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
         <button className='absolute left-[10px] w-[150px] h-[50px] bg-accent cursor-pointer rounded-xl text-white border-[2px] hover:bg-white hover:text-accent' onClick={()=>{navigate('/checkout', {state:{items:cart}})}}>Checkout</button>
      </div>
    </div>
    

    
  )
}
