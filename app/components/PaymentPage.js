"use client"
import React, { useEffect, useState } from 'react'
// import Script from 'next/script'
// import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments, initiate } from '../../actions/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import ToastProvider from '../Toastprovider'
import { useRouter } from 'next/navigation'
import { notFound } from "next/navigation"

const PaymentPage = ({ username }) => {
    // const { data: session } = useSession()

    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast.success("Thanks for your donation!")
        }
        router.push(`/${username}`)

    }, [])


    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
    }


    // const pay = async (amount) => {
    //     if (!amount || amount <= 0) {
    //         toast.error("Enter a valid amount")
    //         return
    //     }
    //     setLoading(true)
    //     try {
    //         // `initiate` now creates the Payment doc + Safepay session server-side
    //         // and returns { trackerToken, orderId }
    //         // const { trackerToken, orderId } = await initiate(amount, username, paymentform)

    //         // if (result.checkoutURL) {
    //         //     window.location.href = result.checkoutURL;
    //         // }
    //         const result = await initiate(
    //             amount,
    //             username,
    //             paymentform
    //         );

    //         if (result.checkoutURL) {
    //             window.location.href = result.checkoutURL;
    //         }

    //         const redirectUrl = `${window.location.origin}/${username}/payment?paymentdone=true&orderId=${orderId}`
    //         window.location.href = `https://sandbox.getsafepay.com/embedded/${trackerToken}?redirect_url=${encodeURIComponent(redirectUrl)}`
    //     } catch (err) {
    //         console.error(err)
    //         toast.error("Something went wrong, please try again")
    //         setLoading(false)
    //     }
    // }
    const pay = async () => {
        try {
            if (!paymentform.amount || paymentform.amount <= 0) {
                toast.error("Please enter a valid amount");
                return;
            }
            setLoading(true);

            const result = await initiate(
                Number(paymentform.amount),
                username,
                paymentform
            );

            console.log("Payment result:", result);

            window.location.href = result.checkoutUrl;

        } catch (error) {
            console.error("Payment error:", error);
            toast.error("Something went wrong");
            setLoading(false);
        }
    };

    return (
        <>
            <div className='cover w-full relative flex justify-center items-center'>
                <img className="object-cover w-full h-[350]" src="/cover.jpg" alt="" />
                <div className='absolute flex justify-center items-center -bottom-20 border border-black rounded-full'>
                    <img width={200} height={200} className='rounded-full' src="/profile.jpg" alt="" />
                </div>
            </div>
            <div className="info flex flex-col justify-center items-center my-24">
                <div className='font-bold text-lg'>
                    @{username}
                </div>
                <div className='text-slate-600'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, velit!
                </div>
                <div className='text-slate-600 mb-5'>
                    10000 members .12posts .12$/release
                </div>

                <div className="payment  text-white flex gap-3 w-[80%]">
                    <div className="supporters w-1/2 bg-blue-950 rounded-lg p-3">
                        {/* Show list of all supporters as Leadderboard */}
                        <h2 className='text-lg font-bold  '>Supporters</h2>
                        <ul className='overflow-auto mx-6 text-lg'>
                            <li className='my-2 flex items-center gap-3'>
                                <img className='rounded-full' width={40} src="/profilealt.png" alt="" />
                                <span>Shubham donated <b>30$</b> with a message ""</span>
                            </li>
                            <li className='my-2 flex items-center gap-3'>
                                <img className='rounded-full' width={40} src="/profilealt.png" alt="" />
                                <span>Shubham donated <b>30$</b> with a message ""</span>
                            </li>
                            <li className='my-2 flex items-center gap-3'>
                                <img className='rounded-full' width={40} src="/profilealt.png" alt="" />
                                <span>Shubham donated <b>30$</b> with a message ""</span>
                            </li>

                        </ul>
                    </div>
                    <div className="makepayment w-1/2 bg-blue-950 rounded-lg p-3">
                        <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
                        <div className='flex flex-col gap-2'>
                            {/* <input type="text" className='w-full p-3 rounded-lg bg-blue-800' placeholder='Enter Name' />
                            <input type="text" className='w-full p-3 rounded-lg bg-blue-800' placeholder='Enter Message' />
                            <input type="text" className='w-full p-3 rounded-lg bg-blue-800' placeholder='Enter Amount' />
                            <button className='bg-blue-800 p-3 rounded-lg hover:bg-blue-500 cursor-pointer w-1/5'>Pay</button> */}
                            {/* Or choose from amount */}

                            <input
                                type="text"
                                name="name"
                                required
                                value={paymentform.name}
                                onChange={handleChange}
                                className='w-full p-3 rounded-lg bg-blue-800'
                                placeholder='Enter Name'
                            />
                            <input
                                required
                                type="text"
                                name="message"
                                value={paymentform.message}
                                onChange={handleChange}
                                className='w-full p-3 rounded-lg bg-blue-800'
                                placeholder='Enter Message'
                            />
                            <input
                                type="number"
                                name="amount"
                                value={paymentform.amount}
                                onChange={handleChange}
                                className='w-full p-3 rounded-lg bg-blue-800'
                                placeholder='Enter Amount'
                            />
                            <button
                                className='bg-blue-800 p-3 rounded-lg hover:bg-blue-500 cursor-pointer w-1/5 disabled:opacity-50'
                                onClick={() => pay(Number(paymentform.amount))}
                                disabled={!paymentform.amount || loading}
                            >
                                {loading ? "Redirecting..." : "Pay"}
                            </button>
                        </div>
                        <div className="flex gap-5">
                            <button className='bg-blue-800 p-2 rounded-lg my-3 hover:bg-blue-500 cursor-pointer' onClick={() => { pay(10) }}>Pay Rs. 10</button>
                            <button className='bg-blue-800 p-2 rounded-lg my-3 hover:bg-blue-500 cursor-pointer' onClick={() => { pay(20) }}>Pay Rs. 20</button>
                            <button className='bg-blue-800 p-2 rounded-lg my-3 hover:bg-blue-500 cursor-pointer' onClick={() => { pay(30) }}>Pay Rs. 30</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastProvider />
        </>
    )
}

export default PaymentPage