import express from 'express'
import { DeleteReview, getAllReviewsForAProduct, postANewReview } from '../Controller/reviewController.js';

const reviewRouter = express.Router();

reviewRouter.get("/:productId",getAllReviewsForAProduct)
reviewRouter.post("/:productId", postANewReview)
reviewRouter.delete("/:id",DeleteReview)

export default reviewRouter;