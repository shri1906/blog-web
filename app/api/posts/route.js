export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { verifyToken } from "@/lib/auth";
import fs from "fs";
import path from "path";

export async function GET() {
  await connectDB();
  const posts = await Post.find().sort({ createdAt: -1 });
  return NextResponse.json(posts);
}

export async function POST(req) {
  try {
    const decoded = verifyToken(req);
    await connectDB();

    const formData = await req.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const image = formData.get("image");

    let imageName = null;

    if (image && typeof image === "object") {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      imageName = Date.now() + "-" + image.name;
      const uploadPath = path.join(
        process.cwd(),
        "public/uploads",
        imageName
      );

      fs.writeFileSync(uploadPath, buffer);
    }

    const post = await Post.create({
      title,
      content,
      image: imageName,
      admin:decoded.id
    });

    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Unauthorized or failed" },
      { status: 401 }
    );
  }
}
