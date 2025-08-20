import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function OrdersPageAdmin() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        if(loading){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/orders",{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            }).then((res)=>{
                setOrders(res.data)
                setLoading(false)
                console.log(res.data)
            }).catch((err)=>{
                console.error(err)
            })
        }
    },[loading])
  return (
    <div className='w-full h-full flex'>
      <table className='w-full h-full border-[3px]'>
        <thead>
            <tr>
                <td className='p-[10px]'>Order ID</td>
                <td className='p-[10px]'>Email</td>
                <td className='p-[10px]'>Name</td>
                <td className='p-[10px]'>Address</td>
                <td className='p-[10px]'>Phone</td>
                <td className='p-[10px]'>Status</td>
                <td className='p-[10px]'>Date</td>
                <td className='p-[10px]'>Total</td>
            </tr>
        </thead>
        <tbody>
            {
                orders.map((order,index)=>{
                    <tr key={order.orderId}>
                        <td className='p-[10px]'>{order.orderId}</td>
                        <td className='p-[10px]'>{order.email}</td>
                        <td className='p-[10px]'>{order.name}</td>
                        <td className='p-[10px]'>{order.address}</td>
                        <td className='p-[10px]'>{order.phone}</td>
                        <td className='p-[10px]'>{order.status}</td>
                        <td className='p-[10px]'>{new Date(order.date).toLocaleDateString}</td>
                        <td className='p-[10px]'>{order.total}</td>
                    </tr>
                })
            }
            
        </tbody>

      </table>
    </div>
  )
}
