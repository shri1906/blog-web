export const runtime = "nodejs";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";

export async function POST(req) {
  await connectDB();

  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Credentials required" },
      { status: 400 },
    );
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return NextResponse.json({ error: "Admin not found" }, { status: 401 });
  }

  // 2. Use identical standardizing logic as Registration
  const cleanPassword = String(password).trim();

  const isMatch = await bcrypt.compare(cleanPassword, admin.password);

  if (!isMatch) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return NextResponse.json({
    token,
    admin: {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      profileImage: admin.profileImage,
    },
  });
}
