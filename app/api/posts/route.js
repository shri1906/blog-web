export const runtime = "nodejs"; // ✅ Required: jsonwebtoken needs Node.js runtime
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import Post from "@/models/Post";
import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import fs from "fs";
import path from "path";

// GET all posts — public, no auth needed
export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find().sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (err) {
    console.error("GET POSTS ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// CREATE post — protected
export async function POST(req) {
  try {
    // ✅ Verify token first — throws 'Unauthorized' if invalid/missing
    const decoded = verifyToken(req);

    await connectDB();

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

    let imageName = null;

    // ✅ Save image file to disk if provided
    if (imageFile && typeof imageFile === "object" && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), "public/uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      imageName = Date.now() + "-" + (imageFile.name || "post.png");
      fs.writeFileSync(path.join(uploadDir, imageName), buffer);
    }

    const post = await Post.create({
      title,
      content,
      image: imageName,
      admin: decoded.id,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.error("CREATE POST ERROR:", err);

    const isAuthError =
      err.message === "No auth" ||
      err.message === "No token" ||
      err.name === "JsonWebTokenError" ||
      err.name === "TokenExpiredError";

    return NextResponse.json(
      { error: isAuthError ? "Unauthorized" : err.message },
      { status: isAuthError ? 401 : 500 }
    );
  }
}
