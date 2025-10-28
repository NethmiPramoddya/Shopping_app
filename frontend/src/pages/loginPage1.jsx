import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';

export default function LoginPage1() {
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
            }else if(response.data.role == "USER" || response.data.role == "user"){
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
      password: password 

    }).then((response)=>{
      console.log(response.data)
      localStorage.setItem("token", response.data.token)

      //const token = localStorage.getItem("token")
      //alert("Login Successful")
      toast.success("Loging Successfull")

      if(response.data.role == "admin"){
        //window.location.href = "/admin"
        navigate("/admin")
      }else if(response.data.role == "USER"){
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
    <div className="w-full min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex justify-center py-12 px-6 mt-80">
      {/* Login Card */}
      <div className="relative w-full max-w-lg">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/50">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="font-serif text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your <span className="bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent font-semibold">Glamore'</span> account</p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-400 focus:outline-none transition-colors duration-300 bg-white/70 backdrop-blur-sm text-gray-800 placeholder-gray-400"
                />
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-400 focus:outline-none transition-colors duration-300 bg-white/70 backdrop-blur-sm text-gray-800 placeholder-gray-400"
                />
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            {/* Login Button */}
            <button 
              onClick={login}
              className="w-full bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-gray-600"
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/80 text-gray-500">or continue with</span>
              </div>
            </div>

            {/* Google Login Button */}
            <button 
              onClick={googleLogin}
              className="w-full bg-white border-2 border-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-3">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-rose-600 hover:text-rose-700 font-semibold transition-colors duration-300">
                Sign Up
              </Link>
            </p>
            <p className="text-gray-600">
              <Link to="/forget" className="text-rose-600 hover:text-rose-700 font-semibold transition-colors duration-300">
                Forgot Password?
              </Link>
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Your information is secure and encrypted</span>
          </div>
        </div>
      </div>
    </div>
  )
}
