import React from 'react'
import { Link } from 'react-router-dom';

export default function OriginalProductcard1(props) {
    const product = props.product
  return (
    <Link 
      to={"/overview/"+product.productId} 
      className='group w-[260px] h-[400px] flex flex-col bg-white shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden shrink-0 transition-all duration-300 ease-in-out transform hover:scale-[1.02] cursor-pointer'
    >
      {/* Product Image */}
      <div className='relative w-full h-[240px] overflow-hidden rounded-t-2xl bg-gray-50'>
        <img 
          src={product.image[0]}  
          alt={product.name}
          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out'
        />
        
        {/* Discount Badge */}
        {product.labelledPrice > product.price && (
          <div className='absolute top-3 right-3 bg-rose-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md'>
            SALE
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className='flex flex-col p-4 h-[160px] justify-between'>
        <div className='space-y-2'>
          {/* Category */}
          <span className='text-xs font-medium text-gray-500 uppercase tracking-wider'>
            {product.category}
          </span>
          
          {/* Product Name */}
          <h3 className='text-lg font-semibold text-gray-800 leading-tight line-clamp-2 group-hover:text-rose-600 transition-colors duration-300'>
            {product.name}
          </h3>
        </div>

        {/* Price Section */}
        <div className='flex items-center gap-2 mt-3'>
          {product.labelledPrice > product.price ? (
            <div className='flex items-center gap-2'>
              <span className='text-lg font-bold text-gray-900'>
                Rs.{product.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </span>
              <span className='text-sm text-gray-400 line-through'>
                Rs.{product.labelledPrice.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </span>
            </div>
          ) : (
            <span className='text-lg font-bold text-gray-900'>
              ${product.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </span>
          )}
        </div>

      </div>
    </Link>
  )
}
