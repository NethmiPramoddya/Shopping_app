import ReviewModel from "../models/review.js";
import User from "../models/user.js";

export async function getAllReviewsForAProduct(req, res){
    try{
        const reviewsPerProduct = await ReviewModel.find({productId: req.params.productId}).populate("userId", "firstName lastName")
        res.json(reviewsPerProduct)
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

export async function postANewReview(req, res){
  try {
    const { rating, comment } = req.body;
    const { productId } = req.params;
    const postReview = new ReviewModel({
      productId,
      userId: req.user.id,
      rating,
      comment
    });
    await postReview.save();
    res.status(201).json(postReview);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
}


export async function DeleteReview(req,res) {
    try{
     await ReviewModel.findByIdAndDelete(req.params.id)
     res.json({ message: "Review deleted" });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

// Get all reviews (for global reviews page)
export async function getAllReviews(req, res) {
  try {
    const reviews = await ReviewModel.find()
      .populate("userId", "firstName lastName")         // get user info
      .populate("productId", "name image")              // get product name + image
      .sort({ createdAt: -1 });                         // newest first

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get highlights (Top Rated + Most Reviewed)
export async function getReviewHighlights(req, res) {
  try {
    const topRated = await ReviewModel.aggregate([
      { $group: { _id: "$productId", avgRating: { $avg: "$rating" } } },
      { $sort: { avgRating: -1 } },
      { $limit: 5 }
    ]);

    const mostReviewed = await ReviewModel.aggregate([
      { $group: { _id: "$productId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({ topRated, mostReviewed });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

