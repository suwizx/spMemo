import { store } from "@/app/lib/firebase" 
import { ref , listAll , getDownloadURL } from "firebase/storage"
import Image from 'next/image'
import { DivMotion } from "@/app/components/DivMotion"

async function getPhotoFromPath(path){
    const photoRef = ref(store,path)
    let photoArr = []
    const photoList = await listAll(photoRef)
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
        return getDownloadURL(ref(store, data)).then(async(url) => {
            picArr.push({url,Imgpath:data});
        });
    });
    await Promise.all(promiseArr);
    return picArr
}

export default async function Page({ params }){
    const { path } = params
    const imgURL = await GetURL(path)

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
        y: 0,
        opacity: 1
        }
    };

    return(
        <div className="max-w-xl p-4 mx-auto">
            {imgURL.map((data,i) => (
                <DivMotion key={i} initial={item.hidden} whileInView={item.visible} transition={{duration: 0.5}} viewport={{once:true}} className="bg-zinc-900 border border-zinc-800 py-4 rounded-xl my-4">
                    <Image sizes="100vw" width={0} height={0} priority className="block aspect-square object-cover w-full my-4" src={data.url} alt={data.Imgpath.split(`${path}/`)[1]} />
                    <p className="p-4">{data.Imgpath.split(`${path}/`)[1]}</p>
                </DivMotion>
            ))}
        </div>
        
    )
}