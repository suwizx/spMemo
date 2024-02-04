'use client'

import { useRouter } from 'next/navigation'
import { auth } from "../lib/firebase"
import { signOut } from "firebase/auth"
import { useContext } from "react"
import { LoginContext } from "../Provider/LoginProvider" 


export default function Page(){
    const router = useRouter()
    const { user } = useContext(LoginContext) 

    function Logout (){
        signOut(auth)
        router.push("/")
    }

    return(
        <>
        <div className="p-4">
            <div className="max-w-xl mx-auto border border-zinc-800 my-6 rounded-lg p-4">
                <div>
                    <h1 className="mb-2 text-3xl font-bold inline-block bg-gradient-to-tr from-yellow-400 to-red-700 text-transparent bg-clip-text">{user?.displayName}</h1>
                </div>
                <div className="border-b border-zinc-800 w-full mb-4">
                    <p className="mb-4">{user?.email}</p>
                </div>
                <button onClick={Logout} className="bg-gradient-to-tr from-red-400 to-red-600 py-2 w-full rounded-lg hover:scale-95 transition">ออกจากระบบ</button>
            </div>
        </div>
        </>
    )
}