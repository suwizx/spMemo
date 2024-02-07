import { store } from "@/app/lib/firebase" 
import { ref , list , getDownloadURL } from "firebase/storage"

import Link from 'next/link'

async function getPhotoFromPath(path){
    const photoRef = ref(store,path)
    let photoArr = []
    const photoList = await list(photoRef,{maxResults:1})
    const photosItems = await photoList.items
    await photosItems.forEach((data) => {
        path = data._location.path_
        photoArr.push(path)
    })
    return photoArr;
}

async function GetURL(path){
    let picArr = []
    const photosArr = await getPhotoFromPath(path)
    const promiseArr = photosArr.map((data) => {
        return getDownloadURL(ref(store, data)).then((url) => {
            picArr.push({url,Imgpath:data});
        });
    });
    await Promise.all(promiseArr);
    return picArr
}

export default async function PathGrid(props){

    const { path } = props
    const photo = await GetURL(path)

    return(
        <Link href={`/photos/${path}`} className="bg-zinc-900 p-4 py-6 rounded-lg border border-zinc-800 hover:shadow-lg hover:shadow-red-700/50 hover:border-red-500 w-full bolck">
            {photo.length >= 1 ? 
            (<img src={photo[0]?.url} className="h-[70px] w-[70px] bg-zinc-950 mx-auto mb-4 rounded-full border border-zinc-800 object-cover" />) 
            : (<div className="h-[70px] w-[70px] bg-zinc-950 mx-auto mb-4 rounded-full border border-zinc-800" />)}
            
            <h2 className="font-bold text-xl text-center">{path}</h2>
            <p className="text-zinc-500 text-center">{path}</p> 
        </Link>
        
    )
}