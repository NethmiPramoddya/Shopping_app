/*let cart = [
    {
        productId : '12345',
        quantity : 2,
        price : 1000,
        name : 'sample product',
        altNames : ['sample item', 'example product'],
        Image : 'sample-image.jpg'

    },

    {
        productId : '67890',
        quantity : 1,
        price : 500,
        name : 'another product',
        altNames : ['another item', 'different product'],
        Image : 'another-image.jpg'

    },

    {
        productId : '67890',
        quantity : 1,
        price : 500,
        name : 'another product',
        altNames : ['another item', 'different product'],
        Image : 'another-image.jpg'
    },

    {
        productId : '67890',
        quantity : 1,
        price : 500,
        name : 'another product',
        altNames : ['another item', 'different product'],
        Image : 'another-image.jpg'
    },

    {
        productId : '67890',
        quantity : 1,
        price : 500,
        name : 'another product',
        altNames : ['another item', 'different product'],
        Image : 'another-image.jpg'
    },

]
    let id = "67890"
    const index = cart.findIndex(
    (item)=>{
        retun item.productId == id
        }
    )
        console.log("index") //output is 4
*/
export function getCart(){
    let cartInString = localStorage.getItem("cart")

    if(cartInString == null || cartInString.trim() === ""){
        cartInString = "[]";
        localStorage.setItem("cart", cartInString) //string
    }
    
    try {
        const cart = JSON.parse(cartInString) // turning string into a json
        return cart;
    } catch (error) {
        console.error("Error parsing cart from localStorage:", error)
        // If JSON is corrupted, reset to empty cart
        localStorage.setItem("cart", "[]")
        return []
    }
}

export function addToCart(product, qty){

    const cart = getCart() //load the cart (product ekak add krnna klin cart eka load krn inn oni)

    // me add krnna hadana product eka dntmath cart ekat add welada kiyl blnn oni
    
    const existingProductIndex = cart.findIndex(
        (item) => {
            return item.productId === product.productId
        }
    )

    if(existingProductIndex == -1){
        //cart.push ekn wenne cart array eke agin dewal ellana eka. (agata dewal ekathu krna eka) -1 kiynne cart eke ee product eka na

        cart.push(
            {
                productId : product.productId,
                quantity : qty,
                price : product.price,
                name : product.name,
                altNames : product.altNames,
                image : product.image[0]
            }
        )
        localStorage.setItem("cart", JSON.stringify(cart))
    }else{
        // Update the quantity of the existing product
         const newQty = cart[existingProductIndex].quantity + qty;
         if (newQty<=0){
            const newCart = cart.filter((item, index)=>{
                return index!== existingProductIndex
            })
            localStorage.setItem("cart", JSON.stringify(newCart))
         }else{
            cart[existingProductIndex].quantity = newQty
            localStorage.setItem("cart", JSON.stringify(cart))
         }
    }
    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
}