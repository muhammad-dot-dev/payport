"use server"
import connectDB from "../app/db/connectDb";
import Payment from "../app/models/Payment";
import safepay from "../app/lib/safepay";
import User from "../app/models/User";
import { nanoid } from "nanoid";

export async function initiate(amount, to_user, paymentform) {
    await connectDB();

    const orderId = `ORD-${nanoid(10)}`;

    const payment = await Payment.create({
        name: paymentform.name || "Anonymous",
        to_user,
        orderId,
        message: paymentform.message,
        amount,
    });

    const session = await safepay.payments.session.setup({
        merchant_api_key: process.env.SAFEPAY_PUBLIC_KEY,
        intent: "RAAST",
        mode: "payment",
        currency: "PKR",
        amount: amount * 100,
    });

    // return {
    //     session,
    //     orderId
    // };

    const trackerToken = session.data.tracker.token;
    console.log("SAFEPAy SESSION:", session);

    payment.safepayTrackerToken = trackerToken;
    await payment.save();

    const checkoutUrl = await safepay.checkout.createCheckoutUrl({
        token: trackerToken,
    });

    // const authResponse = await safepay.auth.passport.create();

    // const authToken = authResponse.data;


    // const checkoutURL = safepay.checkouts.payment.create({
    //     tracker: session.data.tracker.token,
    //     tbt: authToken,
    //     environment: "sandbox",
    //     source: "hosted",
    //     redirect_url: "http://localhost:3000/payment/success",
    //     cancel_url: "http://localhost:3000/payment/cancel",
    // });
    console.log("CHECKOUT URL:", checkoutUrl);


    return {
        trackerToken,
        orderId,
        checkoutUrl,
    };
}

export async function fetchuser(username) {
    await connectDB();

    const user = await User.findOne({
        username: username
    }).lean();

    if (!user) {
        return null;
    }

    return JSON.parse(JSON.stringify(user));
}


export async function fetchpayments(username) {
    await connectDB();

    const payments = await Payment.find({
        to_user: username
    })
        .sort({ createdAt: -1 })
        .lean();

    return JSON.parse(JSON.stringify(payments));
}