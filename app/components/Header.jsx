'use client'

import Link from 'next/link'
import Login from './Login'
import CreatePopup from './CreatePopup'
import { Aperture , User , Plus } from 'lucide-react'
import { useContext , useEffect, useState } from 'react' 
import { LoginContext } from '../Provider/LoginProvider'
import { useParams } from 'next/navigation'

export default function Header(){

    let params = useParams()
    
    const { isLoginPopup , setLoginPopup , user } = useContext(LoginContext)
    const [ isCraetePopup , setCreatePopup ] = useState(false)

    useEffect(()=>{
        setCreatePopup(false)
    },[params])
    
    return(
        <>  
            { isCraetePopup && (<CreatePopup setCreatePopup={setCreatePopup} />)}   
            <Login />
            <header className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50 backdrop-blur-lg sticky top-0 w-full">
                <Link href={`/`} className='font-bold text-2xl flex items-center hover:underline'><Aperture className='mr-2' />SP Memo</Link>
                {user ? 
                (<>
                    <div className="flex items-center">
                    <button onClick={()=>{setCreatePopup(true)}} className='p-2 inline-block bg-zinc-950 rounded-md border border-zinc-800 hover:bg-zinc-800 mr-2'><Plus /></button>
                    <Link className='p-2 inline-block bg-zinc-950 rounded-md border border-zinc-800 hover:bg-zinc-800' href={"/dashboard"}>สวัสดี {user.displayName.split(" ")[0]}</Link>
                    </div>
                </>)
                 : 
                (<>
                    <button onClick={() => {setLoginPopup(true)}} className='p-2 bg-zinc-900 border border-zinc-800 rounded-md hover:bg-zinc-800' ><User /></button>
                </>)}
            </header>
        </>
    )
}