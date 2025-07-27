import ProductCard from "./productCard";

export default function SuperProduct(){
    return(
    <div>
        <h1>Featured this week!!!</h1>
        <ProductCard
            name="Samsung galaxy S24 Ultra"
            price="$1900"
            image ="https://picsum.photos/id/3/200/300"
        />
    </div>
    )
}