import Order from "../models/order";

export async function createOrder(req, res) {
    if(req.user==null){
        res.status(401).json({message:"pls log in to create order"})
        return;
    }

    //CBC00202
}