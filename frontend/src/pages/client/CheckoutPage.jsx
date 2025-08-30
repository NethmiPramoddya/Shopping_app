import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios'

export default function CheckoutPage() {
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
          console.log(user)
        }
      ).catch(
        (err) => {
          console.error(err)
          toast.error("failed to fetch user")
          navigate("/login")
        }
      )
    }
  }, [])

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

  async function placeOrder() {
    const token = localStorage.getItem('token');
    if (token == null) {
      toast.error("Plaease loging to place an order")
      navigate('/login');
      return;
    }

    if (name == "" || address == "" || phone == "") {
      toast.error("pls fill all the feilds")
      return;
    }

    const order = {
      address: address,
      phone: phone,
      items: []
    }

    cart.forEach((item) => {
      order.items.push({
        productId: item.productId,
        qty: item.quantity
      })
    })

    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders", order, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast.success("Order placed successfully")

    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("failed to place order")
      return;
    }

  }

  return (
    <div className='w-full h-screen flex flex-col py-[40px] p-[10px] items-center'>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        cart.map(
          (item, index) => {
            return (
              <div key={item.productId} className='w-full max-w-[100vw] md:w-[800px] h-[200px] md:h-[100px] m-[10px] flex flex-row shadow-2xl relative items-center'>
                <div className='md:w-[100px] w-[200px] justify-center items-center flex flex-col'>
                  <img src={item.image} className='w-[100px] h-[100px] object-cover' />
                  <div className="h-full flex-col justify-center md:hidden flex">
                    <span className="font-bold text-center md:text-left">{item.name}</span>
                    <span className=" font-semibold text-gray-600 text-center md:text-left">{item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <div className="w-[320px] h-full flex-col justify-center hidden md:flex md:pl-10">
                  <span className="font-bold text-center md:text-left">{item.name}</span>
                  <span className=" font-semibold text-gray-600 text-center md:text-left">{item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>

                <div className="w-[190px] h-full text-4xl md:text-md flex flex-row justify-center items-center pl-10 pr-[10px]">
                  <button className='flex justify-center items-center w-[30px] text-white rounded-xl bg-accent cursor-pointer hover:bg-blue-600' onClick={() => {
                    const newCart = [...cart]
                    newCart[index].quantity -= 1;
                    if (newCart[index].quantity <= 0) {
                      newCart.splice(index, 1)
                    }
                    setCart(newCart)
                  }}>-</button>
                  <span className="text-sm mx-[10px] text-gray-500">Quantity: {item.quantity}</span>
                  <button className='flex justify-center items-center w-[30px] text-white rounded-xl bg-accent cursor-pointer hover:bg-blue-600' onClick={() => {
                    const newCart = [...cart]
                    newCart[index].quantity += 1;
                    setCart(newCart)
                  }}>+</button>
                </div>

                <div className="w-[190px] h-full text-2xl md:text-md flex justify-end items-center pr-[10px]">
                  <span className=" font-semibold text-gray-600">{(item.quantity * item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>

                <div className='w-[30px] h-[30px] absolute top-[0px] right-[0px] md:top-[35px] md:right-[-40px] flex items-center justify-center bg-red-700 text-white rounded-full border-[2px] border-red-700 hover:bg-white hover:text-red-700 cursor-pointer ml-2' onClick={() => {
                  const newCart = [...cart]
                  newCart.splice(index, 1)
                  setCart(newCart)
                }}><FaTrashAlt /></div>
              </div>
            )
          }
        )
      )}

      <div className='w-full md:w-[800px] h-[100px] m-[10px] p-[10px] flex flex-row shadow-2xl items-center justify-end relative'>
        <span className=" font-semibold text-2xl">Total:{getTotal().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        <button className='absolute left-[10px] w-[150px] h-[50px] bg-accent cursor-pointer rounded-xl text-white border-[2px] hover:bg-white hover:text-accent' onClick={placeOrder}>Place Order</button>
      </div>

      <div className='w-full md:w-[800px] h-auto m-[10px] p-[10px] flex flex-col md:flex-row shadow-2xl items-center justify-center gap-2 relative'>
        <input type="text" className='w-full md:w-[200px] h-[40px] border border-gray-300 rounded-lg p-[10px]' onChange={(e) => { setName(e.target.value) }} value={name} placeholder='Enter your name' />

        <input type="text" className='w-full md:w-[200px] h-[40px] border border-gray-300 rounded-lg p-[10px]' onChange={(e) => { setAddress(e.target.value) }} value={address} placeholder='Enter your address' />

        <input type="text" className='w-full md:w-[200px] h-[40px] border border-gray-300 rounded-lg p-[10px]' onChange={(e) => { setPhone(e.target.value) }} value={phone} placeholder='Enter your phone number' />
      </div>
    </div>
  )
}
