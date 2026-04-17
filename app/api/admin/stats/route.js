export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import Review from "@/models/Review";
import Admin from "@/models/Admin";
import { verifyToken } from "@/lib/auth";

export async function GET(req) {
  try {
    verifyToken(req);
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;

    const limit = 5;
    const skip = (page - 1) * limit;

    const totalPosts = await Post.countDocuments();
    const totalReviews = await Review.countDocuments();
    const totalAdmins = await Admin.countDocuments();

    const latestPosts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("title createdAt");

    return NextResponse.json({
      totalPosts,
      totalReviews,
      totalAdmins,
      latestPosts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to load dashboard stats" },
      { status: 500 }
    );
  }
}
