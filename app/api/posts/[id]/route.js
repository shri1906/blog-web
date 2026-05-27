export const runtime = "nodejs";

import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { verifyToken } from "@/lib/auth";

/* ======================
   GET SINGLE POST
====================== */
export async function GET(req, context) {
  await connectDB();

  // ✅ params must be awaited
  const { id } = await context.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid post id" },
      { status: 400 }
    );
  }

  const post = await Post.findById(id);

  if (!post) {
    return NextResponse.json(
      { error: "Post not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(post);
}

export async function PUT(req, context) {
  try {
    const decoded = verifyToken(req); // ✅ get admin id
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid post id" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    const updateData = {
      title: formData.get("title"),
      content: formData.get("content"),
    };

    // 🔒 OWNERSHIP CHECK
    const post = await Post.findOneAndUpdate(
      { _id: id, admin: decoded.id },
      updateData,
      { new: true }
    );

    if (!post) {
      return NextResponse.json(
        { error: "Not allowed or post not found" },
        { status: 403 }
      );
    }

    return NextResponse.json(post);
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}

export async function DELETE(req, context) {
  try {
    const decoded = verifyToken(req); // ✅ get admin id
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid post id" },
        { status: 400 }
      );
    }

    // 🔒 OWNERSHIP CHECK
    const post = await Post.findOneAndDelete({
      _id: id,
      admin: decoded.id,
    });

    if (!post) {
      return NextResponse.json(
        { error: "Not allowed or post not found" },
        { status: 403 }
      );
    }

    return NextResponse.json({ message: "Post deleted" });
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}
