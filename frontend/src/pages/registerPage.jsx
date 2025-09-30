import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff } from "lucide-react"; // for password toggle icon

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/users/google-login`, {
          token: response.access_token,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          toast.success("Registration Successful");
          navigate("/login")
        })
        .catch(() => {
          toast.error("Google Login Failed");
        });
    },
  });

  function Register() {
    if (!firstName || !lastName || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
        firstName,
        lastName,
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        toast.success("Registration Successful");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Registration Failed");
      });
  }

  return (
    <div className="w-full min-h-screen bg-[url(/loginbg.jpg)] bg-cover bg-center flex justify-center items-center">
      <div className="w-[500px] backdrop-blur-xl shadow-2xl rounded-[30px] mt-50 mb-10 text-white flex flex-col items-center justify-center relative gap-[10px] p-8">
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-6 mt-5">Register / Sign Up</h1>

        {/* First Name */}
        <div className="w-[350px] flex flex-col">
          <span className="text-lg mb-1">First Name</span>
          <input
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border border-white rounded-xl h-[40px] px-3 text-black"
            required
          />
        </div>

        {/* Last Name */}
        <div className="w-[350px] flex flex-col">
          <span className="text-lg mb-1">Last Name</span>
          <input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border border-white rounded-xl h-[40px] px-3 text-black"
            required
          />
        </div>

        {/* Email */}
        <div className="w-[350px] flex flex-col">
          <span className="text-lg mb-1">Email</span>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-white rounded-xl h-[40px] px-3 text-black"
            required
          />
        </div>

        {/* Password with toggle */}
        <div className="w-[350px] flex flex-col relative">
          <span className="text-lg mb-1">Password</span>
          <input
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-white rounded-xl h-[40px] px-3 pr-10 text-black"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Register button */}
        <button
          onClick={Register}
          className="w-[350px] h-[45px] rounded-xl bg-accent text-white text-lg mt-5 hover:bg-accent/80 transition-all duration-300 cursor-pointer"
        >
          Register
        </button>

        {/* Google Login */}
        <button
          onClick={googleLogin}
          className="w-[350px] h-[45px] rounded-xl bg-accent text-white text-lg mt-3 hover:bg-accent/80 transition-all duration-300 cursor-pointer"
        >
          Continue with Google
        </button>

        {/* Login link */}
        <p className="mt-3">
          Have an account?{" "}
          <Link to="/login" className="text-accent underline">
            Login
          </Link>{" "}
          here
        </p>
      </div>
    </div>
  );
}
