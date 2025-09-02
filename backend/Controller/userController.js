import User from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import axios from "axios";

dotenv.config()

export function createUser(req,res){

    const passwordHash = bcrypt.hashSync(req.body.password, 10)

    const userData = {
        firstName : req.body.firstName,
        lastName :req.body.lastName,
        email :req.body.email,
        password :passwordHash,

    }

    const user = new User(userData)

    user.save().then(
        ()=>{
           res.json({
            message : "user saved successfully"
           }) 
        }
    ).catch(
        ()=>{
            res.json({
                message :"failed to create user"
            })
        }
    )
}

export function loginUser(req, res){
    const email = req.body.email
    const password = req.body.password

    User.findOne({
        email : email
    }).then(
        (user)=>{
            if (user==null){
                res.status(401).json({
                    message : "user not found"
                })
            } else{
                const isPassowrdCorrect = bcrypt.compareSync(password, user.password)
                if(isPassowrdCorrect){
                    const token = jwt.sign(
                        {
                            email : user.email,
                            firstName : user.firstName,
                            lastName : user.lastName,
                            role : user.role,
                            isBlocked : user.isBlocked,
                            isEmailVerified : user.isEmailVerified,
                            image : user.image
                        },
                        process.env.JWT_SECRET
                    )

                    
                    res.json({
                        token : token,
                        message :"Login successfull",
                        role : user.role,
                    })
                }else{
                    res.status(403).json({
                        message : "incorrect password"
                    })
                }
            }
        }
    )

}
// ape backend ekata token eka ewala ethanina userge wisthara tika gnna (backend ekata awilla code ea decode krgnn eka) // token ekn usege nama athulu wisthara ganima
export function getUser(req,res){
    if(req.user == null){
        res.status(404).json({message:"user not found"})
    }
    else{
        res.json(req.user)
    }
}

export function isAdmin(req){
    if(req.user == null){
        return false;
    }
    if(req.user.role == "admin"){
        return true;
    }else{
        return false;
    }
}

export async function googleLogin(req,res){
    const googleToken = req.body.token

    try{
        const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
            headers: {
                Authorization: `Bearer ${googleToken}`
            }
        })

        const user = await User.findOne({email: response.data.email})

        if(user!=null){
            const token = jwt.sign(
                {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    isBlocked: user.isBlocked,
                    isEmailVerified: user.isEmailVerified,
                    image: user.image
                },
                process.env.JWT_SECRET
            )

            res.json({
                token: token,
                message: "Google login successful",
                role: user.role
            })
        }else{
            const newUser = new User({
                email: response.data.email,
                firstName: response.data.given_name,
                lastName: response.data.family_name,
                role: "user",
                isBlocked: false,
                isEmailVerified: true,
                image: response.data.picture,
                password: "123" // no password as login is via google
            })

            await newUser.save()

            const token = jwt.sign(
                {
                    email: newUser.email,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    role: newUser.role,
                    isBlocked: newUser.isBlocked,
                    isEmailVerified: newUser.isEmailVerified,
                    image: newUser.image
                },
                process.env.JWT_SECRET
            )

            res.json({
                token: token,
                message: "Google login successful",
                role: newUser.role
            })
        }

    }catch(err){
        res.status(500).json({
            message: "Google login failed",
            error: err.message
        })
    }
}