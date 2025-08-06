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
            <div className='w-[49%] h-full flex flex-col justify-center items-start'>

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
