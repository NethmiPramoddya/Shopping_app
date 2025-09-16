import express from 'express';
import { contactUs, createUser, getUser, googleLogin, loginUser, resetPassword, sendOTP } from '../Controller/userController.js';

const userRouter = express.Router();
userRouter.post("/", createUser)
userRouter.get("/",getUser)
userRouter.post("/login", loginUser )
userRouter.post("/google-login", googleLogin )
userRouter.post("/send-otp", sendOTP)
userRouter.post("/reset-password", resetPassword)
userRouter.post("/contact",contactUs)

export default userRouter;