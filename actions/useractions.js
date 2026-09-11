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
    console.log(
        "FULL TRACKER:",
        JSON.stringify(session.data.tracker, null, 2)
    );

    // return {
    //     session,
    //     orderId
    // };

    const trackerToken = session.data.tracker.token;
    console.log("SAFEPAy SESSION:", session);
    console.log(
        "NEXT ACTIONS:",
        JSON.stringify(session.data.tracker.next_actions, null, 2)
    );

    payment.safepayTrackerToken = trackerToken;
    await payment.save();

    const checkoutUrl =
        `https://sandbox.api.getsafepay.com/components?` +
        `env=sandbox&beacon=${encodeURIComponent(trackerToken)}`;

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
    }).sort({ createdAt: -1 }).lean();

    return JSON.parse(JSON.stringify(payments));
}


export async function updateProfile(data, oldusername) {
    await connectDB();

    const ndata = Object.fromEntries(data);

    // Check if username is being changed
    if (oldusername !== ndata.username) {
        // Check whether the NEW username is already taken
        const existingUser = await User.findOne({
            username: ndata.username,
        });

        if (existingUser) {
            return { error: "Username already exists" };
        }
    }

    // Find the current user and update their profile
    const user = await User.findOneAndUpdate(
        { username: oldusername },
        {
            name: ndata.name,
            username: ndata.username,
            razorpayKeyId: ndata.razorpayKeyId,
            razorpayKeySecret: ndata.razorpayKeySecret,
        },
        { new: true }
    );
    if (!user) {
        return { error: "User not found" };
    }

    return { success: true, user };



}

