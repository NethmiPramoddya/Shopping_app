import React, { useState } from 'react'
import { FaTrashAlt } from "react-icons/fa";
import {useLocation, useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios'

export default function CheckoutPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const [cart, setCart] = useState(location.state?.items || [])

    if(location.state?.items==null){
        toast.error("pls select items to checkout")
        navigate('/products')
    }

     function getTotal(){
        let total =0;
        cart.forEach((item)=>{
            total+=item.quantity*item.price
        })
        return total;
    }

    async function placeOrder(){
        const token = localStorage.getItem('token');
        if(token == null){
            toast.error("Plaease loging to place an order")
            navigate('/login');
            return;
        }

        const order ={
            address: "df",
            phone:"df",
            items:[]
        }

        cart.forEach((item)=>{
            order.items.push({
            productId:item.productId,
            qty:item.quantity   // <-- quantity should always map to qty
        })
        })

        try{
            await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/orders", order, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success("Order placed successfully")

        }catch(error){
            console.error("Error placing order:", error);
            toast.error("failed to place order")
            return;
        }

    }
    
  return (
    <div className='w-full h-screen flex flex-col py-[40px] items-center'>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        cart.map(
            (item,index)=>{
                return(
                    <div key={item.productId} className='w-[800px] h-[100px] m-[10px] flex flex-row shadow-2xl relative items-center'>
                        <img src={item.image} className='w-[100px] h-[100px] object-cover' />
                        <div className="w-[320px] h-full flex flex-col justify-center pl-[10px]">
                            <h3 className="font-bold">{item.name}</h3>
                            <p className=" font-semibold text-gray-600">{item.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                        </div>
                        <div className="w-[190px] h-full flex flex-row justify-center items-center">
                            <button className='flex justify-center items-center w-[30px] text-white rounded-xl bg-blue-600 cursor-pointer hover:bg-blue-700' onClick={()=>{
                                const newCart = [...cart] // cart array copy
                                newCart[index].quantity-= 1;
                                if(newCart[index].quantity<=0){
                                    newCart.splice(index, 1)
                                }
                                setCart(newCart)
                            }}>-</button>
                            <span className="text-sm mx-[10px] text-gray-500">Quantity: {item.quantity}</span>
                            <button className='flex justify-center items-center w-[30px] text-white rounded-xl bg-blue-600 cursor-pointer hover:bg-blue-700' onClick={()=>{
                                const newCart = [...cart] // cart array copy
                                newCart[index].quantity+= 1;
                                setCart(newCart)

                                //json copy
                                //const student = {name:'John', age:20}
                                //const studentCopy = {...student}
                            }}>+</button>
                        </div>
                        <div className="w-[190px] h-full flex justify-end items-center pr-[10px]">
                            <span className=" font-semibold text-gray-600">{(item.quantity*item.price).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                        </div>
                        <div className='w-[30px] h-[30px] absolute right-[-40px] flex items-center justify-center bg-red-700 text-white rounded-full border-[2px] border-red-700 hover:bg-white hover:text-red-700 cursor-pointer' onClick={()=>{
                            const newCart = [...cart] // cart array copy     
                                newCart.splice(index, 1)
                                setCart(newCart)
                        }}><FaTrashAlt /></div>
                    </div>
                )
            }
        )
      )}
      <div className='w-[800px] h-[100px] m-[10px] p-[10px] flex flex-row shadow-2xl items-center justify-end relative'>
         <span className=" font-semibold text-2xl">Total:{getTotal().toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
         <button className='absolute left-[10px] w-[150px] h-[50px] bg-blue-500 cursor-pointer rounded-xl text-white border-[2px] hover:bg-white hover:text-blue-500' onClick={placeOrder}>Place Order</button>
      </div>
    </div>
    

    
  )
}
