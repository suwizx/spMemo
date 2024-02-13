'use client'

export default function Page(){
    return(
        <div className="min-w-full min-h-full bg-gradient-to-r from-violet-200 to-pink-200 fixed top-0 z-10 flex justify-center items-center p-4">
                <div className="p-6 bg-zinc-900/70 backdrop-blur-2xl rounded-lg max-w-[350px] w-full max-h-[70dvh] h-full">
                    <div className="flex justify-between items-center pb-4 border-b border-zinc-800 mb-2">
                        <h2 className='font-bold'>ติดตามสถานะ</h2>
                    </div>
                    <div className='mt-4 overflow-y-auto max-h-[50dvh]'>
                       <p className="bg-green-500/50 text-green-300 p-2 rounded-lg">อยู่ระหว่าง : ขั้นตอนการผลิต</p>
                    </div>
                </div>
            </div>
    )
}