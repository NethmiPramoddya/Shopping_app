import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRouter from './router/userRouter.js';
import jwt from 'jsonwebtoken'

const app = express();

app.use(bodyParser.json());

app.use(
    (req,res,next)=>{
        const value = req.header("Authorization")
        if(value!= null) {
        const token = value.replace("Bearer ", "")
        jwt.verify(token, "cbc-6503", (err,decoded)=>{
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

const connectionString = "mongodb+srv://admin:123@cluster0.enwjbe6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(connectionString).then(
    ()=>{
        console.log("database connected")
    }
).catch(
    ()=>{
        console.log("failed to connect to database")
    }
)

app.use("/users", userRouter)

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