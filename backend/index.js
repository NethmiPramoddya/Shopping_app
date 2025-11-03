import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'
import userRouter from './router/userRouter.js';
import jwt from 'jsonwebtoken'
import productRouter from './router/productRoter.js';
import dotenv from 'dotenv'
import orderRouter from './router/orderRouter.js';
import reviewRouter from './router/reviewRouter.js';
import dashboaRouter from './router/dashboardRouter.js';
import paymentRouter from './router/paymentRouter.js';
dotenv.config()

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.use(
    (req,res,next)=>{
        console.log(`=== JWT MIDDLEWARE === ${req.method} ${req.url}`);
        const value = req.header("Authorization")
        console.log("Authorization header:", value ? "Present" : "Missing");
        
        if(value!= null) {
            const token = value.replace("Bearer ", "")
            console.log("Token extracted, length:", token.length);
            
            jwt.verify(token, process.env.JWT_SECRET, (err,decoded)=>{
                if(err) {
                    console.log("JWT verification error:", err.message);
                    return res.status(403).json({
                        message : "unauthorized",
                        error: err.message
                    })
                }
                if(decoded == null){
                    console.log("Decoded is null");
                    return res.status(403).json({
                        message : "unauthorized"
                    })
                }else{
                    console.log("JWT verified successfully for user:", decoded.email);
                    req.user = decoded
                    next()
                }
            })
        }else{
            console.log("No authorization header, proceeding...");
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
app.use("/api/orders", orderRouter)
app.use("/api/reviews", reviewRouter)
app.use("/api/dashboard", dashboaRouter)
app.use("/api/payments", paymentRouter)



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