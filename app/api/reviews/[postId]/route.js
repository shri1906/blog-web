export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Review from "@/models/Review";
import mongoose from "mongoose";

export async function GET(req, context) {
  try {
    await connectDB();

    const { postId } = await context.params;

    // ✅ Validate postId before querying
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return NextResponse.json(
        { error: "Invalid post ID" },
        { status: 400 }
      );
    }

    const reviews = await Review.find({ postId }).sort({ createdAt: -1 });

    return NextResponse.json(reviews);
  } catch (err) {
    console.error("GET REVIEWS ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
