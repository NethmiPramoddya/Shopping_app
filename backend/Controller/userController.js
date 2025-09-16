import User from "../models/user.js";
import OTP from "../models/otp.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import axios from "axios";
import nodemailer from "nodemailer";
import ContactUs from "../models/contactUs.js";

dotenv.config()

const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 587,
   secure: false,
   auth: {
       user: process.env.APP_EMAIL,
       pass: process.env.APP_PASSWORD
   }
});

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

export async function sendOTP(req,res){
    const email = req.body.email
    //random number between 111111 and 999999
    const otpcode = Math.floor(100000 + Math.random() * 900000)

    //delete all otps from email
    try{
        await OTP.deleteMany({ email: email })
        const newOTP = new OTP({
            email: email,
            otp: otpcode
        })
        await newOTP.save()
        res.json({
            message: "OTP sent successfully"
        })

        const message = {
            from: process.env.APP_EMAIL,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is ${otpcode}`
        }

        transporter.sendMail(message, (error, info) => {
            if (error) {
                return res.status(500).json({
                    message: "Failed to send OTP",
                    error: error.message
                })
            }
            else{
                console.log("OTP email sent: " + info.response)
                res.json({
                    message: "OTP sent successfully"
                })
            }
        })
    }catch{
        res.status(500).json({
            message: "Failed to send OTP"
        })
    }

    
}

export async function resetPassword(req,res){
    const { email, otp, newPassword } = req.body

    try{
        const validOtp = await OTP.findOne({ email: email, otp: otp })

        if(!validOtp){
            return res.status(400).json({
                message: "Invalid OTP"
            })
        }

        const user = await User.findOne({ email: email })

        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }
        //hash new password
        const hashedPassword = bcrypt.hashSync(newPassword, 10)
        await User.updateOne({ email: email }, { password: hashedPassword })
        await OTP.deleteMany({ email: email })

        res.json({
            message: "Password reset successfully"
        })
    }catch(err){
        res.status(500).json({
            message: "Failed to reset password",
            error: err.message
        })
    }
}

export async function contactUs(req, res){
    try{
    const {name, email, message} = req.body;
    const contact = new ContactUs({name, email, message})
    contact.save()

    res.status(201).json({ success: true, message: "Message sent!" });
    }catch(err){
        res.status(500).json({
            message: "Failed to send message",
            error: err.message
        })
    }
}