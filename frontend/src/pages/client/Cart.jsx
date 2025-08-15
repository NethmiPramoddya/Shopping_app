import React, { useState } from 'react'
import { getCart } from '../../utils/cart'

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
                    <div key={item.productId} className='w-[800px] h-[100px] m-[10px] flex flex-row shadow-2xl items-center'>
                        <img src={item.image} className='w-[100px] h-[100px] object-cover' />
                        <div className="w-[320px] h-full flex flex-col justify-center pl-[10px]">
                            <h3 className="font-bold">{item.name}</h3>
                            <p className=" font-semibold text-gray-600">{item.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                        </div>
                        <div className="w-[190px] h-full flex flex-row justify-center items-center">
                            <button className='flex justify-center items-center w-[30px] text-white rounded-xl bg-blue-600 cursor-pointer hover:bg-blue-700'>-</button>
                            <span className="text-sm mx-[10px] text-gray-500">Quantity: {item.quantity}</span>
                            <button className='flex justify-center items-center w-[30px] text-white rounded-xl bg-blue-600 cursor-pointer hover:bg-blue-700'>+</button>
                        </div>
                        <div className="w-[190px] h-full">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-gray-600">${item.price}</p>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                    </div>
                )
            }
        )
      )}
    </div>
  )
}
