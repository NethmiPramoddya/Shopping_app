import React, { useEffect, useState } from "react";
import axios from "axios";


export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [productFilter, setProductFilter] = useState("All");

  useEffect(() => {
    // Fetch reviews
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/reviews")
      .then((res) => {
        setReviews(res.data);
        setFilteredReviews(res.data);
      })
      .catch((err) => console.error(err));

  }, []);

  // Apply filters whenever search/rating/product changes
  useEffect(() => {
    let updated = [...reviews];

    // Search in comment
    if (search) {
      updated = updated.filter((r) =>
        r.comment.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by rating
    if (ratingFilter !== "All") {
      updated = updated.filter((r) => r.rating === Number(ratingFilter));
    }

    // Filter by product
    if (productFilter !== "All") {
      updated = updated.filter((r) => r.productId?.name === productFilter);
    }

    setFilteredReviews(updated);
  }, [search, ratingFilter, productFilter, reviews]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50">
      {/* Hero Header */}
      <div className="relative py-20 bg-white">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50/30 to-transparent"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 rounded-full px-4 py-2 mb-8 text-sm font-medium">
            <span>⭐</span>
            <span>Customer Reviews</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            What Our Customers Say
          </h1>
          
          {/* Elegant Divider */}
          <div className="w-24 h-0.5 bg-rose-400 mx-auto mb-6"></div>
          
          {/* Description */}
          <p className="text-lg text-gray-600 leading-relaxed mb-12 max-w-2xl mx-auto">
            Discover authentic experiences and honest feedback from our valued customers who've 
            experienced the luxury and quality of our premium cosmetics.
          </p>

          {/* Simple Feature Icons */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-rose-500">✓</span>
              <span className="font-medium">Verified Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-rose-500">✓</span>
              <span className="font-medium">Authentic Feedback</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-rose-500">✓</span>
              <span className="font-medium">Trusted Quality</span>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/50 text-center">
            <div className="text-3xl font-bold text-rose-600 mb-2">{reviews.length}</div>
            <div className="text-gray-600 font-medium">Total Reviews</div>
          </div>
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/50 text-center">
            <div className="text-3xl font-bold text-rose-600 mb-2">
              {reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : '0'}
            </div>
            <div className="text-gray-600 font-medium">Average Rating</div>
          </div>
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/50 text-center">
            <div className="text-3xl font-bold text-rose-600 mb-2">
              {[...new Set(reviews.map((r) => r.productId?.name))].filter(Boolean).length}
            </div>
            <div className="text-gray-600 font-medium">Products Reviewed</div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/50 mb-12">
          <h2 className="font-serif text-2xl font-bold text-gray-800 mb-6 text-center">Filter Reviews</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Search Reviews</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search in comments..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border-2 border-gray-200 focus:border-rose-300 rounded-xl px-4 py-3 pl-10 text-gray-700 placeholder-gray-400 bg-white/80 backdrop-blur-sm transition-colors duration-300"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Product Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Filter by Product</label>
              <select
                className="w-full border-2 border-gray-200 focus:border-rose-300 rounded-xl px-4 py-3 text-gray-700 bg-white/80 backdrop-blur-sm transition-colors duration-300"
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
              >
                <option value="All">All Products</option>
                {[...new Set(reviews.map((r) => r.productId?.name))].map(
                  (name, idx) =>
                    name && (
                      <option key={idx} value={name}>
                        {name}
                      </option>
                    )
                )}
              </select>
            </div>

            {/* Rating Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Filter by Rating</label>
              <select
                className="w-full border-2 border-gray-200 focus:border-rose-300 rounded-xl px-4 py-3 text-gray-700 bg-white/80 backdrop-blur-sm transition-colors duration-300"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
              >
                <option value="All">All Ratings</option>
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} ⭐ {r === 1 ? 'Star' : 'Stars'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl font-bold text-gray-800 mb-4">
              {filteredReviews.length === reviews.length ? 'All Reviews' : 'Filtered Results'}
            </h2>
            <p className="text-gray-600">
              Showing {filteredReviews.length} of {reviews.length} reviews
            </p>
          </div>

          {filteredReviews.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Reviews Found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredReviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    {review.productId?.image && (
                      <div className="flex-shrink-0">
                        <img
                          src={review.productId.image[0]}
                          alt={review.productId.name}
                          className="w-16 h-16 object-cover rounded-xl shadow-md"
                        />
                      </div>
                    )}

                    {/* Review Content */}
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {review.userId?.firstName?.charAt(0)?.toUpperCase() || 'A'}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {review.userId?.firstName
                                ? `${review.userId.firstName} ${review.userId.lastName}`
                                : "Anonymous Customer"}
                            </p>
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-400 text-sm">
                                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                              </span>
                              <span className="text-xs text-gray-500 ml-1">
                                {review.rating}/5
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Comment */}
                      <p className="text-gray-700 leading-relaxed mb-4 italic">
                        "{review.comment}"
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between text-sm">
                        <a
                          href={`/product/${review.productId?._id}`}
                          className="font-medium text-rose-600 hover:text-rose-700 transition-colors duration-300 flex items-center gap-1"
                        >
                          <span>🛍️</span>
                          {review.productId?.name}
                        </a>
                        <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Load More Section */}
        {filteredReviews.length > 0 && (
          <div className="text-center">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/50">
              <h3 className="font-serif text-xl font-bold text-gray-800 mb-4">Want to see more reviews?</h3>
              <p className="text-gray-600 mb-6">
                Discover more authentic customer experiences and detailed product insights
              </p>
              <button className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white font-semibold px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 border border-gray-700 hover:border-gray-600">
                Load More Reviews
              </button>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-3xl p-12 border border-rose-200">
            <div className="text-5xl mb-4">✨</div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Share Your Experience
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Have you tried our products? We'd love to hear about your experience. 
              Your review helps other customers make informed decisions.
            </p>
            <button 
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold px-8 py-4 rounded-full hover:from-rose-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.location.href = '/products'}
            >
              Shop & Review Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
