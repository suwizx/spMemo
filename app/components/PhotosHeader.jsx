'use client'
import { ArrowUpFromLine } from 'lucide-react'
import { useContext } from 'react';
import { LoginContext } from '../Provider/LoginProvider';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation'

export default function PhotosHeader(props){

    const router = useRouter()

    const { user , setLoginPopup } = useContext(LoginContext)

    const { name , link } = props

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      };

    const addImageBTN = () => {
        if(!user){
            toast("กรุณาเข้าสู่ระบบเพื่อเพิ่มรูป",{duration:5000})
            setLoginPopup(true)
        }
        else{
            router.push("/dashboard/create/image")
        }
    }

    return(
        <> 
            <div className="fixed bottom-0 p-4 border-t border-zinc-800 flex items-center justify-between bg-zinc-900/50 backdrop-blur-lg w-full">
                <div className='max-w-[50dvw]'>
                    <h2 className='font-bold text-2xl bg-gradient-to-tr from-red-500 to-yellow-400 bg-clip-text text-transparent'>{name}<span className='text-sm font-normal text-white ps-1'>({link})</span> </h2>
                </div>
                <div className='max-w-[50dvw] flex items-center'>
                    <button onClick={addImageBTN} className='p-2 bg-zinc-950 border border-zinc-800 rounded-md hover:bg-zinc-800' >เพิ่มรูปภาพ</button>
                    <button onClick={scrollToTop} className='ml-2 p-2 bg-zinc-950 border border-zinc-800 rounded-md hover:bg-zinc-800' ><ArrowUpFromLine /></button>
                </div>
            </div>
        </>
    )
}