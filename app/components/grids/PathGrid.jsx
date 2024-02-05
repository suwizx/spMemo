import Link from 'next/link'

export default function PathGrid(props){

    const { path } = props
    return(
        <Link href={`/photos/${path}`} className="bg-zinc-900 p-4 py-6 rounded-lg border border-zinc-800 hover:shadow-lg hover:shadow-red-700/50 hover:border-red-500 w-full bolck">
            <div className="h-[70px] w-[70px] bg-zinc-950 mx-auto mb-4 rounded-full border border-zinc-800" />
            <h2 className="font-bold text-xl text-center">PathTitle</h2>
            <p className="text-zinc-500 text-center">{path}</p> 
        </Link>
        
    )
}