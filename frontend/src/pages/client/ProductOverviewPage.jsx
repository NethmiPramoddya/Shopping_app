import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader";
import ImageSlider from "../../components/ImageSlider";
import { addToCart, getCart } from "../../utils/cart";
import toast from "react-hot-toast";

export default function ProductOverviewPage() {
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
  }, [status]);

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
    try {
      const token = localStorage.getItem("token");
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
      console.error(err);
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="w-full flex justify-center  p-4">
      {status === "loading" && <Loader />}
      {status === "success" && product && (
        <div className="w-full flex flex-col items-center  p-4">
          {/* PRODUCT LAYOUT */}
          <div className="w-full max-w-6xl flex flex-col md:flex-row md:gap-12 lg:gap-20">
            {/* Left: Images */}
            <div className="w-full md:w-1/2 mt-20 flex justify-center items-center">
              <ImageSlider images={product.image} />
            </div>

            {/* Right: Content */}
            <div className="w-full md:w-1/2 flex flex-col md:pt-10 lg:pt-20 items-center gap-6 px-2">
              <h1 className="text-2xl font-bold text-center">
                {product.name}{" "}
                <span className="font-light">
                  {product.altNames.join(" | ")}
                </span>
              </h1>

              <p className="text-base md:text-lg text-center md:text-left">
                {product.description}
              </p>

              {/* Price */}
              <div className="w-full flex flex-col items-center mt-4">
                {product.labelledPrice > product.price ? (
                  <div className="flex flex-wrap justify-center items-center gap-3">
                    <span className="text-xl md:text-2xl font-semibold text-red-500 line-through">
                      {product.labelledPrice.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                    <span className="text-2xl md:text-3xl font-bold text-green-500">
                      {product.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl md:text-3xl font-bold text-green-500">
                    {product.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                )}
              </div>

              {/* Buttons */}
              <div className="w-full flex flex-col sm:flex-row mt-6 justify-center items-center gap-4">
                <button
                  className="w-full sm:w-[200px] h-[50px] rounded-xl shadow text-white bg-blue-800 border-2 border-blue-900 hover:bg-white hover:text-blue-900"
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
                  className="w-full sm:w-[200px] h-[50px] rounded-xl shadow text-white bg-accent border-2 border-accent hover:bg-white hover:text-accent"
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

          {/* REVIEWS SECTION */}
          <div className="w-full max-w-4xl mt-16">
            <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>

            {/* Toggle Button */}
            <button
              onClick={() => setShowForm(!showForm)}
              className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {showForm ? "Close Review Form" : "Write a Review"}
            </button>

            {/* Review Form */}
            <div
              className={`overflow-hidden transition-all duration-500 ${
                showForm ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                <h3 className="font-semibold mb-2">Your Review</h3>
                <div className="flex gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() =>
                        setNewReview({ ...newReview, rating: num })
                      }
                      className={`text-2xl ${
                        num <= newReview.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <textarea
                  className="w-full border rounded p-2 mb-2"
                  placeholder="Write your comment..."
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      comment: e.target.value,
                    })
                  }
                />
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  onClick={handleReviewSubmit}
                >
                  Submit Review
                </button>
              </div>
            </div>

             {/* Average Rating */}
            {reviews.length > 0 ? (
              <div className="mb-6">
                <p className="text-lg">
                  ⭐{" "}
                  {(
                    reviews.reduce((acc, r) => acc + r.rating, 0) /
                    reviews.length
                  ).toFixed(1)}{" "}
                  out of 5
                </p>
                <p className="text-sm text-gray-500">
                  {reviews.length} reviews
                </p>
              </div>
            ) : (
              <p className="mb-6">No reviews yet.</p>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.map((r) => (
                <div
                  key={r._id}
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500 text-lg">
                        {"★".repeat(r.rating)}
                      </span>
                      <span className="font-semibold">
                        {r.userId ? `${r.userId.firstName} ${r.userId.lastName}` : "Anonymous"}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {status === "error" && (
        <div className="text-red-500">Error loading product details</div>
      )}
    </div>
  );
}
