import React, { useState } from 'react'

export default function ImageSlider1(props) {
    const images = props.images
    const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className='w-full max-w-md mx-auto'>
      {/* Main Image Container */}
      <div className='relative mb-6 group'>
        <div className='relative overflow-hidden rounded-2xl shadow-2xl'>
          <img 
            src={images[activeImageIndex]} 
            className='w-full h-64 md:h-80 object-cover transition-all duration-500 ease-in-out transform group-hover:scale-105'
            alt={`Product view ${activeImageIndex + 1}`}
          />
            {/* Elegant overlay gradient */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            
            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button 
                  onClick={() => setActiveImageIndex(activeImageIndex === 0 ? images.length - 1 : activeImageIndex - 1)}
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full p-2 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100'
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={() => setActiveImageIndex(activeImageIndex === images.length - 1 ? 0 : activeImageIndex + 1)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full p-2 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100'
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

          {/* Image counter */}
          <div className='absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium'>
            {activeImageIndex + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className='flex justify-center items-center gap-3 px-2'>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImageIndex(index)}
            className={`relative overflow-hidden rounded-xl transition-all duration-300 transform hover:scale-110 ${
              activeImageIndex === index 
                ? 'ring-3 ring-rose-400 ring-offset-2 ring-offset-white shadow-lg scale-110' 
                : 'ring-2 ring-gray-200 hover:ring-rose-200 shadow-md hover:shadow-lg'
            }`}
          >
            <img 
              src={image} 
              className={`w-16 h-16 md:w-20 md:h-20 object-cover transition-all duration-300 ${
                activeImageIndex === index 
                  ? 'brightness-100' 
                  : 'brightness-75 hover:brightness-90'
              }`}
              alt={`Thumbnail ${index + 1}`}
            />
            {/* Active indicator */}
            {activeImageIndex === index && (
              <div className='absolute inset-0 bg-gradient-to-t from-rose-500/20 via-transparent to-transparent'></div>
            )}
          </button>
        ))}
      </div>

      {/* Indicator dots for additional visual feedback */}
      <div className='flex justify-center items-center gap-2 mt-4'>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeImageIndex === index 
                ? 'bg-rose-400 w-6' 
                : 'bg-gray-300 hover:bg-rose-200'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
