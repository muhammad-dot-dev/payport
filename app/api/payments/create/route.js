import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import connectDB from "@/lib/db";
import Payment from "@/models/Payment";
import safepay from "@/lib/safepay";

export async function POST(req) {
  await connectDB();
  const { name, to_user, amount, message } = await req.json();

  const orderId = `ORD-${nanoid(10)}`;

  const payment = await Payment.create({
    name,
    to_user,
    orderId,
    message,
    amount,
  });

  const session = await safepay.payments.session.setup({
    merchant_api_key: process.env.SAFEPAY_PUBLIC_KEY,
    intent: "RAAST", // verify this literal value in your dashboard/docs — not guaranteed
    mode: "payment",
    currency: "PKR",
    amount: amount * 100, // Safepay expects the smallest currency unit (paisa)
    metadata: { orderId, paymentId: payment._id.toString() },
  });

  payment.safepayTrackerToken = session.tracker.token;
  await payment.save();

  return NextResponse.json({ trackerToken: session.tracker.token, orderId });
}