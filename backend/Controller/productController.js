import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

 export async function createProduct(req, res){

    // if(req.user==null){
    //     res.status(403).json({
    //         message : "Please login to create a product"
    //     })
    //     return;
    // }

    // if(req.user.role != "admin"){
    //     res.status(403).json({
    //         message : "you are not allowed to create a product"
    //     })
    //     return;
    // }

    if(!isAdmin(req)){
        res.status(403).json({
            message :"Access denied admins only"
        })
    }


    const product = new Product(req.body)

    try{
        const response = await product.save()
        res.json({
            message : "product created successfully",
            product : response
        })
    }catch(error){
        console.error("error creating product" + error);
        return res.status(500).json({
            message :"failed to create product"
        })
    }
 }

 export async function getProduct(req, res) {
    try{
        if(isAdmin(req)){
            const products = await Product.find();
            return res.json(products);
        } else{
            const products = await Product.find({isAvailable:true});
            return res.json(products);
        }
    }catch(error){
        console.error("Error fetching products:", error);
        return res.status(500).json({message: "Failed to fetch products"});
    }
 }

 export async function deleteProduct(req, res){
    if(!isAdmin(req)){
        res.status(403).json({message:"Access denied, Admin only cand delete"})
        return;
    }

    try{
        const productId = req.params.productId
        await Product.deleteOne({productId: productId})
        res.json({message:"product deleted successfully"})
    }catch(error){
        console.error("Error deleting products:", error);
        return res.status(500).json({message: "Failed to delete products"});
    }
 }

 export async function updateProduct(req, res) {
    if(!isAdmin(req)){
       res.status(403).json({message:"Access denied, Admin only cand delete"})
       return;
    }

    const data = req.body;
    const productId = req.params.productId;
    data.productId = productId;

    try{

        await Product.updateOne(
            {
                productId: productId,
            },
            data
        );
        res.json({message:"Product updated successfully"})

    }catch(error){
        console.error("Error Updating Products", error)
        return res.status(500).json({message:"failed to update products"})
    }
    
 }

 export async function getProductInfo(req, res){
    try{
        const productId =  req.params.productId
        const product = await Product.findOne({productId: productId})
        
        if(product == null){
            res.status(404).json({message:"product not found"})
            return;
        }

        if(isAdmin(req)){
            res.json(product)
        }else{
            if(product.isAvailable){
                res.json(product)
            }else{
                res.status(404).json({message:"product is not available"})
            }
        }

    }catch(error){
        console.error("Error getting product info", error)
        return res.status(500).json({message:"Failed to fetch the product"})
    }
 }

 export async function searchProducts(req,res){
    const query = req.params.query

    try{
        const products = await Product.find({
            $or:[
            {name: { $regex: query, $options: "i" }},
            {altNames: { $elemMatch: { $regex: query, $options: "i" } }},
            ], 
            isAvailable: true
        })
        res.json(products)
    }catch(error){
        res.status(500).json({message:"Failed to search products"})
    }
 }