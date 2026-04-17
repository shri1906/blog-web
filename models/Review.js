import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // ✅ model name, not collection
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review =
  mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
