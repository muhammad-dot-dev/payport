"use client"
import React from 'react'
import Link from "next/link";
import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setshowdropdown] = useState(false)


  // if (session) {
  //   return <>
  //     Signed in as {session.user.email} <br />
  //     <button onClick={() => { signOut() }}>Sign Out</button>
  //   </>
  // }
  return (
    <nav className='bg-blue-950 text-white flex justify-between px-4 h-16 items-center'>
      <Link href={"/"} className="logo font-bold text-lg">P@TRON</Link>
      {/* <ul className='flex gap-8 '>
            <li>Home</li>
            <li>About</li>
            <li>Projects</li>
            <li>Sign UP</li>
            <li>Login</li>
        </ul> */}
      <div>
        {session && <>
        {/* We have given settineout on onblur beacuse otherwise we will be unavle to click buttons */}
          <button onClick={()=>{setshowdropdown(!showdropdown)}} onBlur={()=>{setTimeout(() => {
            setshowdropdown(false)
          }, 400);}} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="inline-flex items-center justify-center text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" type="button">
            Welcome {session.user.name}
            <svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" /></svg>
          </button>
          <div id="dropdown" className={`z-10 ${showdropdown?"block":"hidden"} absolute text-black bg-blue-50 bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44`}>
            <ul className="p-2 text-sm text-body font-medium" aria-labelledby="dropdownDefaultButton">
              <li>
                <Link href="/dashboard" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Dashboard</Link>
              </li>
              <li>
                <Link href={`/${session.user.name}`} className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Your Page</Link>
              </li>
              <li>
                <Link href="/" onClick={()=>{signOut()}} className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Sign out</Link>
              </li>
            </ul>
          </div>
        </>
        }
        {session &&
          <button onClick={() => { signOut() }} className="bg-gradient-to-b from-blue-950 to-blue-900 text-white font-bold border rounded-2xl p-2 cursor-pointer hover:scale-110">
            Logout
          </button>
        }
        {!session && <Link href={"/login"}>
          <button className="bg-gradient-to-b from-blue-950 to-blue-900 text-white font-bold border rounded-2xl p-2 cursor-pointer hover:scale-110">
            Login
          </button>
        </Link>}

      </div>
    </nav>
  )
}

export default Navbar