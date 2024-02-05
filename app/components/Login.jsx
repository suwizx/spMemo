'use client'

import { X } from 'lucide-react'
import { useState , useContext } from "react"
import { LoginContext } from '../Provider/LoginProvider'
import GoogleSingIn from './GoogleSingIn'

export default function Login(){

    const { isLoginPopup , setLoginPopup } = useContext(LoginContext)

    return(
        <>{isLoginPopup && (
            <div className="min-w-full min-h-full bg-zinc-950/50 backdrop-blur-lg fixed top-0 z-10 flex justify-center items-center p-4">
                <div className="p-6 bg-zinc-900 rounded-lg max-w-[350px] w-screen">
                    <div className="flex justify-between items-center pb-4 border-b border-zinc-800 mb-2">
                        <h2 className='font-bold'>เข้าสู่ระบบ</h2>
                        <button onClick={() => {setLoginPopup(false)}}><X /></button>
                    </div>
                    <div className='mt-4'>
                        <div className='mb-2'>
                            <input type="email" className='border border-zinc-800 bg-zinc-900 w-full p-2' />
                            <input type="submit" className='border border-zinc-800 bg-zinc-900 w-full p-2' />
                        </div>
                        <GoogleSingIn />
                    </div>
                </div>
            </div>
        )}
        </>
    )
}