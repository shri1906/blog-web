export const runtime = "nodejs";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";

export async function POST(req) {
  await connectDB();
  const formData = await req.formData();

  const name = formData.get("name");
  const email = formData.get("email");
  const rawPassword = formData.get("password");
  const profileImage = formData.get("profileImage");

  if (!name || !email || !rawPassword) {
    return NextResponse.json(
      { error: "Required fields missing" },
      { status: 400 },
    );
  }

  const cleanPassword = String(rawPassword).trim();
  const hashedPassword = await bcrypt.hash(cleanPassword, 10);

  let imageName = null;
  if (profileImage && typeof profileImage === "object") {
    const bytes = await profileImage.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = path.join(process.cwd(), "public/uploads/admins");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    imageName = Date.now() + "-" + (profileImage.name || "profile.png");
    fs.writeFileSync(path.join(uploadDir, imageName), buffer);
  }

  try {
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword, // Store the hash
      profileImage: imageName,
    });

    return NextResponse.json({ message: "Admin created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 400 },
    );
  }
}
