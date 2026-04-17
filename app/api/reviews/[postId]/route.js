export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Review from "@/models/Review";

export async function GET(req, context) {
  await connectDB();

  // ✅ unwrap params correctly
  const { postId } = await context.params;

  const reviews = await Review.find({ postId });

  return NextResponse.json(reviews);
}
