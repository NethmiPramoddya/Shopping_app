import Order from "../models/order.js";
import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createOrder(req, res) {
    try{
    console.log("=== ORDER CREATION REQUEST ===");
    console.log("User:", req.user ? `${req.user.firstName} ${req.user.lastName} (${req.user.email})` : "null");
    console.log("Request Body:", JSON.stringify(req.body, null, 2));
    console.log("Request Headers:", req.headers.authorization ? "Token present" : "No token");
    
    if(req.user==null){
        res.status(401).json({message:"pls log in to create order"})
        return;
    }

    // Generate unique order ID with timestamp to avoid duplicates
    let orderId;
    let isUnique = false;
    let attempts = 0;
    
    while (!isUnique && attempts < 10) {
        // Get latest order
        const latestOrder = await Order.find().sort({date:-1}).limit(1);
        
        if (latestOrder.length > 0 && latestOrder[0].orderId) {
            // if old orders exist
            console.log("Latest order:", latestOrder[0].orderId);
            const lastOrderIdInString = latestOrder[0].orderId; // "CBC00635"
            const lastOrderIdWithoutPrefix = lastOrderIdInString.replace("CBC", ""); // "00635"
            const lastOrderIdInteger = parseInt(lastOrderIdWithoutPrefix, 10); // 635
            const newOrderIdInteger = lastOrderIdInteger + 1; // 636
            const newOrderIdWithoutPrefix = newOrderIdInteger.toString().padStart(5, '0'); // "00636"
            orderId = "CBC" + newOrderIdWithoutPrefix; // "CBC00636"
        } else {
            // First order
            orderId = "CBC00202";
        }
        
        // Check if this ID already exists
        const existingOrder = await Order.findOne({ orderId });
        if (!existingOrder) {
            isUnique = true;
            console.log("Generated unique order ID:", orderId);
        } else {
            console.log("Order ID", orderId, "already exists, trying next...");
            attempts++;
        }
    }
    
    if (!isUnique) {
        // Fallback: use timestamp-based ID
        orderId = "CBC" + Date.now().toString().slice(-5);
        console.log("Using timestamp-based order ID:", orderId);
    }

    // Validate required fields
    if (!req.body.address || !req.body.phone) {
        console.log("Missing required fields - address:", !!req.body.address, "phone:", !!req.body.phone);
        return res.status(400).json({message: "Address and phone are required"});
    }

    const items = []
    let total = 0
    //product id validating part
    if(req.body.items!==null && Array.isArray(req.body.items)){
        console.log("Processing", req.body.items.length, "items...");
        
        for(let i=0; i<req.body.items.length; i++){
            let item = req.body.items[i]
            console.log(`Processing item ${i}:`, JSON.stringify(item, null, 2));

            // Validate item structure
            if (!item.productId || !item.qty) {
                console.log("Invalid item structure - productId:", !!item.productId, "qty:", !!item.qty);
                return res.status(400).json({message: `Item ${i} missing productId or qty`});
            }

            //id ekta adala product ekak database eke thiyeda kiyl check krl blnwa
            let product = await Product.findOne(
                {
                    productId:item.productId
                }
            )
            console.log(`Product lookup for ${item.productId}:`, product ? "Found" : "Not found");

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

    // Use try-catch with retry for duplicate key errors
    let orderSaved = false;
    let retryCount = 0;
    let savedOrder;
    
    while (!orderSaved && retryCount < 3) {
        try {
            // Regenerate orderId if this is a retry
            if (retryCount > 0) {
                const timestamp = Date.now().toString().slice(-4);
                const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
                orderId = "CBC" + timestamp + random;
                console.log(`Retry ${retryCount}: Using new orderId:`, orderId);
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
            
            savedOrder = await order.save();
            orderSaved = true;
            console.log("Order saved successfully with ID:", orderId);
            
        } catch (saveError) {
            if (saveError.code === 11000 && saveError.message.includes('orderId_1')) {
                // Duplicate key error, retry with new ID
                retryCount++;
                console.log(`Duplicate orderId detected, retry ${retryCount}/3`);
                if (retryCount >= 3) {
                    throw new Error(`Failed to generate unique order ID after ${retryCount} attempts`);
                }
            } else {
                // Other error, don't retry
                throw saveError;
            }
        }
    }

    res.json({
        message:"order created successfully",
        result: savedOrder
    })
    }catch(error){
        console.error("=== ORDER CREATION ERROR ===");
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        console.error("Request body was:", JSON.stringify(req.body, null, 2));
        res.status(500).json({message:"failed to create order", error: error.message})
    }
    
}

export async function getOrder(req,res){
    const page = parseInt(req.params.page) || 1
    const limit = parseInt(req.params.limit) ||10
    if(req.user==null){
        res.status(400).json({message:"pls login to view orders"})
        return;
    }

    try{
        if(req.user.role == "admin"){
            const orderCount = await Order.countDocuments()// how many orders in tha database , database eke orders keeyk thinwd kiyla balanna
            const totalPages = Math.ceil(orderCount/limit) //ceil ekn asanna wadima poorna sankayawat watayanw

            const orders = await Order.find().skip((page-1)*limit).limit(limit).sort({date:-1})
            res.json({
                orders:orders,
                totalPages:totalPages
            })
        }else{
            const orderCount = await Order.countDocuments({email:req.user.email})// how many orders in tha database
            const totalPages = Math.ceil(orderCount/limit)
            const orders = await Order.find({email:req.user.email}).skip((page-1)*limit).limit(limit).sort({date:-1})
            res.json({
                orders:orders,
                totalPages:totalPages
            })
        }

    }catch(error){
        console.error("error fetching orders", error);
        res.status(500).json({message:"failed to fetch orders"})
    }
}

export async function updateOrder(req,res){
    if(isAdmin(req)){
        const orderId = req.params.orderId
        const { status, notes } = req.body 

        Order.findOneAndUpdate(
           { orderId:orderId},
           {status:status, notes:notes},
           {new:true}
        ).then((updateOrder)=>{
            if(updateOrder){
                res.json({
                    message:"order updated successfully",
                    order:updateOrder
                })
            }else{
                req.status(404).json({message:"order not found"})
            }
        }).catch((err)=>{
            console.error("error updating order", err)
            res.status(500).json({message:"failed to update order"})
    })

    }else{
        res.status(403).json({message:"you are not autharized to update orders"})
    }
}