import React from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaGlobe, FaHeart, FaStar, FaChevronDown } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import aboutHero from "../assets/about.jpg"; // ✅ background hero

export default function AboutUs() {
  const scrollToTimeline = () => {
    const timelineSection = document.getElementById('timeline-section');
    if (timelineSection) {
      timelineSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50">
      {/* Hero Section */}
      <section
        className="min-h-screen flex flex-col items-center justify-center bg-center bg-cover relative overflow-hidden"
        style={{ backgroundImage: `url(${aboutHero})` }}
      >
        {/* Elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
        
        {/* Floating sparkles for luxury effect */}
        <div className="absolute top-20 left-20 animate-pulse">
          <HiSparkles className="text-white/30 text-4xl" />
        </div>
        <div className="absolute top-32 right-32 animate-pulse delay-700">
          <HiSparkles className="text-rose-300/40 text-3xl" />
        </div>
        <div className="absolute bottom-40 left-32 animate-pulse delay-1000">
          <HiSparkles className="text-pink-300/30 text-2xl" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            className="inline-flex items-center px-6 py-2 mb-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HiSparkles className="text-rose-300 mr-2" />
            <span className="text-white text-sm font-medium tracking-wider uppercase">Our Story</span>
          </motion.div>

          <motion.h1
            className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 tracking-wide leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Journey with{" "}
            <span className="text-transparent bg-gradient-to-r from-rose-300 to-pink-200 bg-clip-text">
              Glamore'
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-rose-100 mb-12 font-light leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From a small dream to a global beauty community, Glamore' has always
            been about empowering confidence and celebrating individuality through luxurious, ethical cosmetics.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button 
              onClick={scrollToTimeline}
              className="group bg-white/20 backdrop-blur-md text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-gray-800 transition-all duration-300 hover:scale-105 border border-white/30"
            >
              <span className="flex items-center gap-2">
                Discover Our Story
                <FaChevronDown className="group-hover:text-rose-500 transition-colors duration-300" />
              </span>
            </button>
          </motion.div>
        </div>

        {/* Animated scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FaChevronDown className="text-white/60 text-2xl" />
        </motion.div>
      </section>

      {/* Journey Timeline */}
      <section id="timeline-section" className="py-20 px-6 bg-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 right-10 opacity-10">
          <HiSparkles className="text-rose-400 text-8xl" />
        </div>
        <div className="absolute bottom-20 left-10 opacity-10">
          <HiSparkles className="text-pink-400 text-6xl" />
        </div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-wide">
              The Glamore' Story
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Every milestone in our journey reflects our commitment to beauty, ethics, and empowerment
            </p>
          </motion.div>

          <div className="relative">
            {/* Gradient timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-400 via-pink-400 to-purple-400 transform md:-translate-x-1/2 rounded-full"></div>

            <div className="space-y-16">
              {[
                {
                  year: "2018",
                  title: "The Beginning",
                  desc: "Founded with a passion for redefining luxury beauty with cruelty-free products that celebrate natural radiance.",
                },
                {
                  year: "2020",
                  title: "Growing Community",
                  desc: "Our products gained love from thousands worldwide, making Glamore' a trusted name in premium cosmetics and skincare.",
                },
                {
                  year: "2022",
                  title: "Innovation & Expansion",
                  desc: "Introduced new skincare and makeup lines crafted with safe, ethical ingredients sourced globally for exceptional quality.",
                },
                {
                  year: "2024",
                  title: "Global Recognition",
                  desc: "Celebrated by beauty lovers globally, we continue our mission of empowering natural glam and sustainable beauty practices.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                >
                  {/* Floating glow dot */}
                  <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full shadow-lg transform md:-translate-x-1/2 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>

                  {/* Timeline card */}
                  <div className={`flex-1 ml-16 md:ml-0 ${i % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                    <motion.div
                      className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-rose-100"
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text">
                          {item.year}
                        </span>
                        <div className="flex-1 h-px bg-gradient-to-r from-rose-200 to-transparent"></div>
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-gray-800 mb-3 hover:text-rose-600 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {item.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden md:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-rose-50 via-white to-pink-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-purple-400 to-rose-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-wide">
              What We Stand For
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Our core values guide every decision we make, ensuring beauty that's ethical, sustainable, and empowering
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaLeaf className="text-4xl" />,
                title: "Sustainability",
                desc: "Eco-friendly packaging and ethical sourcing practices for a better planet and future generations.",
                color: "emerald",
                gradient: "from-emerald-400 to-teal-500",
                shadow: "shadow-[0_0_20px_rgba(52,211,153,0.4)]",
              },
              {
                icon: <FaGlobe className="text-4xl" />,
                title: "Global Reach",
                desc: "Trusted by customers around the world, connecting diverse beauty communities with premium products.",
                color: "blue",
                gradient: "from-blue-400 to-indigo-500",
                shadow: "shadow-[0_0_20px_rgba(96,165,250,0.4)]",
              },
              {
                icon: <FaHeart className="text-4xl" />,
                title: "Cruelty-Free",
                desc: "Never tested on animals—because true beauty should never cause harm to any living being.",
                color: "pink",
                gradient: "from-pink-400 to-rose-500",
                shadow: "shadow-[0_0_20px_rgba(244,114,182,0.4)]",
              },
              {
                icon: <FaStar className="text-4xl" />,
                title: "Excellence",
                desc: "Premium quality products meticulously designed for long-lasting glam and exceptional performance.",
                color: "amber",
                gradient: "from-amber-400 to-orange-500",
                shadow: "shadow-[0_0_20px_rgba(251,191,36,0.4)]",
              },
            ].map((val, i) => (
              <motion.div
                key={i}
                className="group text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <motion.div
                  className="bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-white/50 h-full"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Animated icon with glow effect */}
                  <motion.div
                    className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${val.gradient} flex items-center justify-center text-white ${val.shadow} group-hover:scale-110 transition-all duration-300`}
                    whileHover={{ 
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    {val.icon}
                  </motion.div>

                  <h3 className="font-serif text-2xl font-bold text-gray-800 mb-4 group-hover:text-rose-600 transition-colors duration-300">
                    {val.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {val.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Additional trust indicators */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { label: "Years of Excellence", value: "6+" },
              { label: "Happy Customers", value: "50K+" },
              { label: "Products Sold", value: "1M+" },
              { label: "Countries Served", value: "25+" },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 bg-white/40 backdrop-blur-md rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Floating elements for luxury effect */}
        <div className="absolute top-10 left-10 animate-bounce delay-300">
          <HiSparkles className="text-white/30 text-3xl" />
        </div>
        <div className="absolute bottom-10 right-10 animate-bounce delay-700">
          <HiSparkles className="text-white/20 text-2xl" />
        </div>
        <div className="absolute top-20 right-20 animate-pulse delay-500">
          <FaHeart className="text-white/25 text-4xl" />
        </div>
        
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join the Glamore' Journey
          </motion.h2>
          
          <motion.p
            className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Together, let's make beauty more empowering, ethical, and inspiring for generations to come.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              className="group bg-white text-rose-500 font-semibold px-8 py-4 rounded-full hover:bg-rose-100 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                Shop Our Collection
                <FaStar className="group-hover:text-rose-600 transition-colors duration-300" />
              </span>
            </motion.button>
            
            <motion.button
              className="group border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-gray-800 transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                Learn More
                <FaHeart className="group-hover:text-rose-500 transition-colors duration-300" />
              </span>
            </motion.button>
          </motion.div>

          {/* Additional brand promise */}
          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { icon: <FaHeart />, text: "Cruelty-Free Always" },
              { icon: <FaLeaf />, text: "Sustainably Sourced" },
              { icon: <FaStar />, text: "Premium Quality" },
            ].map((promise, i) => (
              <div key={i} className="flex items-center justify-center gap-3 text-white/90">
                <div className="text-xl">{promise.icon}</div>
                <span className="font-medium">{promise.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}