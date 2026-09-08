"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
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


    const pay = async (amount) => {
        // Get the order Id 
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is PKR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me A Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        // var rzp1 = new Razorpay(options);
        // rzp1.open();
    }


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
                            <input type="text" className='w-full p-3 rounded-lg bg-blue-800' placeholder='Enter Name' />
                            <input type="text" className='w-full p-3 rounded-lg bg-blue-800' placeholder='Enter Message' />
                            <input type="text" className='w-full p-3 rounded-lg bg-blue-800' placeholder='Enter Amount' />
                            <button className='bg-blue-800 p-3 rounded-lg hover:bg-blue-500 cursor-pointer w-1/5'>Pay</button>
                            {/* Or choose from amount */}
                        </div>
                        <div className="flex gap-5">
                            <button className='bg-blue-800 p-2 rounded-lg my-3 hover:bg-blue-500 cursor-pointer' onClick={()=>{pay(10)}}>Pay Rs. 10</button>
                            <button className='bg-blue-800 p-2 rounded-lg my-3 hover:bg-blue-500 cursor-pointer' onClick={()=>{pay(10)}}>Pay Rs. 2 0</button>
                            <button className='bg-blue-800 p-2 rounded-lg my-3 hover:bg-blue-500 cursor-pointer' onClick={()=>{pay(10)}}>Pay Rs. 30</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastProvider/>
        </>
    )
}

export default PaymentPage