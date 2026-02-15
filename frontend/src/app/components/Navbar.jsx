"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaRegCircleUser } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
export default function navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const router = useRouter()
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setIsLoggedIn(true)
        }
    }, [router])
    return (
        <div className='w-full h-16 fixed top-0 flex justify-between items-center pl-36 pr-24 bg-purple-100' style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
            {/* logo */}
            <div className='text-purple-800 text-2xl font-extrabold cursor-pointer'>
                <Link href="/" >NextUPnow</Link>
            </div>

            {/* test */}
            <div >
                <Link href="/testPage " className='text-orange-600 text-xl font-bold'> Testing </Link>
            </div>

            {/* buttons */}
            {!isLoggedIn ? (
                <div className='flex'>
                    <div className='text-purple-800'>
                        <Link href="/signin"><button className=' cursor-pointer signin-n transition-all  ease-in-out  h-10 rounded-lg  border-2 border-purple-600 hover:border-purple-300  mr-8 hover:text-white font-sans bg-purple-300 hover:bg-purple-500 ' style={{ width: '90px', fontWeight: '500' }}>Log In</button> </Link>
                    </div>
                    <div className=' rounded-lg bg-gray-200'>
                        <Link href="/signup" > <button className='cursor-pointer h-10 rounded-lg transition-all duration-200 ease-in-out  border-2 border-purple-600 hover:border-purple-300  text-purple-500 hover:text-white font-sans hover:bg-purple-600' style={{ width: '90px', fontWeight: '500' }}>Sign up</button></Link>
                    </div>
                </div>)
                :
                (<div className='flex'>
                    <div className=' rounded-lg bg-gray-200'>
                        <Link href="/" > <button className='cursor-pointer h-10 rounded-lg transition-all duration-200 ease-in-out  border-2 border-purple-600 hover:border-purple-300  text-purple-500 hover:text-white font-sans hover:bg-purple-600' style={{ width: '90px', fontWeight: '500' }}>Logout</button></Link>
                    </div>
                    <FaRegCircleUser />
                </div>)
            }
        </div>
    )
}
