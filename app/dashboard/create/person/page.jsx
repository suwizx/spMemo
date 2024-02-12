'use client'

import { UserPlus , FileImage , FileUp } from 'lucide-react'
export default function Page(){

    return(
        <>
        <div className="p-4">
            <div className="max-w-xl mx-auto border border-zinc-800 my-6 rounded-lg p-4">
                <h2 className="text-2xl font-bold flex items-center pb-2 mb-2 border-b border-zinc-800">
                    <span className='mr-2'>
                        <UserPlus />
                    </span>
                    เพิ่มคน
                </h2>
                <form className='mb-4'>
                    <div className='my-4'>
                        <label htmlFor="name" className='mb-2 block'>ชื่อ</label>
                        <input type="text" className='w-full bg-zinc-800 p-1 rounded-lg outline-none focus:outline focus:outline-red-500' />
                    </div>
                    <div className='my-4'>
                        <label htmlFor="name" className='mb-2 block'>ลิงก์ <span className='text-red-400 text-sm'>( ใส่ภาษาอังกฤษตัวพิมพ์เล็กไม่มีเว้นวรรค )</span></label>
                        <input type="text" className='w-full bg-zinc-800 p-1 rounded-lg outline-none focus:outline focus:outline-red-500' />
                    </div>
                    <div className='my-4'>
                        <label htmlFor="name" className='mb-2 block'>คำอธิบาย <span className='text-zinc-400 text-sm'>( ปล่อยว่างได้ )</span></label>
                        <textarea type="text" className='w-full bg-zinc-800 p-1 rounded-lg outline-none focus:outline focus:outline-red-500' rows={5}></textarea>
                    </div>
                    <div className='my-4 border-b border-zinc-800'>
                        <label htmlFor="name" className='mb-2 block'>รูปภาพ</label>
                        <div className='w-[150px] h-[150px] bg-zinc-800 rounded-lg flex justify-center items-center'>
                            <FileImage />
                        </div>
                        <input type="file" className='hidden' />
                        <button className="bg-gradient-to-tr from-red-400 to-red-600 py-2 px-2 mt-2 mb-4 rounded-lg hover:scale-95 transition flex items-center"><FileUp className='mr-2'/>อัปโหลดภาพ</button>
                    </div>
                    <button className="mb-4 bg-gradient-to-tr from-red-400 to-red-600 py-2 px-2 mt-2 rounded-lg hover:scale-95 transition w-full block"><span><UserPlus className='mr-2 inline-block'/></span>เพิ่มคน</button>
                </form>
            </div>
        </div>
        </>
    )
}