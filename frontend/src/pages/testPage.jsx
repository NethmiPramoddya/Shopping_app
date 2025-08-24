import { useState } from "react"

export default function TestPage(){
    const[count, setCount ]=useState(0)

    function increment(){
        setCount(count +1)
    }

    function decrement(){
        setCount(count -1)
    }
    return(
        <div className="w-full h-screen bg-amber-200 flex justify-center items-center">
            <div className="w-[400px] h-[400px] bg-white flex justify-center items-center flex-col">
                <div className="text-5xl font-bold">{count}</div>
                    <div className="flex gap-4">
                        <button onClick={decrement} className="bg-accent text-white text-3xl w-20 h-20 rounded-[25%] hover:bg-blue-800 transition">
                                -
                        </button>
                        <button onClick={increment} className="bg-accent text-white text-3xl w-20 h-20 rounded-[25%] hover:bg-blue-800 transition">
                                +
                        </button>
                    </div>
            </div>
        </div>
    )
}