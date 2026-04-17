import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    image: String,
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin", // 👈 MUST MATCH MODEL NAME
      required: true,
    },
  },
  { timestamps: true }
);

const Post =
  mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;


