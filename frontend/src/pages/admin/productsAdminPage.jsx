import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function ProductsAdminPage(){
    return(
        <div className="w-full h-full border-[3px]">
            <Link to="/admin/newProduct" className="fixed right-[60px] bottom-[60px] p-[20px] rounded-full text-white bg-black">
                <FaPlus className="text-3xl"/>
            </Link>
        </div>
    )
}