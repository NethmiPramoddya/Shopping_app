import React, { useEffect, useState } from "react";
import heroBg from "../../assets/reviews.jpg";
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
    <>
    {/* Header */}
      <div
                className="h-[500px] flex flex-col items-center justify-center bg-center bg-cover relative"
                style={{ backgroundImage: `url(${heroBg})` }}
              >
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="text-white text-center z-10">
                  <h1 className="text-3xl font-bold">All Reviews</h1>
                  <p className="text-white mt-5">See what customers are saying about our products</p>
                </div>
                </div>
    <div className="max-w-6xl mx-auto p-6">

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search reviews..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-xl px-4 py-2 w-full md:w-1/3"
        />

        {/* Product Filter */}
        <select
          className="border rounded-xl px-3 py-2"
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

        {/* Rating Filter */}
        <select
          className="border rounded-xl px-3 py-2"
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
        >
          <option value="All">All Ratings</option>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Stars
            </option>
          ))}
        </select>
      </div>

      {/* Highlights Section (optional, if you fetch from backend) */}
      {/* Example UI (static for now) */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-4 border rounded-xl shadow-sm bg-white">
          <h2 className="font-semibold mb-2">Top Rated Products</h2>
          <ul className="text-gray-700 space-y-1">
            <li>🌟 Product A (4.8 avg)</li>
            <li>🌟 Product B (4.6 avg)</li>
          </ul>
        </div> */}

        {/* <div className="p-4 border rounded-xl shadow-sm bg-white">
          <h2 className="font-semibold mb-2">Most Reviewed</h2>
          <ul className="text-gray-700 space-y-1">
            <li>📝 Product C (120 reviews)</li>
            <li>📝 Product D (95 reviews)</li>
          </ul>
        </div>
      </div> */}

      {/* Review Feed */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div
            key={review._id}
            className="p-4 border rounded-xl shadow-sm bg-white flex gap-4"
          >
            {/* Product Image */}
            {review.productId?.image && (
              <img
                src={review.productId.image[0]}
                alt={review.productId.name}
                className="w-20 h-20 object-cover rounded-xl"
              />
            )}

            {/* Review Info */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">
                  {review.userId?.firstName
                    ? `${review.userId.firstName} ${review.userId.lastName}`
                    : "Anonymous"}
                </p>
                <p className="text-yellow-500">
                  {"⭐".repeat(review.rating)}
                </p>
              </div>
              <p className="text-gray-700">{review.comment}</p>
              <p className="text-sm text-gray-500 mt-2">
                For{" "}
                <a
                  href={`/product/${review.productId?._id}`}
                  className="font-medium text-indigo-600"
                >
                  {review.productId?.name}
                </a>{" "}
                • {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination / Load More (for now just placeholder) */}
      <div className="text-center mt-8">
        <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700">
          Load More
        </button>
      </div>
    </div>
    </>
  );
}
