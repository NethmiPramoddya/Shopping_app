import { useState } from "react";
import { Link } from "react-router-dom";

export default function AddProductAdminPage(){
    const[productId, setProductId] = useState("")
    const[name, setName] = useState("")
    const[altNames, setAltNames] = useState("")
    const[labelledPrice, setLabelledPrice] = useState("")
    const[price, setPrice] = useState("")
    const[image, setImage] = useState("")
    const[description, setDescription] = useState("")
    const[stock, setStock] = useState("")
    const[isAvailable, setIsAvailable] = useState(true)
    const[category, setCategory] = useState("Cream")

    function handleSubmit (){
        const altNamesInArray= altNames.split(",")
        const productData = {
            productId: productId,
            name: name,
            altNames: altNamesInArray,
            labelledPrice: labelledPrice,
            price: price,
            image: image,
            description: description,
            stock: stock,
            isAvailable: isAvailable,
            category: category
        }
        console.log(productData);
    }

    return(
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-[600px] border-[2px] rounded-[15px] p-[40px] flex flex-wrap justify-between">
                    <div className="w-[200px] flex flex-col gap-[5px]">
                        <label htmlFor="" className="text-sm font-semibold">Product Id</label>
                        <input type="text" value={productId} onChange={(e)=>setProductId(e.target.value)} className="w-full border-[1px] h-[40px] rounded-md" />
                    </div>

                    <div className="w-[300px] flex flex-col gap-[5px]">
                        <label htmlFor="" className="text-sm font-semibold">Product Name</label>
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="w-full border-[1px] h-[40px] rounded-md" />
                    </div>

                    <div className="w-[500px] flex flex-col gap-[5px]">
                        <label htmlFor="" className="text-sm font-semibold">Alternative Names</label>
                        <input type="text" value={altNames} onChange={(e)=>setAltNames(e.target.value)} className="w-full border-[1px] h-[40px] rounded-md" />
                    </div>

                    <div className="w-[200px] flex flex-col gap-[5px]">
                        <label htmlFor="" className="text-sm font-semibold">Labelled Price</label>
                        <input type="number" value={labelledPrice} onChange={(e)=>setLabelledPrice(e.target.value)} className="w-full border-[1px] h-[40px] rounded-md" />
                    </div>

                    <div className="w-[200px] flex flex-col gap-[5px]">
                        <label htmlFor="" className="text-sm font-semibold">Price</label>
                        <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} className="w-full border-[1px] h-[40px] rounded-md" />
                    </div>

                    <div className="w-[500px] flex flex-col gap-[5px]">
                        <label htmlFor="" className="text-sm font-semibold">Images</label>
                        <input type="text" value={image} onChange={(e)=>setImage(e.target.value)} className="w-full border-[1px] h-[40px] rounded-md" />
                    </div>

                    <div className="w-[500px] flex flex-col gap-[5px]">
                        <label htmlFor="" className="text-sm font-semibold">Description</label>
                        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className="w-full border-[1px] h-[100px] rounded-md"></textarea>
                    </div>

                    <div className="w-[200px] flex flex-col gap-[5px]">
                        <label htmlFor="" className="text-sm font-semibold">Stock</label>
                        <input type="number" value={stock} onChange={(e)=>setStock(e.target.value)} className="w-full border-[1px] h-[40px] rounded-md" />
                    </div>

                     <div className="w-[200px] flex flex-col gap-[5px]">
                        <label htmlFor="" className="text-sm font-semibold">Stock</label>
                        <select value={isAvailable} onChange={(e)=>setIsAvailable(e.target.value)} className="w-full border-[1px] h-[40px] rounded-md">
                            <option value={true}>Available</option>
                            <option value={false}> Not Available</option>
                        </select>
                    </div>

                    <div className="w-[200px] flex flex-col gap-[5px]">
                        <label htmlFor="" className="text-sm font-semibold">Stock</label>
                        <select value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full border-[1px] h-[40px] rounded-md">
                            <option value="Cream">Cream</option>
                            <option value="Face Wash">Face Wash</option>
                            <option value="Soap">Soap</option>
                            <option value="Fragrance">Fragrance</option>
                        </select>
                    </div>

                    <div className="w-full flex justify-center flex-row gap-5 py-[25px]">
                            <Link to="/admin/products" className="w-[200px] h-[50px] bg-white text-black border-[1px] rounded-md flex justify-center items-center">Cancel</Link>

                            <button onClick={handleSubmit} className="w-[200px] h-[50px] bg-black text-white rounded-md flex justify-center items-center">Add</button>
                    </div>

            </div>

        </div>
    )
}