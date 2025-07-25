import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        productId : {
            type : String,
            required : true,
            unique : true
        },

        name : {
            type : String,
            required : true,
        },

        altNames : {
            type : [String],
            default : []
        },

        labelledPrice : {
            type : Number,
            required : true,
        },

        Price : {
            type : Number,
            required : true,
        },

        image : {
            type : [String],
            default : ["/default-product.jpg"]
        },

        description : {
            type : String,
            required : true,
        },

        stock : {
            type : Number,
            required : true,
            default :0,
        },

        isAvailable : {
            type : Boolean,
            required :true,
        }, 

        category : {
            type : String,
            required : true,
            default : "cosmatics"
        }

    }
)

const Product = mongoose.model("products", productSchema)
export default Product;