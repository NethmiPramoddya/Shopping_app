import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios";
import Loader from '../../components/loader';
import OriginalProductcard from '../../components/OriginalProductcard';
import OriginalProductcard1 from '../../components/OriginalProductcard1';
import { HiSearch } from 'react-icons/hi';

export default function ProductsPage1() {
    const [products, setProducts]= useState([]);
    const [loading, setLoading] = useState(true);
    const[query, setQuery] = useState("")

    useEffect(()=>{
        if(loading){
            if(query== ""){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then(
                (res)=>{
                setProducts(res.data)
                setLoading(false)
                }
            )
         }else{
             axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products/search/"+query).then(
                (res)=>{
                setProducts(res.data)
                setLoading(false)
                }
            )
         }
            
        }
    },[loading, query])

    
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header Section */}
      <div className='bg-gray-50 border-b border-gray-100'>
        <div className='max-w-7xl mx-auto px-8 py-8'>
          {/* Page Title */}
          <div className='text-center mb-8'>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-2'>
              Our Products
            </h1>
            <p className='text-gray-600 text-lg'>
              Discover our premium collection of beauty essentials
            </p>
          </div>

          {/* Search Bar */}
          <div className='flex justify-center'>
            <div className='relative w-full max-w-md'>
              <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                <HiSearch className='h-5 w-5 text-gray-400' />
              </div>
              <input 
                type="text" 
                placeholder='Search products...'
                value={query}
                onChange={(e)=>{
                  setQuery(e.target.value)
                  setLoading(true)
                }}
                className='w-full pl-11 pr-4 py-3 border border-gray-200 rounded-full shadow-sm focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all duration-300 ease-in-out bg-white text-gray-900 placeholder-gray-500'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className='max-w-7xl mx-auto px-12 py-12'>
        {loading ? (
          <div className='flex justify-center items-center py-20'>
            <Loader />
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className='mb-8'>
              <p className='text-gray-600 text-center'>
                {products.length === 0 ? 
                  'No products found' : 
                  `Showing ${products.length} product${products.length !== 1 ? 's' : ''}`
                }
              </p>
            </div>

            {/* Products Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 justify-items-center mx-12">
                {products.map((product) => (
                  <OriginalProductcard1 key={product.productId} product={product} />
                ))}
              </div>
            ) : (
              <div className='text-center py-20'>
                <div className='text-gray-400 text-6xl mb-4'>🔍</div>
                <h3 className='text-xl font-medium text-gray-800 mb-2'>No products found</h3>
                <p className='text-gray-600'>Try searching with different keywords</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
