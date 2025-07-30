import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'
import userRouter from './router/userRouter.js';
import jwt from 'jsonwebtoken'
import productRouter from './router/productRoter.js';
import dotenv from 'dotenv'
dotenv.config()

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.use(
    (req,res,next)=>{
        const value = req.header("Authorization")
        if(value!= null) {
        const token = value.replace("Bearer ", "")
        jwt.verify(token, process.env.JWT_SECRET, (err,decoded)=>{
            if(decoded == null){
                res.status(403).json({
                    message : "unauthorized"
                })
            }else{
                req.user = decoded
                next()
            }
            
        }
    )
        }else{
            next()
        }
        
    }
    
)

const connectionString = process.env.MONGO_URI

mongoose.connect(connectionString).then(
    ()=>{
        console.log("database connected")
    }
).catch(
    ()=>{
        console.log("failed to connect to database")
    }
)

app.use("/api/users", userRouter)
app.use("/api/products", productRouter)

app.get("/",(req,res)=>{
    console.log(req);
    res.json(
        {
            message:"This is a get request.."
        }
)
    console.log("This is a get request..")
})

app.post("/",(req,res)=>{
    console.log(req.body)
     res.json(
        {
            message:"This is a get request.."
        }
    )
    console.log("This is a post request..")
})

app.delete("/",(req,res)=>{
    res.json(
        {
            message:"This is a get request.."
        }
    )
    console.log("This is a delete request..")
})

app.put("/",(req,res)=>{
    res.json(
        {
            message:"This is a get request.."
        }
    )
    console.log("This is a put request..")
})

app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
})