import React from 'react'

export default function Paginator(props) {
    const {currentPage,setCurrentPage, totalPages, setPage, limit, setLimit, setLoading}=props;//props is a json and what in here done is deconstructing the props json
  return (
    <div className='w-full h-[50px] flex flex-row justify-center items-center gap-[20px]'>
        <select name="" id="" className='w-[100px] h-[40px] border border-gray-300 rounded-md p-[10px]' value={currentPage} onChange={(e)=>{
            setLoading(true)
            setCurrentPage(parseInt(e.target.value))}}>
            {
                Array.from({length: totalPages}, (_, i) => (
                    <option key={i} value={i + 1}>page{i + 1}</option>
                ))
            }
        </select>

        <select name="" id="" className='w-[100px] h-[40px] border border-gray-300 rounded-md p-[10px]' value={limit} onChange={(e)=>{
            setLoading(true)
            setLimit(parseInt(e.target.value))}}>
            {
                [5, 10, 20, 50].map((limitOption) => (
                    <option key={limitOption} value={limitOption}>{limitOption}</option>
                ))
            }
        </select>

        <span className='text-gray-500'>page {currentPage} of {totalPages}</span>

    </div>
  )
}
