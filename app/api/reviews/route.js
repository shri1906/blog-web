export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Review from "@/models/Review";

export async function POST(req) {
  await connectDB();

  const body = await req.json();

  const review = await Review.create(body);

  return NextResponse.json(review);
}
