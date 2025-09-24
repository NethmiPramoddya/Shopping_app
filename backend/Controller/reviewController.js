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