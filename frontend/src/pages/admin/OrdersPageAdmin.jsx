import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Paginator from '../../components/Paginator'
import toast from "react-hot-toast";

export default function OrdersPageAdmin() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const[popupVisible, setPopupVisible] = useState(false)
    const [clickOrder, setClickOrder] = useState(null)
    const [orderStatus, setOrderStatus] = useState("pending") //pending, completed, cancel
    const[orderNotes, setOrderNotes] = useState("")


    useEffect(()=>{
        if(loading){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/orders/"+page+"/"+limit,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            }).then((res)=>{
                setOrders(res.data.orders)
                setTotalPages(res.data.totalPages)
                setLoading(false)
                console.log(res.data)
            }).catch((err)=>{
                console.error(err)
            })
        }
    },[loading,page,limit])
  return (
    <div className='w-full flex flex-col justify-between'>
      <table className='w-full border-[3px]'>
        <thead>
            <tr>
                <th className='p-[10px]'>Order ID</th>
                <th className='p-[10px]'>Email</th>
                <th className='p-[10px]'>Name</th>
                <th className='p-[10px]'>Address</th>
                <th className='p-[10px]'>Phone</th>
                <th className='p-[10px]'>Status</th>
                <th className='p-[10px]'>Date</th>
                <th className='p-[10px]'>Total</th>
            </tr>
        </thead>
        <tbody>
            {
                orders.map((order)=>{
                    return(
                    <tr key={order.orderId} className='border-b-[1px] hover:bg-accent hover:text-white cursor-pointer' onClick={()=>{
                        setOrderStatus(order.status)
                        setOrderNotes(order.notes)
                        setClickOrder(order)
                        setPopupVisible(true)
                    }}>
                        <td className='p-[10px]'>{order.orderId}</td>
                        <td className='p-[10px]'>{order.email}</td>
                        <td className='p-[10px]'>{order.name}</td>
                        <td className='p-[10px]'>{order.address}</td>
                        <td className='p-[10px]'>{order.phone}</td>
                        <td className='p-[10px]'>{order.status}</td>
                        <td className='p-[10px]'>{new Date(order.date).toLocaleDateString()}</td>
                        <td className='p-[10px] text-end'>{order.total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    </tr>
                    )
                })
            }
            
        </tbody>

      </table>
<div className="space-y-4 mb-6 max-h-[250px] overflow-y-auto pr-2">
  {
  popupVisible && clickOrder && (
    <div className="fixed top-0 left-0 w-full h-full bg-[#00000080] flex justify-center items-center z-50">
      <div className="w-[650px] max-h-[90vh] bg-white rounded-xl shadow-lg relative p-6">

        {
            (orderStatus!==clickOrder.status || orderNotes!==clickOrder.notes)&&<button className='absolute w-[120px] h-[40px] top-2 right-2 bg-accent text-white rounded-lg cursor-pointer'
            onClick={async()=>{
                setPopupVisible(false)
                try{
                    await axios.put(import.meta.env.VITE_BACKEND_URL+"/api/orders/"+clickOrder.orderId,{
                        status:orderStatus,
                        notes:orderNotes
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
            )
            setClickOrder({
            ...clickOrder,
            status: orderStatus,
            notes: orderNotes
        });
            toast.success("order updated successfully")
            setLoading(true)

            // Update the orders array to reflect changes
        setOrders(orders.map(order =>
            order.orderId === clickOrder.orderId
                ? { ...order, status: orderStatus, notes: orderNotes }
                : order
        ));
                    
                }catch(err){
                    console.error(err)
                    toast.error("Failed to update order")
                }
            }}
            >Save Changes</button>
        }
        
        {/* Order Info */}
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Details</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <p><span className="font-semibold">Order ID:</span> {clickOrder.orderId}</p>
          <p>
            <span className="font-semibold">Status:</span>
            <span className={`ml-2 px-2 py-1 rounded-full text-sm 
              ${clickOrder.status === "pending" ? "bg-yellow-100 text-yellow-700" : 
                clickOrder.status === "completed" ? "bg-green-100 text-green-700" : 
                "bg-gray-100 text-gray-700"}`}>
              {orderStatus}
            </span>
            <select name="" id="" className='ml-4 p-1 border rounded' value={orderStatus} onChange={(e)=>{setOrderStatus(e.target.value)}}>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancel">Cancel</option>
            </select>
          </p>
          <p><span className="font-semibold">Date:</span> {new Date(clickOrder.date).toLocaleDateString()}</p>
          <p><span className="font-semibold">Notes:</span> {orderNotes}</p>
          <textarea name="" id="" className='w-full h-[50px] border rounded mt-2' value={orderNotes} onChange={(e)=>{setOrderNotes(e.target.value)}}></textarea>
        </div>

        {/* Customer Info */}
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Customer Information</h3>
        <div className="grid grid-cols-2 gap-4 mb-6 text-gray-600">
          <p><span className="font-semibold">Name:</span> {clickOrder.name}</p>
          <p><span className="font-semibold">Email:</span> {clickOrder.email}</p>
          <p><span className="font-semibold">Phone:</span> {clickOrder.phone}</p>
          <p><span className="font-semibold">Address:</span> {clickOrder.address}</p>
        </div>

        {/* Items List (scrollable) */}
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Items</h3>
        <div className="space-y-4 mb-6 max-h-[250px] overflow-y-auto pr-2">
          {clickOrder.items.map((item) => (
            <div key={item._id} className="flex items-center justify-between border p-3 rounded-lg shadow-sm hover:bg-gray-50">
              {/* Product Image + Name */}
              <div className="flex items-center gap-3">
                <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-md" />
                <div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                </div>
              </div>
              {/* Price */}
              <div className="text-right">
                <p className="text-gray-700">Rs. {item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                <p className="text-sm text-gray-500">Subtotal: Rs. {(item.price * item.qty).toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="text-right text-xl font-bold text-gray-800">
          Total: Rs. {clickOrder.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </div>

        {/* Close Button (outside popup) */}
        <button
          className="absolute -top-5 -right-5 w-10 h-10 bg-red-500 rounded-full text-white font-bold 
                     hover:bg-transparent hover:text-red-500 border-2 border-red-500 
                     flex items-center justify-center cursor-pointer"
          onClick={() => setPopupVisible(false)}
        >
          X
        </button>
      </div>
    </div>
  )
}

</div>

      <Paginator currentPage={page} setCurrentPage={setPage} totalPages={totalPages} setPage={setPage} limit={limit} setLimit={setLimit} setLoading={setLoading} />
    </div>
  )
}
