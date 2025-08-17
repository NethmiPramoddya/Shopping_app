import React, { useState } from 'react'
import { addToCart, getCart, getTotal } from '../../utils/cart'
import { FaTrashAlt } from "react-icons/fa";

export default function Cart() {
    const [cart, setCart] = useState(() => {
        try {
            return getCart()
        } catch (error) {
            console.error("Error loading cart:", error)
            return []
        }
    })
    
  return (
    <div className='w-full h-screen flex flex-col py-[40px] items-center'>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        cart.map(
            (item)=>{
                return(
                    <div key={item.productId} className='w-[800px] h-[100px] m-[10px] flex flex-row shadow-2xl relative items-center'>
                        <img src={item.image} className='w-[100px] h-[100px] object-cover' />
                        <div className="w-[320px] h-full flex flex-col justify-center pl-[10px]">
                            <h3 className="font-bold">{item.name}</h3>
                            <p className=" font-semibold text-gray-600">{item.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                        </div>
                        <div className="w-[190px] h-full flex flex-row justify-center items-center">
                            <button className='flex justify-center items-center w-[30px] text-white rounded-xl bg-blue-600 cursor-pointer hover:bg-blue-700' onClick={() => {
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
                            <button className='flex justify-center items-center w-[30px] text-white rounded-xl bg-blue-600 cursor-pointer hover:bg-blue-700' onClick={()=>{
                                addToCart(item, 1)
                                setCart(getCart())
                            }}>+</button>
                        </div>
                        <div className="w-[190px] h-full flex justify-end items-center pr-[10px]">
                            <span className=" font-semibold text-gray-600">{(item.quantity*item.price).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                        </div>
                        <div className='w-[30px] h-[30px] absolute right-[-40px] flex items-center justify-center bg-red-700 text-white rounded-full border-[2px] border-red-700 hover:bg-white hover:text-red-700 cursor-pointer' onClick={()=>{
                            addToCart(item, -item.quantity)
                            setCart(getCart())
                        }}><FaTrashAlt /></div>
                    </div>
                )
            }
        )
      )}
      <div className='w-[800px] h-[100px] m-[10px] p-[10px] flex flex-row shadow-2xl items-center justify-end'>
         <span className=" font-semibold text-2xl">Total:{getTotal().toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
      </div>
    </div>
    

    
  )
}
