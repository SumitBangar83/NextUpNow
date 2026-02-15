"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const base_url = process.env.NEXT_PUBLIC_BASE_URL;
export default function page() {
    const router = useRouter();
    const [form, setForm] = useState({ "name": "", "email": "", "password": "" })
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState("")
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            // alert("you are already logged in");
            router.replace('/')
        }
    }, [router])
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setErr("")
        try {
            console.log("url", `${base_url}auth/signup`)
            const res = await fetch(`${base_url}auth/signup`, {
                "method": "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(form)
            })
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "signup failed")
            }
            if (data.token) { localStorage.setItem("token", data.token) }
            alert("signup successfull ! now login")
            // window.location.href = "/signin";

        }
        catch (err) {
            setErr(err.message)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div className='mt-[8vh]'>
            <div className='max-w-[480px] border-2 m-auto rounded-xl border-amber-300 px-16 pb-10'>
                <h1 className="text-4xl text-orange-00 font-bold text-center mt-20 mb-20">Create Account</h1>
                {/* input form */}
                <form onSubmit={handleSubmit}>
                    <input className='border-2 border-gray-300  w-full text-lg py-1 px-3 rounded-sm' name="name" placeholder='username' required onChange={handleChange} />
                    <input className='border-2 border-gray-300  w-full mt-6 text-lg py-1 px-3 rounded-sm' name="email" placeholder='email' type="email" required onChange={handleChange} />
                    <input className='border-2 border-gray-300  w-full mt-6 text-lg py-1 px-3 rounded-sm' name="password" placeholder='password' type="password" required onChange={handleChange} />
                    {/* <input name="otp" type="Otp" onChange={handleChange} /> */}
                    {err && <p className='mt-2  text-red-500'>{err}</p>}
                    <button className='mt-14 h-10 border-2 border-orange-700 bg-orange-600 hover:border-orange-500 cursor-pointer w-full text-orange-100 text-xl font-bold rounded-sm' type="submit" disabled={loading} >{loading ? "Creating account..." : "SingUp"}</button>
                </form>
                <div>
                    <h3 className='text-center mt-8'>Already Have An Account, <Link href='/signin'><span className='cursor-pointer underline text-orange-700 hover:text-orange-600'>SignIn</span></Link></h3>
                </div>
            </div>
        </div>
    )
}



