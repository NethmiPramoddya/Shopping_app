import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader";
import ImageSlider from "../../components/ImageSlider";
import { addToCart, getCart } from "../../utils/cart";
import toast from "react-hot-toast";
import ImageSlider1 from "../../components/ImageSlider1";
import { formatLkrPrice } from "../../utils/currency";

export default function ProductOverviewPage1() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });

  const navigate = useNavigate();

  // Fetch product details
  useEffect(() => {
    if (status === "loading") {
      axios
        .get(
          import.meta.env.VITE_BACKEND_URL +
            `/api/products/${params.productId}`
        )
        .then((res) => {
          setProduct(res.data);
          setStatus("success");
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          setStatus("error");
        });
    }
  }, [status, params.productId]);

  // Fetch reviews
  useEffect(() => {
    if (product) {
      axios
        .get(
          import.meta.env.VITE_BACKEND_URL + `/api/reviews/${product._id}`
        )
        .then((res) => setReviews(res.data))
        .catch((err) => console.error("Error fetching reviews:", err));
    }
  }, [product]);

  // Handle submit review
  const handleReviewSubmit = async () => {
    // Validation
    if (newReview.rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!newReview.comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        toast.error("Please login to submit a review");
        navigate("/login");
        return;
      }

      console.log("Submitting review:", {
        productId: product._id,
        rating: newReview.rating,
        comment: newReview.comment
      });

      await axios.post(
          import.meta.env.VITE_BACKEND_URL + `/api/reviews/${product._id}`,
          {
            rating: newReview.rating,
            comment: newReview.comment
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

      toast.success("Review submitted!");
      setNewReview({ rating: 0, comment: "" });

      // reload reviews
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + `/api/reviews/${product._id}`
      );
      setReviews(res.data);
    } catch (err) {
      console.error("Review submission error:", err);
      if (err.response) {
        console.error("Error response:", err.response.data);
        toast.error(err.response.data.message || "Failed to submit review");
      } else {
        toast.error("Failed to submit review");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50">
      {status === "loading" && (
        <div className="flex justify-center items-center min-h-screen">
          <Loader />
        </div>
      )}
      {status === "success" && product && (
        <div className="w-full flex flex-col items-center px-6 py-12">
          {/* PRODUCT LAYOUT */}
          <div className="w-full max-w-7xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-12 border border-white/50 mb-16">
            <div className="flex flex-col lg:flex-row lg:gap-16">
              {/* Left: Images */}
              <div className="w-full lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0">
                <div className="w-full max-w-xs lg:max-w-sm">
                  <ImageSlider1 images={product.image} />
                </div>
              </div>

              {/* Right: Content */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="space-y-6">
                  <div>
                    <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-4">
                      {product.name}
                    </h1>
                    {product.altNames && product.altNames.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.altNames.map((altName, index) => (
                          <span key={index} className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm font-medium">
                            {altName}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-200">
                    {product.labelledPrice > product.price ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-lg text-gray-500 line-through">
                            {formatLkrPrice(product.labelledPrice)}
                          </span>
                          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                            SALE
                          </span>
                        </div>
                        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                          {formatLkrPrice(product.price)}
                        </div>
                      </div>
                    ) : (
                      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                        {formatLkrPrice(product.price)}
                      </div>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      className="flex-1 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white font-semibold py-4 px-8 rounded-full hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-gray-600 cursor-pointer"
                      onClick={() =>
                        navigate("/checkout", {
                          state: {
                            items: [
                              {
                                productId: product.productId,
                                quantity: 1,
                                name: product.name,
                                image: product.image[0],
                                price: product.price,
                              },
                            ],
                          },
                        })
                      }
                    >
                      Buy Now
                    </button>

                    <button
                      className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold py-4 px-8 rounded-full hover:from-rose-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => {
                        addToCart(product, 1);
                        toast.success("Product added to the cart");
                        console.log(getCart());
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* REVIEWS SECTION */}
          <div className="w-full max-w-6xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-12 border border-white/50">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full"></div>
            </div>

            {/* Toggle Button */}
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white font-semibold px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-gray-600"
              >
                {showForm ? "Close Review Form" : "Write a Review"}
              </button>
            </div>

            {/* Review Form */}
            <div
              className={`overflow-hidden transition-all duration-500 ${
                showForm ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="mb-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg">
                <h3 className="font-serif text-xl font-bold text-gray-800 mb-4">Share Your Experience</h3>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() =>
                        setNewReview({ ...newReview, rating: num })
                      }
                      className={`text-3xl transition-colors hover:scale-110 ${
                        num <= newReview.rating
                          ? "text-yellow-400"
                          : "text-gray-300 hover:text-yellow-200"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <textarea
                  className="w-full border-2 border-gray-200 focus:border-rose-300 rounded-xl p-4 mb-4 resize-none h-24 text-gray-700 placeholder-gray-400 bg-white/80 backdrop-blur-sm"
                  placeholder="Tell us about your experience with this product..."
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      comment: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white font-semibold px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-gray-600"
                  onClick={handleReviewSubmit}
                >
                  Submit Review
                </button>
              </div>
            </div>

            {/* Average Rating */}
            <div className="mb-8">
              {reviews.length > 0 ? (
                <div className="text-center p-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border border-white/50">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-3xl">⭐</span>
                    <span className="text-2xl font-bold text-gray-800">
                      {(
                        reviews.reduce((acc, r) => acc + r.rating, 0) /
                        reviews.length
                      ).toFixed(1)}
                    </span>
                    <span className="text-lg text-gray-600">out of 5</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Based on {reviews.length} customer review{reviews.length !== 1 ? 's' : ''}
                  </p>
                </div>
              ) : (
                <div className="text-center p-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-white/50">
                  <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
                </div>
              )}
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((r) => (
                <div
                  key={r._id}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {r.userId ? r.userId.firstName?.charAt(0)?.toUpperCase() || 'A' : 'A'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-yellow-400 text-lg">
                            {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                          </span>
                        </div>
                        <span className="font-semibold text-gray-800">
                          {r.userId ? `${r.userId.firstName} ${r.userId.lastName}` : "Anonymous Customer"}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {status === "error" && (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-red-500 text-lg">Error loading product details</div>
        </div>
      )}
    </div>
  );
}
