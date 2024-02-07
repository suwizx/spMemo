'use client'

import Link from 'next/link'
import { X , UserPlus , ImagePlus } from 'lucide-react'

export default function CreatePopup(props){

    const { setCreatePopup } = props
    
    return(
        <>
            <div className="min-w-full min-h-full bg-zinc-950/50 backdrop-blur-lg fixed top-0 z-10 flex justify-center items-center p-4">
                <div className="p-6 bg-zinc-900 rounded-lg max-w-[350px] w-screen">
                    <div className="flex justify-between items-center pb-4 border-b border-zinc-800 mb-2">
                        <h2 className='font-bold'>เพิ่มข้อมูล</h2>
                        <button onClick={() => {setCreatePopup(false)}}><X /></button>
                    </div>
                    <div className='mt-4'>
                        <Link href={'/dashboard/create/person'} className='border border-zinc-800 block p-8 rounded-xl hover:bg-zinc-800 mb-4'>
                            <UserPlus className='mx-auto mb-2' size={"1.5em"} />
                            <h2 className='text-center font-bold text-xl'>เพิ่มคน</h2>
                        </Link>
                        <Link href={'/dashboard/create/image'} className='border border-zinc-800 block p-8 rounded-xl hover:bg-zinc-800'>
                            <ImagePlus className='mx-auto mb-2' size={"1.5em"} />
                            <h2 className='text-center font-bold text-xl'>เพิ่มรูป</h2>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}