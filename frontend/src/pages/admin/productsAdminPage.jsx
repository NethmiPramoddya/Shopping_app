import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import toast from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import Loader from "../../components/loader";

// const sampleProducts = [
//   {
//     productId: "0010",
//     name: "Rose Petal Face Mist",
//     altNames: ["Floral Toner", "Hydrating Mist"],
//     labelledPrice: 2500,
//     price: 1990,
//     image: ["/products/face-mist.jpg"],
//     description: "Hydrating face mist with real rose petal extract for refreshed, glowing skin.",
//     stock: 50,
//     isAvailable: true,
//     category: "cosmetics"
//   },
//   {
//     productId: "0011",
//     name: "Matte Lipstick - Crimson Red",
//     altNames: ["Lip Color", "Red Lipstick"],
//     labelledPrice: 1800,
//     price: 1500,
//     image: ["/products/lipstick-red.jpg"],
//     description: "Long-lasting matte lipstick with intense pigmentation and a smooth finish.",
//     stock: 30,
//     isAvailable: true,
//     category: "cosmetics"
//   },
//   {
//     productId: "0012",
//     name: "Charcoal Detox Face Mask",
//     altNames: ["Blackhead Remover", "Charcoal Mask"],
//     labelledPrice: 2200,
//     price: 1790,
//     image: ["/products/charcoal-mask.jpg"],
//     description: "Purifying charcoal mask to deeply cleanse pores and remove impurities.",
//     stock: 40,
//     isAvailable: true,
//     category: "cosmetics"
//   },
//   {
//     productId: "0013",
//     name: "Aloe Vera Gel",
//     altNames: ["Soothing Gel", "After Sun Care"],
//     labelledPrice: 1200,
//     price: 990,
//     image: ["/products/aloe-vera.jpg"],
//     description: "100% pure aloe vera gel for soothing skin hydration and repair.",
//     stock: 60,
//     isAvailable: true,
//     category: "cosmetics"
//   },
//   {
//     productId: "0014",
//     name: "Volumizing Mascara",
//     altNames: ["Eyelash Enhancer", "Bold Lash Mascara"],
//     labelledPrice: 2000,
//     price: 1700,
//     image: ["/products/mascara.jpg"],
//     description: "Waterproof volumizing mascara for thick, full lashes with all-day wear.",
//     stock: 45,
//     isAvailable: true,
//     category: "cosmetics"
//   }
// ];

export default function ProductsAdminPage(){
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //const [a, setA] = useState(0);

    // backend data rerieval
    //setProducts();

    useEffect(() =>{
        if(isLoading){
        axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products")
        .then((res) => {
            console.log(res.data);
            setProducts(res.data);
            setIsLoading(false)
        })
        .catch((err) => {
            console.error("Error fetching products:", err);
        });
    }
    }, [isLoading]);

    const navigate = useNavigate();

    return(
        <div className="w-full border-[3px]">
            {isLoading?(<Loader/>):(<table>
                <thead>
                    <tr>
                        <th className="p-[10px]">Images</th>
                        <th className="p-[10px]">Product ID</th>
                        <th className="p-[10px]">Name</th>
                        <th className="p-[10px]">Price</th>
                        <th className="p-[10px]">Labelled price</th>
                        <th className="p-[10px]">Category</th>
                        <th className="p-[10px]">Stock</th>
                        <th className="p-[10px]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                  
                    {
                        products.map((product,index) => {
                            return(
                                <tr key={index}>
                                <td className="p-[10px]">
                                    <img src={product.image[0]} alt={product.name} className="w-[50px] h-[50px] object-cover"/>
                                </td>
                                <td className="p-[10px]">{product.productId}</td>
                                <td className="p-[10px]">{product.name}</td>
                                <td className="p-[10px]">{product.price}</td>
                                <td className="p-[10px]">{product.labelledPrice}</td>
                                <td className="p-[10px]">{product.category}</td>
                                <td className="p-[10px]">{product.stock}</td>
                                <td className="p-[10px] flex justify-center items-center mt-2.5 gap-1.5">
                                    <button><FaRegTrashCan className="text-white bg-red-500 rounded-full text-3xl p-2 cursor-pointer" onClick={
                                        () =>{
                                            const token = localStorage.getItem("token");
                                            if(token == null){
                                                navigate("/login");
                                                return;
                                            }

                                            axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/products/"+product.productId,{
                                                headers: {
                                                    Authorization: `Bearer ${token}`
                                                }
                                            })
                                            .then((res) => {
                                                console.log("Product deleted");
                                                console.log( res.data);
                                                toast.success("Product deleted successfully");
                                                setIsLoading(!isLoading)
                                                
                                            })
                                            .catch((err) => {
                                                console.error("Error deleting product:", err);
                                                toast.error("Error deleting product");
                                            });
                                        }
                                    }  /></button>
                                    <button><MdEdit onClick={()=>navigate("/admin/updateProduct",{
                                        state:product
                                    })} className="text-white bg-accent rounded-full text-3xl p-2 cursor-pointer"/></button>
                                </td>
                                </tr>
                            )
                        })
                    }
                 
                </tbody>
            </table>)}
            <Link to="/admin/newProduct" className="fixed right-[60px] bottom-[60px] p-[20px] rounded-full text-white bg-black">
                <FaPlus className="text-3xl"/>
            </Link>
        </div>
    )
}