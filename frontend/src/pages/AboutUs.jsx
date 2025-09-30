import React from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaGlobe, FaHeart, FaStar } from "react-icons/fa";
import aboutHero from "../assets/about.jpg"; // ✅ background hero

export default function AboutUs() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div
        className="h-[500px] flex flex-col items-center justify-center bg-center bg-cover relative"
        style={{ backgroundImage: `url(${aboutHero})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="text-white text-center z-10 px-4">
          <motion.h1
            className="font-bold text-4xl md:text-5xl"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Our Journey with Glamore'
          </motion.h1>
          <motion.p
            className="mt-4 text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            From a small dream to a global beauty community, Glamore' has always
            been about empowering confidence and celebrating individuality.
          </motion.p>
        </div>
      </div>

      {/* Journey Timeline */}
      <div className="max-w-5xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          The Glamore' Story
        </h2>
        <div className="relative border-l-4 border-pink-400 space-y-12">
          {[
            {
              year: "2018",
              title: "The Beginning",
              desc: "Founded with a passion for redefining luxury beauty with cruelty-free products.",
            },
            {
              year: "2020",
              title: "Growing Community",
              desc: "Our products gained love from thousands worldwide, making Glamore' a trusted name in cosmetics.",
            },
            {
              year: "2022",
              title: "Innovation & Expansion",
              desc: "Introduced new skincare and makeup lines crafted with safe, ethical ingredients.",
            },
            {
              year: "2024",
              title: "Global Recognition",
              desc: "Celebrated by beauty lovers globally, we continue our mission of empowering natural glam.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="ml-6 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <span className="absolute -left-10 top-0 w-8 h-8 flex items-center justify-center rounded-full bg-pink-400 text-white font-bold shadow-lg">
                {item.year}
              </span>
              <h3 className="text-xl font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          What We Stand For
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            {
              icon: <FaLeaf className="text-green-500 text-4xl mx-auto" />,
              title: "Sustainability",
              desc: "Eco-friendly packaging and ethical sourcing for a better planet.",
            },
            {
              icon: <FaGlobe className="text-blue-500 text-4xl mx-auto" />,
              title: "Global Reach",
              desc: "Trusted by customers around the world, connecting beauty communities.",
            },
            {
              icon: <FaHeart className="text-pink-500 text-4xl mx-auto" />,
              title: "Cruelty-Free",
              desc: "Never tested on animals—because beauty should never harm.",
            },
            {
              icon: <FaStar className="text-yellow-500 text-4xl mx-auto" />,
              title: "Excellence",
              desc: "Premium quality products designed for long-lasting glam.",
            },
          ].map((val, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
              whileHover={{ scale: 1.05 }}
            >
              {val.icon}
              <h3 className="text-xl font-semibold mt-4">{val.title}</h3>
              <p className="text-gray-600 mt-2">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="h-[300px] flex flex-col items-center justify-center bg-gradient-to-r from-pink-400 to-purple-400 relative">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="z-10 text-center px-4">
          <h1 className="text-white font-bold text-3xl">
            Join the Glamore' Journey
          </h1>
          <p className="text-white text-lg mt-2">
            Together, let’s make beauty more empowering, ethical, and inspiring.
          </p>
          <button className="border border-white text-white font-semibold px-6 py-2 mt-5 rounded-3xl cursor-pointer transition duration-300 hover:bg-white hover:text-pink-500">
            Shop Our Collection
          </button>
        </div>
      </div>
    </div>
  );
}