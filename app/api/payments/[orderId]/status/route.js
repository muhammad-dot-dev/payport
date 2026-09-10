import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Payment from "@/models/Payment";

export async function GET(req, { params }) {
  await connectDB();
  const payment = await Payment.findOne({ orderId: params.orderId });
  if (!payment) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ status: payment.status, done: payment.done });
}