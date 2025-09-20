import axios from 'axios';
import React, { useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/loader';
import ImageSlider from '../../components/ImageSlider';
import { addToCart, getCart } from '../../utils/cart';
import toast, { Toaster } from 'react-hot-toast';

export default function ProductOverviewPage() {
    const params = useParams();
    const[product, setProduct] =useState(null);
    const[status, setStatus] = useState("loading"); // loading, success, error
    const navigate = useNavigate();

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
    <div className='w-full h-full flex justify-center items-center p-4'>
      {
        status === "loading" && <Loader/>
      }
      {
        status === "success" && product && (
          <div className='w-full max-w-6xl h-full flex flex-col md:flex-row md:gap-12 lg:gap-20'>
            <h1 className='text-2xl font-bold my-4 text-center md:hidden'>
              {product.name} <span className='font-light'>{product.altNames.join(" | ")}</span>
            </h1>
            <div className='w-full md:w-1/2 h-full mt-20 flex flex-col justify-center items-center'>
              <ImageSlider images={product.image}/>
            </div>
            <div className='w-full md:w-1/2 h-full flex flex-col md:pt-10 lg:pt-20 items-center gap-6 px-2'>
              <h1 className='text-2xl font-bold hidden md:block text-center'>
                {product.name} <span className='font-light'>{product.altNames.join(" | ")}</span>
              </h1>
              <p className='text-base md:text-lg p-2 text-center md:text-left'>{product.description}</p>
              <div className='w-full flex flex-col items-center mt-4'>
                {
                  product.labelledPrice > product.price ? 
                  <div className='flex flex-wrap justify-center items-center gap-3'> 
                    <span className='text-xl md:text-2xl font-semibold text-red-500 line-through'>
                      {product.labelledPrice.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </span>
                    <span className='text-2xl md:text-3xl font-bold text-green-500'>
                      {product.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </span>
                  </div> : 
                  <div> 
                    <span className='text-2xl md:text-3xl font-bold text-green-500'>
                      {product.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </span>
                  </div>
                }
              </div>

              <div className='w-full flex flex-col sm:flex-row mt-6 justify-center items-center gap-4'>
                <button className='w-full sm:w-[200px] h-[50px] cursor-pointer rounded-xl shadow-zxl text-white bg-blue-800 border-[3px] border-blue-900 hover:bg-white hover:text-blue-900' onClick={
                  ()=>{
                    navigate('/checkout', { state: { items: [
                      { productId: product.productId,
                        quantity: 1,
                        name: product.name,
                        image: product.image[0],
                        price: product.price
                      }
                    ] } })
                  }
                }>Buy Now</button>
                <button className='w-full sm:w-[200px] h-[50px] cursor-pointer rounded-xl shadow-zxl text-white bg-accent border-[3px] border-accent hover:bg-white hover:text-accent' onClick={
                  ()=>
                  {
                    addToCart(product,1)
                    toast.success("Product added to the cart")
                    console.log(getCart())
                    
                  }}>Add to Cart</button>
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
