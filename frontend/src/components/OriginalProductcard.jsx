import React from 'react'
import { Link } from 'react-router-dom';

export default function OriginalProductcard(props) {
    const product = props.product
  return (
    <Link to={"/overview/"+product.productId} className='w-[300px] h-[400px] flex flex-col shadow-2xl rounded-2xl overflow-hidden shrink-0'>
        <img src={product.image[0]}  className='w-full h-[250px] object-cover'/>
        <div className='w-full h-[150px] flex flex-col p-[5px]'>
            <span className='text-gray-500 test-[12px]'>{product.productId}</span>
            <h1 className='text-lg font-bold'>{product.name} {" "}
                <span className='text-gray-500 test-[14px]'>{product.category}</span>
            </h1>
            <div>{product.labelledPrice> product.price?
             <p>
              <span className='line-through mr-[10px]'>{product.labelledPrice}</span>
              <span>{product.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
             </p>:
             <span>{product.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>}</div>
        </div>
      
    </Link>
  )
}
