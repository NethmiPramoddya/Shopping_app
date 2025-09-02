import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const googleLogin = useGoogleLogin({
  onSuccess: (response) => {
    console.log("Google Login Success:", response);
    axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/google-login",{
        token: response.access_token
    }).then(
        (response)=>{
            console.log(response.data)
            localStorage.setItem("token", response.data.token)
            toast.success("Login Successfull")
            if(response.data.role == "admin"){
              navigate("/admin")
            }else if(response.data.role == "user"){
              navigate("/")
            }
        }
       
    ).catch(
      ()=>{toast.error("Google Login Failed")}
    )
  }
});


 function login(){
      axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login", {
      email: email,
      password: password // ✅ Fixed: "password" is now spelled correctly

    }).then((response)=>{
      console.log(response.data)
      localStorage.setItem("token", response.data.token)

      //const token = localStorage.getItem("token")
      //alert("Login Successful")
      toast.success("Loging Successfull")

      if(response.data.role == "admin"){
        //window.location.href = "/admin"
        navigate("/admin")
      }else if(response.data.role == "user"){
        //window.location.href = "/"
        navigate("/")
      }

    }).catch((error)=>{
      console.log(error)
      //alert("Login Failed")
      toast.error("Login Failed")
    })
 }
  return (
    <div className="w-full h-screen bg-[url(/loginbg.jpg)] bg-cover bg-center flex justify-center items-center">
      <div className="w-[500px] h-[500px] backdrop-blur-xl shadow-2xl rounded-[30px] text-white flex flex-col items-center justify-center relative gap-[20px]">
        <h1 className=" absolute top-[20px] text-2xl font-bold text-center my-5">Login</h1>
        <div className="w-[350px] flex flex-col">
          <span className="text-lg">Email</span>
          <input type="text" onChange={(e)=>{setEmail(e.target.value)}} className="w-[350px] border border-white rounded-xl h-[40px]" />
        </div>

        <div className="w-[350px] flex flex-col">
          <span className="text-lg">Password</span>
          <input type="password" onChange={(e)=>{setPassword(e.target.value)}} className="w-[350px] border border-white rounded-xl h-[40px]" />
        </div>

        <button onClick={login} className="w-[350px] h-[40px] rounded-xl bg-accent text-white text-lg mt-5 hover:bg-accent transition-all duration-300">Login</button>

        <button onClick={googleLogin} className="w-[350px] h-[40px] rounded-xl bg-accent text-white text-lg mt-5 hover:bg-accent transition-all duration-300">Google Login</button>

          <p>Don't have an account? <Link to="/register" className="text-accent">Sign Up</Link> from here</p>


      </div>

      
    </div>
  )
}
