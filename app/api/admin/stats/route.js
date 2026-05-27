export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import Review from "@/models/Review";
import Admin from "@/models/Admin";
import { verifyToken } from "@/lib/auth";

export async function GET(req) {
  try {
    // ✅ Verify JWT — throws if missing or invalid
    const decoded = verifyToken(req);

    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const totalPosts = await Post.countDocuments({ admin: decoded.id });

    const adminPosts = await Post.find(
      { admin: decoded.id },
      { _id: 1 }
    );
    const postIds = adminPosts.map((post) => post._id);

    const totalReviews = await Review.countDocuments({
      postId: { $in: postIds },
    });

    const totalAdmins = await Admin.countDocuments();

    const latestPosts = await Post.find({ admin: decoded.id })
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
  } catch (err) {
    // ✅ Return 401 for auth errors, 500 for unexpected errors
    const isAuthError =
      err.message === "No auth" ||
      err.message === "No token" ||
      err.name === "JsonWebTokenError" ||
      err.name === "TokenExpiredError";

    return NextResponse.json(
      { error: isAuthError ? "Unauthorized" : "Server error" },
      { status: isAuthError ? 401 : 500 }
    );
  }
}
