import { useState } from "react";
import axios from 'axios'
import { FiPhone } from "react-icons/fi";
import { GoMail } from "react-icons/go";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { FaRegClock } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
import toast from "react-hot-toast";

export default function ContactUs() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null) // success or error message

  async function handleSubmit(e){
       e.preventDefault()
       setLoading(true)
       setStatus(null)
       try{
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/contact", {
          name,
          email,
          message
      })
      setStatus({ type: "success", text: "Your message has been sent!" })
      toast.success("Message Sent Successfully")
      setName("")
      setEmail("")
      setMessage("")
    }catch (error) {
      console.error(error)
      setStatus({ type: "error", text: "Something went wrong. Please try again." })
    } finally {
      setLoading(false)
    }
    
  }
  
  return (
    <>
    <div className="w-full min-h-screen bg-[#F8FAFC]">
      <div className="w-full h-[300px] bg-accent flex flex-col items-center justify-items-center">
        <h1 className="font-extrabold text-white text-5xl mt-10">Contact Us</h1>
        <p className="text-white text-center text-xl mt-15">
          We'd love to hear from you. Get in touch with our team for any questions,<br/> feedback, or support
        </p>
      </div>

      <div className="w-full h-[700px] flex flex-row items-center justify-center bg-[#F8FAFC] mt-10 gap-10 overflow-x-hidden">
        <div className="w-[27%] h-[600px] shadow-2xl rounded-xl bg-white m-4 flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-pink-200 flex justify-center items-center">
            <FiPhone className="text-4xl text-pink-600 " />
          </div>
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
          <div className="w-20 h-20 rounded-full bg-pink-200 flex justify-center items-center">
            <GoMail className="text-4xl text-pink-600 " />
          </div>
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
          <div className="w-20 h-20 rounded-full bg-pink-200 flex justify-center items-center">
            <RxQuestionMarkCircled className="text-4xl text-pink-600 " />
          </div>
          <h1 className="font-semibold text-3xl mt-10 mb-5">FAQ & Resources</h1>
          <p className="text-gray-500 mb-10 text-xl text-center">
            Find answers to common <br />questions and helpful<br /> resources about our <br /> products
          </p>

          <h1 className="text-2xl font-semibold text-center mb-5 cursor-pointer text-pink-600">
            visit our FAQ
          </h1>
        </div>
      </div>

      <div className="w-full flex flex-col">
        <div className="font-bold text-3xl mb-5 px-24 text-accent">Send Us a Message</div>
        <div className=" flex items-center justify-center px-22">
          <div className="max-w-6xl w-full shadow-2xl rounded-xl bg-white m-4 p-10 ">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                {/* Name */}
                <div className="flex flex-col">
                  <label className="font-medium text-lg mb-2">Your Name</label>
                  <input
                    type="text"
                    placeholder="Jane Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 rounded-md p-4 text-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required/>
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label className="font-medium text-lg mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="border border-gray-300 rounded-md p-4 text-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

              {/* Topic */}
              <div className="flex flex-col">
                <label className="font-medium text-lg mb-2">Message</label>
                <textarea className="border border-gray-300 rounded-md p-4 text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 " placeholder="How can we help you today?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}>
                </textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-[50px] text-center rounded-md text-white font-bold bg-accent hover:bg-accent-light cursor-pointer disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {/* Status Message */}
              {status && (
                <p className={`mt-2 text-center font-medium ${status.type === "success" ? "text-green-600" : "text-red-600"}`}>
                  {status.text}
                </p>
              )}
         </form>
       </div>
    </div>
  </div>

    <div className="w-full flex flex-col">
        <div className="font-bold text-3xl mb-5 px-24 pt-10 text-accent">Visit Our Stores</div>
        <div className=" flex flex-col items-center justify-center px-22 space-y-10">
          <div className="max-w-6xl w-full shadow-2xl rounded-xl grid grid-cols-2 bg-white ">
            <div>
                <img src="/photo-store1_1604328698692-f76ea9498e76.jpg" alt="" className="w-[500px] h-[300px] object-cover rounded-xl"/>
            </div>
            <div className="flex flex-col py-5 space-y-4">
                  <h1 className="text-accent font-semibold text-xl pb-3">Glamoré Flagship Store</h1>
                  <div className="flex flex-row space-x-2">
                    <HiOutlineLocationMarker className="text-3xl text-pink-600 font-bold "/>
                    <p className="text-lg ">123 Beauty Blvd, New York, NY 10001</p>
                  </div>
                  <div className="flex flex-row space-x-4">
                    <FiPhone className="text-2xl text-pink-600 font-light "/>
                    <p className="text-lg ">+1 (212) 555-7890</p>
                  </div>
                  <div className="flex flex-row space-x-4 pb-3">
                    <FaRegClock className="text-2xl text-pink-600 "/>
                    <p className="text-lg ">Mon-Sat: 10am-8pm, Sun: 11am-6pm</p>
                  </div>

                  <button className="w-[200px] h-[50px] text-center border border-accent rounded-lg bg-white text-accent hover:text-white hover:bg-accent cursor-pointer font-semibold">Get Directions</button>
            </div>
          </div>

          <div className="max-w-6xl w-full shadow-2xl rounded-xl grid grid-cols-2 bg-white mb-10 ">
            <div>
                <img src="/photo-saleStore_1607083206968-13611e3d76db.jpg" alt="" className="w-[500px] h-[300px] object-cover rounded-xl"/>
            </div>
            <div className="flex flex-col py-5 space-y-4">
                  <h1 className="text-accent font-semibold text-xl pb-3">Glamoré Beauty Boutique</h1>
                  <div className="flex flex-row space-x-2">
                    <HiOutlineLocationMarker className="text-3xl text-pink-600 font-bold "/>
                    <p className="text-lg ">456 Cosmetic Ave, Los Angeles, CA 90048</p>
                  </div>
                  <div className="flex flex-row space-x-4">
                    <FiPhone className="text-2xl text-pink-600 font-light "/>
                    <p className="text-lg ">+1 (310) 555-1234</p>
                  </div>
                  <div className="flex flex-row space-x-4 pb-3">
                    <FaRegClock className="text-2xl text-pink-600 "/>
                    <p className="text-lg ">Mon-Sat: 9am-9pm, Sun: 10am-7pm</p>
                  </div>

                  <button className="w-[200px] h-[50px] text-center border border-accent rounded-lg bg-white text-accent hover:text-white hover:bg-accent cursor-pointer font-semibold">Get Directions</button>
            </div>
          </div>
          </div>
    </div>


</div> 
    </>
  );
}
