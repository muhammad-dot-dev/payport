import React from 'react'

const Username = async ({ params }) => {
  const { username } = await params;
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
              <button className='bg-blue-800 p-2 rounded-lg my-3 hover:bg-blue-500 cursor-pointer'>Pay 10$</button>
              <button className='bg-blue-800 p-2 rounded-lg my-3 hover:bg-blue-500 cursor-pointer'>Pay 20$</button>
              <button className='bg-blue-800 p-2 rounded-lg my-3 hover:bg-blue-500 cursor-pointer'>Pay 30$</button>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Username