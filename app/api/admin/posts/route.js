export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { verifyToken } from "@/lib/auth";

export async function GET(req) {
  try {
    const decoded = verifyToken(req);
    await connectDB();

    const posts = await Post.find({
      admin: decoded.id,
    }).sort({ createdAt: -1 });

    return NextResponse.json(posts);
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}
