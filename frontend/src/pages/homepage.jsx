import { useNavigate } from "react-router-dom";
import { FaGem, FaHeart, FaStar, FaShieldAlt, FaLeaf, FaAward } from "react-icons/fa";
import { HiSparkles, HiChevronDown } from "react-icons/hi";
import { MdTimer, MdVerified } from "react-icons/md";

//  Corrected imports from "assets" folder
import heroBg from "../assets/cosmeticsHero.jpg";
import Products from "../assets/products.jpg";
import About from "../assets/about.jpg";
import Reviews from "../assets/reviews.jpg";
import hero from"../assets/products-9300602_1280.jpg"


const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50">
      {/* Hero Section */}
      <section
        className="min-h-screen flex items-center justify-center bg-center bg-cover relative overflow-hidden"
        style={{ backgroundImage: `url(${hero})` }}
      >
        {/* Elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        
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
          {/* Luxury badge */}
          <div className="inline-flex items-center px-6 py-2 mb-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <FaGem className="text-rose-300 mr-2" />
            <span className="text-white text-sm font-medium tracking-wider uppercase">Premium Beauty Collection</span>
          </div>

          {/* Main heading */}
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 tracking-wide leading-tight">
            Discover Your Glam with{" "}
            <span className="text-transparent bg-gradient-to-r from-rose-300 to-pink-200 bg-clip-text">
              Glamore'
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-rose-100 mb-10 font-light leading-relaxed max-w-2xl mx-auto">
            Luxury cosmetics designed to make you shine with confidence and timeless beauty. 
            Embrace your radiance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => navigate("/products")}
              className="group relative px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-full transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl shadow-lg"
            >
              <span className="flex items-center">
                Shop Now
                <HiSparkles className="ml-2 group-hover:animate-spin" />
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
            
            <button
              onClick={() => navigate("/about-us")}
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full transition-all duration-300 hover:bg-white hover:text-rose-600 backdrop-blur-sm"
            >
              Learn More
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce">
            <HiChevronDown className="text-white/60 text-3xl mx-auto" />
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-wide">
              Our Collections
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Discover our carefully curated collections designed to enhance your natural beauty
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Products Card */}
            <div
              onClick={() => navigate("/products")}
              className="group relative h-96 rounded-3xl overflow-hidden shadow-xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={Products}
                alt="Cosmetic Products"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-rose-900/60 transition-all duration-500"></div>
              
              {/* Floating icon */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-rose-500 transition-all duration-300">
                <HiSparkles className="text-white text-xl" />
              </div>

              <div className="absolute bottom-0 p-8 text-white z-10">
                <h3 className="font-serif text-3xl font-bold mb-3 group-hover:text-rose-200 transition-colors duration-300">
                  Products
                </h3>
                <p className="text-gray-200 leading-relaxed mb-4 group-hover:text-rose-100 transition-colors duration-300">
                  Explore our premium range of makeup, skincare, and beauty essentials crafted for every skin type and occasion.
                </p>
                <div className="flex items-center text-rose-300 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  <span>Explore Collection</span>
                  <HiSparkles className="ml-2" />
                </div>
              </div>
            </div>

            {/* About Card */}
            <div
              onClick={() => navigate("/about-us")}
              className="group relative h-96 rounded-3xl overflow-hidden shadow-xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={About}
                alt="About Glamore'"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-purple-900/60 transition-all duration-500"></div>
              
              <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-purple-500 transition-all duration-300">
                <FaHeart className="text-white text-xl" />
              </div>

              <div className="absolute bottom-0 p-8 text-white z-10">
                <h3 className="font-serif text-3xl font-bold mb-3 group-hover:text-purple-200 transition-colors duration-300">
                  Our Story
                </h3>
                <p className="text-gray-200 leading-relaxed mb-4 group-hover:text-purple-100 transition-colors duration-300">
                  Learn about Glamore's vision, our passion for beauty, and our unwavering commitment to excellence and sustainability.
                </p>
                <div className="flex items-center text-purple-300 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  <span>Discover More</span>
                  <FaHeart className="ml-2" />
                </div>
              </div>
            </div>

            {/* Reviews Card */}
            <div
              onClick={() => navigate("/reviews")}
              className="group relative h-96 rounded-3xl overflow-hidden shadow-xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={Reviews}
                alt="Customer Reviews"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-amber-900/60 transition-all duration-500"></div>
              
              <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-amber-500 transition-all duration-300">
                <FaStar className="text-white text-xl" />
              </div>

              <div className="absolute bottom-0 p-8 text-white z-10">
                <h3 className="font-serif text-3xl font-bold mb-3 group-hover:text-amber-200 transition-colors duration-300">
                  Reviews
                </h3>
                <p className="text-gray-200 leading-relaxed mb-4 group-hover:text-amber-100 transition-colors duration-300">
                  Hear authentic stories from our beauty community and discover why thousands trust Glamore for their daily glow.
                </p>
                <div className="flex items-center text-amber-300 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  <span>Read Reviews</span>
                  <FaStar className="ml-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Glamore' */}
      <section className="py-20 bg-gradient-to-b from-white via-rose-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-wide">
              Why Choose Glamore'
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Experience the difference with our commitment to quality, innovation, and your unique beauty journey
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Premium Quality */}
            <div className="group bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-rose-100">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <FaGem className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-gray-800 mb-3 group-hover:text-rose-600 transition-colors duration-300">
                    Premium Quality
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    We use only the finest ingredients to bring you safe, long-lasting, and luxurious products that deliver exceptional results every time.
                  </p>
                </div>
              </div>
            </div>

            {/* Time-Saving Beauty */}
            <div className="group bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-purple-100">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <MdTimer className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                    Effortless Beauty
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Simplify your beauty routine with easy-to-use, multi-purpose products designed for the modern lifestyle and everyday elegance.
                  </p>
                </div>
              </div>
            </div>

            {/* Loved by Community */}
            <div className="group bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-rose-100">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <FaHeart className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-gray-800 mb-3 group-hover:text-pink-600 transition-colors duration-300">
                    Loved Globally
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Trusted by thousands of beauty enthusiasts worldwide for enhancing natural beauty and building confidence through premium cosmetics.
                  </p>
                </div>
              </div>
            </div>

            {/* Cruelty-Free & Safe */}
            <div className="group bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-emerald-100">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <FaShieldAlt className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                    Ethically Crafted
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Our products are cruelty-free, ethically sourced, and dermatologist tested for safe use on all skin types and tones.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-rose-100">
              <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLeaf className="text-white text-xl" />
              </div>
              <h4 className="font-semibold text-lg text-gray-800 mb-2">100% Natural</h4>
              <p className="text-gray-600 text-sm">Organic Ingredients</p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-purple-100">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdVerified className="text-white text-xl" />
              </div>
              <h4 className="font-semibold text-lg text-gray-800 mb-2">Certified Safe</h4>
              <p className="text-gray-600 text-sm">FDA Approved</p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-amber-100">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-white text-xl" />
              </div>
              <h4 className="font-semibold text-lg text-gray-800 mb-2">5-Star Rated</h4>
              <p className="text-gray-600 text-sm">10K+ Reviews</p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-emerald-100">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAward className="text-white text-xl" />
              </div>
              <h4 className="font-semibold text-lg text-gray-800 mb-2">Award Winner</h4>
              <p className="text-gray-600 text-sm">Beauty Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Floating elements for luxury effect */}
        <div className="absolute top-10 left-10 animate-bounce delay-300">
          <HiSparkles className="text-white/30 text-3xl" />
        </div>
        <div className="absolute bottom-10 right-10 animate-bounce delay-700">
          <FaGem className="text-white/20 text-2xl" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide">
            Ready to Glow with Glamore'?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join our beauty community today and discover products designed to enhance your natural radiance and confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              className="group bg-white text-gray-800 font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={() => navigate("/products")}
            >
              <span className="flex items-center gap-2">
                Shop Collection
                <FaGem className="text-rose-500 group-hover:text-pink-600 transition-colors duration-300" />
              </span>
            </button>
            
            <button
              className="group border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-gray-800 transition-all duration-300 hover:scale-105"
              onClick={() => navigate("/about-us")}
            >
              <span className="flex items-center gap-2">
                Our Story
                <FaHeart className="group-hover:text-rose-500 transition-colors duration-300" />
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HomePage;