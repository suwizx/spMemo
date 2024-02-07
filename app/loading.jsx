import { Loader2 } from 'lucide-react'

export default function Loading() {
    return (
        <>
            <div className="min-w-full min-h-full bg-zinc-950/50 backdrop-blur-lg fixed top-0 z-10 flex justify-center items-center p-4">
                <Loader2 size={"3em"} className='animate-spin' />
            </div>
        </>
    )
  }