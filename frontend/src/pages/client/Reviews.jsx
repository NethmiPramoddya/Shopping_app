import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Reviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${productId}`);
        setReviews(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    }
    fetchReviews();
  }, [productId]);

  if (loading) return <div>Loading reviews...</div>;

  return (
    <div>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id}>
            <p>{review.userId.firstName}: {review.comment}</p>
            <p>Rating: {review.rating} ⭐</p>
          </div>
        ))
      )}
    </div>
  );
}
