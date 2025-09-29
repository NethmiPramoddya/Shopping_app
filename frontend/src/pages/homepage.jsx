import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { IoPeopleCircle } from "react-icons/io5";

//  Corrected imports from "assets" folder
import heroBg from "../assets/cosmeticsHero.jpg";
import Products from "../assets/products.jpg";
import About from "../assets/about.jpg";
import Reviews from "../assets/reviews.jpg";


const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <div className="text-center">
        {/* Hero Section */}
        <div
          className="h-[600px] flex flex-col items-center justify-center bg-center bg-cover relative"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="text-white text-center z-10">
            <h1 className="font-bold text-3xl">Discover Your Glam with Glamore'</h1>
            <p className="mt-2">
              Luxury cosmetics designed to make you shine with confidence and beauty.
            </p>
          </div>

          <div className="flex flex-row gap-3 z-10">
            <button
              className="bg-white px-4 py-2 text-pink-600 mt-5 rounded-3xl cursor-pointer font-bold text-sm transition duration-300 hover:bg-pink-100/80"
              onClick={() => {
                navigate("/products");
              }}
            >
              Shop Now
            </button>
            <button
              className="border border-white text-white font-semibold px-4 py-2 mt-5 rounded-3xl cursor-pointer transition duration-300 hover:bg-white/20 hover:text-white"
              onClick={() => {
                navigate("/about-us");
              }}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mt-12 px-6">
          <div
            className="relative w-95 h-80 rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
            onClick={() => {
              navigate("/products");
            }}
          >
            <img
              src={Products}
              alt="Cosmetic Products"
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 p-6 text-white z-10">
              <h2 className="text-2xl font-bold">Products</h2>
              <p className="mt-2 text-sm">
                Explore our premium range of makeup, skincare, and beauty essentials crafted for every skin type.
              </p>
            </div>
          </div>

          <div
            className="relative w-95 h-80 rounded-2xl overflow-hidden shadow-lg group cursor-pointer transform transition duration-300 hover:shadow-2xl hover:-translate-y-1"
            onClick={() => navigate("/about-us")}
          >
            <img
              src={About}
              alt="About Glamore'"
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 p-6 text-white z-10">
              <h2 className="text-xl font-bold">About Us</h2>
              <p className="mt-2 text-sm">
                Learn more about Glamore'—our vision, our passion for beauty, and our commitment to excellence.
              </p>
            </div>
          </div>

          <div
            className="relative w-95 h-80 rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
            onClick={() => {
              navigate("/reviews");
            }}
          >
            <img
              src={Reviews}
              alt="Customer Reviews"
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 p-6 text-white z-10">
              <h2 className="text-2xl font-bold">Reviews</h2>
              <p className="mt-2 text-sm">
                Hear what our happy customers say about their Glamore' experience and why they keep coming back.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Glamore' */}
        <div className="flex flex-col items-center justify-center text-center mt-10">
          <h1 className="font-bold text-2xl ">Why Choose Glamore'</h1>

          <div className="m-5 grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
            <div className="flex flex-row items-center gap-2">
              <FaCheckCircle className="text-pink-400 text-3xl" />
              <div>
                <h2 className="font-semibold text-lg">Premium Quality</h2>
                <p className="text-gray-600">
                  We use only the finest products to bring you safe, long-lasting, and luxurious products.
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center gap-2">
              <MdOutlineAccessTimeFilled className="text-purple-400 text-4xl" />
              <div>
                <h2 className="font-semibold text-lg">Time-Saving Beauty</h2>
                <p className="text-gray-600">
                  Simplify your beauty routine with easy-to-use, effective products for everyday glam.
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center gap-2">
              <IoPeopleCircle className="text-pink-400 text-4xl" />
              <div>
                <h2 className="font-semibold text-lg">Loved by Community</h2>
                <p className="text-gray-600">
                  Trusted by thousands of beauty enthusiasts around the world for enhancing natural beauty.
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center gap-2">
              <FaCheckCircle className="text-purple-400 text-3xl" />
              <div>
                <h2 className="font-semibold text-lg">Cruelty-Free & Safe</h2>
                <p className="text-gray-600">
                  Our products are cruelty-free, ethically sourced, and dermatologist tested for safe use.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="h-[300px] flex flex-col items-center justify-center bg-gradient-to-r from-pink-400 to-purple-400 mt-10 relative">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="space-y-2.5 z-10">
            <h1 className="text-white font-bold text-3xl">
              Ready to Glow with Glamore'?
            </h1>
            <p className="text-white text-lg">
              Join our beauty community today and discover products designed just for you.
            </p>
            <button
              className="border border-white text-pink-400 font-semibold px-4 py-2 mt-5 rounded-3xl cursor-pointer transition duration-300 hover:bg-white/20 hover:text-white z-10"
              onClick={() => {
                navigate("/products");
              }}
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;