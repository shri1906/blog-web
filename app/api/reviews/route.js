export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Review from "@/models/Review";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { postId, username, rating, comment } = body;

    // ✅ Validate all required fields
    if (!postId || !username || !comment || rating == null) {
      return NextResponse.json(
        { error: "postId, username, rating, and comment are required" },
        { status: 400 }
      );
    }

    // ✅ Validate postId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return NextResponse.json(
        { error: "Invalid post ID" },
        { status: 400 }
      );
    }

    // ✅ Validate rating range
    const ratingNum = Number(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const review = await Review.create({
      postId,
      username: username.trim(),
      rating: ratingNum,
      comment: comment.trim(),
    });

    return NextResponse.json(review, { status: 201 });
  } catch (err) {
    console.error("CREATE REVIEW ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
