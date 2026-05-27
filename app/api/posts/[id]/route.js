export const runtime = "nodejs";

import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { verifyToken } from "@/lib/auth";
import fs from "fs";
import path from "path";

/* ── helpers ── */
function isAuthError(err) {
  return (
    err.message === "No auth" ||
    err.message === "No token" ||
    err.name === "JsonWebTokenError" ||
    err.name === "TokenExpiredError"
  );
}

/* ── GET single post (public) ── */
export async function GET(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid post id" }, { status: 400 });
    }

  const post = await Post.findById(id)
  .populate("admin", "name");
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/* ── PUT update post (protected) ── */
export async function PUT(req, context) {
  try {
    const decoded = verifyToken(req);
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid post id" }, { status: 400 });
    }

    const formData = await req.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const imageFile = formData.get("image");

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const updateData = { title, content };

    // ✅ Save new image to disk if one was uploaded
    if (imageFile && typeof imageFile === "object" && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), "public/uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const imageName = Date.now() + "-" + (imageFile.name || "post.png");
      fs.writeFileSync(path.join(uploadDir, imageName), buffer);
      updateData.image = imageName;
    }

    // ✅ Ownership check: only the admin who created the post can update it
    const post = await Post.findOneAndUpdate(
      { _id: id, admin: decoded.id },
      updateData,
      { new: true }
    );

    if (!post) {
      return NextResponse.json(
        { error: "Post not found or you do not have permission" },
        { status: 403 }
      );
    }

    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json(
      { error: isAuthError(err) ? "Unauthorized" : "Server error" },
      { status: isAuthError(err) ? 401 : 500 }
    );
  }
}

/* ── DELETE post (protected) ── */
export async function DELETE(req, context) {
  try {
    const decoded = verifyToken(req);
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid post id" }, { status: 400 });
    }

    // ✅ Ownership check: only the admin who created the post can delete it
    const post = await Post.findOneAndDelete({
      _id: id,
      admin: decoded.id,
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post not found or you do not have permission" },
        { status: 403 }
      );
    }

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (err) {
    return NextResponse.json(
      { error: isAuthError(err) ? "Unauthorized" : "Server error" },
      { status: isAuthError(err) ? 401 : 500 }
    );
  }
}
