import { useState } from "react";
import axios from 'axios'
import { FiPhone } from "react-icons/fi";
import { GoMail } from "react-icons/go";
import { RxQuestionMarkCircled } from "react-icons/rx";

export default function ContactUs() {
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [message, setMessage] = useState("")

 return(
  <>
    <div className="w-full h-[300px] bg-accent flex flex-col items-center justify-items-center">
       <h1 className="font-extrabold text-white text-5xl mt-10">Contact Us</h1>
       <p className="text-white text-center text-xl mt-15">We'd love to hear from you. Get in touch with our team for any questions, feedback, or support</p>
    </div>

    <div className="w-full h-[700px] flex flex-row items-center justify-center bg-[#F8FAFC] mt-10 gap-10">
      <div className="w-[27%] h-[600px] shadow-2xl rounded-xl bg-white m-4 flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-pink-200 flex justify-center items-center"><FiPhone className="text-4xl text-pink-600 " /></div>
        <h1 className="font-semibold text-3xl mt-10 mb-5">Customer Service</h1>
        <p className="text-gray-500 mb-10 text-xl text-center">
          Our team is here to help <br />with any questions about<br /> your orders or products
        </p>

        <h1 className="text-2xl font-semibold text-center mb-5">+1 (800) 555-GLAM</h1>
        <p className="text-gray-500 mb-10 text-xl text-center">
          Mon-Fri: 9am-6pm EST
        </p>   
      </div>
      
      <div className="w-[27%] h-[600px] shadow-2xl rounded-xl bg-white m-4 flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-pink-200 flex justify-center items-center"><GoMail className="text-4xl text-pink-600 " /></div>
        <h1 className="font-semibold text-3xl mt-10 mb-5">Email Support</h1>
        <p className="text-gray-500 mb-10 text-xl text-center">
          For detailed inquiries <br />product information or<br /> business oppotunities.
        </p>

        <h1 className="text-2xl font-semibold text-center mb-1">support@glamore.com</h1>
        <h1 className="text-2xl font-semibold text-center mb-5">partnerships@glamore.com</h1>
        <p className="text-gray-500 mb-10 text-xl text-center">
          We respond within 24 hours
        </p>
      </div>

       <div className="w-[27%] h-[600px] shadow-2xl rounded-xl bg-white m-4 flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-pink-200 flex justify-center items-center"><RxQuestionMarkCircled className="text-4xl text-pink-600 " /></div>
        <h1 className="font-semibold text-3xl mt-10 mb-5">FAQ & Resources</h1>
        <p className="text-gray-500 mb-10 text-xl text-center">
          Find answers to common <br />questions and helpful<br /> resources about our <br /> products
        </p>

        <h1 className="text-2xl font-semibold text-center mb-5 cursor-pointer  text-pink-600">visit our FAQ </h1>
       </div>

    </div>

    
  </>
  );
}
