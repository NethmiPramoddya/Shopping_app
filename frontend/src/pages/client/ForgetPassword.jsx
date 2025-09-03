import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function ForgetPassword() {

  const [emailSent, setEmailSent] = useState(false)
  const[email, setEmail] = useState("")
  const[otp,setOtp] = useState("")
  const[newPassword, setNewPassword] =useState("")
  const[confirmPassword, setConfirmPassword] = useState("")

   async function sendOTP(){
      try{
        await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/send-otp/",{email})
        toast.success("OTP sent successfully")
        setEmailSent(true)
        
      }catch(error){
        console.log(error)
        toast.error("failed to send OTP")
      }
  }

  async function resetPassword(){
    if(newPassword!==confirmPassword){
      toast.error("passwords do nat match")
      return;
    }
      try{
        await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/reset-password/",{
          email:email,
          otp:otp,
          newPassword:newPassword
        })
        toast.success("password reset successfully")
      }catch{
        toast.error("failed to reset password")
      }
  }


  return (
    <div className='w-full h-full flex items-center justify-center text-secondary'>
      {!emailSent&&<div className='w-[500px] h-[500px] bg-primary shadow-2xl flex flex-col items-center justify-center gap-[20px] rounded-[30px]'>
        <h1 className='text-2xl font-bold'>Reset Password</h1>
        <input type="email"
        placeholder='Enter Your Email'
        className='w-[350px] h-[40px] border border-white rounded-xl text-center' 
        onChange={(e)=>{setEmail(e.target.value)}}/>
        <button onClick={sendOTP} className='w-[350px] h-[40px] bg-accent rounded-xl text-white text-lg mt-5 hover:bg-white hover:text-accent cursor-pointer border hover:border-accent'>Send OTP</button>
      </div>}
      {
        emailSent && <div className='w-[500px] h-[600px] bg-primary shadow-2xl flex flex-col items-center justify-center gap-[20px] rounded-[30px]'>
          <h1 className='text-2xl font-bold'>Verify OTP</h1>
          <input type="text"
          placeholder='Enter Your OTP'
          className='w-[350px] h-[40px] border border-white rounded-xl text-center' 
          onChange={(e)=>{setOtp(e.target.value)}}/>

          <input type="password"
          placeholder='Enter New Password'
          className='w-[350px] h-[40px] border border-white rounded-xl text-center' 
          onChange={(e)=>{setNewPassword(e.target.value)}}/>

          <input type="password"
          placeholder='Confirm New Password'
          className='w-[350px] h-[40px] border border-white rounded-xl text-center' 
          onChange={(e)=>{setConfirmPassword(e.target.value)}}/>

          <button onClick={resetPassword} className='w-[350px] h-[40px] bg-accent rounded-xl text-white text-lg mt-5 hover:bg-white hover:text-accent cursor-pointer border hover:border-accent'>Reset Password</button>
        </div>
      }
    </div>
  )
}
