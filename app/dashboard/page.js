"use client"
import React from 'react'
import { useState ,useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';

const page = () => {
    const { data: session , status} = useSession()
    const router = useRouter();
    useEffect(() => {
        if (status === "unauthenticated" && !session) {
            router.push("/login")
        }
    }, [status, router])
    
    return (
        <div>page</div>
    )
}

export default page
