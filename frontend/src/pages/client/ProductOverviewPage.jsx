import axios from 'axios';
import React, { useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../../components/loader';
import ImageSlider from '../../components/ImageSlider';

export default function ProductOverviewPage() {
    const params = useParams();
    const[product, setProduct] =useState(null);
    const[status, setStatus] = useState("loading"); // loading, success, error

    // Fetch product details using params.productId
    useEffect(
        () => {
        if(status === "loading") {
            axios.get(import.meta.env.VITE_BACKEND_URL+`/api/products/${params.productId}`)
            .then((res) => {
                setProduct(res.data);
                setStatus("success");
            }).catch((error) => {
                console.error("Error fetching product:", error);
                setStatus("error");
            });
        }
    },[status])
  return (
    <div className='w-full h-full flex justify-center items-center'>
      {
        status === "loading" && <Loader/>
      }
      {
        status === "success" && product && (
          <div className='w-full h-full flex flex-row'>
            <div className='w-[49%] h-full flex flex-col justify-center items-center'>
                    <ImageSlider images={product.image}/>
            </div>
            <div className='w-[49%] h-full flex flex-col items-center pt-[70px]'>
              <h1 className='text-2xl font-bold'>{product.name} <span className='font-light'>{product.altNames.join(" | ")}</span></h1>
              <p className='text-lg mt-[20px]'>{product.description}</p>
              <div className='w-full flex flex-col items-center mt-[20px]'>
                {
                  product.labelledPrice > product.price ? 
                  <div> <span className='text-2xl font-semibold text-red-500 line-through mr-[20px]'>{product.labelledPrice.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                  <span className='text-2xl font-bold text-green-500'>{product.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                  </div> : 
                  <div> <span className='text-3xl font-bold text-green-500'>{product.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></div>
                }
              </div>

              <div className='w-full flex flex-row mt-[20px] justify-center items-center gap-[10px]'>
                <button className='w-[200px] h-[50px] cursor-pointer rounded-xl shadow-zxl text-white bg-blue-800 border-[3px] border-blue-900 hover:bg-white hover:text-blue-900'>Buy Now</button>
                <button className='w-[200px] h-[50px] cursor-pointer rounded-xl shadow-zxl text-white bg-blue-500 border-[3px] border-blue-600 hover:bg-white hover:text-blue-600'>Add to Cart</button>
              </div>

            </div>
          </div>
        )
      }
      {
        status === "error" && <div className='text-red-500'>Error loading product details</div>
      }
    </div>
  )
}
