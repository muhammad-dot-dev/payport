import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/db";
import Payment from "@/models/Payment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import ToastProvider from '../Toastprovider'

export async function POST(req) {
  await connectDB();
  const raw = await req.text();
  const signature = req.headers.get("x-sfpy-signature");

  const expected = crypto
    .createHmac("sha256", process.env.SAFEPAY_WEBHOOK_SECRET)
    .update(raw)
    .digest("hex");

  if (signature !== expected) {
      toast.error("FAILED!")
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(raw);
  const paymentId = event?.data?.metadata?.paymentId; // exact event shape — confirm against a real sandbox webhook payload

  if (!paymentId) {
    
    return NextResponse.json({ received: true });

  }

  if (event.status === "PAID" || event.type === "payment.success") {
    await Payment.findByIdAndUpdate(paymentId, {
      status: "paid",
      done: true,
      updatedAt: new Date(),
      
    },
    toast.success("SUCCESFUL!"),);
  } else if (event.status === "FAILED") {
    await Payment.findByIdAndUpdate(paymentId, { status: "failed", updatedAt: new Date() });
    toast.error("FAILED!")
  }

  return NextResponse.json({ received: true });
}