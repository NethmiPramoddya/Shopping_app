import express from 'express'
import { DeleteReview, getAllReviews, getAllReviewsForAProduct, getReviewHighlights, postANewReview } from '../Controller/reviewController.js';

const reviewRouter = express.Router();

reviewRouter.get("/", getAllReviews); // new route for ALL reviews
reviewRouter.get("/:productId",getAllReviewsForAProduct)
reviewRouter.post("/:productId", postANewReview)
reviewRouter.delete("/:id",DeleteReview)
reviewRouter.get("/highlights/stats", getReviewHighlights);

export default reviewRouter;