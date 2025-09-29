import { Link,Routes, Route } from "react-router-dom";
import { FaBoxArchive } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";
import { IoPeople } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import ProductsAdminPage from "./admin/productsAdminPage";
import AddProductAdminPage from "./admin/addProductAdminPage";
import UpdateProductPage from "./admin/updateProductPage";
import OrdersPageAdmin from "./admin/OrdersPageAdmin";
import Loader from "../components/loader";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminPage() {
  const Navigate = useNavigate()
  const[adminValidated, setAdminValidated] = useState(false)

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token==null){
      toast.error("Please login first")
      Navigate("/login")
      return;
    }else{
      axios.get(import.meta.env.VITE_BACKEND_URL+"/api/users/",{
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response)=>{
        if(response.data.role=="admin"){
          setAdminValidated(true)
        }else{
          toast.error("You are not authorized")
          Navigate("/login")
        }
      }).catch((error)=>{
        toast.error("Something went wrong")
        Navigate("/login")
        console.log(error)
      })
    }
  },[])


  return (
    <div className="w-full h-screen flex">
      {adminValidated?<>
        <div className="w-[300px] h-full bg-white flex flex-col items-center">
          <span className="text-3xl font-bold my-5">Admin Panel</span>
              <Link className="flex flex-row h-[60px] w-full border p-[20px] items-center text-xl gap-[25px]" to="/admin/products"><FaBoxArchive />Products</Link>
              <Link className="flex flex-row h-[60px] w-full border p-[20px] items-center text-xl gap-[25px]" to="/admin/orders"><GiShoppingBag />Orders</Link>
              <Link className="flex flex-row h-[60px] w-full border p-[20px] items-center text-xl gap-[25px]" to="/admin/users"><IoPeople />Users</Link>
              <Link className="flex flex-row h-[60px] w-full border p-[20px] items-center text-xl gap-[25px]" to="/admin/settings"><IoSettingsSharp />Settings</Link>

        </div>
        <div className="w-[calc(100%-300px)] bg-white">
          <Routes path="/*">
          <Route path = "/" element={<h1>Dashboard</h1>}/>
          <Route path = "/products" element={<ProductsAdminPage/>}/>
          <Route path = "/newProduct" element={<AddProductAdminPage/>}/>
          <Route path = "/orders" element={<OrdersPageAdmin/>}/>
          <Route path = "/updateProduct" element={<UpdateProductPage/>}/>
          </Routes>
        </div>
      </>:<Loader />}
    </div>
  )
}
