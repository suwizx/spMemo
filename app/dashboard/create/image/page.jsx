'use client'

import { toast } from 'sonner';
import { useForm } from "react-hook-form"
import { collection , getDocs } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'; 
import { FileImage , FileUp , Loader2 , ImagePlus , CheckCircle } from 'lucide-react'
import { createPerson } from "@/app/action/person"
import { useState , useEffect } from "react"

export default function Page(){

    const [ personList , setPerson ] = useState([])
    const [ filteredPerson , setFiltered ] = useState([])
    const [ submitLoading , setSubmitloading ] = useState(false)
    const [ selectedFile , setSelctedFile ] = useState(false)
    const [ URLImage , setURLImage ] = useState()
    const [ selectedPath , setSelectPath ] = useState(false)
    const [ search , setSearch ] = useState("")
    const [ loadingList , setLoadList ] = useState(false)

    useEffect(()=>{
        getPerson()
        setFiltered(personList)
    },[])

    useEffect(() => {
        if(search == ""){
            setFiltered(personList)
        }
        setFiltered(personList.filter((path) => path.name.trim().toLowerCase().includes(search.trim().toLowerCase())))
    },[search,personList])

    async function getPerson(){
        await setLoadList(true)
        const arr = []
        const personRef = collection(db,'person')
        const personSnap = await getDocs(personRef)
        await personSnap.forEach((data) => {
            arr.push(data.data())
        })
        await setPerson(arr)
        setTimeout(()=>{setLoadList(false)},300)
    }

    const { register , handleSubmit , formState: { errors } , setValue , watch } = useForm()
    const link = watch("link")

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

    const changePath = (e,value) => {
        e.preventDefault()
        setValue("link",value)
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
                        <ImagePlus />
                    </span>
                    เพิ่มรูปภาพ
                </h2>
                <form className='mb-4' onSubmit={handleSubmit(submit)}> 
                    <div className='my-4'>
                        <label htmlFor="link" className='mb-2 block'>เลือกลิงก์</label>
                        {link ? (
                        <div className='w-full flex justify-between items-center bg-zinc-800 p-4 rounded-lg outline-none focus:outline focus:outline-red-500'>
                            <input disabled placeholder="เช่น paksudlor" id='link' {...register("link",{required:true,pattern:/^[a-z]+$/})} type="text" className='bg-transparent outline-none' />
                            <div className='flex items-center'>
                                <CheckCircle className='text-green-500' />
                                <button onClick={changePath} className='py-1 px-2 rounded-md ml-2 bg-zinc-900 border-2 border-zinc-900 hover:bg-transparent'>เปลี่ยน</button>
                            </div>
                        </div>
                        ) : (

                        <div className='p-4 border border-zinc-800 rounded-xl'>
                            <input type="text" value={search} onChange={(e) => {setSearch(e.target.value)}} placeholder='ค้นหาชื่อ' className='w-full bg-zinc-800 p-2 rounded-lg outline-none focus:outline focus:outline-red-500' />
                            <hr className='border border-zinc-800 my-4' />
                            <div className='p-2 bg-zinc-800 rounded-lg'>
                                {loadingList ? (<><Loader2 className="animate-spin" />Loading...</>) : (
                                <>
                                    {filteredPerson.map(data,i => (
                                        <button key={i} onClick={(e) => {changePath(e,data.link)}} className='p-2 hover:bg-zinc-900 w-full flex justify-between rounded-lg items-center'>
                                            <p>{data.name} ({data.link})</p>
                                            <button className='py-1 px-2 rounded-md ml-2 bg-zinc-900 border-2 border-zinc-900 hover:bg-zinc-800'>เลือก</button>
                                        </button>
                                    ))}
                                </>
                                )}
                            </div>
                        </div>
                        )}


                        {errors.link?.type == "required" && (
                        <p className="mt-2 text-sm text-red-400">โปรดกรอกลิงก์</p>
                        )}
                        {errors.link?.type == "pattern" && (
                        <p className="mt-2 text-sm text-red-400">กรุณาใช้ภาษาอังกฤษตัวพิมพ์เล็กไม่มีเว้นวรรค</p>
                        )}
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
                    <button type="submit" className="mb-4 bg-gradient-to-tr from-red-400 to-red-600 py-2 px-2 mt-2 rounded-lg hover:scale-95 transition w-full block"><span>{submitLoading ? (<Loader2 className='mr-2 inline-block animate-spin'/>) : (<ImagePlus className='mr-2 inline-block'/>) }</span>เพิ่มรูปภาพ</button>
                </form>
            </div>
        </div>
        </>
    )
}