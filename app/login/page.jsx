'use client'

import Link from 'next/link'

import { X } from 'lucide-react'
import GoogleSignIn from '../components/GoogleSingIn'

export default function Page(){
    return(
        <div className="min-w-full min-h-full bg-zinc-950/50 backdrop-blur-lg fixed top-0 z-10 flex justify-center items-center p-4">
                <div className="p-6 bg-zinc-900 rounded-lg max-w-[350px] w-screen">
                    <div className="flex justify-between items-center pb-4 border-b border-zinc-800 mb-2">
                        <h2 className='font-bold'>เข้าสู่ระบบ</h2>
                        <Link href={"/"} ><X /></Link>
                    </div>
                    <div className='mt-4'>
                        <GoogleSignIn />
                    </div>
                </div>
            </div>
    )
}