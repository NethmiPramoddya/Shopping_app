// TODO: Redesign this Contact Us page to look elegant and luxurious for a cosmetics brand.
// Use pastel gradients, glass-like cards, soft shadows, and smooth animations for a modern premium feel.


import { useState } from "react";
import axios from 'axios'
import { FiPhone } from "react-icons/fi";
import { GoMail } from "react-icons/go";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { FaRegClock, FaChevronDown } from "react-icons/fa6";
import { HiOutlineLocationMarker, HiSparkles } from "react-icons/hi";
import { FaMapMarkerAlt } from "react-icons/fa";
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-white relative">
        {/* Subtle Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50/40 to-transparent"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 mb-8 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">
            <HiSparkles className="mr-2" />
            <span>Get In Touch</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Contact{" "}
            <span className="bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
              Glamore'
            </span>
          </h1>
          
          {/* Elegant Divider */}
          <div className="w-24 h-0.5 bg-rose-400 mx-auto mb-6"></div>
          
          {/* Description */}
          <p className="text-lg text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
            We'd love to hear from you. Connect with our beauty experts for personalized guidance, 
            product support, or partnership opportunities.
          </p>

          {/* Simple Feature Points */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-rose-500">✓</span>
              <span className="font-medium">Expert Guidance</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-rose-500">✓</span>
              <span className="font-medium">Quick Response</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-rose-500">✓</span>
              <span className="font-medium">Personalized Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 px-6 bg-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 right-10 opacity-10">
          <HiSparkles className="text-rose-400 text-8xl" />
        </div>
        <div className="absolute bottom-20 left-10 opacity-10">
          <HiSparkles className="text-pink-400 text-6xl" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-wide">
              How Can We Help You?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Choose the best way to connect with our beauty experts and customer care team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiPhone className="text-4xl" />,
                title: "Customer Service",
                description: "Our dedicated team is here to help with any questions about your orders, products, or beauty routine.",
                contact: "+1 (800) 555-GLAM",
                details: "Mon-Fri: 9am-6pm EST",
                gradient: "from-rose-400 to-pink-500",
                shadow: "shadow-[0_0_20px_rgba(244,114,182,0.4)]",
              },
              {
                icon: <GoMail className="text-4xl" />,
                title: "Email Support",
                description: "For detailed inquiries, product information, or business partnership opportunities.",
                contact: "support@glamore.com",
                details: "We respond within 24 hours",
                gradient: "from-purple-400 to-violet-500",
                shadow: "shadow-[0_0_20px_rgba(139,92,246,0.4)]",
              },
              {
                icon: <RxQuestionMarkCircled className="text-4xl" />,
                title: "FAQ & Resources",
                description: "Find instant answers to common questions and helpful resources about our premium products.",
                contact: "Visit our FAQ",
                details: "Available 24/7",
                gradient: "from-emerald-400 to-teal-500",
                shadow: "shadow-[0_0_20px_rgba(52,211,153,0.4)]",
              },
            ].map((item, i) => (
              <div key={i} className="group text-center">
                <div className="bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-white/50 h-full">
                  {/* Icon with subtle glow effect */}
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white ${item.shadow} transition-all duration-300`}>
                    {item.icon}
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-gray-800 mb-4 group-hover:text-rose-600 transition-colors duration-300 tracking-wide">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
                    {item.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="text-xl font-semibold text-transparent bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text">
                      {item.contact}
                    </h4>
                    <p className="text-gray-500 font-medium">
                      {item.details}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Message Form */}
      <section className="py-20 px-6 bg-gradient-to-br from-rose-50 via-white to-pink-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-purple-400 to-rose-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-wide">
              Send Us a Message
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Have a question or need personalized beauty advice? We're here to help you shine.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-8 md:p-12 border border-white/50">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label className="block font-serif text-lg font-semibold text-gray-700 mb-3 tracking-wide">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Jane Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-2xl p-4 text-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300 ease-in-out bg-white/70 backdrop-blur-sm"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-serif text-lg font-semibold text-gray-700 mb-3 tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full border border-gray-200 rounded-2xl p-4 text-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300 ease-in-out bg-white/70 backdrop-blur-sm"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="block font-serif text-lg font-semibold text-gray-700 mb-3 tracking-wide">
                  Your Message
                </label>
                <textarea
                  rows={6}
                  placeholder="How can we help you achieve your beauty goals today?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-gray-200 rounded-2xl p-4 text-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all duration-300 ease-in-out bg-white/70 backdrop-blur-sm resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white font-semibold py-4 rounded-full hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg tracking-wide border border-gray-700 hover:border-gray-600"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>

              {/* Status Message */}
              {status && (
                <div
                  className={`p-4 rounded-2xl text-center font-medium ${
                    status.type === "success" 
                      ? "bg-green-50 text-green-700 border border-green-200" 
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {status.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Store Locations */}
      <section className="py-20 px-6 bg-gradient-to-b from-rose-50 via-white to-pink-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-10 right-10 opacity-10">
          <HiSparkles className="text-rose-400 text-8xl" />
        </div>
        <div className="absolute bottom-10 left-10 opacity-10">
          <HiSparkles className="text-pink-400 text-6xl" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-wide">
              Visit Our Stores
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Experience Glamore' in person at our beautiful boutiques where beauty meets luxury
            </p>
          </div>

          <div className="space-y-16">
            {[
              {
                name: "Glamoré Flagship Store",
                image: "/photo-store1_1604328698692-f76ea9498e76.jpg",
                address: "123 Beauty Blvd, New York, NY 10001",
                phone: "+1 (212) 555-7890",
                hours: "Mon-Sat: 10am-8pm, Sun: 11am-6pm",
                isReversed: false,
              },
              {
                name: "Glamoré Beauty Boutique",
                image: "/photo-saleStore_1607083206968-13611e3d76db.jpg",
                address: "456 Cosmetic Ave, Los Angeles, CA 90048",
                phone: "+1 (310) 555-1234",
                hours: "Mon-Sat: 9am-9pm, Sun: 10am-7pm",
                isReversed: true,
              },
            ].map((store, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  store.isReversed ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Store Image */}
                <div className={`${store.isReversed ? "lg:col-start-2" : ""} relative group overflow-hidden rounded-3xl shadow-xl`}>
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>

                {/* Store Details */}
                <div className={`${store.isReversed ? "lg:col-start-1" : ""} bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50`}>
                  <h3 className="font-serif text-3xl font-bold text-gray-800 mb-6 tracking-wide">
                    {store.name}
                  </h3>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                        <FaMapMarkerAlt className="text-white text-xl" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Address</h4>
                        <p className="text-gray-600 text-lg">{store.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-violet-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                        <FiPhone className="text-white text-xl" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                        <p className="text-gray-600 text-lg">{store.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                        <FaRegClock className="text-white text-xl" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Hours</h4>
                        <p className="text-gray-600 text-lg">{store.hours}</p>
                      </div>
                    </div>
                  </div>

                  <button className="w-full sm:w-auto bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white font-semibold px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-gray-600">
                    Get Directions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
