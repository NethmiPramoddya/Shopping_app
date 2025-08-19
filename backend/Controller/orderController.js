import Order from "../models/order.js";
import Product from "../models/product.js";

export async function createOrder(req, res) {
    try{
    if(req.user==null){
        res.status(401).json({message:"pls log in to create order"})
        return;
    }

    //CBC00202
    // CBC00202 - manually me widiyata order ID eka apit generate krnnna wenwa, me sandaha anthima order eka hoyaganna awshya wenwa
    //date:-1 means date eka phlata adu wena widiyt pelagaswanna , enam udma enn oni aluthenm daou orders 2025>2012
    const latestOrder = await Order.find().sort({date:-1}).limit(1);

    let orderId = "CBC00202";

    if (latestOrder.length > 0 && latestOrder[0].orderId) {
        // if old orders exist
        console.log(latestOrder);
        const lastOrderIdInString = latestOrder[0].orderId; // "CBC00635"
        const lastOrderIdWithoutPrefix = lastOrderIdInString.replace("CBC", ""); // "00635"
        const lastOrderIdInteger = parseInt(lastOrderIdWithoutPrefix, 10); // 635
        const newOrderIdInteger = lastOrderIdInteger + 1; // 636
        const newOrderIdWithoutPrefix = newOrderIdInteger.toString().padStart(5, '0'); // "00636"
        orderId = "CBC" + newOrderIdWithoutPrefix; // "CBC00636"
    }

    const items = []
    let total = 0
    //product id validating part
    if(req.body.items!==null && Array.isArray(req.body.items)){
        for(let i=0; i<req.body.items.length; i++){
            let item = req.body.items[i]
            //console.log(item)

            //id ekta adala product ekak database eke thiyeda kiyl check krl blnwa
            let product = await Product.findOne(
                {
                    productId:item.productId
                }
            )

            // "items": [
            //         {
            //         "productId": "P001",
            //         "qty": 2
            //         },

            if(product == null){
                return res.status(400).json({message: "invalid product id: " + item.productId})
            }

            items[i] ={
                productId:product.productId,
                name:product.name,
                image:product.image[0],
                price:product.price,
                qty:item.qty
            }

            total = total + product.price * item.qty
        }
    }else{
        res.status(400).json({message:"Invalid items formate"})
        return;
    }

    const order = new Order({
        orderId: orderId,
        email: req.user.email,
        name: req.user.firstName + " " + req.user.lastName,
        address: req.body.address,
        phone: req.body.phone,
        items: items,
        total: total
    });
        const result = await order.save()

        res.json({
            message:"order created successfully",
            result:result
        })
    }catch(error){
        console.error("Error Creating order", error)
        res.status(500).json({message:"failed to create order"})
    }
    
}

export async function getOrder(req,res){
    if(req.user==null){
        res.status(400).json({message:"pls login to view orders"})
        return;
    }

    try{
        if(req.user.role == "admin"){
            const orders = await Order.find().sort({date:-1})
            res.json(orders)
        }else{
            const orders = await Order.find({email:req.user.email}).sort({date:-1})
            res.json(orders)
        }

    }catch(error){
        console.error("error fetching orders", error);
        res.status(500).json({message:"failed to fetch orders"})
    }
}