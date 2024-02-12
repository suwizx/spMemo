'use client'

import { toast } from 'sonner';
import { useForm } from "react-hook-form"
import { UserPlus , FileImage , FileUp , Loader2 } from 'lucide-react'
import { createPerson } from "@/app/action/person"
import { useState } from "react"

export default function Page(){

    const [ submitLoading , setSubmitloading ] = useState(false)
    const [selectedFile , setSelctedFile] = useState(false)
    const [URLImage , setURLImage] = useState()

    const { register , handleSubmit , watch , formState: { errors } } = useForm()

    const imageUpload = (e) => {
        e.preventDefault()
        image.click()
        image.onchange = function(e){
            setSelctedFile(e.target.files[0]);
            try{
                setURLImage(URL.createObjectURL(e.target.files[0]))
            }
            catch(err){
                setURLImage(false)
            }
        }
    }

    const submit = async (data) => {
        await setSubmitloading(true)
        console.log(data);
        const formData = new FormData();
        formData.append("name",data.name)
        formData.append("link",data.link)
        formData.append("discription",data.discription)
        formData.append("file",data.image[0])
        await createPerson(formData)
        await setSubmitloading(false)
        toast("สร้างเรียบร้อย",{duration:5000})
    }

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
                <form className='mb-4' onSubmit={handleSubmit(submit)}> 
                    <div className='my-4'>
                        <label htmlFor="name" className='mb-2 block'>ชื่อ</label>
                        <input id='name' {...register("name",{required:true})} type="text" className='w-full bg-zinc-800 p-1 rounded-lg outline-none focus:outline focus:outline-red-500' />
                        {errors.name && (
                        <p className="mt-2 text-sm text-red-400">โปรดกรอกชื่อ</p>
                        )}
                    </div>
                    <div className='my-4'>
                        <label htmlFor="link" className='mb-2 block'>สร้างลิงก์ <span className='text-red-400 text-sm'>( ภาษาอังกฤษตัวพิมพ์เล็กไม่มีเว้นวรรค )</span></label>
                        <input placeholder="เช่น paksudlor" id='link' {...register("link",{required:true,pattern:/^[a-z]+$/})} type="text" className='w-full bg-zinc-800 p-1 rounded-lg outline-none focus:outline focus:outline-red-500' />
                        {errors.link?.type == "required" && (
                        <p className="mt-2 text-sm text-red-400">โปรดกรอกลิงก์</p>
                        )}
                        {errors.link?.type == "pattern" && (
                        <p className="mt-2 text-sm text-red-400">กรุณาใช้ภาษาอังกฤษตัวพิมพ์เล็กไม่มีเว้นวรรค</p>
                        )}
                    </div>
                    <div className='my-4'>
                        <label htmlFor="discription" className='mb-2 block'>คำอธิบาย <span className='text-zinc-400 text-sm'>( ปล่อยว่างได้ )</span></label>
                        <textarea id='discription' {...register("discription",{required:false})} type="text" className='w-full bg-zinc-800 p-1 rounded-lg outline-none focus:outline focus:outline-red-500' rows={5}></textarea>
                    </div>
                    <div className='my-4 border-b border-zinc-800 pb-4'>
                        <label htmlFor="image" className='mb-2 block'>รูปภาพ</label>
                        {URLImage ? 
                        (<img onClick={imageUpload} src={URLImage} className='object-cover w-[150px] h-[150px] bg-zinc-800 rounded-lg flex justify-center items-center'></img>
                        ) : 
                        (<div onClick={imageUpload} className='w-[150px] h-[150px] bg-zinc-800 rounded-lg flex justify-center items-center'>
                            <FileImage />
                        </div>)}
                        <input type="file" id='image' accept="image/*" {...register("image",{required:true})} className='hidden' />
                        <button onClick={imageUpload} className="bg-gradient-to-tr from-red-400 to-red-600 py-2 px-2 mt-2 rounded-lg hover:scale-95 transition flex items-center"><FileUp className='mr-2'/>{URLImage ? ("เปลี่ยนรูปภาพ") : ("อัปโหลดภาพ")}</button>
                        {errors.image && (
                        <p className="mt-2 text-sm text-red-400">กรุณาเลือกรูปภาพ</p>
                        )}
                    </div>
                    <button type="submit" className="mb-4 bg-gradient-to-tr from-red-400 to-red-600 py-2 px-2 mt-2 rounded-lg hover:scale-95 transition w-full block"><span>{submitLoading ? (<Loader2 className='mr-2 inline-block animate-spin'/>) : (<UserPlus className='mr-2 inline-block'/>) }</span>เพิ่มคน</button>
                </form>
            </div>
        </div>
        </>
    )
}