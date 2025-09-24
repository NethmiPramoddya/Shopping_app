import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function ReviewForm({productId, onReviewAdded}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

    async function handleSubmit(e){
       e.preventDefault();
       try{
        // get token from localStorage
        const token = localStorage.getItem("token");

        const res = await axios.post(import.meta.env.VITE_BACKEDN_URL+"/api/reviews",{productId, rating, comment},{
            headers: {
            Authorization: `Bearer ${token}`,
          },
        }
    )
        // clear form
      setRating(5);
      setComment("");

       // notify parent (to refresh reviews list)
      if (onReviewAdded) {
        onReviewAdded(res.data);
      }
       }catch(err){
        console.error("Failed to add review:", err);
        toast.error("Failed to submit review. Please try again.");
       }
    }
  return (
    <div>
      <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow-md space-y-4"
    >
      <div>
        <label className="block text-sm font-medium">Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border p-2 rounded w-full"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} ⭐
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 rounded w-full"
          rows="3"
        />
      </div>

      <button
        type="submit"
        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
      >
        Submit Review
      </button>
    </form>
    </div>
  )
}
