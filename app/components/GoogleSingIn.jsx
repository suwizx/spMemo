'use client'

import { useRouter } from 'next/navigation'
import { GoogleAuthProvider , signInWithPopup } from "firebase/auth";
import { auth } from "../lib/firebase"; 
import { useContext } from "react";
import { LoginContext } from "../Provider/LoginProvider";
const provider = new GoogleAuthProvider();

export default function GoogleSignIn() {
    const router = useRouter()
    const { setLoginPopup } = useContext(LoginContext)

    const onSignInClick = async() => {
        try{
            const data = await signInWithPopup(auth,provider)
            setLoginPopup(false)
            await router.push("/dashboard")
        }
        catch(err){
            console.log(err);
            alert(JSON.stringify(err))
        }
    }

    return(
        <>
        <button className="bg-zinc-900 py-2 border border-zinc-800 hover:bg-zinc-800 rounded-lg mt-2 block w-full" onClick={onSignInClick}>ดำเนินการต่อด้วย Google</button>
        </>
    )
}